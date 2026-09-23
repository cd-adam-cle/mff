#!/usr/bin/env python3
# /// script
# requires-python = ">=3.9"
# dependencies = ["pillow", "pillow-heif"]
# ///
"""Zmenší a převede obrázky, než půjdou do gitu.

    uv run scripts/optimize_images.py _inbox/            # celá složka
    uv run scripts/optimize_images.py foto.heic scan.png  # jednotlivé soubory
    uv run scripts/optimize_images.py _inbox/ --max 2400  # víc detailu

(bez uv: `pip install -r requirements.txt` a `python3 scripts/optimize_images.py …`)

- Fotky (HEIC, PNG, JPEG, WEBP) → JPEG, max `--max` px na delší hraně,
  kvalita `--quality`. Otočí podle EXIF a EXIF pak zahodí (poloha z telefonu
  nemá v repu co dělat).
- PNG s málo barvami (screenshot, diagram) zůstane PNG — JPEG by kolem
  písmen nadělal artefakty — jen se zmenší a zoptimalizuje.
- Originál se přesune do `_raw/` vedle souboru (je v .gitignore), ať jde
  výsledek porovnat. `--discard-raw` ho rovnou smaže.
- Už zpracované soubory (JPEG v limitu) přeskočí, takže jde pouštět opakovaně.
"""
import argparse
import sys
from pathlib import Path

from PIL import Image, ImageOps

try:
    from pillow_heif import register_heif_opener
    register_heif_opener()
    HEIF = True
except ImportError:
    HEIF = False

PHOTO_EXT = {".jpg", ".jpeg", ".png", ".heic", ".heif", ".webp"}
TARGET_KB = 500          # cíl ze CLAUDE.md; nad tím jen varujeme
GRAPHIC_COLORS = 4096    # PNG s méně barvami (na náhledu) bereme jako grafiku


def kb(n):
    return f"{n / 1024:,.0f} KB".replace(",", " ")


def is_graphic(img):
    """Screenshot/diagram: málo různých barev. Fotka jich má desítky tisíc."""
    probe = img.convert("RGB")
    probe.thumbnail((400, 400))
    return probe.getcolors(maxcolors=GRAPHIC_COLORS) is not None


def process(path, a):
    ext = path.suffix.lower()
    if ext in {".heic", ".heif"} and not HEIF:
        print(f"  ! {path.name}: chybí pillow-heif, HEIC přeskočen", file=sys.stderr)
        return
    before = path.stat().st_size
    with Image.open(path) as im:
        im = ImageOps.exif_transpose(im)
        w, h = im.size
        graphic = ext == ".png" and is_graphic(im)

        # hotový JPEG / grafické PNG v limitu nech být (idempotence)
        done = ext in {".jpg", ".jpeg"} or graphic
        if done and max(w, h) <= a.max and before <= TARGET_KB * 1024:
            if a.verbose:
                print(f"  = {path.name}: už je v pořádku ({kb(before)})")
            return

        im.thumbnail((a.max, a.max), Image.LANCZOS)
        if graphic:
            out = path.with_suffix(".png")
            if im.mode not in ("RGB", "RGBA", "L", "P"):
                im = im.convert("RGBA")
            tmp = out.with_name(out.name + ".tmp")
            im.save(tmp, "PNG", optimize=True)
        else:
            out = path.with_suffix(".jpg")
            if im.mode != "RGB":
                bg = Image.new("RGB", im.size, "white")   # průhlednost → bílá
                bg.paste(im, mask=im.getchannel("A") if "A" in im.getbands() else None)
                im = bg
            tmp = out.with_name(out.name + ".tmp")
            # bez exif= se metadata neuloží
            im.save(tmp, "JPEG", quality=a.quality, optimize=True, progressive=True)

    # originál pryč až když náhrada existuje
    if a.discard_raw:
        path.unlink()
    else:
        raw = path.parent / "_raw"
        raw.mkdir(exist_ok=True)
        dst, i = raw / path.name, 1
        while dst.exists():  # nikdy nepřepsat dřívější originál
            dst, i = raw / f"{path.stem}_{i}{path.suffix}", i + 1
        path.rename(dst)
    tmp.rename(out)

    after = out.stat().st_size
    warn = "  ⚠ nad cílem" if after > TARGET_KB * 1024 else ""
    kind = "PNG (grafika)" if graphic else "JPEG"
    print(f"  {path.name} → {out.name}  {w}×{h} → {im.size[0]}×{im.size[1]} {kind}  "
          f"{kb(before)} → {kb(after)}{warn}")
    return before, after


def collect(paths, recursive):
    for p in map(Path, paths):
        if p.is_dir():
            it = p.rglob("*") if recursive else p.iterdir()
            for f in sorted(it):
                if f.is_file() and f.suffix.lower() in PHOTO_EXT and "_raw" not in f.parts:
                    yield f
        elif p.is_file():
            yield p
        else:
            print(f"  ! {p}: neexistuje", file=sys.stderr)


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("paths", nargs="+", help="soubory nebo složky")
    ap.add_argument("--max", type=int, default=1600, help="max px na delší hraně (1600)")
    ap.add_argument("--quality", type=int, default=80, help="JPEG kvalita (80)")
    ap.add_argument("-r", "--recursive", action="store_true", help="i podsložky")
    ap.add_argument("--discard-raw", action="store_true", help="originály smazat místo _raw/")
    ap.add_argument("-v", "--verbose", action="store_true")
    a = ap.parse_args()

    tb = ta = n = 0
    for f in collect(a.paths, a.recursive):
        try:
            r = process(f, a)
        except Exception as e:  # jeden rozbitý soubor nesmí zastavit dávku
            print(f"  ! {f.name}: {e}", file=sys.stderr)
            continue
        if r:
            tb, ta, n = tb + r[0], ta + r[1], n + 1
    if n:
        print(f"hotovo, zpracováno: {n}, celkem {kb(tb)} → {kb(ta)}")
    else:
        print("nic ke zpracování")


if __name__ == "__main__":
    main()
