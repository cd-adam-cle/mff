# Praktické aspekty měření a řízení finančních rizik — NMFP463 (ZS 2026/27)

> **Tento soubor je pro RIZ nadřazený všemu ostatnímu v této složce i kořenovému `CLAUDE.md`.** Když se cokoli rozchází, platí:
> slidy přednášejících (arm.cz/mff) > co řekli na přednášce > SIS > tento soubor > `_info.md`.

- Přednáška: **po 15:40–17:10, K1**, Mgr. Ing. Václav Novotný a Mgr. Tomáš Němeček (Advanced Risk Management, s.r.o. — praktici, ne akademici).
  Jen přednáška (2/0), zkouška. Doporučený volitelný předmět, 3 kr. První přednáška **po 5. 10. 2026**.
- Kontakt: novotny@arm.cz, tel. 257 290 252; ARM, Business Park Košíře, Jinonická 80, Praha 5.
- **Materiály:** všechny prezentace nejpozději v den přednášky na <https://www.arm.cz/mff> (přihlášení: údaje dali studentům; uložené v `scripts/.riz_credentials`,
  **mimo git — repo je veřejné**). Stahuje `python3 scripts/riz_stahni_materialy.py` → [`zdroje/kurz/`](zdroje/kurz/); přejmenovat podle konvence
  `RIZ_arm_kapNN_<tema>_<datum>.pdf` a zapsat do [`plan.md`](plan.md). Kopie stránky: [`zdroje/web/arm_mff_2026-10-05.html`](zdroje/web/arm_mff_2026-10-05.html).
- SIS: [`zdroje/sis/predmet.html`](zdroje/sis/predmet.html).

> ⚠️ **K OVĚŘENÍ po přednášce (Adík):** jak se tvoří skupiny a jaká firma se analyzuje; zadání a rozsah individuální práce (téma na výběr?);
> formát ústní zkoušky (otázky z kapitol + diskuse úkolu?); jestli se zkouší celé slidy, nebo jen „hlavní“ (slidy „Statisticky významné zkušenosti“ se nezkouší).

---

## 1. Hodnocení (slide 7 + SIS) — všechno dohromady

| Co | Kdy | Poznámka |
|---|---|---|
| **Skupinový úkol: analýza finančních výkazů firmy** | prezentace výsledků **po 23. 11. 2026** | aktivní účast na řešení; výkazy = rozvaha, výsledovka, cash flow → přímá vazba na UCE |
| **Individuální práce** | odevzdat **do 31. 12. 2026** | SIS: „vypracování úkolu na vybrané téma a jeho diskuse v průběhu ústní zkoušky“ |
| **Ústní zkouška** | zkouškové | diskuse individuální práce + látka přednášek |
| **Aktivní zapojení** | průběžně | „ptejte se hned, neexistují hloupé otázky; podělte se o zkušenosti a názory“ |

## 2. Program přednášek (10 kapitol, slide 2) a materiály

1. Úvod do řízení rizik · 2. Přehled metod pro identifikaci, měření a řízení rizik · 3. Principy činnosti bank, pojišťoven a firem · 4. Tržní riziko ·
5. Kreditní riziko · 6. Riziko likvidity · 7. Operační riziko · 8. Souhrnný pohled na rizika (ERM, kapitál, IRRBB, ESG…) · 9. Regulace Basel III (CRD 6 / CRR 3) a Solvency II ·
10. Finanční krize a poučení z ní.

Rozložení do pondělků (odhad) a tracker: [`plan.md`](plan.md). Osnova slidů kapitol 1–2: [`zdroje/slidy_obsah.md`](zdroje/slidy_obsah.md).
Staženo: [kap. 1–2](zdroje/kurz/RIZ_arm_kap01-02_uvod_a_metody_2026-10-04.pdf) (65 slidů), [příloha kap. 2 — koherentní míra rizika](zdroje/kurz/RIZ_arm_priloha_kap02_koherentni_mira_rizika_2026-10-05.pdf) (**není předmětem zkoušky**).
Literatura (slide 6): Bluhm–Overbeck–Wagner (kreditní modely), Hand–Henley (scoring), Hull (deriváty), Frachot (LDA), Gordy, Saunders, Vašíček; u témat konkrétní články.

## 3. Jak má Claude v tomto předmětu pracovat

- **Terminologie a definice ze slidů ARM** (např. riziko = „měřitelná možnost, že budoucnost může být jiná, než předpokládáme“; klasifikace: kreditní, tržní
  (měnové, úrokové, komoditní, akciové), likvidní, operační). Když se liší od učebnicové definice (Hull, Basel), zmínit obojí, ale u zkoušky platí slidy.
- Po každé přednášce: stáhnout slidy skriptem, projít je a zapsat do `prednasky/pNN.md` jen to, co zaznělo navíc (příklady z praxe, co zdůraznili, co se zkouší).
  Slidy „Statisticky významné zkušenosti“ = zajímavosti o „vnějším světě“, nezkouší se.
- **Kvantitativní části** (VaR, Expected Shortfall, backtesting, PD/LGD, LDA): projít výpočty vlastníma rukama; Python (numpy, scipy) na simulace a ověření —
  tady je to žádoucí, protože to je přesně quant praxe, ke které směřuju. Propojit s pravděpodobností a statistikou, až ji budu mít.
- **Skupinový úkol** (analýza výkazů): použít UCE (rozvaha, výsledovka, cash flow, poměrové ukazatele); Claude pomáhá s metodikou a kontrolou, výstup je týmový.
- **Individuální práce**: téma zvolit co nejblíž quant/trading (tržní riziko, VaR, backtesting); Claude = konzultant na strukturu, zdroje a kontrolu výpočtů, text píšu sám.
- **Ústní zkouška**: trénovat vysvětlení pojmů nahlas + obhajobu vlastní práce; otázky sbírat do [`zkouska/otazky.md`](zkouska/otazky.md).
- Pravidla pro AI přednášející nezmínili → platí doporučení UK (<https://www.ai.cuni.cz/AI-81.html>); u individuální práce uvádět zdroje.
- Souvislosti → `80_mapa_matematiky/`: výkazy ↔ UCE; VaR/ES/rozdělení ztrát ↔ pravděpodobnost; diverzifikace a portfolio ↔ LA1 (vektory, kovariance později); anuity a dluhopisy ↔ finanční matematika.

## 4. Původ materiálů a struktura

| Značka | Podsložka | Co |
|---|---|---|
| 🎓 | `kurz/` | slidy z arm.cz/mff (stahuje skript), zadání úkolů |
| 👵 | `od_starsich/` | od třeťačky nic (předmět neměla) |
| 🔎 | `jine/` | články z literatury, Basel/Solvency dokumenty |

```
RIZ_financni_rizika/
├── CLAUDE.md, _info.md, plan.md
├── prednasky/   pNN.md (co zaznělo navíc oproti slidům) + img/
├── ukoly/       ukoly.md (skupinový úkol, individuální práce) · skupinovy_ukol/ · individualni_prace/ · kurz/ (zadání)
├── zkouska/     otazky.md (pojmy k ústní), tahak.md, pisemky.md (formát) + kurz/
└── zdroje/      kurz/ (slidy RIZ_arm_*) · slidy_obsah.md · web/ (kopie arm.cz/mff) · sis/ · jine/ · od_starsich/
```
