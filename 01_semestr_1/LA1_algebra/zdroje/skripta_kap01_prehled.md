# LA1 — přehled kapitoly 1 skript: Opakování

Zdroj: [Barto, Tůma: Lineární algebra a geometrie](kurz/LA1_skripta_la7_barto_tuma.pdf), kap. 1, str. 5–38.
Čísla definic a tvrzení jsou podle skript. Tohle je přehled a **nenahrazuje skripta**: na zkoušce platí jejich formulace.

> **Co z toho potřebuješ:** přednáška 28. 9. bere 1.1–1.3 a 1.5. Na obou midtermech je kap. 1
> „bez důkazů a bez komplexních čísel“ (viz [CLAUDE.md](../CLAUDE.md) §3). Hlavní je tedy
> **1.5 Zobrazení** (definice a formulace tvrzení zpaměti) a umět spočítat přímku a rovinu (1.2–1.3).
> Axiom výběru na str. 37 je drobným písmem, ten se nezkouší.

## Celá kapitola ve zkratce

Kapitola připomíná tři věci, na kterých stojí zbytek LA1:

1. **Bod nebo vektor = n-tice čísel.** Množina řešení lineární rovnice je přímka nebo rovina.
   Z toho vyroste řešení soustav (kap. 2) i vektorové prostory (kap. 5).
2. **Komplexní čísla.** Vrátí se jako příklad tělesa (kap. 3).
3. **Jazyk zobrazení** (prosté, na, inverzní). Na něm stojí matice jako zobrazení (4.4),
   inverzní matice (4.5) a lineární zobrazení (kap. 6).

---

## 1.1 Základní geometrické pojmy (str. 5–7)

**Pointa:** Vektor je šipka daná směrem, délkou a orientací. Kde začíná, je jedno.

- bod + vektor = bod: $C = A + \mathbf v$; bod − bod = vektor: $\mathbf v = C - A$
- $t\mathbf v$ vektor natáhne nebo zkrátí, pro $t<0$ otočí orientaci. Sčítá se rovnoběžníkem.
  Nulový vektor jako jediný nemá směr.
- **Přímka** = bod + všechny násobky jednoho směru:
  $L = \lbrace A + t\mathbf v : t\in\mathbb R\rbrace$
- **Rovina** = bod + všechny kombinace dvou směrů, z nichž ani jeden není násobkem druhého:
  $P = \lbrace A + s\mathbf v + t\mathbf w : s,t\in\mathbb R\rbrace$

## 1.2 Analytická geometrie v rovině (str. 8–14)

**Pointa:** Po volbě souřadnic je bod i vektor jen dvojice čísel a operace se šipkami se počítají po složkách.
Přímka má dva zápisy a „vyřešit rovnici“ znamená přejít z jednoho do druhého.

- **Aritmetický vektor** = uspořádaná n-tice čísel. Tatáž dvojice $(p,q)$ může znamenat bod
  i vektor, liší se jen tím, jak ji čteme. Výhoda: dá se s nimi počítat v jakékoli dimenzi, i tam, kde už nejde kreslit.
- Vektor z $A=(a,b)$ do $C=(c,d)$ má souřadnice $(c-a,\ d-b)$.

| zápis přímky | tvar | co z něj vyčteš |
|---|---|---|
| rovnice | $ax+by=c$, kde $(a,b)\neq(0,0)$ | $(a,b)$ je **kolmý** na přímku (normála) |
| parametrický tvar | $\lbrace \mathbf u + t\mathbf v : t\in\mathbb R\rbrace$ | $\mathbf u$ = bod na přímce, $\mathbf v$ = směr |

**Postupy:**

- **rovnice → parametrický tvar** (= vyřešit rovnici, Př. 1.1): jednu neznámou vyjádři, druhou prohlas za parametr $t$ a rozepiš na „konstanta + $t\cdot$vektor“.
  $x+2y=3$: $y=t$, $x=3-2t$, tedy $(x,y) = (3,0) + t(-2,1)$.
- **dva body → parametrický tvar** (Př. 1.2): $\mathbf u = A$, $\mathbf v = C - A$.
- **parametrický tvar → rovnice** (Př. 1.2): zvol $(a,b)$ kolmý na $\mathbf v$ (skalární součin $=0$), pak dosaď bod a dopočítej $c$.
- **osa úsečky $AB$** (Př. 1.3): normála je $B-A$ a osa prochází středem $A + \tfrac12(B-A)$.

