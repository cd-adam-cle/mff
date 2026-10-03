# Souvislosti

Co z čeho plyne a kde se co použije — mezi předměty a směrem k financím
(např. geometrická řada → současná hodnota anuity, nejmenší čtverce → regrese).

## MA1 ↔ ostatní (3. 10. 2026)

| Pojem | MA1 | Kde jinde | Poznámka |
|---|---|---|---|
| Výroky, kvantifikátory, negace, důkaz sporem | skripta Rmoutil 1.1 | LA1 (Barto–Tůma kap. 1), PROS | Halas chce z 1.1 jen obměněnou implikaci, spor a negaci s kvantifikátorem; Rmoutilův „Průvodce nesnázemi začátečníka“ (MA1/zdroje/kurz) je k tomu nejlepší text |
| Množiny, relace, zobrazení (prosté, na, bijekce, inverzní, složené) | 1.2 | LA1 kap. 1.5 Zobrazení (sada 02) | stejné definice, v LA1 se pak zúží na lineární zobrazení |
| Uspořádané těleso, reálná čísla | 1.3.3 | LA1 kap. 3 Tělesa | v LA1 tělesa obecně (Z_p, C), v MA1 jen R + uspořádání + supremum |
| Supremum, infimum, Archimédův axiom | 1.3.4–1.3.5 | — | klíčový pojem u zkoušky MA1; základ pro limity |
| Geometrická řada | 5.1 | finance: současná hodnota anuity, perpetuita | součet $\sum q^n = \frac{1}{1-q}$ → diskontování |
| Limita $(1+\frac1n)^n = e$ | 2.3, sbírka 02 | finance: spojité úročení | $\lim (1+\frac rn)^n = e^r$ |
| Derivace, průběh funkce | kap. 4 | RIZ/finance: citlivosti (durace), optimalizace | |

## PRG1 ↔ ostatní (4. 10. 2026)

| Pojem | PRG1 | Kde jinde | Poznámka |
|---|---|---|---|
| Složitost, asymptotická notace $O(\cdot)$ | Průvodce kap. 2 | MA1: limity posloupností, růstová škála ($\log n \ll n \ll n^k \ll c^n \ll n!$) | tatáž hierarchie růstu, v MA1 jako limity podílů |
| Rekurze, Fibonacci, rychlé umocňování | Průvodce 1.4, 10, 12 | MA1 posloupnosti; LA1 matice (Fibonacci přes mocninu matice) | |
| Vektory, matice, skalární součin | Marešovy úlohy (comprehensions) | LA1 kap. 4 | numpy později |
| Simulace, náhodné procházky, Monte Carlo | Mareš 12 standardní knihovna | finance: ceny jako náhodná procházka, odhad $\pi$ = Monte Carlo | základ pro quant |

## PROS a UCE ↔ ostatní (4. 10. 2026)

| Pojem | Kde | Kde ještě | Poznámka |
|---|---|---|---|
| Výroky, negace s kvantifikátory, důkazy | PROS materiály 01–02 | MA1 1.1 (Halas chce obměnu, spor, negaci), LA1 kap. 1, Rmoutilův průvodce | učit jednou, pořádně — v MA1 s přesnými definicemi, v PROS procvičit |
| Množiny, relace, zobrazení (prosté, na, bijekce, inverzní) | PROS 03–04 | MA1 1.2, LA1 1.5 | stejné definice ve třech předmětech |
| Elementární funkce, grafy, goniometrie | PROS 05–07 | MA1 kap. 3–4, 6.3; průběh funkce | goniometrické vzorce se v MA1 nezkouší, ale „každý je musí znát“ |
| Komplexní čísla | PROS 09 | LA1 kap. 1 (tělesa), později FFT (Průvodce kap. 17) | |
| Rozvaha, cash flow, dluhopisy, akcie, úvěr | UCE kap. 2–3, cv01 | RIZ, finanční matematika (NMFM207), finance obecně | účetní pohled na stejné instrumenty, které se v FM oceňují |
