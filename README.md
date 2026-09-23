# mff

*financni matika survival*

Studijní repo pro bakalářskou **Finanční matematiku na MFF UK** (nástup 2026/27).
Obsahuje všechno ke studiu na jednom místě: zápisky, řešené příklady, fotky
z tabule a sešitu, PDF, staré písemky, materiály od starších ročníků
a přepisy přednášek z videa.

Repo spravuju **spolu s Claudem** (Claude Code). Já nahrávám surové soubory,
Claude je třídí, přepisuje do markdownu, kontroluje moje řešení a připravuje
zkoušecí sady. Pravidla pro Clauda jsou v [`CLAUDE.md`](CLAUDE.md). Tohle
README je pro lidi.

---

## Jak to funguje, v kostce

```
  já                          Claude                         repo
  ──                          ──────                         ────
  fotka / PDF / poznámka ──►  _inbox/  ──► /roztrid ──►  01_semestr_1/LA1_algebra/cviceni/
                                            │              ├── cv03.md      (přepis v LaTeXu)
                                            │              └── img/LA1_cv03_reseni_1.jpg
                                            └──► zmenší fotku, přejmenuje, commit + PR
```

1. **Nahrávám do `_inbox/`**, jak to přijde: fotky z telefonu (i HEIC), PDF, poznámky.
2. **`/roztrid`** v Claude Code: Claude zjistí předmět, typ a týden, fotku zmenší,
   přejmenuje podle konvence, přesune na správné místo a obsah přepíše
   do `.md` s LaTeXem. Co nepozná, dá do `_inbox/_nejasne/` a zeptá se.
3. Změny přijdou jako **commit na vlastní větvi a pull request**. Mergeuju já.

Všechno je v gitu, včetně obrázků. Aby repo nenabobtnalo, každý obrázek se
před commitem zmenší (max. 1600 px, cíl pod 500 KB) a nic nad 50 MB se nenahrává.

---

## Mapa repa

| Složka | Co tam je | Kdy tam sáhnout |
|---|---|---|
| [`_inbox/`](_inbox/) | nové soubory k roztřídění | sem nahrávám |
| [`00_admin/`](00_admin/) | [rozvrh](00_admin/rozvrh.md), [harmonogram](00_admin/harmonogram.md) (zápočty, zkoušky, odevzdání) | „kdy je co“ |
| [`00_pripravny_kurz/`](00_pripravny_kurz/) | zářijové opakování SŠ matiky: skripta, fotky tabulí, přepsané přednášky | základy, proseminář |
| [`01_semestr_1/`](01_semestr_1/) | předměty 1. semestru, začni v [`_prehled.md`](01_semestr_1/_prehled.md) | skoro vždycky |
| [`80_mapa_matematiky/`](80_mapa_matematiky/) | [pojmy](80_mapa_matematiky/pojmy.md) napříč předměty, [souvislosti](80_mapa_matematiky/souvislosti.md) (i k financím), [moje chyby](80_mapa_matematiky/chyby.md) | nadhled, opakování |
| [`90_od_starsich/`](90_od_starsich/) | materiály od třeťačky: originál + [inventura](90_od_starsich/prvak_index.md) | co už někdo zpracoval |
| [`_archiv/`](_archiv/) | co nikam nepatří, ale nemaže se | skoro nikdy |
| [`media/`](media/) | přednášky z videa (přepis + snímky), které nepatří ke konkrétnímu předmětu | |
| [`tools/`](tools/) | nástroj `media`, který z videa udělá přepis a snímky | viz níže |
| [`scripts/`](scripts/) | `optimize_images.py`, zmenšování fotek | před commitem obrázků |
| [`.claude/commands/`](.claude/commands/) | vlastní příkazy pro Claude Code | |

### Jak vypadá předmět

Každý předmět v `01_semestr_1/<ZKR>_<nazev>/` má stejnou strukturu:

```
MA1_analyza/
├── _info.md          ★ vyučující, podmínky zápočtu, styl zkoušky, literatura, co mi nejde
├── prednasky/        p01.md, p02.md … (po týdnech) + img/
├── cviceni/          cv01.md …  Zadání → Moje řešení → Poznámky / chyby + img/
├── ukoly/            du01.md …  domácí úkoly + img/
├── zkouska/          pisemky.md (seznam starých písemek + stav přepisu), otazky.md, tahak.md
│                     + originály písemek (PDF) a img/
└── zdroje/           skripta, sbírky, materiály od starších; sis/ = uložený sylabus ze SISu
```

## Předměty 1. semestru (ZS 2026/27)