⚠️ Rovnice přímky není určená jednoznačně: můžeš ji vynásobit libovolným nenulovým číslem.
Parametrický tvar taky ne (jiný bod na přímce, jiný násobek směru). Dvě různě vypadající odpovědi můžou být obě správně.

## 1.3 Analytická geometrie v prostoru (str. 14–19)

**Pointa:** Totéž o dimenzi výš. **Jedna** rovnice o třech neznámých popisuje **rovinu**, ne přímku.
Přímka v prostoru potřebuje **dvě** rovnice.

- **Rovina:** rovnice $ax+by+cz=d$ s normálou $(a,b,c)\neq(0,0,0)$,
  parametricky $\lbrace \mathbf u + s\mathbf v + t\mathbf w : s,t\in\mathbb R\rbrace$, kde $\mathbf v,\mathbf w$ nemají stejný směr.
  - vyřešení (Př. 1.4): $x+2y-3z=4$, volíme $y=s$, $z=t$ a dostaneme
    $(4,0,0)+s(-2,1,0)+t(3,0,1)$. **Počet volných neznámých = počet parametrů = „kolik rozměrů“ má řešení.**
  - tři body $P,Q,R$ → rovina (Př. 1.5): $\mathbf u=P$, $\mathbf v=Q-P$, $\mathbf w=R-P$ (nesmí být násobky, jinak body leží na přímce).
    Rovnice: normálu $\mathbf n$ najdeš jako řešení soustavy $\mathbf n\cdot\mathbf v=0$, $\mathbf n\cdot\mathbf w=0$ (nebo vektorovým součinem), $d$ pak dosazením bodu.
- **Přímka:** parametricky stejně jako v rovině, $\lbrace\mathbf u+t\mathbf v\rbrace$ (Př. 1.6).
  Rovnicemi jako průnik dvou rovin, tedy soustava 2 rovnic o 3 neznámých (Př. 1.7).
  Je to přímka právě tehdy, když normály obou rovnic nejsou jedna násobkem druhé (roviny jsou různoběžné).
- **Co může vyjít jako množina řešení soustavy** (tohle je předobraz kap. 2):
  - 2 neznámé: $\emptyset$, bod, přímka, celá rovina
  - 3 neznámé: $\emptyset$, bod, přímka, rovina, celý prostor
  - degenerovaná rovnice $0x+0y+0z=d$: pro $d\neq 0$ je celá soustava neřešitelná, pro $d=0$ ji můžeš vynechat.

## 1.4 Komplexní čísla (str. 20–28)

> Podle plánu není na přednášce 28. 9. a není na midtermech. Hodí se v kap. 3, kde je $\mathbb C$ příklad tělesa.

**Pointa:** $\mathbb C$ jsou čísla $a+ib$, kde $i^2=-1$. Když je nakreslíš jako body roviny,
**sčítání = sčítání vektorů** a **násobení = vynásob délky a sečti úhly**.

- $(a+ib)(c+id) = (ac-bd)+i(ad+bc)$. Dělí se tak, že zlomek rozšíříš číslem komplexně sdruženým ke jmenovateli.
- **Komplexně sdružené číslo** (Def. 1.8): $\overline{c+id} = c-id$, v rovině zrcadlení podle reálné osy.
  Platí $z\bar z = c^2+d^2$, $\overline{w+z}=\bar w+\bar z$, $\overline{wz}=\bar w\,\bar z$.
- $\mathbb N\subset\mathbb Z\subset\mathbb Q\subset\mathbb R\subset\mathbb C$
- **Základní věta algebry** (V. 1.9, 1.10): každý nekonstantní polynom s komplexními koeficienty má komplexní kořen.
  Ekvivalentně: rozloží se na součin $a_n(x-z_1)(x-z_2)\cdots(x-z_n)$.
  Důsledek 1.11: polynom stupně $n$ má nejvýš $n$ různých kořenů.
