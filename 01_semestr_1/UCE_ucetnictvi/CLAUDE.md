# Účetnictví — NMFM101 (ZS 2026/27)

> **Tento soubor je pro UCE nadřazený všemu ostatnímu v této složce i kořenovému `CLAUDE.md`.** Když se cokoli rozchází, platí:
> stránka předmětu v SISu (materiály a obsah přednášek od Zichové) > web Zichové (termíny testů) > učebnice Zichová 2015 > tento soubor > `_info.md`.

- Přednáška: **po 9:00–10:30, K1**, RNDr. Jitka Zichová, Dr. (garantka i jediná vyučující)
- Cvičení: **čt 9:00–10:30, K1**, Zichová
- Zdroje pravdy:
  - **Stránka předmětu v SISu** (vyžaduje přihlášení): Zichová tam dává materiály na přednášky i cvičení a průběžně **obsah každé přednášky**.
    „Skripta“ = to, co je na SISu; stačí se učit z toho. Já to musím **ukládat ručně** (PDF/doc → `_inbox/`, Claude roztřídí do `kurz/`).
    Uložená karta předmětu: [`zdroje/sis/predmet.html`](zdroje/sis/predmet.html) (stav 22. 9.: 7 souborů — šablony výkazů, osnova, rozvrh, ČEZ).
  - **Web Zichové**: <https://www.karlin.mff.cuni.cz/~zichova/> — podmínky zápočtu, **termíny testů** (budou sděleny během semestru), osnova a rozvrh ke stažení.
  - **Učebnice**: J. Zichová, *Základy účetnictví*, Matfyzpress 2015 — kap. 1–7 od třeťačky v [`zdroje/od_starsich/`](zdroje/od_starsich/)
    (kap. 2 a 3 jako `.doc` rukopis, ostatní PDF výřezy). Zkouška se opírá o sylabus **a tuto učebnici**.

> ⚠️ **K OVĚŘENÍ / DOPLNIT (Adík):**
> - **Termíny obou zápočtových testů** — sledovat web Zichové a SIS; pak `plan.md`, `harmonogram.md`, kalendář.
> - **Formát zkoušky**: SIS říká písemná 1 h (teorie + praktické příklady), Zichová na přednášce „něco většího, formou praktických otázek“ — upřesní.
> - Každý týden uložit nové soubory ze SISu do `_inbox/` (zadání cvičení, obsah přednášky). Zadání cvičení v repu jsou verze **2025** od třeťačky, letošní se mohou lišit.

---

## 1. Zdroje — hierarchie

1. **SIS → `kurz/`** 🎓: šablony [rozvaha](zdroje/kurz/UCE_rozvaha.docx), [výsledovka](zdroje/kurz/UCE_vysledovka.docx), [cash flow](zdroje/kurz/UCE_cash_flow.docx);
   [účtová osnova](zdroje/kurz/UCE_uctova_osnova.docx) (Příloha 4 vyhlášky 500/2002); [vzorový účtový rozvrh 2019](zdroje/kurz/UCE_vzorovy_uctovy_rozvrh_2019.pdf)
   (**povolená pomůcka u zkoušky**, čísla účtů v předkontacích); účetní závěrka a zpráva auditora ČEZ (skeny, ke kap. 5 a 7).
2. **Web Zichové → `kurz/`** 🎓: [účtová osnova 2017 s vyznačenými změnami oproti Příloze 5 učebnice](zdroje/kurz/UCE_uctova_osnova_2017_zmeny_vs_ucebnice.doc).
3. **Učebnice** (kap. 1 úvod · 2 majetek podniku, rozvaha · 3 náklady a výnosy · 4 účty a účetní knihy, uzávěrka · 5 kontrola, audit · 6 oceňování · 7 regulace a harmonizace, IFRS)
   — pokrývá všech 10 bodů sylabu. Terminologie a definice pojmů se berou odsud.
4. **Cvičení 2025** 👵 [`cviceni/od_starsich/`](cviceni/od_starsich/) (11 zadání s řešeními v textu: klasifikace aktiv a pasiv, přechodné položky a rozvaha,
   rozvahové a výsledkové operace, výkazy, předkontování, DHM, zásoby, peníze, mzdy a zálohy, cenné papíry, uzávěrka) — základ pro **pojmy** k testům.
5. **Staré testy** 👵 (8 fotek): [`zkouska/pisemky.md`](zkouska/pisemky.md). Řešené příklady MUNI 2016 a starší poznámky: `zdroje/od_starsich/`.
6. Doplňkově (jen odkazem): Kovanicová — Abeceda účetních znalostí; zákon 563/1991 Sb., vyhláška 500/2002 Sb., ČÚS.

## 2. Týdenní cyklus

| Kdy | Co |
|---|---|
| **ne 17:00** | Přečíst kapitolu učebnice k pondělní přednášce (odhad v `plan.md`); zkontrolovat SIS a web Zichové (nové soubory, termíny testů). |
| **po 9:00 přednáška** | Zápisky jen k tomu, co je jinak / navíc oproti učebnici → `prednasky/pNN.md`. |
| **po 12:45** (blok) | Pojmy z přednášky a kapitoly → [`zkouska/pojmy.md`](zkouska/pojmy.md) (pojem · kategorie · vysvětlení jednou větou). |
| **st 20:00** | Projít zadání cvičení na čt (SIS, nebo verze 2025): klasifikace, předkontace zkusit sám. |
| **čt 9:00 cvičení** | Otázky s krátkými odpověďmi, předkontace. Co nešlo → `cviceni/cvNN.md`. |
| **so 15:00** (blok) | Dril pojmů na nejbližší test (Claude zkouší), praktické příklady (rozvaha, předkontace). |

