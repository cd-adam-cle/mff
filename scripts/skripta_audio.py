# /// script
# requires-python = ">=3.10"
# dependencies = ["pymupdf", "requests"]
# ///
"""Skripta → audio (ElevenLabs), po sekcích a na vyžádání.

  uv run scripts/skripta_audio.py stav
  uv run scripts/skripta_audio.py sekce                 # obsah skript se stranami a počty znaků
  uv run scripts/skripta_audio.py text 1.5              # PDF → media/la1-skripta-audio/text/1.5.txt
  uv run scripts/skripta_audio.py tts media/la1-skripta-audio/text/1.5.txt [--dry-run]

Text se nepřeformulovává. `text` jen odstraní záhlaví stran a spojí slova
rozdělená na konci řádku. Vzorce z PDF vypadnou rozbité (indexy, mocniny,
matice), proto se .txt před `tts` kontroluje a vzorce se přepisují do výslovnosti.
Klíč je v .env (ELEVENLABS_API_KEY).
"""
import argparse
import os
import re
import sys
from pathlib import Path

import requests

ROOT = Path(__file__).resolve().parent.parent
PDF = ROOT / "01_semestr_1/LA1_algebra/zdroje/kurz/LA1_skripta_la7_barto_tuma.pdf"
OUT = ROOT / "media/la1-skripta-audio"
API = "https://api.elevenlabs.io/v1"
VOICE = "onwK4e9ZLuTAKqWW03F9"  # Daniel
MODEL = "eleven_multilingual_v2"
CHUNK = 4500  # znaků na jeden požadavek

NADPIS = re.compile(r"^(\d+\.\d+)\. ")
ZAHLAVI = re.compile(r"^(\d+|[\dA-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ .,\-–]+)$")
ZACATEK_ODSTAVCE = re.compile(
    r"^(\d+\.\d+\.\d+\. |(Definice|Věta|Tvrzení|Lemma|Důsledek|Příklad|Pozorování|Poznámka) \d+\.\d+\.|Důkaz\.|• )"
)


def klic():
    env = ROOT / ".env"
    if env.exists():
        for radek in env.read_text().splitlines():
            if radek.startswith("ELEVENLABS_API_KEY="):
                return radek.split("=", 1)[1].strip()
    k = os.environ.get("ELEVENLABS_API_KEY")
    if not k:
        sys.exit("Chybí ELEVENLABS_API_KEY v .env")
    return k


def zbyva():
    r = requests.get(f"{API}/user/subscription", headers={"xi-api-key": klic()}, timeout=30)
    r.raise_for_status()
    d = r.json()
    return d["tier"], d["character_limit"] - d["character_count"], d["character_limit"]


def obsah(doc):
    """[(cislo, nazev, prvni_strana, posledni_strana)] pro sekce X.Y, strany od 1."""
    toc = doc.get_toc()
    sekce = []
    for i, (_, nazev, strana) in enumerate(toc):
        m = NADPIS.match(nazev)
        if not m:
            continue
        konec = toc[i + 1][2] if i + 1 < len(toc) else len(doc)
        sekce.append((m.group(1), nazev, strana, konec))
    return sekce


def radky_strany(page):
    radky = [r.strip() for r in page.get_text().splitlines() if r.strip()]
    # záhlaví: číslo strany a název kapitoly/sekce verzálkami, v libovolném pořadí
    while radky and len(radky[0]) < 80 and ZAHLAVI.match(radky[0]):
        radky.pop(0)
    return radky


def vytahni(doc, cislo):
    sekce = obsah(doc)
    hit = [s for s in sekce if s[0] == cislo]
    if not hit:
        sys.exit(f"Sekce {cislo} není v obsahu. Zkus příkaz `sekce`.")
    _, nazev, od, do = hit[0]
    radky = []
    for p in range(od - 1, do):
        radky += radky_strany(doc[p])
    zacatek = next((i for i, r in enumerate(radky) if r.startswith(nazev[:25])), 0)
    radky = radky[zacatek:]
    for i, r in enumerate(radky[1:], 1):  # konec = nadpis další sekce nebo Cvičení/Shrnutí
        m = NADPIS.match(r)
        if (m and m.group(1) != cislo and not re.match(r"^\d+\.\d+\.\d+", r)) or r.startswith(
            ("Shrnutí ", "Cvičení")
        ):
            radky = radky[:i]
            break

    odstavce, akt = [], ""
    for r in radky:
        if ZACATEK_ODSTAVCE.match(r) and akt:
            odstavce.append(akt)
            akt = ""
        if akt.endswith("-") and r[:1].islower():
            akt = akt[:-1] + r
        else:
            akt = f"{akt} {r}".strip()
    odstavce.append(akt)
    return "\n\n".join(odstavce) + "\n"