- **V. 1.12:** polynom s **reálnými** koeficienty má kořeny v párech: $z$ je kořen, právě když $\bar z$ je kořen.
- **Goniometrický tvar:** $z = r(\cos\alpha + i\sin\alpha)$, kde $r=\sqrt{a^2+b^2}$ je absolutní hodnota a $\alpha=\arg z$
  (určený jen až na násobek $2\pi$).
- **Součin:** absolutní hodnoty se násobí, argumenty sčítají. Násobení číslem $i$ = otočení o 90° proti směru hodinových ručiček.
- **Moivreova věta** (V. 1.13): $(\cos\alpha+i\sin\alpha)^n = \cos n\alpha + i\sin n\alpha$.
  S Eulerovou formulí $e^{i\alpha}=\cos\alpha+i\sin\alpha$ je to jen $(e^{i\alpha})^n = e^{in\alpha}$.
- **Trojúhelníková nerovnost:** $\lvert z+w\rvert \le \lvert z\rvert + \lvert w\rvert$.

## 1.5 Zobrazení (str. 28–38) ⭐ nejdůležitější část

**Pointa:** Zobrazení $f: X\to Y$ přiřadí **každému** $x\in X$ **právě jedno** $f(x)\in Y$.
Způsob výpočtu (vzorec, tabulka, algoritmus) není součástí zobrazení. Zobrazení je jen to přiřazení
**spolu s množinami $X$ a $Y$**.

**Kdy jsou dvě zobrazení stejná:** stejné $X$, stejné $Y$ a $f(x)=g(x)$ pro všechna $x\in X$. Pasti z Př. 1.15:

- $\lvert x\rvert$ a $\sqrt{x^2}$ na $\mathbb R$ jsou **stejné** zobrazení (jiný vzorec nevadí).
- $x+1$ na $\mathbb R$ a $\frac{x^2-1}{x-1}$ na $\mathbb R\setminus\lbrace 1\rbrace$ jsou **různá** zobrazení (jiný definiční obor).
- $x^2$ jako $\mathbb R\to\mathbb R$ a jako $\mathbb R\to[0,\infty)$ jsou **různá** zobrazení (jiná cílová množina).

### Definice (umět zpaměti, celou větou)

| č. | pojem | definice | intuice |
|---|---|---|---|
| 1.19 (1) | **prosté** (injektivní) | pro všechna $x,y\in X$: $x\neq y \Rightarrow f(x)\neq f(y)$ | každé $y$ má **nejvýš jeden** vzor |
| 1.19 (2) | **na** $Y$ (surjektivní) | pro každé $y\in Y$ existuje $x\in X$ s $f(x)=y$ | každé $y$ má **aspoň jeden** vzor |
| 1.19 (3) | **vzájemně jednoznačné** (bijektivní) | prosté a zároveň na $Y$ | každé $y$ má **právě jeden** vzor |
| 1.21 | **obor hodnot** | $\operatorname{Im}(f) = \lbrace f(x) : x\in X\rbrace \subseteq Y$ | kam se reálně trefíš; $f$ je na $Y$ ⇔ $\operatorname{Im}(f)=Y$ |
| 1.23 | **obraz** množiny $A\subseteq X$ | $f(A)=\lbrace f(x) : x\in A\rbrace$ | $\operatorname{Im}(f) = f(X)$ |
| 1.24 | **(úplný) vzor** množiny $B\subseteq Y$ | $f^{-1}(B)=\lbrace x\in X : f(x)\in B\rbrace$ | všechno, co padne do $B$ (může být $\emptyset$) |
| 1.27 | **složení** $f: X\to Y$, $g: Y\to Z$ | $(g\circ f)(x) = g(f(x))$ | **nejdřív $f$, potom $g$** (čte se zprava) |
| 1.31 | **identita** | $\mathrm{id}_X: X\to X$, $\mathrm{id}_X(x)=x$ | nic nedělá |
| 1.34 | **inverzní zobrazení** | $g: Y\to X$ s $g\circ f=\mathrm{id}_X$ **a zároveň** $f\circ g=\mathrm{id}_Y$; značí se $f^{-1}$ | vrátí každý prvek zpátky |
| 1.36 | **inverzní zleva / zprava** | platí jen $g\circ f = \mathrm{id}_X$ / jen $f\circ g=\mathrm{id}_Y$ | polovina inverze |

### Tvrzení (formulace umět, důkazy na midterm ne)

