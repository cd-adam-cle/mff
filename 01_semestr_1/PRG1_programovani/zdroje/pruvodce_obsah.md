# Průvodce labyrintem algoritmů — obsah a k čemu v PRG1

M. Mareš, T. Valla, 2. vydání 2022, 542 str. PDF ([`kurz/PRG1_pruvodce_labyrintem_algoritmu_2022.pdf`](kurz/PRG1_pruvodce_labyrintem_algoritmu_2022.pdf)).
Pseudokód, ne Python — každý algoritmus z knihy je zároveň cvičení na vlastní implementaci. Cvičení z knihy nejsou zápočtové, takže je lze řešit s Claudem naplno.
Sloupec „PRG1“: 🟢 jádro prvního semestru (odhad) · 🟡 hodí se / navazuje na maturitu · ⚪ později (Programování 2, ADS, quant).

| Kap. | Název | PDF str. | PRG1 | Vazba na maturitu / jinam |
|---|---|---|---|---|
| 1 | Příklady na úvod: úsek s největším součtem, binární vyhledávání, Euklid, Fibonacci a rychlé umocňování | 23–38 | 🟢 | ot. 4 algoritmus, 14 vyhledávání |
| 2 | Časová a prostorová složitost, asymptotická notace, model RAM | 39–60 | 🟢 | ot. 7 složitost |
| 3 | Třídění: základní, slévání, dolní odhad, přihrádkové, přehled | 61–80 | 🟢 | ot. 10–13 sorty |
| 4 | Datové struktury: rozhraní, haldy, písmenkové stromy, prefixové součty, intervalové stromy | 81–106 | 🟡 | ot. 2–3, 13 heap |
| 5 | Základní grafové algoritmy: BFS, reprezentace, komponenty, DFS, mosty, DAG, silná souvislost | 107–142 | 🟡 | ot. 8, 21, 22, 24 |
| 6 | Nejkratší cesty: Dijkstra, relaxace, Floyd–Warshall | 143–166 | 🟡 | ot. 25 |
| 7 | Minimální kostry: Jarník, Borůvka, Kruskal, Union-Find | 167–184 | 🟡 | ot. 23 |
| 8 | Vyhledávací stromy: BVS, AVL, (a,b)-stromy, červeno-černé | 185–218 | 🟡 | ot. 9, 14 |
| 9 | Amortizace: nafukovací pole, potenciály, splay stromy | 219–242 | ⚪ | pole v Pythonu = nafukovací pole |
| 10 | Rozděl a panuj: Hanoj, Mergesort, Karacuba, kuchařková věta, Strassen, Quickselect, Quicksort | 243–268 | 🟢 | ot. 5 rekurze, 12 quicksort, 15 |
| 11 | Randomizace: pravděpodobnostní algoritmy, hešování, treapy | 269–298 | 🟡 | hešování = proč jsou slovníky a množiny O(1) |
| 12 | Dynamické programování: Fibonacci, podposloupnosti, editační vzdálenost | 299–318 | 🟢 | ot. 15 DP |
| 13 | Textové algoritmy: KMP, Aho-Corasicková, Rabin–Karp, suffixová pole | 319–350 | ⚪ | |
| 14 | Toky v sítích: Ford–Fulkerson, párování, Dinic, Goldberg | 351–380 | ⚪ | |
| 15 | Paralelní algoritmy: hradlové a třídicí sítě | 381–400 | ⚪ | |
| 16 | Geometrické algoritmy: konvexní obal, průsečíky, Voroného diagramy | 401–422 | ⚪ | |
| 17 | Fourierova transformace, násobení polynomů, FFT | 423–442 | ⚪ | quant: zpracování signálu, časové řady |
| 18 | Pokročilé haldy: binomiální, Fibonacciho | 443–464 | ⚪ | |
| 19 | Těžké problémy: převody, NP-úplnost, Cookova věta, aproximace | 465–496 | ⚪ | |
| 20 | Základy teorie grafů | 497–512 | 🟡 | ot. 21 |
| — | Nápovědy k cvičením, rejstřík, literatura | 513– | | |

Pořadí čtení pro ZS (návrh, viz [`../plan.md`](../plan.md)): 1 → 2 → 3 → 10.1–10.2 → 11.3–11.4 → 4.1–4.2 → 12.1–12.2 → 8.1 → 5.1–5.3, 5.6.
