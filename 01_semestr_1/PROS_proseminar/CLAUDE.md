# Matematický proseminář I — NMTM161 (ZS 2026/27)

> **Tento soubor je pro PROS nadřazený všemu ostatnímu v této složce i kořenovému `CLAUDE.md`.** Když se cokoli rozchází, platí:
> co řekla Moravcová na hodině > web prosemináře > SIS > tento soubor > `_info.md`.

- Seminář: **čt 11:30–13:00, K5, RNDr. Vlasta Moravcová, Ph.D.** (garantka; paralelka primárně pro učitelské studium, ale jsem v ní podle rozvrhu)
- Web: <https://karlin.mff.cuni.cz/~morava/proseminar.html> — kopie [`zdroje/web/morava_proseminar.html`](zdroje/web/morava_proseminar.html) (3. 10. 2026)
- SIS: [`zdroje/sis/predmety.html`](zdroje/sis/predmety.html)
- Charakter (Moravcová na 1. hodině): **nic není povinné** (docházka), **žádná skripta ani čtení dopředu** — hodina se přizpůsobuje tomu, co lidé
  potřebují doučit, takže se plán dopředu dělat nedá. Důraz na řešení úloh, teorie jen shrnutí.

> ⚠️ **K OVĚŘENÍ (Adík):** na hodině zaznělo **„dva testy na úrovni SŠ, 60 % na průchod“**; web a SIS říkají **jeden závěrečný zápočtový test** (≥ 60 %,
> 1 řádný + 2 opravné termíny, ohlášené ≥ 14 dní předem) a navíc **vstupní test** na 1. hodině (orientační, stejná obtížnost jako závěrečný).
> Zeptat se, jestli jsou testy dva ostré, nebo vstupní + závěrečný. Termíny doplnit do `plan.md` a `harmonogram.md`.

## 1. Zápočet

- Zápočtový test (SŠ úroveň, obtížnost ≈ [vzorový vstupní test](zkouska/kurz/PROS_vstupni_test_vzor.pdf)) s úspěšností **≥ 60 %**; 1 řádný + 2 opravné termíny.
- Úspěšnost předmětu v SISu 2020–2025 ≈ 70–74 % — tj. zhruba čtvrtina lidí ho **nedá**; brát vážně, i když je to SŠ látka.
- Úlohy, které se předpokládají při nástupu a na semináři se do detailu neřeší: [`zkouska/kurz/PROS_elementarni_ulohy.pdf`](zkouska/kurz/PROS_elementarni_ulohy.pdf) (+ [výsledky](zkouska/kurz/PROS_elementarni_ulohy_vysledky.pdf)).

## 2. Program a materiály 🎓

Program (web): výroková logika a jazyk matematiky, důkazy (**průběžně celý semestr**) · množiny, relace, zobrazení · funkce včetně goniometrických ·
rovnice a nerovnice · komplexní čísla. Materiály Moravcové „na míru pro proseminář“ (teorie + úlohy s výsledky a postupy), [`cviceni/kurz/`](cviceni/kurz/):

| # | Téma | Soubor | Stran | Kryje se s |
|---|---|---|---|---|
| 1 | Výroky | [PROS_01_vyroky.pdf](cviceni/kurz/PROS_01_vyroky.pdf) | 4 | MA1 1.1, LA1 kap. 1, Rmoutilův průvodce |
| 2 | Důkazy | [PROS_02_dukazy.pdf](cviceni/kurz/PROS_02_dukazy.pdf) | 5 | MA1 1.1 (Halas: obměna, spor, negace s kvantifikátorem) |
| 3 | Množiny | [PROS_03_mnoziny.pdf](cviceni/kurz/PROS_03_mnoziny.pdf) | 3 | MA1 1.2.1 |
| 4 | Relace a zobrazení | [PROS_04_relace.pdf](cviceni/kurz/PROS_04_relace.pdf) | 5 | MA1 1.2.2, LA1 1.5 (sada 02) |
| 5 | Funkce — přehled vlastností a grafů elementárních funkcí | [PROS_05_funkce.pdf](cviceni/kurz/PROS_05_funkce.pdf) | 14 | MA1 kap. 3, průběh funkce |
| 6 | Goniometrie — odvození základních vztahů | [PROS_06_goniometrie.pdf](cviceni/kurz/PROS_06_goniometrie.pdf) | 11 | MA1 6.3 (vzorce nutné znát) |
| 7 | Goniometrické rovnice | [PROS_07_goniometricke_rovnice.pdf](cviceni/kurz/PROS_07_goniometricke_rovnice.pdf) | 2 | MA1 sbírka 01 úvod |
| 8 | Rovnice s parametrem | [PROS_08_rovnice_s_parametrem.pdf](cviceni/kurz/PROS_08_rovnice_s_parametrem.pdf) | 7 | vzorový vstupní test, úloha 1 |
| 9 | Komplexní čísla | [PROS_09_komplexni_cisla.pdf](cviceni/kurz/PROS_09_komplexni_cisla.pdf) | 6 | LA1 kap. 1 (komplexní čísla), MA1 FFT později |

Vzorový vstupní test + [řešení](zkouska/kurz/PROS_vstupni_test_vzor_reseni.pdf): [`zkouska/kurz/`](zkouska/kurz/). Přípravný kurz v [`00_pripravny_kurz/`](../../00_pripravny_kurz/) pokrývá stejná témata.
Doporučená literatura (web): Dlab–Bečvář: Od aritmetiky k abstraktní algebře; Odvárko: Funkce, Goniometrie; Calda: Komplexní čísla; Petáková, Kubát, Hrubý (sbírky k maturitě).

## 3. Jak má Claude v tomto předmětu pracovat

- PROS je **servisní předmět**: stejná látka jako kap. 1 skript MA1 a LA1. Primárně ji učit tam (přesné definice, kvantifikátory), tady procvičovat SŠ techniku
  (goniometrie, rovnice s parametrem, komplexní čísla) — co nejde v MA1/LA1, dohnat z Moravcové materiálů.
- Bez čtení dopředu; **po hodině** zapsat do `cviceni/cvNN.md`, co se dělalo a co nešlo, a dopočítat z odpovídajícího materiálu.
- Příprava na test: nejdřív vzorový vstupní test **na čas bez pomůcek**, pak slabá témata z materiálů 1–9. Claude: nápověda → první chyba → řešení až na vyžádání;
  u důkazů a negací trvat na korektním zápisu (kvantifikátory, obměna, spor).
- `/zkouska PROS` = sada ve stylu vstupního testu (SŠ úlohy, ≈ 60 % hranice).

## 4. Struktura složky

```
PROS_proseminar/
├── CLAUDE.md, _info.md, plan.md (témata + testy, ne týdny)
├── cviceni/   cvNN.md (co se dělalo) · kurz/ (9 materiálů Moravcové) · img/
├── ukoly/     kurz/ (domácí úlohy, pokud budou)
├── zkouska/   pisemky.md · kurz/ (vzorový vstupní test + řešení, elementární úlohy + výsledky) · otazky.md · tahak.md
└── zdroje/    web/ (stránka prosemináře) · sis/ · kurz/ · od_starsich/ · jine/
```