| Zkr. | Předmět | Zakončení | Kr | Co už v repu je |
|---|---|---|---|---|
| [LA1](01_semestr_1/LA1_algebra/_info.md) | Lineární algebra 1 | Z+Zk | 10 | zadání cvičení, 4 zápočtové písemky + zkouška 2020/21 |
| [MA1](01_semestr_1/MA1_analyza/_info.md) | Matematická analýza 1 | Z+Zk | 8 | skripta Rmoutil, požadavky ke zkoušce, řešené zápočtové testy, sbírky |
| [UCE](01_semestr_1/UCE_ucetnictvi/_info.md) | Účetnictví | Z+Zk | 5 | kapitoly přednášky, zadání 11 cvičení, fotky zápočtových testů |
| [PRG1](01_semestr_1/PRG1_programovani/_info.md) | Programování 1 (Python) | Z | 3 | sylabus |
| [PROS](01_semestr_1/PROS_proseminar/_info.md) | Matematický proseminář I | Z | 2 | sylabus; souvisí s přípravným kurzem |
| [RIZ](01_semestr_1/RIZ_financni_rizika/_info.md) | Prakt. aspekty měření a řízení fin. rizik | Zk | 3 | sylabus |

Aktuální stav (co mám splněné) je v [`01_semestr_1/_prehled.md`](01_semestr_1/_prehled.md).

---

## Příkazy v Claude Code

| Příkaz | Co udělá |
|---|---|
| `/roztrid` | zpracuje všechno v `_inbox/` (zmenšení, zařazení, přepis, commit) |
| `/kontrola <soubor>` | najde **první** chybu v mém řešení a nechá mě pokračovat |
| `/zkouska <ZKR>` | nová zkoušecí sada ve stylu starých písemek, řešení odděleně |
| `/uklid` | audit repa: duplicity, špatné názvy, nezmenšené obrázky, rozbité odkazy |
| `/novy-predmet <název>` | založí předmět se vším, co k němu patří |

## Konvence

- **Názvy:** malá písmena, bez diakritiky, podtržítka, zkratka předmětu na začátku:
  `LA1_cv03_reseni_1.jpg`, `MA1_zk_2025-01_pisemka.pdf`, `UCE_zt2_varianta_b_1.jpg`.
- **Data** `YYYY-MM-DD`, **týdny** `p01`/`cv01`/`du01`, **zápočtové testy** `zt1`/`zt2`, **zkouška** `zk`.
- **Matematika** v LaTeXu (`$...$`, `$$...$$`), vykresluje se přímo na GitHubu.
- **Obrázky** vedle textu ve složce `img/`, odkazované relativně.

## Nástroje

### Zmenšování obrázků

```bash
uv run scripts/optimize_images.py _inbox/          # uv si závislosti stáhne samo
# nebo: pip install -r requirements.txt && python3 scripts/optimize_images.py _inbox/
```

Převede HEIC, PNG a JPEG na JPEG (max. 1600 px, q80), otočí ho podle EXIF a EXIF
odstraní (i polohu z telefonu). Screenshoty a diagramy nechá jako PNG. Originály
odloží do `_raw/`, která je mimo git. Fotka z iPhonu má 10–30 MB, po zmenšení 150–250 KB.

### Video a zvuk: `tools/bin/media`

Převádí přednášky (YouTube i lokální soubory) na formát, se kterým umí
pracovat jazykový model: **časovaný přepis + vybrané snímky + kontaktní listy**.

```bash
tools/bin/media grab "https://youtube.com/watch?v=..." --name ma1-04-limity --lang cs
tools/bin/media photos 00_pripravny_kurz/tabule    # fotky tabulí (3200 px)
tools/bin/media help
```

- **Přepis** vezme z titulků videa, pokud existují. Jinak ho udělá lokálně
  přes MLX Whisper na Apple GPU a nic se neposílá do cloudu. Zvuk se nejdřív
  normalizuje, jinak Whisper na tichém záznamu z posluchárny většinu řeči vynechá.
- **Snímky** vybírá podle změny obrazu, tedy jeden na každý nový stav tabule.
  U plynulých videí automaticky přepne na rovnoměrné vzorkování.
- **Odolnost vůči YouTube:** když některý player client vrátí 403, zkusí další.
  Pohlídá i to, aby nestáhl jen 360p, na kterém se rukopis nedá přečíst.

Požadavky: macOS na Apple Silicon, `yt-dlp`, Python 3.12, `uv`.
Instalace a všechny detaily jsou v [`tools/README.md`](tools/README.md).

---

## Poznámka k obsahu

Skripta, písemky, sylaby a záznamy přednášek jsou dílem svých autorů (MFF UK)
a jsou tu jen pro osobní studijní potřebu. Kód v `tools/` a `scripts/` je
moje vlastní práce.
