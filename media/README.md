# media/

Odvozený obsah z videí. Jedna složka na zdroj, název = `--name` (nebo slug
z názvu videa).

```
media/<slug>/
├── transcript.txt    přepis s časy [HH:MM:SS]   ← číst první
├── transcript.json   Whisper segmenty (jen u lokálního přepisu)
├── grid/sheet_*.jpg  očíslované kontaktní listy ← skenovat druhé
├── frames/           NNN_HH-MM-SS.jpg, plné rozlišení
├── frames-at/        snímky z `media at`
├── subs.*.vtt        stažené titulky, pokud existovaly
├── source.* / audio-src.*   staženo z YouTube (smazatelné)
└── ytdlp.json / info.json   metadata, kapitoly
```

Vyrábí `tools/bin/media`. Smazat složku je bezpečné — jde znovu vytěžit
z `.source-url`. Stažená videa (`source.*`) zabírají nejvíc; když dojde
místo, jdou smazat a přepis se snímky zůstane.
