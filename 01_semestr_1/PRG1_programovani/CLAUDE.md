# Programování 1 — NMIN111 (ZS 2026/27)

> **Tento soubor je pro PRG1 nadřazený všemu ostatnímu v této složce i kořenovému `CLAUDE.md`.** Když se cokoli rozchází, platí:
> pokyny cvičícího (Šejnoha, až budou) > SIS > Marešův web kurzu > Průvodce labyrintem algoritmů > tento soubor > `_info.md`.
> Zatím je krátký — většinu pravidel a materiálů dá cvičící na 2. cvičení (čt 8. 10.). Potom doplnit a blok ⚠️ smazat.

- Cvičení (jen cvičení, přednáška není): **čt 15:40–17:10, N11 (Karlín), Mgr. Jiří Šejnoha**. Garant doc. Pavel Töpfer (KSVI).
- Jazyk: **Python 3** (≥ 3.9). Zaměření cvičení: základy Pythonu + **teorie algoritmů** podle knihy
  M. Mareš, T. Valla: **Průvodce labyrintem algoritmů** (2. vyd. 2022, CC BY-ND) —
  [`zdroje/kurz/PRG1_pruvodce_labyrintem_algoritmu_2022.pdf`](zdroje/kurz/PRG1_pruvodce_labyrintem_algoritmu_2022.pdf), <https://pruvodce.ucw.cz/>.
- Web kurzu ze SISu: Martin Mareš, *Programování 1 pro matematiky* <http://mj.ucw.cz/vyuka/p1m/> — přesměrovává na ročník **2024/25**
  (jeho úterní cvičení). Letošní stránku Mareš pro NMIN111 nemá; Šejnohův web zatím neznám. Marešova stránka slouží jako
  **referenční sled témat a výklady** (kopie [`zdroje/web/mares_p1m_2425.html`](zdroje/web/mares_p1m_2425.html), výklady v [`zdroje/kurz/`](zdroje/kurz/)).
- SIS: [`zdroje/sis/predmet.html`](zdroje/sis/predmet.html) (podmínky zakončení upravil Töpfer 30. 7. 2026).

> ⚠️ **K DOPLNĚNÍ po 2. cvičení (8. 10.):** web/materiály Šejnohy, systém odevzdávání (ReCodEx? skupina), bodování DÚ a termíny,
> kolik testů a kdy, jestli se počítá účast, jak přesně využívá Průvodce (které kapitoly), pravidla pro AI nad rámec SISu.

## 1. Zápočet (SIS 2026)

- Zápočet = prokázání schopnosti **samostatně navrhovat, implementovat a upravovat** programy. Samostatný návrh = **vlastní tvorba
  algoritmu a programu bez nástrojů na automatické generování kódu.**
- **≥ 70 % bodů z průběžných domácích úkolů** zadávaných cvičícím (na cvičení nebo doma, v termínech). Cvičící může stanovit, jak nahradit chybějící body.
- **Úspěšné písemné testy na cvičení** (prezenčně); každý lze **1× opravit**.
- Mareš 2024/25 (orientačně, Šejnoha může mít jinak): DÚ do **ReCodExu** (<https://recodex.mff.cuni.cz>, automatické testy, cvičící body koriguje —
  odměna za elegantní řešení, penalizace za nefunkční, které náhodou prošlo), úkoly za ≥ 100 b, potřeba ≥ 70 b.

## 2. Plán a materiály

Týdenní plán s odhadem témat (Marešův sled 2024/25) a čtením Průvodce: [`plan.md`](plan.md). Log DÚ a testů: [`ukoly/ukoly.md`](ukoly/ukoly.md).

Marešův sled témat (12 výkladů, 🎓 v `zdroje/kurz/`): úvod do Pythonu → podmínky a cykly → seznamy → třídění a vyhledávání → funkce →
řezy a řetězce → list comprehensions → množiny a slovníky → třídy a objekty → triky s funkcemi (lambda, redukce, generátory) → soubory a výjimky → standardní knihovna.
Ukázkové programy: <https://gitlab.kam.mff.cuni.cz/mj/prm1>. Průvodce po kapitolách s tím, co se hodí kdy: [`zdroje/pruvodce_obsah.md`](zdroje/pruvodce_obsah.md).

