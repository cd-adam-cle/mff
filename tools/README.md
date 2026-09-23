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