- **1.28** Skládání je asociativní: $h\circ(g\circ f) = (h\circ g)\circ f$.
- **1.32** $\mathrm{id}_Y\circ f = f = f\circ \mathrm{id}_X$.
- **1.33 + 1.35** $f$ má inverzní zobrazení ⇔ $f$ je vzájemně jednoznačné.
- **1.37** $f$ je invertovatelné ⇔ je invertovatelné zleva i zprava.
  Trik z důkazu (stojí za zapamatování): $g = g\circ\mathrm{id}_Y = g\circ(f\circ h) = (g\circ f)\circ h = \mathrm{id}_X\circ h = h$.
- **1.38** ($X, Y$ neprázdné) $f$ je prosté ⇔ má levý inverz; $f$ je na ⇔ má pravý inverz.
- **1.39** $X, Y$ konečné se stejným počtem prvků: $f$ je prosté ⇔ $f$ je na.
  Pro nekonečné množiny to neplatí (Př. 1.40 na $\mathbb N_0$: $n\mapsto n+1$ je prosté, ale ne na;
  $n\mapsto\lfloor n/2\rfloor$ je na, ale ne prosté).

Všechno dohromady:

```
prosté        ⇔  existuje levý inverz   (g∘f = id_X)
na            ⇔  existuje pravý inverz  (f∘g = id_Y)
prosté i na   ⇔  existuje inverze (oboustranná)
```

### Na co si dát pozor

- **Úplný vzor $f^{-1}(B)$ není inverzní zobrazení $f^{-1}$.** Značí se stejně, ale úplný vzor existuje pro **každé** zobrazení,
  inverzní zobrazení jen pro vzájemně jednoznačné.
- **Jestli je $f$ prosté nebo na, záleží na $X$ a $Y$** (Př. 1.20): $x\mapsto\lvert x\rvert$ jako $\mathbb R\to\mathbb R$ není prosté ani na,
  jako $\mathbb R\to[0,\infty)$ už je na.
- **V $g\circ f$ se jako první použije $f$.** Záleží na pořadí: $g\circ f$ obecně není $f\circ g$.
- **Jak dokázat, že $f$ je prosté:** předpokládej $f(x)=f(y)$ a odvoď $x=y$ (Př. 1.40).
  **Že je na:** vezmi libovolné $y\in Y$ a najdi $x$ s $f(x)=y$.
  **Vyvrátit** stačí jedním konkrétním protipříkladem.
- Sekce 1.5 je ve skriptech ještě rozpracovaná (Př. 1.26 a 1.30 jsou jen „TODO“), takže tam nic nechybí tobě.

---

## Kam to vede

- 1.2–1.3 → **kap. 2**: Gaussova eliminace je systematická verze „vyjádři a dosaď“, výsledek se píše v parametrickém tvaru; 2.5 = geometrie soustav.
- „bod + kombinace vektorů“ a „počet parametrů“ → **kap. 5**: lineární obal, podprostor, báze, dimenze.
- 1.4 → **kap. 3**: $\mathbb C$ jako těleso.
- 1.5 → **4.4** matice jako zobrazení, **4.5** inverzní matice, **kap. 6** lineární zobrazení.
- **MA1:** prostá funkce, funkce „na“, inverzní funkce, definiční obor jsou tytéž pojmy (viz [mapa pojmů](../../../80_mapa_matematiky/pojmy.md)).

## Rychlý self-test (bez řešení, odpovědi si pak zkontrolujeme spolu)

1. **Ano/ne:** Množinou řešení každé rovnice $ax+by+cz=d$, kde $(a,b,c)\neq(0,0,0)$, je rovina v prostoru.
2. **Ano/ne:** Zobrazení $f:\mathbb N_0\to\mathbb N_0$, $f(n)=2n$ je na $\mathbb N_0$.
3. **Definice:** prosté zobrazení; úplný vzor množiny.
4. **Příklad:** zobrazení $\mathbb R\to\mathbb R$, které je na, ale není prosté.
5. **Formulace:** jak souvisí prostota s levým inverzem (Tvrzení 1.38)?
6. **Počítání:** parametrický tvar přímky $2x-y=4$; rovnice roviny přes $(1,0,0)$, $(0,1,0)$, $(0,0,1)$.
