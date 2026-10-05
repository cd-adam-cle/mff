#!/usr/bin/env python3
"""Stáhne nové materiály k RIZ (NMFP463) z https://www.arm.cz/mff do 01_semestr_1/RIZ_financni_rizika/zdroje/kurz/.

Přihlašovací údaje (dal je přednášející studentům) čte z `scripts/.riz_credentials` (gitignored, formát KEY=VALUE)
nebo z proměnných prostředí ARM_USER / ARM_PASS. Heslo nikdy nepatří do repa (je veřejné).

Spuštění:  python3 scripts/riz_stahni_materialy.py        # stáhne, co ještě není, a vypíše seznam
           python3 scripts/riz_stahni_materialy.py --list # jen vypíše, co je na webu
Nový soubor se uloží jako RIZ_arm_<původní název>.pdf a vypíše se — pak ho přejmenovat podle konvence a zapsat do plan.md / _info.md.
"""
import html
import os
import re
import sys
import urllib.parse
import urllib.request
from http.cookiejar import CookieJar
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DEST = ROOT / "01_semestr_1" / "RIZ_financni_rizika" / "zdroje" / "kurz"
CRED = ROOT / "scripts" / ".riz_credentials"
BASE = "https://www.arm.cz"


def credentials() -> tuple[str, str]:
    env = dict(os.environ)
    if CRED.exists():
        for line in CRED.read_text(encoding="utf-8").splitlines():
            if "=" in line and not line.startswith("#"):
                k, v = line.split("=", 1)
                env.setdefault(k.strip(), v.strip())
    try:
        return env["ARM_USER"], env["ARM_PASS"]
    except KeyError:
        sys.exit(f"Chybí přihlašovací údaje: vytvoř {CRED} s řádky ARM_USER=… a ARM_PASS=… (soubor je v .gitignore).")


def main() -> None:
    user, pw = credentials()
    opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(CookieJar()))
    opener.addheaders = [("User-Agent", "Mozilla/5.0 (Mff repo; riz_stahni_materialy.py)")]
    opener.open(BASE + "/mff", timeout=30).read()  # založí session
    data = urllib.parse.urlencode({"username": user, "password": pw, "submit": "Přihlásit", "_do": "signInWebForm-submit"}).encode()
    opener.open(BASE + "/ccm-update-login?backlink=990mh", data=data, timeout=30).read()
    page = opener.open(BASE + "/mff", timeout=30).read().decode("utf-8", "ignore")
    if "Odhlásit" not in page:
        sys.exit("Přihlášení se nepovedlo (stránka neobsahuje „Odhlásit“). Zkontroluj údaje v scripts/.riz_credentials.")

    links = re.findall(r'<a[^>]+href="([^"]+\.pdf)"[^>]*>(.*?)</a>', page, re.S | re.I)
    texts = re.sub(r"<[^>]+>", " ", page)
    print(f"Na webu je {len(links)} PDF:")
    DEST.mkdir(parents=True, exist_ok=True)
    existing = {p.name for p in DEST.glob("*.pdf")}
    for href, label in links:
        label = re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", "", label))).strip()
        fname = urllib.parse.unquote(href.rsplit("/", 1)[-1])
        print(f"  - {label}: {fname}")
        if "--list" in sys.argv:
            continue
        # už stažené soubory poznáme podle původního názvu v souboru .zdroj vedle PDF
        marker = DEST / ".stazeno"
        done = marker.read_text(encoding="utf-8").splitlines() if marker.exists() else []
        if fname in done:
            continue
        target = DEST / ("RIZ_arm_" + re.sub(r"[^\w.-]+", "_", fname))
        url = href if href.startswith("http") else BASE + href
        target.write_bytes(opener.open(urllib.parse.quote(url, safe=":/?=&%"), timeout=120).read())
        with marker.open("a", encoding="utf-8") as f:
            f.write(fname + "\n")
        print(f"    → staženo {target.relative_to(ROOT)} ({target.stat().st_size // 1024} KB) — přejmenovat a zapsat do plan.md")
    popis = re.search(r"Materiály pro studenty:(.*?)\[Zpět\]", texts, re.S)
    if popis:
        print("\nPopis na webu:", re.sub(r"\s+", " ", html.unescape(popis.group(1))).strip())


if __name__ == "__main__":
    main()
