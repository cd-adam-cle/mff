# Pojmy a věty napříč předměty

Definice a věty, které se objevují ve víc předmětech nebo se vracejí později
(i ve financích). U každé položky: přesné znění (LaTeX), kde se vyskytla
(odkaz na soubor), s čím souvisí.

<!-- Formát:
## Název pojmu
$$ definice $$
- Výskyt: [MA1 p03](../01_semestr_1/MA1_analyza/prednasky/p03.md), [LA1 cv05](…)
- Souvisí: …
-->

## Zobrazení: prosté, na, vzájemně jednoznačné, inverzní
$f: X\to Y$ je **prosté**, když $x\neq y \Rightarrow f(x)\neq f(y)$; **na** $Y$, když pro každé $y\in Y$ existuje $x\in X$ s $f(x)=y$;
**vzájemně jednoznačné**, když je prosté i na. **Inverzní** zobrazení $g=f^{-1}$ splňuje $g\circ f=\mathrm{id}_X$ a $f\circ g=\mathrm{id}_Y$
a existuje právě pro vzájemně jednoznačná $f$. (Skripta LA1, Def. 1.19, 1.34, Tvrzení 1.35.)
- **Vzor a obraz:** obraz prvku $x$ je $f(x)$; vzor prvku $y$ je každé $x$ s $f(x)=y$. Pak: prosté = každé $y$ má *nejvýše jeden* vzor,
  na = každé $y$ má *aspoň jeden* vzor, bijekce = *právě jeden*. Vzor množiny $f^{-1}(B)=\{x: f(x)\in B\}$ existuje vždy, i bez inverze.
  Pozor: „na“ závisí na volbě $Y$ ($e^x$ není na $\mathbb{R}$, ale je na $(0,\infty)$).
- Výskyt: [LA1 přehled kap. 1](../01_semestr_1/LA1_algebra/zdroje/skripta_kap01_prehled.md)
- Souvisí: MA1 (prostá funkce, inverzní funkce, definiční obor); LA1 4.5 inverzní matice, kap. 6 lineární zobrazení
