# Matematická analýza I — NMTM101 (ZS 2026/27)

> **Tento soubor je pro MA1 nadřazený všemu ostatnímu v této složce, kořenovému `CLAUDE.md`
> i obecným znalostem o analýze.** Když se cokoli rozchází, platí:
> **skripta Rmoutil** > Halasovy instrukce (PDF) > SIS > tento soubor > `_info.md` > cokoli jiného.

- Přednáška: **st 9:50–11:20 a pá 12:20–13:50, M1 (Ke Karlovu 3), Zdeněk Halas** (export rozvrhu ze SISu)
- Cvičení: **st 15:40–17:10, N2 (Karlín), Vahid Borji** — zápočtové písemky píše cvičící
- Garanti: Martin Rmoutil, Zdeněk Halas. Vyučující v SISu: Borji, Halas, Weber.
- Zdroje pravdy pro pravidla a plán:
  - **Halasovy instrukce** (živý PDF: materiály, co se zkouší z kap. 1 a 6, **log „co probíráme na přednášce“ po datech**):
    <https://www.karlin.mff.cuni.cz/~halas/MA/MA1/MA1_instrukce.pdf> — kopie
    [`zdroje/kurz/MA1_halas_instrukce_2026.pdf`](zdroje/kurz/MA1_halas_instrukce_2026.pdf) (stav 3. 10. 2026). Záznamy přednášek nebudou.
  - **Rmoutilův web MA1** (skripta, sbírky ke cvičení, požadavky ke zkoušce, staré písemky 2021–2025):
    <https://www.karlin.mff.cuni.cz/~rmoutil/index.php?stranka=MA1> — kopie [`zdroje/web/rmoutil_ma1.html`](zdroje/web/rmoutil_ma1.html).
    Pozor: aktuality na něm jsou z let 2023–2025 (Rmoutil, Staněk), ne letošní.
  - **Borjiho web**: <https://www.karlin.mff.cuni.cz/~borji/> — podstránka *Mathematical-analysis-1* zatím **neexistuje (404, 3. 10.)**.
    Na 1. cvičení slíbil nahrát materiály (prezentace z 1. hodiny s tématy cvičení).
  - **SIS** (podmínky zakončení, upravil Halas 4. 9. 2026): [`zdroje/sis/predmet.html`](zdroje/sis/predmet.html).

> ⚠️ **K OVĚŘENÍ (Adík):**
> - **Termíny zápočtových písemek** — oznámí cvičící ≥ 2 týdny předem. Odhad podle 2021/22: ZT1 2. půlka listopadu
>   (limity posloupností), ZT2 začátek ledna (limita funkce, derivace, řady). Jakmile budou: `plan.md`, `harmonogram.md`, `.ics`.
> - **Formát zkoušky 2026/27** — SIS říká jen „početní část → teoretická“. Bodování a hranice v §3 jsou Rmoutilovy
>   z 2023/24. Zeptat se Halase na přednášce, kdo zkouší a jestli platí stejný systém.
> - **Z čeho počítat na cvičení** — zeptat se Borjiho (zatím Rmoutilovy sbírky, §1 bod 3). Každý týden zkontrolovat,
>   jestli už Borjiho stránka existuje → doplnit [`cviceni/sady.md`](cviceni/sady.md).
> - Rmoutil 2023: „na předtermínech lze zápočet získat i přímo složením zkoušky“ — platí letos? Zeptat se.

---

## 1. Zdroje — hierarchie

