# CLAUDE.md – studijní repo MFF

## Kdo jsem a co tu děláme

- Adík, 1. ročník Bc., **finanční matematika na MFF UK**, zimní semestr 2026/27.
- Jsem programátor, takže Python (sympy, numpy) na ověřování výpočtů je vítaný.
- Tohle repo je můj kompletní studijní systém: zápisky, řešení, fotky, PDF, materiály od starších, vytěžené přednášky. Slouží mně i tobě jako kontext.
- Tvoje role: studijní parťák. Řešíme spolu příklady a cvičení, kontroluješ moje postupy, pomáháš s přípravou na zápočty a zkoušky a držíš nadhled nad celou matematikou (co s čím souvisí napříč předměty).

## Jak se mnou pracovat

- Piš neformální češtinou, stručně a k věci.
- U příkladů mě **veď**: nejdřív nápověda nebo otázka, celé řešení až když o něj požádám nebo se zaseknu. Když řeknu „ukaž řešení“, ukaž ho celé.
- Při kontrole mého řešení najdi **první chybu**, vysvětli proč je to chyba a nech mě pokračovat.
- Když narazíme na pojem nebo větu, která se objevuje i jinde (jiný předmět, finance), zmiň to a zapiš do `80_mapa_matematiky/`.
- Opakované chyby zapisuj do `80_mapa_matematiky/chyby.md`.
- Neodhaduj, co bude na zkoušce. Drž se `_info.md`, starých písemek a toho, co řekl vyučující.
- **Programování 1 (PRG1):** zápočet vyžaduje vlastní kód bez generování. Vysvětluj a kontroluj, kód za mě nepiš.

## Architektura: všechno v gitu

Všechno žije v tomhle repu, včetně fotek a PDF. Aby repo nenabobtnalo, platí:

1. **Obrázky vždy zmenšené.** Před commitem každý obrázek projde `uv run scripts/optimize_images.py <soubor|složka>` (max. 1600 px na delší straně, JPEG q80, HEIC → JPEG, EXIF pryč). Cíl: pod 500 KB na fotku. Originály skončí v `_raw/` (v `.gitignore`).
   **Výjimka: fotky tabulí z přednášek** → `tools/bin/media photos <složka>` (3200 px). Písmo na tabuli z lavice je drobné, 1600 px na něj nestačí vždy.
2. **Žádný soubor nad 50 MB.** Velké PDF nejdřív zkus zmenšit; když to nejde, nedávej ho do repa a zeptej se mě.
3. **Volně dostupná skripta a slidy** stačí odkázat v `_info.md`, nemusí být v repu.
4. **Obrázky leží vedle textu, ke kterému patří**, ve složce `img/` (např. `cviceni/img/`), a odkazují se relativně: `![moje řešení](img/LA1_cv03_reseni_1.jpg)`.

## Tvoje pravomoci v repu

Strukturu repa spravuješ **ty**. Já jen nahrávám soubory do `_inbox/`.

Bez ptaní smíš:
- zakládat složky a podsložky,
- přejmenovávat a přesouvat soubory (`git mv`, ať zůstane historie),
- zmenšovat a převádět obrázky,
- kopírovat materiály z `90_od_starsich/prvak_original/` do předmětů,
- měnit strukturu, když to dává smysl (nový předmět, nové téma, rozdělení přeplněné složky).

Pevné hranice:
- **`90_od_starsich/prvak_original/` nech nedotčený.** Z něj se jen kopíruje.
- **Mazat smíš jen jasné duplicity**, vždy v samostatném commitu se zprávou, co a proč. Nejasné věci přesuň do `_archiv/`.
- **Větší přestavbu struktury** (víc než jeden předmět naráz) mi nejdřív navrhni a počkej na OK.
- **Každý commit popisuj česky a konkrétně**, co se kam přesunulo (`inbox: 4 fotky → LA1/cviceni, 1 PDF → MA1/zdroje`). Git historie je záznam změn.
- Pracuješ na vlastní větvi (v cloudu větev session, lokálně ji založ). Na konci práce vytvoř **pull request** se souhrnem změn, mergovat budu já.

## Struktura repa

