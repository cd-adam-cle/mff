# Přípravný kurz MFF — videozáznamy přednášek

Vytěženo nástrojem `tools/bin/media`. Každá složka = jedna přednáška.
V každé: `transcript.txt` (časovaný přepis), `grid/sheet_*.jpg` (kontaktní
listy) a `frames/NNN_HH-MM-SS.jpg` (snímky v plném rozlišení).

| # | složka | přednáška | délka | YouTube ID | související materiál |
|---|---|---|---|---|---|
| 1 | `rovnice-a-nerovnice`   | D. Šmíd: Rovnice a nerovnice v reálném oboru | 1:50:38 | `OlG8aC2YAKg` | `../skripta/MS-Cviceni.pdf`, `MS-Reseni.pdf` |
| 2 | `posloupnosti-dukazy`   | D. Šmíd: Posloupnosti, důkazy                | 1:49:39 | `KEOaBi5-Ya0` | `../skripta/MS-Posloupnosti_cviceni.pdf`, `MS-Dukazy_cviceni.pdf` |
| 3 | `kombinatorika`         | A. Slavík: Kombinatorika                     | 1:42:19 | `loMxebgwggo` | — |
| 4 | `komplexni-cisla`       | Z. Šír: Komplexní čísla                      | 1:53:24 | `TJ9zxGsBMA0` | `../skripta/Ulohy1617_cplx.pdf` |
| 5 | `trigonometrie`         | Z. Šír: Trigonometrie                        | 1:50:49 | `-zX8GjpZ16o` | `../skripta/ulohy_trigonometrie.pdf` |
| 6 | `analyticka-geometrie`  | Z. Šír: Analytická geometrie                 | 1:58:09 | `z9f31uQaIg8` | `../skripta/ulohy_analytika.pdf` |

Nezařazená skripta: `uvodni-kurz.pdf`, `Ulohy1617_elem_fce.pdf` (elementární
funkce — k tomu video v této sadě není).

Fotky tabulí z těchto přednášek jsou v `../tabule/`.

Zdrojová videa se po zpracování mažou (zabírala by ~10 GB). URL zůstává
v `.source-url`, takže se dají kdykoli stáhnout znovu:

```bash
MEDIA_DIR=.../opakovani_stredoskolske_matiky/videa tools/bin/media grab "$(cat <slozka>/.source-url)" --name <slozka>
```
