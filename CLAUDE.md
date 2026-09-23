# MFF — studijní headquarters

Databáze materiálů + nástroje, kterými Claude umí číst video, zvuk, obrázky a PDF.

## Struktura

```
Mff/
├── CLAUDE.md          tenhle soubor
├── tools/             nástroje (viz tools/README.md)
│   ├── bin/media      ★ hlavní nástroj na video/audio/obrázky
│   ├── bin/ffmpeg, ffprobe   vendorované binárky (ffmpeg 7.0, arm64)
│   └── .venv/         python 3.12 + mlx-whisper
├── media/<slug>/      vše, co se z videí vytěžilo (viz media/README.md)
└── <složky předmětů>  materiály ke studiu
```

Složky předmětů se ještě přerovnávají, takže tady schválně nejsou vypsané —
aktuální stav zjistíš `ls`. K září 2026 existují souběžně:

- `semestr_1/<predmet>/` — novější, `predmet.html` (sylabus ze SISu),
  `ucebnice*`, názvy bez diakritiky
- `prvák/<Předmět>/` — starší materiály z července, názvy s diakritikou
  a mezerami
- `opakovani_stredoskolske_matiky/` — přípravný kurz: `skripta/` (PDF)
  a `tabule/` (fotky tabulí z přednášek)

Když nevíš, kam něco patří, zeptej se — nesluč ty dvě struktury sám.
Videa přednášek patří do `media/` pod názvem, který identifikuje předmět
a téma (`ma1-04-limity`), ne do složky předmětu.

## Co Claude umí přímo, bez nástrojů

- **Obrázky** (`.png`, `.jpg`) — `Read` je zobrazí, čtu je zrakem. Fotky tabulí
  z `tabule/` tedy stačí otevřít, není potřeba žádná konverze ani OCR.
- **PDF** — `Read` s parametrem `pages` (max 20 stran na volání).

## Co vyžaduje nástroj: video a zvuk

Video ani zvuk nepřečtu přímo. Nástroj `tools/bin/media` je převede na to,
co přečíst umím: **snímky (obrázky) + otitulkovaný přepis (text)**.

```bash
tools/bin/media grab "https://youtube.com/watch?v=..."   # YouTube
tools/bin/media grab ~/Downloads/prednaska.mp4 --name la1-04
tools/bin/media help                                      # všechny příkazy
```

`grab` udělá vše naráz a vytvoří `media/<slug>/`:

| soubor | co to je | jak to číst |
|---|---|---|
| `transcript.txt` | přepis s časovými značkami `[HH:MM:SS]` | **první** — je to text, levný a úplný |
| `grid/sheet_*.jpg` | všechny snímky na pár očíslovaných listech | **druhé** — přehled o čem video je |
| `frames/NNN_HH-MM-SS.jpg` | jednotlivé snímky v plném rozlišení | **třetí** — jen ty, které fakt potřebuju |
| `info.json`, `ytdlp.json` | metadata, kapitoly | podle potřeby |

### Pracovní postup u přednášky

1. `media grab <url>` (u dlouhé přednášky `--max 80`)
2. Přečti `transcript.txt` — dá kostru a časy.
3. Otevři `grid/sheet_01.jpg` — z kontaktního listu poznáš témata,
   ale **ne detaily vzorců**; dlaždice jsou očíslované od 0.
4. Detail: `Read media/<slug>/frames/017_00-42-10.jpg` v plném rozlišení,
   nebo `media at <url> 00:42:10` na přesný okamžik.

### Jak se vybírají snímky

`media frames` defaultně nevzorkuje rovnoměrně, ale hledá **změnu obrazu**
(`--scene 0.22`) — u přednášky se střihy to dá jeden snímek na každý nový
stav tabule místo náhodných okamžiků uprostřed psaní.

U videí, kde se obraz mění **plynule** (screencast, statická kamera na
někoho, kdo píše na tabuli), detekce scén nenajde nic. Nástroj to pozná
a sám přepne na rovnoměrné vzorkování — ověřeno na českém videu o limitách,
kde scénová detekce vrátila 0 snímků a fallback dal použitelných 14.

Ruční ladění: `--scene 0.08` (víc snímků), `--every 60` (po minutě),
`--count 30` (pevný počet), `--max N` (strop), `--from/--to` (jen úsek).

### Přepis

- Má-li video titulky (i automatické), použijí se — **je to okamžité a nestahuje
  se video**. Priorita cs → sk → en.
- Jinak běží **lokální Whisper** (`large-v3-turbo`) na Apple GPU přes MLX.
  Nic se neposílá ven. Stahuje se jen audio stopa, ne video.
- České přednášky: `--lang cs` zlepší výsledek.
- Vynutit Whisper i při existujících titulcích: `--force-whisper`
  (auto-titulky na matematiku bývají mizerné).
- Přepis se **necachuje** — opakovaný `grab` přepisuje znovu. Když jen
  potřebuješ dosnímkovat, použij `media frames`, ne `media grab`.

### Když YouTube vrátí 403

Stává se běžně, YouTube blokuje jednotlivé „player clients" a rotuje je.
Nástroj sám zkouší `default → mweb → tv → web_safari → ios` a ten, který
projde, si zapamatuje do `tools/.yt-client`. Když selžou všechny:
`yt-dlp -U`. Tohle je pohyblivý cíl, počítej s občasnou aktualizací.

## Fotky tabulí

**Po každém focení pusť tohle, ještě než se něco commituje:**

```bash
tools/bin/media photos opakovani_stredoskolske_matiky/tabule
```

iPhone fotí 4284x5712; uložené jako PNG má každá fotka ~29 MB a v gitu by
zůstala navždy. `media photos` je převede na JPEG (3200 px na delší hraně,
q=4) — vyjde ~0,5 MB a čte se **stejně**, ověřeno porovnáním výřezů 1:1.
Zvládne i HEIC z telefonu. Originály odsune do `_raw/`, který je mimo git;
smaž je, až JPEGům uvěříš.

Kontaktní list vyrobí rovnou. Pro čtení konkrétní tabule otevři JPEG
(`Read`), ne list — ten je jen na přehled.

## Znalostní graf

`graphify` je nainstalovaný (`~/.local/bin/graphify`, skill `/graphify`).
Výstupy z `media` jsou text a obrázky, tedy přímo použitelný vstup —
`transcript.txt` z více přednášek dává graf pojmů napříč kurzem.

## Konvence

- Do `media/` se sype jen odvozený obsah. Originály videí drž jinde,
  nebo je nech stáhnout do `media/<slug>/source.*`.
- `--name` volím tak, aby to šlo dohledat: `la1-04`, `ma1-limity`, `zs25-uvod`.
- Nová složka = nový předmět. Skripta do `skripta/`, fotky do `tabule/`.
