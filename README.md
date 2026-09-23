# mff

*financni matika survival*

Studijní materiály a nástroje pro bakalářské studium Finanční matematiky
na MFF UK.

## `tools/` — čtení videa a zvuku

Sada skriptů, která převádí přednášky (YouTube i lokální soubory) na formáty,
se kterými umí pracovat jazykový model: **vzorkované snímky + časovaný přepis**.

```bash
tools/bin/media grab "https://youtube.com/watch?v=..."
tools/bin/media grab prednaska.mp4 --name ma1-04 --lang cs
tools/bin/media help
```

Co to umí:

- **Přepis** z publikovaných titulků (okamžitý, nestahuje video), jinak lokálně
  přes MLX Whisper na Apple GPU — nic se neposílá do cloudu.
- **Výběr snímků** detekcí změny scény, tedy jeden snímek na každý nový stav
  tabule místo náhodných okamžiků. U videí s plynulou změnou (screencasty)
  automaticky přepne na rovnoměrné vzorkování.
- **Kontaktní listy** — všechny snímky na několika očíslovaných listech,
  takže se dá dvouhodinová přednáška přehlédnout naráz.
- **Odolnost vůči YouTube** — rotuje player clienty, když některý vrátí 403,
  a funkční si zapamatuje.

Požadavky: macOS na Apple Silicon, `yt-dlp`, Python 3.12.
Instalace prostředí je v [`tools/README.md`](tools/README.md).

## Struktura

| složka | obsah |
|---|---|
| `tools/` | nástroje výše |
| `opakovani_stredoskolske_matiky/` | přípravný kurz — skripta, fotky tabulí, vytěžené přednášky |
| `semestr_1/`, `prvák/` | materiály k předmětům |
| `media/` | vytěžený obsah videí mimo konkrétní předmět |

[`CLAUDE.md`](CLAUDE.md) popisuje, jak se v repozitáři orientovat.

## Poznámka k obsahu

Skripta a záznamy přednášek jsou dílem svých autorů (MFF UK) a jsou zde pouze
pro osobní studijní potřebu. Kód v `tools/` je moje vlastní práce.
