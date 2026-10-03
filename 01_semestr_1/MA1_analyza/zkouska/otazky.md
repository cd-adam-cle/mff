# MA1 — zkouškové otázky z teorie

Vytaženo ze všech zkouškových písemek v [`kurz/`](kurz/) (vzor 2020, 6 termínů 2021/22, 5 termínů 2023/24, 4 termíny 2024/25 — Rmoutil, Staněk).
Čísla v závorce = kolikrát se otázka objevila. Body podle zadání. Letošní rozsah (co má Halas jen „bez důkazu“) je v [`../CLAUDE.md`](../CLAUDE.md) §3 —
l'Hospital a Bolzanova–Cauchyova věta jsou letos **jen znění**, takže úlohy D s nimi letos nejspíš nebudou (ověřit).

## A — definice a formulace vět (2 b za kus, 5 kusů)

**Definice**
- vlastní limita posloupnosti (4)
- vybraná posloupnost / podposloupnost (1)
- Bolzanova–Cauchyova podmínka pro posloupnost (3)
- vlastní limita funkce ve vlastním bodě (4)
- zápis $\lim_{x\to\infty} f(x) = \infty$, včetně definice okolí nekonečna (2)
- spojitost funkce v bodě a na intervalu (5)
- derivace funkce v bodě (7)
- „funkce $f$ je rostoucí v bodě $a$“ (4)
- lokální maximum / minimum, globální minimum (6)
- konvexní funkce na intervalu — přesná definice (2)
- asymptota funkce v $\infty$ (3)
- součet řady, absolutní a relativní konvergence řady (9)

**Formulace vět**
- Cantorův princip vnořených intervalů (4)
- Heineho věta (3)
- Weierstrassova věta (5)
- Bolzanova věta (2)
- věta o limitě derivace (3)
- Lagrangeova věta o střední hodnotě (4), Cauchyova věta o střední hodnotě (2)
- věta o derivaci inverzní funkce (4)
- Riemannova věta o přerovnání řad (3)

## B — jednodušší důkazy (2–7 b, 3–4 kusy)

- Vlastní limita posloupnosti je jednoznačně určená, pokud existuje. [5 b] (6)
- Lemma o dvou policajtech pro posloupnosti — zformulovat a dokázat. [5 b] (6)
- $a_n \le b_n$ pro všechna $n$ $\Rightarrow$ $\lim a_n \le \lim b_n$, mají-li obě strany smysl. [5 b] (2)
- Limita součinu dvou posloupností je součin limit (jen vlastní limity). [5–7 b] (4)
- Limita součtu dvou posloupností: (i) obě vlastní [5 b], (ii) obě $\infty$ [2 b]. (1)
- Věta o existenci limity monotónní posloupnosti — zformulovat a dokázat. [5–6 b] (2)
- Z definice: konstantní funkce má nulovou derivaci [2 b]; konstantní funkce je spojitá [3 b]. (4)
- Existuje-li vlastní $f'(a)$, pak je $f$ v $a$ spojitá. [4 b] (5)
- Vzorec pro derivaci součinu dvou funkcí. [5 b] (4)
- Fermatova věta o extrému — zformulovat, definovat příslušný typ extrému, dokázat. [6 b] (2)
- Rolleova věta — zformulovat a dokázat, pomocná tvrzení bez důkazu. [6 b] (4)
- Věta o limitě složené funkce — zformulovat a dokázat. [6 b] (1)
- Věta o derivaci inverzní funkce — zformulovat a dokázat. [5 b] (1)
- Každá absolutně konvergentní řada je konvergentní. [5 b] (3)
- Leibnizovo kritérium — zformulovat a dokázat. [5–7 b] (5)

## C — zamyšlení (≈ 10 b)

