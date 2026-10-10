# LA1 — kapitola 2 skript: Řešení soustav lineárních rovnic

Zdroj: [Barto, Tůma: Lineární algebra a geometrie](kurz/LA1_skripta_la7_barto_tuma.pdf), kap. 2, str. 39–62.
Čísla definic a tvrzení jsou podle skript. Tohle je **rešerše typů úloh a uvažování za nimi**, **nenahrazuje skripta**: na zkoušce platí jejich formulace.

> **Co z toho potřebuješ:** přednáška týdne 5. 10. bere (2.1), 2.2–2.5. 2.1 je motivace, 2.6 (numerika) je drobným písmem a nezkouší se.
> Na midtermy patří kap. 2 celá, i s důkazy (viz [CLAUDE.md](../CLAUDE.md) §3). Zpaměti: Def. 2.9, 2.14, 2.17, 2.21, Tvrzení 2.10, Věta 2.16, Věta 2.20.

## Celá kapitola ve zkratce

Kapitola dělá tři věci:

1. **Modelování (2.1):** reálná úloha → soustava lineárních rovnic.
2. **Algoritmus (2.3–2.4):** soustava → odstupňovaný tvar → zpětná substituce → parametrický tvar $\{\mathbf u + \sum t_p \mathbf v_p\}$.
3. **Geometrie (2.5):** dva pohledy, co množina řešení je (řádky = průnik nadrovin) a kdy existuje (sloupce = lineární kombinace).

Jedna myšlenka drží všechno pohromadě: **soustavu měníme jen úpravami, které nemění množinu řešení**, dokud z ní řešení nejde přímo vyčíst.

---

## 2.1 Úlohy vedoucí na soustavy (str. 39–45) — šest typů modelování

Společný postup u všech šesti: **1) co je neznámá, 2) každá podmínka je lineární v neznámých → jedna rovnice.** U každé úlohy si všimni, *proč* je podmínka lineární a co se stane, když lineární není.

| § | Úloha | Neznámé | Odkud rovnice | Klíčová úvaha |
|---|---|---|---|---|
| 2.1.1 | Kružnice třemi body $A=(-1,2)$, $B=(1,0)$, $C=(3,1)$ | střed $(x,y)$ | střed leží na ose $AB$ i na ose $BC$ (postup z Př. 1.3: normála $= B-A$, dosadit střed úsečky) | geometrická konstrukce → algebra. Osy $2x-2y=-2$, $2x+y=9/2$ → $S=(7/6,13/6)$ |
| 2.1.2 | Vyčíslení $\mathrm{C_7H_8 + HNO_3 \to C_7H_5O_6N_3 + H_2O}$ | počty molekul $x,y,z,v$ | **bilance:** počet atomů každého prvku vlevo = vpravo | pravé strany jsou 0 (homogenní soustava); smysl mají jen nezáporná řešení → lineární programování |
| 2.1.3 | Řízení tělesa po přímce | síly $x_1,\dots,x_8$ | konečná rychlost $=\sum x_j$, konečná poloha $=\sum \tfrac{2(8-j)+1}{2}x_j$ | **superpozice:** účinky sil se sčítají → lineární. 2 rovnice, 8 neznámých → mnoho řešení („6 stupňů volnosti“), vybírá se nejlepší (min. energie → kvadratické programování) |
| 2.1.4 | Navigace z majáků (zjednodušená GPS) | poloha $(p,q)$ | průsečík kružnic = soustava **kvadratických** rovnic | **linearizace:** kružnici nahradíme tečnou, vyřešíme lineární soustavu, opakujeme (iterace). Nejde převést přímo, protože kvadratická soustava může mít **2** řešení, lineární jen 0, 1 nebo ∞ |
| 2.1.5 | Neznámá závaží na páce | hmotnosti $h,c$ | rovnováha momentů v každé ze dvou poloh | ustálený (rovnovážný) systém → lineární podmínky |
| 2.1.6 | Proudy v obvodu | smyčkové proudy $I_1,I_2,I_3$ | 2. Kirchhoffův zákon + Ohmův zákon pro každou smyčku | 3 rovnice, 3 neznámé, právě jedno řešení; kontrola 1. Kirchhoffovým zákonem |