1. **Skripta M. Rmoutil: Matematická analýza I (NMTM101)**, verze 3. 10. 2023, 87 str. —
   [`zdroje/kurz/MA1_skripta_rmoutil_2023.pdf`](zdroje/kurz/MA1_skripta_rmoutil_2023.pdf)
   (zdroj <https://www.karlin.mff.cuni.cz/~rmoutil/NMTM101/MA1.pdf>). Halas: „s tímto skriptem budeme pracovat na přednášce“.
   Obsahují **veškerou teorii** kurzu, přesně odpovídají přednášce; **neobsahují početní metody** (ty jsou na cvičení).
   Definice, značení a číslování vět se berou odsud — požadavky ke zkoušce odkazují na čísla vět ze skript.
   Části psané malým písmem se nezkouší. Obsah s čísly stran: [`zdroje/skripta_obsah.md`](zdroje/skripta_obsah.md).
2. **Halasovy instrukce 2026** — co se z kap. 1 a 6 zkouší (§3), doporučené sbírky, log přednášek. Kontrolovat **každý týden**
   (ne 17:00 před st přednáškou) a podle logu posouvat odhad v [`plan.md`](plan.md).
3. **Sbírky ke cvičení** (Rmoutil, z webu kurzu; úlohy po tématech, **výsledky jsou přímo pod úlohami**) —
   [`cviceni/kurz/`](cviceni/kurz/), přehled a přiřazení k týdnům v [`cviceni/sady.md`](cviceni/sady.md):
   01 úvod (opakování SŠ) · 02 limita posloupnosti · 03 limita funkce · 04 derivace · 05 řady.
   Průběh funkce: řešené příklady z písemek (P. Pošta) a z brněnského skripta (odkazuje Halas) tamtéž.
   Rmoutil 2023: „průběh funkce na cvičení dělat nebudeme, je nutné si ho propočítat doma“ — počítat s tím.
4. **Staré písemky a požadavky** — [`zkouska/pisemky.md`](zkouska/pisemky.md): zkoušky 2021/22, 2023/24 (s řešeními) a 2024/25,
   zápočtové testy 2021/22 (vzory + ostré + opravný, s řešeními), požadavky ke zkoušce (Rmoutil 2023), časté chyby (Rmoutil).
   Teoretické otázky vytažené ze všech písemek: [`zkouska/otazky.md`](zkouska/otazky.md).
5. Referenční a doplňkové (jen na dohledání, **ne autorita**):
   Pick–Hencl–Spurný–Zelený, referenční skripta (18 MB, jen odkaz: <https://www.karlin.mff.cuni.cz/~pick/analyza-pro-studenty.pdf>) ·
   J. Veselý: Základy matematické analýzy I (<https://www.karlin.mff.cuni.cz/~rmoutil/Vesely/Vesely_I.pdf>) · V. Jarník: Diferenciální počet I ·
   J. Vanžura: řešené příklady (203 str., [`zdroje/kurz/MA1_vanzura_resene_priklady.pdf`](zdroje/kurz/MA1_vanzura_resene_priklady.pdf)) ·
   P. Pošta: Analýza v příkladech I (FJFI, [`zdroje/kurz/MA1_posta_analyza_v_prikladech_1.pdf`](zdroje/kurz/MA1_posta_analyza_v_prikladech_1.pdf)) ·
   Pavlíková, sbírka FSV, Černý: Úvod do inteligentního kalkulu, Kopáček: Příklady…, Zajíček: Vybrané úlohy, Polák: SŠ matematika v úlohách II.
6. M. Rmoutil: **Matematika — průvodce nesnázemi začátečníka** (formální vyjadřování, kvantifikátory, důkazy; 21 str.) —
   [`zdroje/kurz/MA1_rmoutil_pruvodce_nesnazemi_zacatecnika.pdf`](zdroje/kurz/MA1_rmoutil_pruvodce_nesnazemi_zacatecnika.pdf). Hodí se i pro PROS a LA1.
7. Myšlenková mapa předmětu (Rmoutil, coggle): <https://coggle.it/diagram/YUnfLwoQt5Kfarr3/t/matematick%C3%A1-anal%C3%BDza-1>;
   stránky K. Kuncové (KMA) a FAQ O. Kalendy ke studiu a zkoušení — odkazy na konci Rmoutilova webu.

## 2. Týdenní cyklus (týden X = pondělí–neděle; přednáška st + pá, cvičení st odpoledne)

| Kdy | Co |
|---|---|
| **ne 17:00** (před st přednáškou) | Zkontrolovat Halasovo PDF: co se reálně probralo minulý týden → opravit odhad v `plan.md`. Letmo přečíst kapitoly na st (plán). Zkontrolovat Borjiho web. |
| **st 9:50 přednáška** | Teorie podle skript. Zápisky jen k tomu, co je jinak než ve skriptech, + otázky. |
| **st 15:40 cvičení** | Početní metody, které ve skriptech **nejsou**. Postupy a vzorové úpravy zapisovat do `cviceni/cvNN.md`. Cvičení je i konzultace — nosit úlohy, které nešly. |
| **pá 10:00** (před pá přednáškou) | Letmo kapitoly na pá (plán). |
| **pá 12:20 přednáška** | |
| **po 19:00 + út 17:45** | Úlohy na st cvičení ze sbírky k tématu týdne (`sady.md`). Výsledek si zkontrolovat pod úlohou, **postup** nechat zkontrolovat (Claude / cvičící). |
| **so 10:00** | Dopočítat, co na cvičení nešlo; těžší úlohy (★) ze sbírky; průběhy funkcí. |
| po přednášce | Skripta podrobně: definice a číslované věty přesně (s kvantifikátory) → průběžně do [`zkouska/tahak.md`](zkouska/tahak.md). |

Číslování v repu: **cvNN = cvičení v týdnu NN** (cv01 = st 30. 9., cv05 = 28. 10. odpadá — svátek), zápisky z přednášek `prednasky/pNN.md`
po týdnech (jen když je co psát). DÚ zatím nejsou; kdyby je Borji zadal → `ukoly/duNN.md` + zadání do `ukoly/kurz/`.

## 3. Body a podmínky

**Zápočet** (SIS, Halas 4. 9. 2026)
- **2 zápočtové písemky**, každá **3 početní úlohy**, ohlášené **≥ 2 týdny předem**. Úspěch = **správně ≥ 2 ze 3**
  (Rmoutil 2023: správné řešení 1 b, s chybou / částečné 0,5 b, potřeba 2 b). Ke každé **1 opravný termín**.
- Bez zápočtu se nelze přihlásit ke zkoušce.
- Historicky: ZT1 = limity posloupností (2021: 25.–26. 11.; v 1 ze 4 verzí i limita funkce), ZT2 = limita funkce + derivace + řada
  (2022: 6.–7. 1.). V 2023/24 byl jen jeden test (prosinec) + náhradní 5. 1. Vzory: [`zkouska/pisemky.md`](zkouska/pisemky.md).

**Zkouška** (SIS 2026): **písemná, početní část → teoretická část.** K teorii lze jen po úspěšné početní **v témže termínu**;
každý termín začíná znovu početní částí. Bez elektroniky, sešitů a tabulek vzorců.
- Početní část — „dobrá početní zkušenost“ v každé oblasti: **limita posloupnosti, limita funkce, derivace (včetně odvození
  pravidel pro derivování a derivací elementárních funkcí), průběh funkce, číselné řady.**
- Teoretická část — „dobrá znalost“: definice a úvodní poznatky, posloupnosti a limity, funkce, limita a spojitost, derivace,
  průběh funkce, řady.

Formát podle Rmoutila (2023/24, [`zkouska/kurz/MA1_pozadavky_ke_zkousce_rmoutil_2023.pdf`](zkouska/kurz/MA1_pozadavky_ke_zkousce_rmoutil_2023.pdf)) — **orientační, ověřit u Halase**:

| Část | Čas | Body | Obsah |
|---|---|---|---|
| početní | 90 min | 50 | 3 úlohy po 10 b (limita posloupnosti, limita funkce, konvergence a absolutní konvergence řady) + průběh funkce 20 b (vč. náčrtu grafu) |
| teoretická | 70 min | 50 | **A** 5× definice / formulace věty po 2 b · **B** 3–4 jednodušší důkazy (2–7 b) · **C** zamyšlení: pravda/nepravda se zdůvodněním, malé úlohy (≈ 10 b) · **D** 1 těžší důkaz, výběr ze dvou (12–16 b) |

Hranice 2024: **3** ≥ 16 b z každé části a ≥ 42 celkem (a ≥ 10 z A+B); **2** ≥ 21 + 21 a ≥ 56 (≥ 14 z A+B); **1** ≥ 30 + 30 a ≥ 70.
Rmoutil 2025 hranice nezveřejňoval. Ústní část jen při nerozhodném výsledku. V 2024/25 (Staněk) měla teorie 35 b, úlohy A–C.
**Nutná podmínka** navíc: správně znát všechny **klíčové pojmy** (prostá funkce; sup/inf vs. max/min; limita posloupnosti vlastní i nevlastní;
vybraná posloupnost; limita funkce vlastní/nevlastní, jednostranná, ve vlastním/nevlastním bodě; spojitost; monotonie posloupnosti a funkce;
derivace; součet řady jako limita částečných součtů; absolutní a relativní konvergence; Bolzanova–Cauchyova podmínka). Neznalost = neúspěch.

**Co se zkouší z kap. 1 a 6 — Halas 2026** (platí přednostně před Rmoutilovým seznamem):
- Kap. 1: obměněná implikace, důkaz sporem…; negace výroku s kvantifikátorem; ⊆, ∈, ∪, ∩, \, ×; definice zobrazení, D(f), H(f),
  zobrazení z množiny / množiny, prosté, na, bijekce, inverzní (klíčová je prostota), reálná funkce, složené zobrazení; spočetnost (představa);
  reálná čísla pomocí desetinných rozvojů; **celá 1.3.4 Věta o supremu a důsledky (důkazy se nezkoušejí)**; celá 1.3.5.
- Kap. 6: l'Hospital **jen znění**; Cauchyova věta o střední hodnotě jen znění; definice cauchyovské posloupnosti;
  věta 6.3 (konvergentní ⇔ cauchyovská) **jen znění** (Rmoutil ji chtěl s důkazem — letos ne); věty 6.4, 6.5 o zavedení exp, sin, cos jen znění.
- Rmoutilův seznam vět bez důkazu (2023): 2.10 (iii), 2.10*, 2.18, 2.19, 3.3, 3.9, 3.15–3.17, 4.16–4.19, 5.12, 5.13 — ⚠️ ověřit, zda platí i letos.
- l'Hospital: početní úlohy ho **nevyžadují** (od 2025 explicitně), použít se smí, ale Rmoutil ho nedoporučuje (vede k chybám).

## 4. Plán kurzu

Týden po týdnu s daty, odhadem kapitol, cvičeními, ZT a trackerem: [`plan.md`](plan.md). Odhad se každý týden srovnává s Halasovým logem.

| Blok (odhad) | Kapitoly skript | Týdny | Cvičení (odhad) |
|---|---|---|---|
| Úvod: logika, množiny, zobrazení, reálná čísla, supremum | 1.1–1.3 | 28. 9. – 9. 10. | opakování SŠ, výroky, sup/inf |
| Limita posloupnosti | 2.1–2.3 | 12. 10. – 30. 10. | limity posloupností |
| Funkce, limita a spojitost, Bolzano, Weierstrass | 3.1–3.3 | 2. 11. – 13. 11. | limity funkcí |
| Derivace, věty o střední hodnotě, průběh funkce | 4.1–4.4 | 13. 11. – 27. 11. | derivace, průběh funkce |
| Číselné řady | 5.1–5.4 | 2. 12. – 11. 12. | řady |
| Další témata (l'Hospital, BC, elementární funkce), rezerva | 6.1–6.3 | 16. 12. – 8. 1. | opakování |

## 5. Jak má Claude v tomto předmětu pracovat

- **Vždy vycházet ze skript.** Definice a věty citovat se jménem a číslem (např. „věta 2.10, VOAL“). Když se moje zápisky
  z přednášky liší od skript, upozornit a držet se skript; když Halas na přednášce něco vynechal nebo dokázal jinak, zapsat to do `plan.md`.
- **Učení, ne odpovědi.** U úloh ze sbírek, při učení i při kontrole: navádět, ptát se, najít a ukázat **první chybu** —
  **neukazovat hned celé řešení**. Řešení až na „ukaž řešení“ nebo po vlastním pokusu.
- **Výsledky jsou ve sbírkách pod úlohami** → Claude kontroluje **postup a zdůvodnění**, ne výsledek: které věty se použily
  (VOAL, policajti, VOLSF s ověřením podmínky (P)/(S), Heine), žádné „částečné limitění“, správná práce s R*.
  Řešené písemky (`*_reseni.pdf`) a řešené sbírky (Pošta, Vanžura) neotvírat k úloze, u které nemám vlastní pokus v `cvNN.md`.
- **Python/sympy** na ověření limit, derivací a součtů řad — jako kontrola **po** vlastním výpočtu, kód ukázat.
- **Zápočtové písemky a zkouška:** trénovat formát. `/zkouska MA1` dělá buď sadu ve stylu ZT (3 úlohy, jedno téma)
  nebo zkoušky (4 početní + teorie A–D) podle `zkouska/pisemky.md` a `otazky.md`. Teorie: definice a věty **celou větou,
  se všemi kvantifikátory a předpoklady**; důkazy z `otazky.md` (B a D) umět zpaměti; u C vždy zdůvodnit nebo dát protipříklad.
- **Derivace drilovat** („naučte se derivovat, jako když bičem mrská“ — Rmoutil): mechanicky, pár vteřin, pak teprve řešit body platnosti.
- **Časté chyby** podle Rmoutila: [`zkouska/caste_chyby.md`](zkouska/caste_chyby.md) — používat při `/kontrola` a zapisovat moje do `80_mapa_matematiky/chyby.md`.
- **Pravidla pro AI** na webech kurzu nejsou → platí doporučení UK (<https://www.ai.cuni.cz/AI-81.html>). ZT i zkouška jsou bez
  pomůcek, takže cíl je umět to **bez Clauda**; Claude je na vysvětlení, nápovědy, kontrolu postupu a nadhled.
- Cíl práce: nadhled nad analýzou, propojení s LA1 (kap. 1 obou skript: logika, množiny, zobrazení; tělesa), s PROS (formální
  vyjadřování) a s financemi (řady → anuity, limita → spojité úročení) → `80_mapa_matematiky/`.

## 6. Původ materiálů — tři toky

| Značka | Podsložka | Co |
|---|---|---|
| 🎓 | `kurz/` | z webů Halase a Rmoutila, ze SISu: skripta, instrukce, sbírky, požadavky, staré písemky s řešeními |
| 👵 | `od_starsich/` | od třeťačky (`90_od_starsich/`): starší verze sbírek, cvičení Staněk, vzory ZT 2024, ruční řešení limit, sken zápisků |
| 🔎 | `jine/` | co si najdu sám |

Co je v `kurz/`, je autoritativní. Moje `.md` a `img/` leží vždy přímo v typové složce. Stejné značky jsou v `sady.md`, `pisemky.md`, `_info.md`.

## 7. Struktura složky

```
MA1_analyza/
├── CLAUDE.md            ← tento soubor (nadřazený), obsah jen z toku 🎓
├── _info.md             ← fakta ze SISu, literatura se značkami, „co mi dělá problém“
├── plan.md              ← týden po týdnu: odhad kapitol vs. Halasův log, cvičení, ZT, tracker
├── prednasky/           pNN.md (jen co je jinak než ve skriptech) + img/
├── cviceni/
│   ├── sady.md          sbírky → témata → týdny; Borjiho materiály (až budou)
│   ├── kurz/            🎓 MA1_sbirka_rmoutil_0N_*.pdf, Pošta a Halas: průběhy funkcí
│   ├── od_starsich/     👵 starší verze sbírek, Staněk cv 03–05
│   └── cvNN.md          Zadání (odkaz na sbírku) → Moje řešení → Poznámky / chyby + img/
├── ukoly/               kurz/ + duNN.md (zatím nic)
├── zkouska/
│   ├── pisemky.md       index všech písemek s původem a stavem přepisu
│   ├── otazky.md        teoretické otázky A–D ze všech zkoušek 2020–2025
│   ├── caste_chyby.md   digest Rmoutilových „častých chyb“ a rad
│   ├── tahak.md         definice a věty na jednu stránku
│   ├── kurz/            🎓 zkoušky 2021/22, 2023/24, 2024/25; ZT 2021/22; požadavky; časté chyby
│   └── od_starsich/     👵 vzory ZT 2024, ruční řešení limit
└── zdroje/
    ├── skripta_obsah.md obsah skript s čísly stran a co se z čeho zkouší
    ├── kurz/            🎓 skripta, Halasovy instrukce, průvodce nesnázemi, Vanžura, Pošta, Pavlíková, FSV
    ├── od_starsich/     👵 sken zápisků
    ├── jine/            🔎
    ├── sis/             uložený sylabus
    └── web/             uložená Rmoutilova stránka
```

## 8. Konzultace

[DOPLNIT po dotazu na přednášce.] Rmoutil: e-maily jen v nutných případech; „nejjednodušší způsob, jak uspět u zkoušky, je poctivě
studovat, ne zkoumat systém zkoušení.“ Halas: kontakt a konzultační hodiny na stránce MFF
(<https://www.mff.cuni.cz/cs/fakulta/organizacni-struktura/lide?hdl=4034>). Nejpřirozenější místo na dotazy je cvičení (Borji).

## 9. Doporučení od vyučujících

- Rmoutil (předmluva skript): **chodit na přednášku**, skripta jsou jen doplněk; bez přednášky zabere příprava na zkoušku
  víc než dvojnásobek času a látka se umí hůř. Kapitola 1 je „nezáživná“, ale nutná — na zkoušce je přítomná jen implicitně.
- Rmoutil: Vanžurovu sbírku „vřele doporučuji“; Zajíček = kvalita místo kvantity; Pošta na průběhy funkcí.
- Halas 2026: pro úplné začátečníky Polák: Středoškolská matematika v úlohách II; sbírka na všechna témata Černý: Úvod do inteligentního kalkulu.
- Rmoutil: pro početní část „naučte se derivovat, jako když bičem mrská“; limitu posloupnosti lze přes Heineho větu počítat jako limitu funkce;
  v písemce nepsat odstavce komentářů, jen naznačit, jaké věty se používají.