Číslování: `cvNN` = cvičení v týdnu NN (cv01 = čt 1. 10.), `pNN` = přednáška v týdnu NN (p01 = po 29. 9.).

## 3. Body a podmínky

**Zápočet** (SIS + web Zichové + přednáška): **2 zápočtové testy**, každý **10 pojmů/otázek**, nutno **8 správně**; každý lze **1× opakovat**.
Zichová na přednášce: u pojmu říct / definovat, co znamená v účetnictví.
- **ZT1 — klasifikace aktiv a pasiv** (cvičení 1–2: AD/AK/PV/PC + upřesnění, přechodné položky).
- **ZT2 — výsledkové operace, klasifikace nákladů a výnosů** (cvičení 3+: typy operací, +N/+V a dopad do rozvahy).
- Termíny budou sděleny během semestru (web Zichové). Zápočet je nutnou podmínkou zkoušky.

**Zkouška** (SIS): **písemná, 1 hodina**; teorie v rozsahu sylabu a učebnice + **praktické příklady** v rozsahu látky ze cvičení.
Povolené pomůcky: kalkulačka a účtový rozvrh pro podnikatele. Statistika 2020–2025: úspěšnost ≈ 90 %, průměrná známka ≈ 1,6.
Na přednášce: „zkouška bude něco většího, formou praktických otázek“ — formát upřesní.

## 4. Plán kurzu

Týden po týdnu (přednášky podle 10 bodů sylabu ≈ kapitoly učebnice, cvičení podle verze 2025) s trackerem: [`plan.md`](plan.md).

## 5. Jak má Claude v tomto předmětu pracovat

- **Terminologie z učebnice a cvičení Zichové**, ne obecná účetní praxe ani IFRS slovník (pokud nejde o kap. 7). Česká účetní legislativa (vyhláška 500/2002).
- **Pojmy jsou podstata zápočtu**: [`zkouska/pojmy.md`](zkouska/pojmy.md) je hlavní artefakt — Claude ho pomáhá rozšiřovat po každé přednášce a cvičení
  a **zkouší mě z něj** (dá pojem → já kategorie + vysvětlení → Claude najde první chybu). Před testem simulace: 10 náhodných pojmů, limit času, hodnocení 8/10.
- **Praktické příklady** (rozvaha, výsledovka, předkontace MD/D s čísly účtů z rozvrhu, DHM, zásoby, mzdy, CP, uzávěrka): nejdřív můj pokus, pak kontrola;
  součty a bilanci lze ověřit Pythonem. Čísla účtů vždy podle [vzorového účtového rozvrhu](zdroje/kurz/UCE_vzorovy_uctovy_rozvrh_2019.pdf).
- **Staré testy** (`zkouska/img/`) jsou vzor formátu — přepsat je do `pisemky.md` a použít jako cvičné sady; `/zkouska UCE` dělá test ve stejném stylu (10 pojmů).
- Žádná pravidla pro AI od vyučující nejsou; testy i zkouška jsou bez pomůcek (kromě kalkulačky a rozvrhu u zkoušky), takže cíl je pojmy **umět zpaměti**.
- Souvislosti: rozvaha/cash flow ↔ finance a RIZ; úročení a dluhopisy ↔ finanční matematika → `80_mapa_matematiky/`.

## 6. Původ materiálů

| Značka | Podsložka | Co |
|---|---|---|
| 🎓 | `kurz/` | ze SISu a webu Zichové: šablony výkazů, osnova, rozvrh, ČEZ, letošní zadání cvičení a obsah přednášek (až budou) |
| 👵 | `od_starsich/` | od třeťačky: kapitoly učebnice, zadání cvičení 2025, poznámky, řešené příklady 2016, fotky testů (`zkouska/img/`) |
| 🔎 | `jine/` | co si najdu sám |

## 7. Struktura složky

```
UCE_ucetnictvi/
├── CLAUDE.md, _info.md, plan.md
├── prednasky/   pNN.md (jen co je navíc oproti učebnici) + img/
├── cviceni/     cvNN.md · kurz/ (letošní zadání ze SISu) · od_starsich/ (zadání 2025) · img/
├── ukoly/       kurz/ (zatím nic)
├── zkouska/     pojmy.md ★ · pisemky.md (8 fotek v img/) · otazky.md · tahak.md · kurz/ · od_starsich/
└── zdroje/      kurz/ (SIS + web) · od_starsich/ (učebnice kap. 1–7, poznámky, řešené příklady) · jine/ · sis/
```

## 8. Konzultace

E-mailem po domluvě: zichova@karlin.mff.cuni.cz (web). Dotazy ke klasifikaci nejlépe přímo na cvičení.

## 9. Doporučení

- Třeťačka: „odpočinkový předmět“ — ale testy chtějí 8 z 10, takže pojmy drilovat průběžně, ne až před testem.
- Zichová: učit se z toho, co dá na SIS; na cvičení otázky s krátkými odpověďmi.