Kontrast stojí za zapamatování: u kružnice (2.1.1) jde kvadratickou úlohu převést na lineární, u majáků (2.1.4) ne. **Otázka k samostatnému studiu 2.1** chce, abys zjistil proč. Nápověda: dosaď $A,B,C$ do $(x-a)^2+(y-b)^2=r^2$ a zkus rovnice od sebe **odečíst**. Co zmizí? A proč stejný trik nezaručí totéž u majáků?

**Otázka 2.2** (konvergence navigace): ke kterému ze dvou průsečíků kružnic se iterace blíží? Souvisí to s volbou počátečního odhadu $R_0$.

---

## 2.2 Soustavy a aritmetické vektory (str. 45–46)

**Definice 2.3.** Lineární rovnice o $n$ neznámých: $a_1x_1+\dots+a_nx_n=b$, $a_i,b\in\mathbb R$. Soustava $m$ rovnic o $n$ neznámých má koeficienty $a_{ij}$, **$i$ = rovnice (řádek), $j$ = neznámá (sloupec)**. Řešení = $n$-tice splňující **všechny** rovnice zároveň.

**Definice 2.4.** Aritmetický vektor nad $\mathbb R$ s $n$ složkami = uspořádaná $n$-tice reálných čísel, psaná **sloupcově** (řádkově s $^T$: $(1,-33,5)^T$).

**Definice 2.5.** Sčítání (jen pro stejný počet složek) a násobení číslem **po složkách**; $-\mathbf u=(-1)\mathbf u$, $\mathbf u-\mathbf v=\mathbf u+(-\mathbf v)$.

Pointa: řešení soustavy je **jeden** vektor $\in\mathbb R^n$, množina řešení je podmnožina $\mathbb R^n$. Díky operacím s vektory ji pak zapíšeme parametricky.

---

## 2.3 Ekvivalentní a elementární úpravy (str. 46–51)

**Definice 2.7.** Ekvivalentní úprava = nemění množinu všech řešení.

### Typ úvahy: dosazování → přičtení násobku (Př. 2.8)

Soustava $x_1+2x_2=3,\ 3x_1-x_2=2$. Ze SŠ: vyjádřit $x_1=3-2x_2$ a dosadit. Skripta ukážou, že výsledek je **totéž jako přičíst $(-3)$-násobek 1. rovnice ke 2.** Odtud pravidlo: **nevyjadřovat a nedosazovat, jen přičítat násobky.** Vyjde $-7x_2=-7$, $x_2=1$, $x_1=1$, řešení $\{(1,1)^T\}$.

Proč je úprava ekvivalentní: je **vratná**, ze nové soustavy jde odvodit původní.

**Definice 2.9.** Elementární úpravy: (i) prohození dvou rovnic, (ii) vynásobení rovnice **nenulovým** $t$, (iii) přičtení $t$-násobku jedné rovnice k **jiné** rovnici.

**Tvrzení 2.10.** Elementární úpravy nemění množinu všech řešení.

*Struktura důkazu (vzor, který se v LA opakuje):* $S$ = řešení původní, $T$ = řešení nové soustavy.
1. Každá úprava mění nejvýš jednu rovnici.
2. $S\subseteq T$: řešení splňuje $i$-tou i $j$-tou rovnici, tedy i „$j$-tá + $t\cdot i$-tá“.
3. $T\subseteq S$: úprava jde vrátit elementární úpravou (prohodit zpět, vynásobit $t^{-1}$, přičíst $(-t)$-násobek), takže krok 2 platí i obráceně.

👉 K zamyšlení: kde v důkazu se použije $t\neq0$ a kde $j\neq i$? Najdi protipříklad bez každé z podmínek.

### Typ příkladu A: právě jedno řešení (2.3.1)

$$\begin{aligned}2x_1+6x_2+5x_3&=0\\3x_1+5x_2+18x_3&=33\\2x_1+4x_2+10x_3&=16\end{aligned}$$

