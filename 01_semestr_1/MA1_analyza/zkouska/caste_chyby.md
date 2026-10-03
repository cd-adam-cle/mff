# MA1 — časté chyby a rady (digest)

Zdroje 🎓: Rmoutil, [Časté chyby a různá doporučení](kurz/MA1_rmoutil_caste_chyby.pdf) (8 str., z písemek 2021/22) a
[Požadavky ke zkoušce](kurz/MA1_pozadavky_ke_zkousce_rmoutil_2023.pdf) (rady k početní části). Používat při `/kontrola` a před každou písemkou.
Moje vlastní opakované chyby patří do [`../../../80_mapa_matematiky/chyby.md`](../../../80_mapa_matematiky/chyby.md).

## Limity obecně
- **„Částečné limitění“ / dosazení limity podvýrazu** — nejčastější hrubá chyba, obvykle ztráta většiny bodů. Ochrana: používat jen věty z přednášky a psát, kterou.
- **Předčasné použití VOAL**: rozdělit limitu na součin/součet limit smím, jen když má pravá strana smysl ($\infty\cdot 0$, $\infty-\infty$ nesmí vzniknout). Zbytečné je to vždy — výrazy lze upravovat „v rámci jedné limity“.
- Rovnítko není oddělovač kroků. Každá rovnost ve výpočtu musí platit.
- Limitu posloupnosti lze přes **Heineho větu** převést na limitu funkce (nahradit $n$ za $x$); existuje-li limita funkce, existuje i původní a je stejná.
- V písemce nepsat dlouhé komentáře; stačí naznačit, jaká tvrzení/věty používám a jak.

## Limita funkce — VOLSF
- U **známých limit** typu $0/0$ nebo $\infty/\infty$ (např. $\frac{\sin y}{y}$ v nule) nelze použít podmínku (S) (spojitost vnější funkce — není v bodě definovaná). Musí se ověřit **podmínka (P)**: $\exists \delta>0\ \forall x\in P(a,\delta): g(x)\ne b$.
- Aspoň jednou v písemce VOLSF **rozepsat**: co je vnější funkce, co vnitřní, proč platí (P) resp. (S). Opakované stejné použití už rozepisovat netřeba.
- Chybějící závorky: $\frac{a^2-b^2}{x} \ne \frac{a-b}{x}\,a+b$. $\arcsin x \ne \frac{1}{\sin x}$.

## Derivace
- **Derivovat mechanicky a spolehlivě** („jako když bičem mrská“) — vzorec má zabrat pár vteřin, čas pak jde na body platnosti, jednostranné derivace, problematické body.
- Po aplikaci vzorců **neztrácet čas úpravami**, pokud se ptají jen na derivaci; upravovat až když potřebuju znaménko (průběh) nebo limitu derivace.
- $(\cos x)' = -\sin x$ — pozor na znaménko. $f''(x) = (f'(x))' = (\cos x)' = -\sin x$, ne „$f''(x) = \cos x = -\sin x$“.
- $\frac{1}{(x^2-1)^2}$ derivovat jako složenou funkci $(x^2-1)^{-2}$, ne jako podíl.
- **Absolutní hodnota přes sgn**: $|x|' = \operatorname{sgn} x$ pro $x\ne0$; např. $(|\sin x|)' = \operatorname{sgn}(\sin x)\cos x$, $(e^{6x}|x^2-1|)' = 6e^{6x}|x^2-1| + e^{6x}\operatorname{sgn}(x^2-1)\,2x$ mimo nulové body výrazu v absolutní hodnotě.

## Řady
- Limitní srovnávací kritérium: $\lim \frac{a_n}{b_n} \in (0,\infty)$ ⇒ obě řady „se chovají stejně“; ukázat výpočet té limity.
- **Relativní konvergence** = konverguje ∧ nekonverguje absolutně ($RK \Leftrightarrow K \wedge \neg AK$). „Nekonverguje relativně“ tedy **neznamená** diverguje (může konvergovat absolutně).
- **Leibnizovo kritérium je jen jedna implikace** a mluví jen o konvergenci, ne o relativní (o absolutní nic neříká). Nemonotónní $a_n$ ⇏ řada nekonverguje.
- Dosazení monotónní posloupnosti do klesající funkce obrací monotonii — hodí se při ověřování Leibnize.
- Nutnou podmínku konvergence netřeba explicitně ověřovat, když je splněna („řada možná konverguje“ nic neříká); když splněna není, napsat to — řada diverguje.

## Průběh funkce
- Nezapomenout **určit $D(f)$ a body (ne)spojitosti** (dělení nulou, sgn v předpisu); mít v nich jasno dopředu.
- **Uměle dodefinovaný bod** (např. $f(0)=\pi/2$) **patří do $D(f)$** — nevyřazovat ho.
- Definiční obor lichých odmocnin je celé $\mathbb R$: $D(\sqrt[3]{\cdot}) = \mathbb R$.
- Intervaly monotonie přes znaménko derivace ve všech bodech, kde je definovaná; u absolutní hodnoty přes sgn.
- Vyšetřit vše ze zadání: limity v krajních bodech a bodech nespojitosti, jednostranná spojitost a derivace, lokální extrémy, monotonie, konvexita, inflexní body, obor hodnot, asymptoty + náčrt grafu, který souhlasí s výpočty.

## Důkazy (teoretická část)
- V důkazu typu „$\forall \varepsilon>0 \dots$“ **nejdřív zvolit pevné libovolné $\varepsilon$** („dané nepřítelem“) a dál s ním pracovat jako s konstantou; teprve pak hledat $n_0$. Nelze používat $n_1$, které „existuje pro každé $\varepsilon$“, jako by už bylo zvolené.
- Alternativní důkazy jsou povolené, ale musí být správné a vycházet z tvrzení, která dokazované **přirozeně předcházejí** (např. jiná definice spojitosti než na přednášce = problém).
- Používám-li pomocná tvrzení, musí být vidět, že znám jejich znění.
- Neznalost **klíčového pojmu** (definice limity, derivace, sup/inf…) = neúspěšná zkouška bez ohledu na body.
