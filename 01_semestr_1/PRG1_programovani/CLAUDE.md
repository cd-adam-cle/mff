# Programování 1 — NMIN111 (ZS 2026/27)

> **Tento soubor je pro PRG1 nadřazený všemu ostatnímu v této složce i kořenovému `CLAUDE.md`.** Když se cokoli rozchází, platí:
> web cvičení Šejnohy > SIS > Marešův web kurzu > Průvodce labyrintem algoritmů > tento soubor > `_info.md`.

- Cvičení (jen cvičení, přednáška není): **čt 15:40–17:10, N11, Mgr. Jiří Šejnoha** (druhá paralelka čt 14:00). Garant doc. Pavel Töpfer (KSVI).
- **Web cvičení (zdroj pravdy pro zápočet, program a materiály):** <https://kam.mff.cuni.cz/~aston/prg1m/prg1m_ct.html>
  (rozcestník <https://kam.mff.cuni.cz/~aston/>) — kopie [`zdroje/web/sejnoha_prg1m_ct_2026-10-04.html`](zdroje/web/sejnoha_prg1m_ct_2026-10-04.html).
  Kontrolovat **každý čtvrtek večer**: přibývá řádek „týden – datum – Přednáška + Notes“ s materiálem k hodině a poznámkami.
- Kontakt: jiri.sejnoha@mff.cuni.cz (jen školní e-mail). Konzultace po domluvě, nejlépe před/po cvičení; dotazy ideálně přímo na cvičení.
- Jazyk: **Python 3** (Šejnoha doporučuje aktuální 3.14, VS Code + Python + Pylance; Mareš IDLE). Odevzdávání: **ReCodEx** <https://recodex.mff.cuni.cz/>.
- Teorie algoritmů podle M. Mareš, T. Valla: **Průvodce labyrintem algoritmů** — [`zdroje/kurz/PRG1_pruvodce_labyrintem_algoritmu_2022.pdf`](zdroje/kurz/PRG1_pruvodce_labyrintem_algoritmu_2022.pdf),
  <https://pruvodce.ucw.cz/> (Šejnoha z něj bral příklad Hvězdičky už na 1. hodině).
- Referenční sled témat a výklady: Martin Mareš, *Programování 1 pro matematiky* 2024/25 (web ze SISu, [`zdroje/web/mares_p1m_2425.html`](zdroje/web/mares_p1m_2425.html), výklady v `zdroje/kurz/`).
- SIS: [`zdroje/sis/predmet.html`](zdroje/sis/predmet.html).

> ⚠️ **K DOPLNĚNÍ po 2. cvičení (8. 10.):** Šejnoha podmínky probere podrobně a odpoví na dotazy — ověřit: kdy jde první DÚ, kolik je testů a kdy,
> jak se počítá 70 % (ze 100 b za DÚ, nebo včetně docházkových bodů), jestli smím při učení (ne při DÚ) používat AI.

---

## 1. Zápočet (web Šejnohy, 3. 10. 2026) — všechny části jsou nutné

- **Domácí úkoly:** 10 zadání po 10 b, zadávané během semestru do ReCodExu; každé zadání = jedna nebo víc jednodušších úloh; termín standardně
  **1 týden (do následujícího cvičení)**. Potřeba **≥ 70 %**. Pod 50 % = bez zápočtu (výjimky jen nemoc apod.); 50–70 % lze doplnit zadanými úkoly
  (těžšími, případně s osobním předvedením a vysvětlením). Část hodnotí ReCodEx automaticky, část ručně po termínu. Při nejasnostech může chtít
  ústní vysvětlení kteréhokoli DÚ. Cíl DÚ: procvičení látky a přesvědčit ho, že látce rozumím teoreticky i prakticky.
- **DÚ samostatně: „no llm, no copy, no co-work, no StackOverflow“** (výjimky oznámí explicitně); přiměřená diskuse s kolegy je povolená a žádoucí.
- **Průběžné testy** na cvičení, termíny oznámené dopředu; z příkladů ze cvičení a z DÚ; neúspěšný test lze opravit.
- **Docházka:** +1 b za každé plnohodnotně a aktivně navštívené cvičení, přičítá se k bodům za DÚ. **Aktivita v hodině.**
- **Podvádění:** výstupy se kontrolují proti plagiátorství; první shodný/podezřelý kód **−10 b**, druhý prohřešek = bez zápočtu; závažné případy formálně, prohřešky jsou fakultně evidované.
- SIS navíc: zápočet = prokázání schopnosti samostatně navrhovat a implementovat programy **bez nástrojů na generování kódu**.

## 2. Plán a materiály

Předpokládaný obsah 12 cvičení (Šejnohovy notes z 1. 10.) týden po týdnu, s Marešovým výkladem a kapitolou Průvodce k tématu: [`plan.md`](plan.md).
Log DÚ, docházky a testů: [`ukoly/ukoly.md`](ukoly/ukoly.md). Šejnohovy materiály k hodinám (🎓 „Přednáška“ + „Notes“) ukládám do `zdroje/kurz/PRG1_sejnoha_NN_*`.
Marešovy výklady 01–12 a ukázkové programy (<https://gitlab.kam.mff.cuni.cz/mj/prm1>) pokrývají stejná témata. Průvodce po kapitolách: [`zdroje/pruvodce_obsah.md`](zdroje/pruvodce_obsah.md).

## 3. Co už umím (kontext pro Clauda)

- **Maturita z programování (C#, 2026)** — repo `cd-adam-cle/maturita_programovani`, 25 vypracovaných otázek: datové typy, spojové struktury, pole,
  fronta a zásobník, algoritmus a jeho vlastnosti, rekurze, textové soubory, časová a paměťová složitost, reprezentace grafu, stromy a průchody,
  insert/select/bubble/merge/quick/heap sort, lineární a binární vyhledávání, BVS, rozděl a panuj, dynamické programování, backtracking,
  aritmetické výrazy, OOP a dědičnost, Python vs C#, událostmi řízené programování, teorie grafů, BFS/DFS, minimální kostra, topologické třídění, nejkratší cesty.
- Seminární projekty v C# (`cd-adam-cle/ProgSemAdamZikmund`: backtracking, minimax, práce s textovými soubory, hry), weby (PHP, TypeScript/Next.js).
- Dlouhodobě: zůstat u programování, zapsat si **Programování 2** (NMIN112, LS — Šejnoha ho taky cvičí), směřovat k **algoritmickému obchodování
  a quant věcem** (Python: numpy, pandas, simulace, optimalizace, časové řady).

Důsledek: syntaxe Pythonu je pro mě **překlad z C#**; hodnota kurzu je v **algoritmickém myšlení, složitosti a čistém návrhu** (Průvodce, Šejnohův důraz
na vlastnosti algoritmů a složitost jako funkci) a v pythonských idiomech (řezy, comprehensions, slovníky, generátory, výjimky).

## 4. Jak má Claude v tomto předmětu pracovat

- **Domácí úkoly jsou úplně bez Clauda.** Pravidlo cvičícího je „no llm“: dokud je DÚ otevřená, nenosím k Claudovi ani zadání, ani svůj kód k té úloze
  (ani „jen vysvětlit zadání“). Po termínu odevzdání: review (čitelnost, složitost, idiomy, hraniční případy), srovnání s tím, co by šlo líp.
  Obecné učení látky (Šejnohovy a Marešovy výklady, Průvodce, vlastní cvičné úlohy mimo DÚ) s Claudem je v pořádku — ⚠️ potvrdit u Šejnohy 8. 10.
- **Kód za mě nepíše nikdy** (ani kostru, ani „ukázkové“ řešení stejné úlohy) — testy jsou prezenční a plagiát stojí 10 b.
- Co Claude **dělá**: vysvětlí pojmy a Python idiomy jako překlad z C#; u **mého** cvičného kódu najde **první chybu** a vysvětlí proč (ne opraví);
  navrhne testovací vstupy; vysvětlí standardní knihovnu a dokumentaci; připraví cvičné úlohy ve stylu Marešova webu k tématu týdne (pro trénink na testy).
- **Teorie algoritmů (Průvodce):** naplno — složitost, invarianty, důkazy správnosti, cvičení z knihy (nejsou zápočtové). Nejdřív nápověda, řešení na vyžádání; složitost vždy zdůvodnit.
- **Před cvičením**: Šejnohova „Přednáška“ k týdnu (když je zveřejněná dopředu) + Marešův výklad + kapitola Průvodce (`plan.md`); úlohy z Marešova webu zkusit sám.
- **Zápis**: `cviceni/cvNN.md` (co se dělalo, co nešlo, idiomy), `ukoly/duNN/` (zadání + můj kód + poznámky po termínu). Vlastní kód do repa patří; **repo je veřejné** —
  řešení DÚ commitovat **až po termínu odevzdání** (kvůli pravidlu „no copy“ pro ostatní).
- Doporučení UK k AI: <https://www.ai.cuni.cz/AI-81.html>.
- Souvislosti: složitost a růst funkcí ↔ MA1 (růstová škála, limity), matice a vektory ↔ LA1, simulace a náhodné procházky ↔ finance → `80_mapa_matematiky/`.

## 5. Struktura složky

```
PRG1_programovani/
├── CLAUDE.md, _info.md, plan.md
├── cviceni/   cvNN.md + kurz/ + img/
├── ukoly/     ukoly.md (log DÚ, docházky, testů) · duNN/ (zadání + můj kód, commit až po termínu) · kurz/
├── zkouska/   pisemky.md (testy na cvičení), otazky.md, tahak.md + kurz/
└── zdroje/    kurz/ (Šejnoha: PRG1_sejnoha_NN_* · Mareš: výklady 01–12 · Průvodce) · pruvodce_obsah.md · web/ (Šejnoha, Mareš) · sis/ · od_starsich/ · jine/
```