Uvažování:
1. **Připravit si hezký pivot:** 3. rovnici $\times\tfrac12$ a prohodit s 1. → první řádek začíná jedničkou, nebudou zlomky. (Není nutné, jen pohodlné.)
2. **Eliminovat $x_1$** pod pivotem: $(-3)\times$ ř.1 k ř.2, $(-2)\times$ ř.1 k ř.3.
3. **První řádek už nesahat**, opakovat na zbytku: $2\times$ ř.2 k ř.3.
4. Odstupňovaný tvar → **zpětná substituce** odspodu: $x_3=2$, $x_2=-3$, $x_1=4$.

Cíl eliminace = **odstupňovaný tvar** (každá další rovnice má na začátku víc nulových koeficientů).

### Maticový zápis (Def. 2.11, 2.12)

**Definice 2.11.** Matice typu $m\times n$ = obdélníkové schéma reálných čísel, $m$ řádků, $n$ sloupců; $A=(a_{ij})_{m\times n}$, $a_{ij}$ v $i$-tém řádku a $j$-tém sloupci.

**Definice 2.12.** Matice soustavy $A$, vektor pravých stran $\mathbf b$, rozšířená matice $(A\mid\mathbf b)$ typu $m\times(n+1)$. Úpravy rovnic = úpravy řádků; $\sim$ značí „vzniklo ekvivalentní úpravou“. Později (kap. 4): soustava = hledání všech $\mathbf x$ s $A\mathbf x=\mathbf b$.

### Typ příkladu B: jeden parametr → přímka (2.3.3)

$$\left(\begin{array}{ccc|c}1&4&3&11\\1&4&5&15\\2&8&3&16\end{array}\right)\sim\left(\begin{array}{ccc|c}1&4&3&11\\0&0&2&4\end{array}\right)$$

Uvažování:
- **Nulový řádek** $0x_1+0x_2+0x_3=0$ se vynechá. Není to elementární úprava, ale je ekvivalentní: rovnici splní každý vektor.
- Ve 2. sloupci **není pivot** → $x_2$ jde volit libovolně: **parametr** $x_2=t$. Pak $x_3=2$, $x_1=5-4t$.
- **Proč parametrem $x_2$ a ne $x_1$?** Volba $x_1=s$ tady taky funguje, ale **selže, kdyby koeficient u $x_2$ v 1. rovnici byl 0**. Volba „parametr = sloupec bez pivotu“ funguje vždy (obecně v 2.4).
- **Rozepsat do vektorů:**
$$\begin{pmatrix}5-4t\\t\\2\end{pmatrix}=\begin{pmatrix}5\\0\\2\end{pmatrix}+t\begin{pmatrix}-4\\1\\0\end{pmatrix}$$
  Teď je vidět, **co** to je: přímka bodem $(5,0,2)^T$ se směrovým vektorem $(-4,1,0)^T$.

### Typ příkladu C: víc parametrů (2.3.4), 5 neznámých

$$\left(\begin{array}{ccccc|c}0&0&1&0&2&-3\\2&4&-1&6&2&1\\1&2&-1&3&0&2\end{array}\right)\sim\left(\begin{array}{ccccc|c}1&2&-1&3&0&2\\0&0&1&0&2&-3\\0&0&0&0&0&0\end{array}\right)$$

Uvažování:
1. První řádek začíná nulou → **prohodit řádky**, aby nahoře byl nenulový prvek.
2. **Pivoty** = první nenulové prvky řádků (sloupce 1 a 3). **Bázové proměnné** $x_1,x_3$, **volné** $x_2,x_4,x_5$.
3. Volné = parametry $t_2,t_4,t_5$; bázové dopočítat zpětnou substitucí: $x_3=-3-2t_5$, $x_1=-1-2t_2-3t_4-2t_5$.
4. Rozepsat:
$$\mathbf x=\begin{pmatrix}-1\\0\\-3\\0\\0\end{pmatrix}+t_2\begin{pmatrix}-2\\1\\0\\0\\0\end{pmatrix}+t_4\begin{pmatrix}-3\\0\\0\\1\\0\end{pmatrix}+t_5\begin{pmatrix}-2\\0\\-2\\0\\1\end{pmatrix}$$