def kusy(text):
    """Rozdělí text na kusy do CHUNK znaků, dělí jen na hranici odstavce nebo věty."""
    casti, akt = [], ""
    for odst in text.strip().split("\n\n"):
        vety = [odst] if len(odst) <= CHUNK else re.split(r"(?<=[.!?]) ", odst)
        for v in vety:
            oddel = "\n\n" if v is vety[0] else " "
            if akt and len(akt) + len(oddel) + len(v) > CHUNK:
                casti.append(akt)
                akt = v
            else:
                akt = f"{akt}{oddel}{v}" if akt else v
    if akt:
        casti.append(akt)
    return casti


def cmd_stav(_):
    tier, zb, limit = zbyva()
    print(f"tarif: {tier}, zbývá {zb} z {limit} znaků")


def cmd_sekce(_):
    import pymupdf

    doc = pymupdf.open(PDF)
    for cislo, nazev, od, do in obsah(doc):
        print(f"{nazev:<75} s. {od}–{do}  ~{len(vytahni(doc, cislo)):>6} znaků")


def cmd_text(a):
    import pymupdf

    text = vytahni(pymupdf.open(PDF), a.sekce)
    cil = OUT / "text" / f"{a.sekce}.txt"
    cil.parent.mkdir(parents=True, exist_ok=True)
    if cil.exists() and not a.prepis:
        sys.exit(f"{cil} už existuje (možná s opravenými vzorci). Přepsat: --prepis")
    cil.write_text(text)
    print(f"{cil.relative_to(ROOT)}: {len(text)} znaků")


def cmd_tts(a):
    zdroj = Path(a.soubor)
    casti = kusy(zdroj.read_text())
    celkem = sum(len(c) for c in casti)
    tier, zb, _ = zbyva()
    print(f"{zdroj.name}: {celkem} znaků v {len(casti)} kusech, zbývá {zb} ({tier})")
    if celkem > zb:
        sys.exit("Nestačí kredit, nic jsem negeneroval.")
    if a.dry_run:
        return
    cil = OUT / "audio" / f"{zdroj.stem}.mp3"
    cil.parent.mkdir(parents=True, exist_ok=True)
    with open(cil, "wb") as f:
        for i, kus in enumerate(casti):
            r = requests.post(
                f"{API}/text-to-speech/{a.hlas}",
                params={"output_format": "mp3_44100_128"},
                headers={"xi-api-key": klic()},
                json={
                    "text": kus,
                    "model_id": a.model,
                    "language_code": "cs" if a.model != "eleven_multilingual_v2" else None,
                    # okolní text drží plynulou intonaci přes hranice kusů
                    "previous_text": casti[i - 1][-500:] if i else None,
                    "next_text": casti[i + 1][:500] if i + 1 < len(casti) else None,
                },
                timeout=600,
            )
            if r.status_code != 200:
                sys.exit(f"Kus {i + 1}: HTTP {r.status_code} {r.text[:400]}")
            f.write(r.content)
            print(f"  kus {i + 1}/{len(casti)} hotový")
    print(f"→ {cil.relative_to(ROOT)} ({cil.stat().st_size / 1e6:.1f} MB)")


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = p.add_subparsers(dest="cmd", required=True)
    sub.add_parser("stav").set_defaults(f=cmd_stav)
    sub.add_parser("sekce").set_defaults(f=cmd_sekce)
    t = sub.add_parser("text")
    t.add_argument("sekce")
    t.add_argument("--prepis", action="store_true")
    t.set_defaults(f=cmd_text)
    s = sub.add_parser("tts")
    s.add_argument("soubor")
    s.add_argument("--hlas", default=VOICE)
    s.add_argument("--model", default=MODEL)
    s.add_argument("--dry-run", action="store_true")
    s.set_defaults(f=cmd_tts)
    a = p.parse_args()
    a.f(a)


if __name__ == "__main__":
    main()