```
Mff/
├── CLAUDE.md, README.md, .gitignore
├── requirements.txt           pillow, pillow-heif
├── scripts/optimize_images.py zmenšení a převod obrázků
├── tools/                     čtení videa a zvuku (bin/media) — viz tools/README.md
├── media/<slug>/              vytěžené přednášky mimo konkrétní předmět
├── .claude/commands/          /roztrid /uklid /kontrola /zkouska /novy-predmet
├── _inbox/                    sem jen nahrávám, ty to roztřídíš
│   └── _nejasne/              co neumíš zařadit, čeká na můj dotaz
├── _archiv/                   věci, které nikam nepatří, ale nechci je mazat
├── 00_admin/                  rozvrh.md, harmonogram.md (termíny, zápočty, zkouškové)
├── 00_pripravny_kurz/         zářijové opakování SŠ matiky: skripta/, tabule/, videa/
├── 01_semestr_1/
│   ├── _prehled.md            předměty, podmínky, stav, kredity
│   └── <ZKR>_<nazev>/         LA1_algebra, MA1_analyza, UCE_ucetnictvi,
│       │                      PRG1_programovani, PROS_proseminar, RIZ_financni_rizika
│       ├── _info.md           vyučující, požadavky, literatura, styl písemek
│       ├── prednasky/         p01.md …  + img/
│       ├── cviceni/           cv01.md …  + img/
│       ├── ukoly/             du01.md …  + img/
│       ├── zkouska/           pisemky.md, otazky.md, tahak.md + img/ a originály písemek
│       └── zdroje/            PDF, skripta, materiály od starších; sis/ = uložený sylabus
├── 80_mapa_matematiky/        pojmy.md, souvislosti.md, chyby.md
└── 90_od_starsich/
    ├── prvak_index.md         inventura: co tam je, kam patří, co už je zpracované
    └── prvak_original/        nedotčený originál od třeťačky
```

## Video a zvuk

Video ani zvuk nepřečteš přímo. `tools/bin/media grab <url|soubor> --name <slug>` z něj udělá
`transcript.txt` + snímky + kontaktní listy. Čti v pořadí přepis → `grid/sheet_*.jpg` → konkrétní `frames/`.
Přednášky k předmětu ukládej do `media/<zkr>-<tema>` (`ma1-04-limity`), ne do složky předmětu.
Detaily (Whisper, normalizace zvuku, YouTube 403, fotky tabulí): [`tools/README.md`](tools/README.md).

## Konvence

- Názvy: malá písmena, bez diakritiky, podtržítka. Zkratka předmětu na začátku u obrázků a PDF: `LA1_cv03_reseni_1.jpg`, `MA1_zk_2025-01_pisemka.pdf`.
- Data: `YYYY-MM-DD`. Týdny: `p01`, `cv01`, `du01`. Zápočtové testy: `zt1`, `zt2`; zkouška: `zk`.
- Matematika v markdownu přes LaTeX: inline `$...$`, bloky `$$...$$`. Musí se to vykreslit na GitHubu.
- Každý soubor s cvičením má strukturu: **Zadání** → **Moje řešení** → **Poznámky / chyby** → obrázky.
- `_info.md` a `_prehled.md` udržuj aktuální, jsou to nejcennější kontextové soubory.
- Uložené stránky (SIS, weby vyučujících) mají vedle sebe složku `*_files/` — přesouvej je vždy spolu.

## Běžné workflow

- **Třídění `_inbox/`** (`/roztrid`): u každého souboru zjisti, co to je (předmět, typ, týden). Obrázky zmenši skriptem, přejmenuj podle konvence a přesuň do správné složky (chybějící založ). Obsah přepiš do odpovídajícího `.md` (LaTeX) a vlož odkaz na obrázek. Co nejde jednoznačně zařadit, dej do `_inbox/_nejasne/` a zeptej se. Na konci mi dej krátký souhrn, co kam šlo.
- **Kontrola řešení** (`/kontrola <soubor>`): přečti zadání a moje řešení (text nebo obrázek), najdi první chybu, zapiš poznámku do souboru cvičení.
- **Příprava na zkoušku** (`/zkouska <ZKR>`): vycházej z `zkouska/` a `_info.md`, udělej mi zkoušecí sadu podobnou starým písemkám.
- **Konec práce:** commit s konkrétní českou zprávou, pull request se souhrnem.

---

## PRVNÍ SPUŠTĚNÍ (bootstrap) — zbývající kroky

> Hotovo 2026-09-23: předměty, struktura, začlenění `semestr_1/` + `prvák/` + přípravného kurzu,
> skript na obrázky (otestovaný na generovaných obrázcích a fotce tabule), inventura od třeťačky, příkazy.
> Až budou hotové i kroky níže, smaž celou tuhle sekci a commitni.

### 4. Test s mojí fotkou
- Požádej mě, ať nahraju jednu fotku ručně psaného příkladu do `_inbox/`.
- Zpracuj ji celým workflow: zmenšení, přejmenování, přesun, přepis do markdownu s LaTeXem.
- Napiš mi na rovinu, jak spolehlivý je přepis a jestli je fotka po zmenšení pořád dobře čitelná. Když ne, uprav parametry skriptu.
- Ověř přitom, že se HEIC z iPhonu správně otočí (na syntetickém HEIC se to ověřit nedalo).

### 7. Volitelně: automatické třídění
- Zeptej se mě, jestli chci, aby se `_inbox/` třídil automaticky (routine v Claude Code, např. každý večer spustí `/roztrid` a otevře PR). Pokud ano, řekni mi přesně, jak ji nastavit.