**Kontrola, kterou se vyplatí dělat vždy:**
- $\mathbf u$ = řešení pro **všechny parametry = 0** → dosaď do původní soustavy.
- U $\mathbf v_p$ je na pozici „své“ volné proměnné **1** a na pozicích ostatních volných **0**. Když to tak není, je chyba v rozepsání.

---

## 2.4 Gaussova eliminační metoda (str. 52–57) — jádro kapitoly

**Definice 2.13.** Elementární řádkové úpravy matice: (i) prohození dvou řádků, (ii) vynásobení řádku nenulovým číslem, (iii) přičtení libovolného násobku jednoho řádku k jinému. Teď už pro **jakoukoliv** matici, nejen rozšířenou. (Cvičení ve skriptech: (i) jde složit z (ii) a (iii). Zkus si to.)

**Definice 2.14.** $C=(c_{ij})_{m\times n}$ je v (řádkově) odstupňovaném tvaru, pokud existuje $r\in\{0,\dots,m\}$ takové, že řádky $r+1,\dots,m$ jsou nulové, řádky $1,\dots,r$ nenulové a $k_1<k_2<\dots<k_r$, kde $k_i=\min\{l: c_{il}\neq0\}$. Prvky $c_{i,k_i}$ jsou **pivoty**.

Důsledek: nad nenulovým řádkem nikdy není nulový řádek.

**Př. 2.15** — typy na rozpoznávání (dobré na „ano/ne“):
- ✅ nulová matice; $\begin{pmatrix}1&7&2\\0&3&1\\0&0&7\end{pmatrix}$; matice, kde pivoty „skáčou“ o víc sloupců.
- ❌ $\begin{pmatrix}0&0&0\\0&0&1\end{pmatrix}$ (nulový řádek nad nenulovým); $\begin{pmatrix}1&7&2\\0&0&1\\0&0&7\end{pmatrix}$ (dva pivoty v jednom sloupci); $\begin{pmatrix}2&3&1\\0&3&1\\0&2&0\end{pmatrix}$ (pod pivotem 3 zbyla 2).

### Algoritmus (eliminace jednoho sloupce)
1. Najdi první nenulový sloupec $k_1$. Není → matice je nulová, hotovo.
2. Je-li $a_{1k_1}=0$, prohoď 1. řádek s řádkem, kde $a_{ik_1}\neq0$.
3. Pro $i=2,\dots,m$ přičti $\left(-\dfrac{a_{ik_1}}{a_{1k_1}}\right)$-násobek 1. řádku k $i$-tému.
4. Opakuj na matici **bez prvního řádku**.

Není to jednoznačný algoritmus, nepředepisuje se, který řádek v kroku 2 zvolit (souvisí s numerikou, 2.6).

**Věta 2.16.** Gaussova eliminace převede každou matici typu $m\times n$ do odstupňovaného tvaru.

*Důkaz indukcí podle počtu řádků $m$:*
- $m=1$: eliminace nic nedělá, jeden řádek je vždy v odstupňovaném tvaru.
- Krok: nulová matice je hotová. Jinak po eliminaci $k$-tého sloupce (matice $B$) jsou pod pivotem samé nuly. Na zbylých $m-1$ řádcích použij indukční předpoklad → $C$ v odstupňovaném tvaru, jeho první nenulový sloupec má index $l>k$. Vrácením 1. řádku $B$ nahoru dostaneš odstupňovaný tvar.

Typ úvahy: **„udělej jeden krok, zbytek je menší instance téhož problému“**. Totéž jako rekurze v programování.

**Definice 2.17.** **Hodnost** $\operatorname{rank}(A)$ = počet nenulových řádků matice v odstupňovaném tvaru získané z $A$ Gaussovou eliminací. Sloupce $A$ s indexy $k_1,\dots,k_r$ jsou **bázové sloupce**.
(Že to nezávisí na průběhu eliminace, se dokáže až později. Zatím se to bere jako fakt.)

