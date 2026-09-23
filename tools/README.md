# tools/

Nástroje, kterými Claude čte video a zvuk. Vše běží **lokálně**, nic se
neposílá do cizí služby (kromě stahování z YouTube, když o to požádáš).

## Co tu je

```
bin/media           hlavní CLI — jediné, co normálně potřebuješ
bin/ffmpeg          ffmpeg 7.0, darwin-arm64 (z balíčku static-ffmpeg)
bin/ffprobe         ffprobe — systémový ffmpeg z imageio ho neobsahuje
bin/subs2txt.py     VTT/SRT → čistý přepis (deduplikuje rolující auto-titulky)
bin/transcribe.py   MLX Whisper → transcript.txt + transcript.json
bin/ytinfo.py       yt-dlp metadata → čitelný souhrn
bin/probe.py        ffprobe JSON → čitelný souhrn
bin/thin.py         proředí snímky na rovnoměrný výběr
.venv/              python 3.12: mlx-whisper, static-ffmpeg
```

Externí závislosti mimo tuhle složku: `yt-dlp` (`~/.local/bin/yt-dlp`).

## Instalace / obnova

```bash
cd tools
uv venv --python 3.12 .venv
uv pip install --python .venv/bin/python mlx-whisper static-ffmpeg
.venv/bin/python -c "import static_ffmpeg.run as r; print(r.get_or_fetch_platform_executables_else_raise())"
# výstup ukáže cesty; nalinkuj je:
B=$PWD/.venv/lib/python3.12/site-packages/static_ffmpeg/bin/darwin_arm64
ln -sf $B/ffmpeg bin/ffmpeg && ln -sf $B/ffprobe bin/ffprobe
```

Whisper model (`large-v3-turbo`, ~1,6 GB) se stáhne z Hugging Face při prvním
použití do `~/.cache/huggingface` a pak už je lokální.

## Pracovní postup (dřív v CLAUDE.md)

Video ani zvuk Claude nepřečte přímo. `media` je převede na to, co přečíst
umí: **snímky (obrázky) + časovaný přepis (text)**.

```bash
tools/bin/media grab "https://youtube.com/watch?v=..."   # YouTube
tools/bin/media grab ~/Downloads/prednaska.mp4 --name la1-04
tools/bin/media help                                      # všechny příkazy
```

`grab` udělá vše naráz a vytvoří `media/<slug>/` (nebo `$MEDIA_DIR/<slug>/`):

| soubor | co to je | jak to číst |
|---|---|---|
| `transcript.txt` | přepis s časovými značkami `[HH:MM:SS]` | **první** — text, levný a úplný |
| `grid/sheet_*.jpg` | všechny snímky na pár očíslovaných listech | **druhé** — přehled |
| `frames/NNN_HH-MM-SS.jpg` | jednotlivé snímky v plném rozlišení | **třetí** — jen ty potřebné |
| `info.json`, `ytdlp.json` | metadata, kapitoly | podle potřeby |

1. `media grab <url>` (u dlouhé přednášky `--max 80`)
2. Přečti `transcript.txt` — kostra a časy.
3. Otevři `grid/sheet_01.jpg` — témata, **ne detaily vzorců**; dlaždice jsou číslované od 0.
4. Detail: `frames/017_00-42-10.jpg` v plném rozlišení, nebo `media at <url> 00:42:10`.

Názvy (`--name`) volit dohledatelně: `la1-04`, `ma1-limity`, `zs25-uvod`.

### Výběr snímků

Defaultně podle **změny obrazu** (`--scene 0.22`) — jeden snímek na nový stav
tabule. U plynulých videí (screencast, statická kamera) scénová detekce nic
nenajde; nástroj to pozná a přepne na rovnoměrné vzorkování (ověřeno: 0 → 14
použitelných snímků). Ruční ladění: `--scene 0.08`, `--every 60`, `--count 30`,
`--max N`, `--from/--to`.

### Přepis

- Má-li video titulky (i automatické), použijí se — okamžité, nestahuje se video. Priorita cs → sk → en.
- Jinak **lokální Whisper** (`large-v3-turbo`) přes MLX na Apple GPU. Stahuje se jen audio.
- České přednášky: `--lang cs`. Vynutit Whisper i přes titulky: `--force-whisper`
  (auto-titulky na matematiku bývají mizerné).
- **Zvuk se normalizuje** (`loudnorm`, −16 LUFS). Záznamy z posluchárny mají kolem −40 dB
  a Whisper na nich většinu řeči vůbec nepřepíše (65 segmentů místo 35). Nevypínat.
- `condition_on_previous_text` je vypnuté: jinak jeden špatný segment spustí smyčku
  (59× „Titulky vytvořil JohnyX.").
- Halucinace v tichu mají `no_speech_prob = 0.0`; `transcribe.py` je zahazuje podle
  seznamu frází a hlavička přepisu říká kolik.
- Přepis se **necachuje** — když jen chybí snímky, použij `media frames`, ne `grab`.

### YouTube 403

YouTube blokuje jednotlivé „player clients" a rotuje je. Nástroj zkouší
`web_embedded → default → mweb → tv → web_safari → ios` a funkční si pamatuje
v `tools/.yt-client`. `web_embedded` je první schválně: `mweb`/`android` stáhnou
jen 360p a rukopis na tabuli pak nejde přečíst (nástroj pod 500p varuje).
Když selžou všechny: `yt-dlp -U`.

### Fotky tabulí

```bash
tools/bin/media photos 00_pripravny_kurz/tabule
```

iPhone fotí 4284×5712, jako PNG ~29 MB. `media photos` dělá JPEG 3200 px, q=4
(~0,5 MB), čte se **stejně** — ověřeno porovnáním výřezů 1:1. Zvládne HEIC,
originály odsune do `_raw/` (mimo git). Kontaktní list vyrobí rovnou.

Pro fotky sešitu a běžné obrázky je `scripts/optimize_images.py` (1600 px) —
tabule z dálky mají drobné písmo, proto pro ně zůstává 3200 px.

## Proč ne hotový MCP server

Zvažoval jsem `OAMaestro/video-vision-mcp`. Kód je čistý (žádná telemetrie,
žádné `postinstall`, síť jen na github kvůli yt-dlp), ale:

- 5 hvězd, 2 přispěvatelé, poslední commit květen 2026 — prakticky nikým
  neprověřený kód, který by běžel jako trvalý proces s přístupem k disku;
- táhne ~250 npm balíčků včetně `onnxruntime` a `sharp` kvůli přepisu, který
  na M4 zvládne MLX Whisper rychleji a s menší instalací;
- `ffmpeg` a `yt-dlp` už na tomhle stroji byly.

Zbylo by z něj tedy volání `ffmpeg` a `yt-dlp` zabalené do serveru.
Tyhle skripty dělají totéž — a navíc scénovou detekci a kontaktní listy,
které to repo nemá — přímo přes Bash, bez procesu na pozadí a bez
závislostního stromu, který nikdo neaudituje.

Kdyby se to někdy hodilo jako MCP server (jiný klient, vzdálený přístup),
je `bin/media` tenký wrapper — obalit ho MCP vrstvou je práce na chvíli.