## 3. Co už umím (kontext pro Clauda)

- **Maturita z programování (C#, 2026)** — repo `cd-adam-cle/maturita_programovani`, 25 vypracovaných otázek: datové typy, spojové struktury, pole,
  fronta a zásobník, algoritmus a jeho vlastnosti, rekurze, textové soubory, časová a paměťová složitost, reprezentace grafu, stromy a průchody,
  insert/select/bubble/merge/quick/heap sort, lineární a binární vyhledávání, BVS, rozděl a panuj, dynamické programování, backtracking,
  aritmetické výrazy, OOP a dědičnost, Python vs C#, událostmi řízené programování, teorie grafů, BFS/DFS, minimální kostra, topologické třídění, nejkratší cesty.
- Seminární projekty v C# (`cd-adam-cle/ProgSemAdamZikmund`: backtracking, minimax, práce s textovými soubory, hry), weby (PHP, TypeScript/Next.js).
- Dlouhodobě: zůstat u programování, zapsat si **Programování 2** (NMIN112, LS; LA1 to doporučuje kvůli algoritmickému uvažování),
  směřovat k **algoritmickému obchodování a quant věcem** (Python: numpy, pandas, později simulace, optimalizace, časové řady).

Důsledek: syntaxe Pythonu je pro mě **překlad z C#**, ne nová látka; hodnota kurzu je v **algoritmickém myšlení, složitosti a čistém návrhu**
(Průvodce) a v pythonovských idiomech (řezy, comprehensions, slovníky, generátory, výjimky).

## 4. Jak má Claude v tomto předmětu pracovat

- **Kód za mě nepíše.** Platí pro DÚ, testy i úlohy ze cvičení: žádné řešení, žádná kostra řešení, žádné „ukázkové“ řešení stejné úlohy.
  Zápočet stojí na vlastním návrhu bez generování kódu a já to chci umět bez našeptávače (testy jsou na papír/bez pomůcek).
- Co Claude **dělá**: vysvětlí zadání a pojmy; přeloží moji C# znalost do Pythonu („v C# bys udělal X, tady je idiom Y“); u **mého** kódu
  najde **první chybu** a vysvětlí proč (ne opraví); navrhne, jaké testovací vstupy zkusit; po odevzdání udělá review (čitelnost, složitost,
  idiomy, hraniční případy); vysvětlí standardní knihovnu a dokumentaci.
- **Teorie algoritmů (Průvodce):** tady se může jít naplno — rozbor složitosti, invarianty cyklů, důkazy správnosti, cvičení z knihy
  (nejsou zápočtové). Pořád nejdřív nápověda, pak řešení na vyžádání. Složitost vždy zdůvodnit, ne jen tvrdit.
- **Před cvičením**: přečíst Marešův výklad k tématu a kapitolu Průvodce podle `plan.md`; úlohy z Marešova webu k tématu si zkusit sám.
- **Zápis**: `cviceni/cvNN.md` (co se dělalo, co nešlo, idiomy), `ukoly/duNN/` (zadání `.md` + můj `.py` + poznámky). Vlastní kód do repa patří.
- Pravidla pro AI z SISu: generování kódu = porušení podmínek zápočtu. Doporučení UK: <https://www.ai.cuni.cz/AI-81.html>.
- Souvislosti: složitost a rekurze ↔ MA1 (posloupnosti, odhady růstu), matice a vektory ↔ LA1, řady a simulace ↔ finance → `80_mapa_matematiky/`.

## 5. Struktura složky

```
PRG1_programovani/
├── CLAUDE.md, _info.md, plan.md
├── cviceni/   cvNN.md + kurz/ (materiály cvičícího) + img/
├── ukoly/     ukoly.md (log DÚ, body, testy) · duNN/ (zadání + můj kód) · kurz/ (zadání od cvičícího)
├── zkouska/   pisemky.md (testy na cvičení), otazky.md, tahak.md + kurz/
└── zdroje/    kurz/ (Marešovy výklady 01–12, Průvodce) · pruvodce_obsah.md · web/ (Marešova stránka) · sis/ · od_starsich/ · jine/
```