**Pozorování 2.18.** $\operatorname{rank}(A)\le m$ a $\operatorname{rank}(A)\le n$.
*Úvaha:* nenulových řádků nemůže být víc než řádků; každý nenulový řádek má pivot a pivoty jsou v různých sloupcích, takže jich není víc než sloupců.

### Typ úvahy: je soustava řešitelná? (2.4.2)

Eliminuj **celou** $(A\mid\mathbf b)\to(C\mid\mathbf d)$ a podívej se, jestli je **sloupec pravých stran bázový**:
- **ano** → poslední nenulový řádek je $(0\ \dots\ 0\mid d_r)$, $d_r\neq0$, tedy rovnice $0=d_r$ → **neřešitelná**;
- **ne** → řešitelná, pokračuj zpětnou substitucí.

### Zpětná substituce (2.4.3)

$P=\{1,\dots,n\}\setminus\{k_1,\dots,k_r\}$ = indexy volných proměnných (může být $\emptyset$). Každý řádek $(C\mid\mathbf d)$ vyjádří svou bázovou proměnnou pomocí proměnných napravo od ní; odspodu se postupně dosazuje.

**Pozorování 2.19.** Není-li sloupec pravých stran bázový, pak pro **libovolné** hodnoty $x_p\in\mathbb R$, $p\in P$, existují **jednoznačně určené** hodnoty bázových proměnných, se kterými je $\mathbf x$ řešením.

**Věta 2.20.** Množina všech řešení řešitelné soustavy $(A\mid\mathbf b)$ o $n$ neznámých je
$$S=\Big\{\mathbf u+\sum_{p\in P}t_p\mathbf v_p : t_p\in\mathbb R\ \text{pro každé } p\in P\Big\}$$
pro vhodné $n$-složkové vektory $\mathbf u$, $\mathbf v_p$. Geometricky: „rovný útvar“, $\mathbf u$ je jeho bod, $\mathbf v_p$ směry.

Z toho plyne fakt, se kterým se pracuje pořád: **řešitelná soustava má buď právě jedno řešení ($P=\emptyset$), nebo nekonečně mnoho ($P\neq\emptyset$).** Nikdy ne právě dvě (srov. majáky 2.1.4).

### Shrnutí postupu (2.4.4) — recept na početní úlohu

1. Gaussovou eliminací na odstupňovaný tvar.
2. Řádek $0=d\neq0$? → neřešitelná, konec.
3. Volné proměnné = sloupce bez pivotu.
4. Zapsat $\{\mathbf u+\sum t_p\mathbf v_p\}$.

Počet parametrů je $n-r$ → množina řešení je „$(n-r)$-rozměrný“ útvar. Proto intuitivně hodnost nezávisí na způsobu eliminace: dimenze množiny řešení závisí jen na soustavě.

---

## 2.5 Geometrie soustav (str. 57–61) — dva pohledy

### Řádkový pohled (2.5.1): každá rovnice = útvar, řešení = jejich průnik

- **2 neznámé**, netriviální rovnice = přímka. Řešení: celá rovina (jen $0=0$) / přímka (všechny rovnice jsou násobky jedné) / bod / $\emptyset$ (rovnoběžky, tři přímky bez společného bodu, rovnice $0=123$).
- **3 neznámé**, rovnice = rovina. Řešení: prostor / rovina / přímka / bod / $\emptyset$ (rovnoběžné roviny, nebo aspoň tři po dvou různoběžné bez společného bodu, nebo $0=123$).
- **$n$ neznámých:** netriviální rovnice = **nadrovina** (útvar dimenze $n-1$), řešení = průnik nadrovin.

Říká **jak množina řešení může vypadat**.

### Sloupcový pohled (2.5.2): soustava = otázka „trefím se do $\mathbf b$?“

