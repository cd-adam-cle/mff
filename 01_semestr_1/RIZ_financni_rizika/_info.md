# Praktické aspekty měření a řízení finančních rizik (RIZ)

> **Pravidla, plán a kontext předmětu jsou v [`CLAUDE.md`](CLAUDE.md) — ten je nadřazený tomuto souboru.** Plán: [`plan.md`](plan.md).

SIS: NMFP463 · zimní · 2/0 · Zk · 3 kr · doporučený volitelný · KPMS · [sylabus uložený](zdroje/sis/predmet.html)

- Vyučující přednášky: Mgr. Ing. Václav Novotný, Mgr. Tomáš Němeček (Advanced Risk Management, s.r.o.) — po 15:40–17:10, K1; novotny@arm.cz
- Cvičící: —
- Materiály: <https://www.arm.cz/mff> (přihlášení od přednášejících, údaje jen lokálně v `scripts/.riz_credentials`); stahuje `scripts/riz_stahni_materialy.py` do [`zdroje/kurz/`](zdroje/kurz/)
- Zakončení: zkouška (ústní)
- Hodnocení (slidy, 5. 10. 2026): skupinový úkol — analýza finančních výkazů firmy, prezentace 23. 11. 2026; individuální práce do 31. 12. 2026; ústní zkouška (SIS: diskuse vypracovaného úkolu); aktivní zapojení
- Styl zkoušky: ústní — [DOPLNIT formát po upřesnění]
- Literatura a zdroje (🎓 kurz/profesor · 👵 od starších · 🔎 jiné):
  - 🎓 [`zdroje/kurz/RIZ_arm_kap01-02_uvod_a_metody_2026-10-04.pdf`](zdroje/kurz/RIZ_arm_kap01-02_uvod_a_metody_2026-10-04.pdf) — kapitoly 1–2 (organizace, úvod, metody identifikace/měření/řízení; VaR, ES, backtesting, stresové testování); osnova [`zdroje/slidy_obsah.md`](zdroje/slidy_obsah.md)
  - 🎓 [`zdroje/kurz/RIZ_arm_priloha_kap02_koherentni_mira_rizika_2026-10-05.pdf`](zdroje/kurz/RIZ_arm_priloha_kap02_koherentni_mira_rizika_2026-10-05.pdf) — koherentní míra rizika (není ke zkoušce)
  - 🎓 Doporučená (slide 6 + SIS): Bluhm, Overbeck, Wagner — Introduction to Credit Risk Modelling; Hand, Henley — Statistical Classification Methods in Consumer Credit Scoring (JRSS A 1997); Hull — Options, Futures and Other Derivatives; Frachot a kol. — Loss Distribution Approach in Practice; Gordy — A Comparative Anatomy of Credit Risk Models (JBF 2000); Saunders — Credit Risk Measurement; Vašíček — Probability of Loss on Loan Portfolio (KMV 1987)
  - 🔎 Firemní web ARM (poradenství, software CADCalc, skórkarty): <https://www.arm.cz/>
- Co mi dělá problém:

## Obsah (SIS / slide 5)
1. Úvod: definice rizika, cíl řízení rizik, klasifikace · 2. Měření (směrodatná odchylka, VaR, stresové testování, RCSA) a řízení (technicko-organizační vs. finanční řešení) ·
3. Banky, pojišťovny, firmy: obchodní modely, klíčová rizika, selhání v minulosti · 4. Tržní riziko · 5. Kreditní riziko (rating, scoring, EWS, PD, LGD, kreditní marže) ·
6. Riziko likvidity (stresové scénáře, CFP) · 7. Operační riziko (LDA, BCM) · 8. Souhrnný pohled (ERM, kapitál, IRRBB, reputační, koncentrace, model, ESG) ·
9. Basel III (CRD 6 / CRR 3) a Solvency II · 10. Finanční krize a poučení; vhodnost pokročilých statistických metod