**Pravda / nepravda se stručným zdůvodněním** (1–2 b za výrok; opakují se napříč roky)
- Mezi každými dvěma různými reálnými čísly existuje racionální číslo. (4)
- Je-li $A \subseteq \mathbb R$ a $s = \sup A$, potom $-s = \sup(-A)$. Varianta s $c = \inf A$. (3)
- Je-li $f$ nerostoucí, potom $f$ není neklesající. / $f$ klesající na $\mathbb R$ $\Rightarrow$ není neklesající. / $f$ nerostoucí na $\mathbb R$ $\Rightarrow$ není neklesající. (5)
- Je-li $f$ aspoň v jednom bodě rostoucí, potom $f$ není nerostoucí. (1)
- Posloupnost neomezená zdola ani shora nemá limitu. (3)
- Rostoucí funkce má ve všech bodech kladnou derivaci. (3)
- Může mít ryze rostoucí funkce v nějakém bodě nulovou derivaci? (1)
- Je-li $f$ spojitá v $a$, existuje $f'(a)$. (3) / Každá spojitá funkce na intervalu $I$ má v každém bodě $I$ derivaci. (1)
- Je-li $f'(a) = \infty$, pak $f$ není spojitá v $a$. (1)
- Má-li $f$ v $a$ lokální extrém, existuje $f'(a)$. (2) / Má-li $f$ v $a$ ostré lokální maximum, je $f'(a) = 0$. (1)
- Funkce $\operatorname{sgn}$ má v každém bodě derivaci. / Existuje $\operatorname{sgn}'(0)$? (2)
- Každá omezená posloupnost má všechny vybrané posloupnosti konvergentní. (varianta: „omezená posloupnost s limitou $\infty$“) (2)
- Z každé posloupnosti lze vybrat podposloupnost, která má limitu. (1)
- Každá neomezená konvergentní posloupnost má alespoň dvě různé limity. (2)
- Konvergentní posloupnost racionálních čísel má racionální limitu. (1)
- $M = \max A \Rightarrow M = \sup A$. / $i = \inf B \Rightarrow i = \min B$. (3)
- Konstantní funkce má v každém bodě globální maximum. (2) / Konstantní funkce má v každém bodě extrém. (3)
- Každá omezená funkce nabývá svého globálního minima i maxima. (2) / $f:\mathbb R\to\mathbb R$ je omezená, právě když nabývá maxima i minima. (1)
- Funkce $\arcsin$ má v některém bodě lokální extrém; $\arccos$ má v některém bodě globální extrém; $f(x) = \sqrt{-1-x^2}$ má extrém v některém / v každém bodě svého definičního oboru. (3)
- Každá ryze monotónní funkce je prostá. (1)
- $\lim_{x\to 0^+} x \ln x^2 = -\infty$. (1)
- Existuje přerovnání řady $\sum 1/n^2$ se součtem 1 (platí $\sum 1/n^2 = \pi^2/6$). (2) / Řada $\sum (-1)^n/n^2$ má přerovnání se součtem 1337. (1)
- Je-li $\lim a_n = 0$, pak $\sum a_n$ konverguje. (1) / Splňuje-li řada nutnou podmínku konvergence, nutně konverguje? (1)

**Malé úlohy**
- Teleskopický součet: $\sum_{n=1}^\infty \frac{1}{n(n+1)}$ [3 b]; naznačit důkaz divergence harmonické řady [4 b]; na protipříkladech vysvětlit, proč $\sqrt[n]{a_n} < 1$ pro všechna $n$ nestačí k rozhodnutí o konvergenci [3 b]. (3)
- Podrobně dokázat, že neexistuje $\lim_{x\to\infty} \cos x$ [4 b]; odtud neexistence $\lim_{x\to\infty}(\operatorname{arctg} x + 2\cos x)$ [2 b]; asymptota v $\infty$ funkce $\frac{3x^2+2}{x} - \ln x$ [4 b]. (1)
- Lemma o dvou policajtech **pro funkce** — zformulovat a dokázat (přes Heineho větu a policajty pro posloupnosti, nebo přímo z definice). [4–5 b] (3)
- Jsou-li všechny členy $a_n$ v intervalu $[a,b]$, $a,b>0$, pak $\lim \sqrt[n]{a_n} = 1$. [3–4 b] (2)
- $f(x) = \frac{e^x - e^{-x}}{2}$: $f$ je prostá (přes derivaci); $D(f^{-1}) = \mathbb R$; $(f^{-1})'(y_0)$ pro $y_0 = f(1)$ přes větu o derivaci inverzní funkce; rovnice tečny k $f^{-1}$ v $y_0$. [6 b] (1)

## D — těžší důkaz, výběr ze dvou (12–16 b)

- Weierstrassova věta — zformulovat a dokázat. [12 b] (4)
- Bolzanova věta — zformulovat a dokázat. [12 b] (3)
- Heineho věta — zformulovat a dokázat. [14 b] (5)
- l'Hospitalovo pravidlo „typu 0/0“ — zformulovat a dokázat. [14–16 b] (7) — **letos jen znění (Halas)**
- Bolzanova–Cauchyova podmínka pro posloupnosti: definovat a dokázat, že ji posloupnost splňuje, právě když je konvergentní. [14 b] (2) — **letos jen znění (Halas)**
- Vzorec pro derivaci složené funkce — zformulovat a přesně dokázat. [12–14 b] (2)
- Bolzanova–Weierstrassova věta — zformulovat a dokázat. [14 b] (1)

Vždy platí: „Pokud používáte nějaká pomocná tvrzení, musí být jasně patrné, že znáte jejich znění.“