$$x_1\begin{pmatrix}-1\\2\end{pmatrix}+x_2\begin{pmatrix}3\\-1\end{pmatrix}=\begin{pmatrix}1\\3\end{pmatrix}$$
Hledáme násobky sloupců matice, jejichž součet je $\mathbf b$. Řešení $(2,1)^T$. Sloupce tu nemají stejný směr, takže se jimi dá trefit **do každého** bodu roviny, a to jednoznačně → soustava je řešitelná pro každou pravou stranu.

**3 rovnice, 2 neznámé:** $x_1(1,2,3)^T+x_2(3,2,1)^T=\mathbf b$. Kombinace dvou vektorů v $\mathbb R^3$ tvoří jen **rovinu přes počátek** → řešitelné právě když $\mathbf b$ v té rovině leží. Pro $\mathbf b=(-5,-2,1)^T$ platí $1\cdot\mathbf a_1-2\cdot\mathbf a_2=\mathbf b$ → řešitelná.

**Definice 2.21 (nejdůležitější definice kurzu podle skript).** Jsou-li $\mathbf u_1,\dots,\mathbf u_n$ $m$-složkové vektory a $a_1,\dots,a_n\in\mathbb R$, pak **lineární kombinace** vektorů $\mathbf u_1,\dots,\mathbf u_n$ s koeficienty $a_1,\dots,a_n$ je vektor $a_1\mathbf u_1+\dots+a_n\mathbf u_n$.

Přepis soustavy: $x_1\mathbf a_1+\dots+x_n\mathbf a_n=\mathbf b$, kde $\mathbf a_j$ je $j$-tý sloupec $A$.
→ **Soustava je řešitelná ⇔ $\mathbf b$ je lineární kombinací sloupců matice soustavy.** Řešení = vektory koeficientů všech takových kombinací.

### K čemu který pohled (2.5.3)
- **řádky** → *jak vypadá* množina řešení (průnik nadrovin);
- **sloupce** → *kdy* je soustava řešitelná ($\mathbf b$ je lineární kombinace sloupců).

Sloupcový pohled bude důležitější: vede na lineární obal, nezávislost a bázi (kap. 5) a na matici jako zobrazení (4.4).

---

## Tahák: typy úvah z kapitoly 2

| Situace | Úvaha |
|---|---|
| Převést slovní úlohu | neznámé → každá lineární podmínka (bilance, rovnováha, superpozice, geometrická podmínka) = rovnice |
| Nelineární úloha | zkusit **odečíst rovnice** (kvadratické členy zmizí), jinak **linearizovat** a iterovat |
| Dokázat, že úprava nemění řešení | $S\subseteq T$ + vratnost ⇒ $T\subseteq S$ |
| Eliminace | hezký pivot nahoru (prohodit / vynásobit), vynulovat pod ním, hotový řádek už nesahat |
| Nulový řádek $0=0$ | vynechat |
| Řádek $0=d\neq0$ | neřešitelná |
| Volba parametrů | sloupce **bez pivotu**, ne libovolná proměnná |
| Zapsat řešení | $\mathbf u$ (parametry = 0) $+\sum t_p\mathbf v_p$; kontrola dosazením $\mathbf u$ a struktury 1/0 ve $\mathbf v_p$ |
| Počet řešení | 0, 1, nebo ∞; parametrů je $n-r$ |
| Kdy je řešitelná | sloupec pravých stran není bázový ⇔ $\mathbf b$ je lineární kombinace sloupců $A$ |
| Dokázat něco pro všechny matice | indukce podle počtu řádků (Věta 2.16) |

## Souvislosti
- **MA1 / PRG1:** důkaz Věty 2.16 je indukce = rekurze nad menší maticí.
- **Kap. 4:** $(A\mid\mathbf b)$ → $A\mathbf x=\mathbf b$; matice jako zobrazení $\mathbf x\mapsto A\mathbf x$, obor hodnot = všechny lineární kombinace sloupců.
- **Kap. 5:** hodnost a „dimenze množiny řešení $n-r$“ se dokážou pořádně.
- **Finance / optimalizace:** 2.1.2 a 2.1.3 jsou první setkání s lineárním a kvadratickým programováním (optimální portfolio = kvadratické programování s lineárními omezeními).
