# Lineární algebra 1 — NMAG113 (ZS 2026/27)

> **Tento soubor je pro LA1 nadřazený všemu ostatnímu v této složce, kořenovému `CLAUDE.md`
> i obecným znalostem o lineární algebře.** Když se cokoli rozchází, platí:
> **skripta** > web kurzu > tento soubor > `_info.md` > cokoli jiného.

- Přednášející (garant): doc. Jan Šťovíček
- Web kurzu (zdroj pravdy pro termíny a pravidla): <https://www.karlin.mff.cuni.cz/~stovicek/index.php/cs/2627zs-nmag111>
  - podstránka k midtermům: <https://www.karlin.mff.cuni.cz/~stovicek/index.php/cs/2627zs-nmag111-midtermy>
- Kód předmětu: **NMAG113** (Finanční matematika). NMAG111 je pro obecnou matematiku, MMIT a modelování.
  Přednáška i cvičení jsou společné, **liší se zkouška** (viz níž).
- Cvičení: **čt 14:00–15:30, N4, Michal Janík** (paralelka x11, podle exportu rozvrhu ze SISu)

> ⚠️ **K OVĚŘENÍ v SISu (Adík):**
> 1. Export rozvrhu (`00_admin/rozvrh_sis_export.csv`) uvádí přednášku jako **NMAG111, paralelka p2,
>    David Stanovský, T2/T1 (Troja)**. V SISu jsou dvě paralelky přednášky: p1 Šťovíček (N1, Karlín)
>    a p2 Stanovský (T2/T1, Troja). Web kurzu výše je Šťovíčkův. Zkontroluj, (a) že máš zapsaný kód
>    **NMAG113**, ne NMAG111, a (b) na kterou přednášku reálně chodíš — podle toho se opraví rozvrh.
> 2. Cvičící a čas cvičení potvrdit po 1. cvičení (čt 1. 10.).

---

## 1. Zdroje — hierarchie

1. **Skripta L. Barto, J. Tůma: Lineární algebra a geometrie** —
   [`zdroje/kurz/LA1_skripta_la7_barto_tuma.pdf`](zdroje/kurz/LA1_skripta_la7_barto_tuma.pdf)
   (443 str., LA1 = kapitoly 1–7; zdroj <https://www.mff.cuni.cz/data/web/obsah/department_math/ka/skripta_la7.pdf>).
   Obsahují **všechno, co je ke zkoušce potřeba**. Terminologie, definice, značení i formulace vět
   se berou odsud, ne ze zápisu na tabuli a ne z obecné znalosti. Části psané drobným písmem se nezkouší.
2. **Sady ke cvičením** (zadání + vzorová řešení) — [`cviceni/kurz/`](cviceni/kurz/), přehled v
   [`cviceni/sady.md`](cviceni/sady.md). Všech 13 sad je stažených z webu kurzu (verze 26. 9. 2025).
3. Záznamy přednášek (M365 SharePoint, odkaz na webu kurzu) + stream z N1 v čase přednášky
   (<https://www.mff.cuni.cz/cs/verejnost/multimedia/n1-stream>). Přepis z videa: `tools/bin/media grab`
   → `media/la1-<tema>/` (viz kořenový CLAUDE.md).
4. Sbírka přímočarých početních úloh (ZS 14/15) —
   [`zdroje/kurz/LA1_primocare_ulohy_2014.pdf`](zdroje/kurz/LA1_primocare_ulohy_2014.pdf). Tohle „je nezbytně nutné umět“.
5. Staré písemky a vzory: [`zkouska/pisemky.md`](zkouska/pisemky.md).
6. Doplňkové zdroje (3Blue1Brown Essence of Linear Algebra, Strang, Hefferon, Hladík…) — jen na
   intuici, **ne jako autorita**. Seznam je na konci webu kurzu.
7. Úvaha J. Hrnčíře „Co je dobré vědět, když se pouštím do studia matematiky na MFF“ —
   [`zdroje/kurz/LA1_hrncir_jak_studovat_na_mff.pdf`](zdroje/kurz/LA1_hrncir_jak_studovat_na_mff.pdf) (doporučeno na webu kurzu).

## 2. Týdenní cyklus (týden X = týden přednášky na dané téma)

| Kdy | Co |
|---|---|
| **před přednáškou (týden X)** | Letmo přečíst kapitoly skript k tématu (plán níž). Cíl: orientace + připravit si otázky. Nečekat, že rozumím všemu. |
| **přednáška, út 10:40–12:10 + st 12:20–13:50** | Látka podruhé. Přednáška ≠ výklad skript: nejtěžší pojmy, motivace, aplikace, dotazy z kvízů. |
| **po přednášce** | Skripta podruhé, podrobně, do plného porozumění. |
| **kvíz — do pondělí 12:00 týdne X+1** | 4 otázky abc, samostatně jen s materiály. 2 body za 4/4, 1 bod za 3/4. Při odeslání lze položit otázku přednášejícímu. Kvíz 1 slouží i k volbě přezdívky do tabulky bodů. |
| **cvičení (týden X+1), čt 14:00** | Cvičení je na látku z minulého týdne. **Před cvičením** vypracovat základní úlohy ze sady (a zkusit i těžší). Na cvičení řešit, co nešlo, a ptát se na nejasnosti ve skriptech — cvičení je i konzultace. |
| **DÚ — do středy 23:55 týdne X+2** | 2 úlohy × 4 body, občas bonus (nepočítá se). Odevzdání do Sovičky (<https://owl.mff.cuni.cz/>, „Login by CAS“, poprvé enroll link z webu kurzu), každá úloha do svého topicu, **PDF** (příp. PNG/JPG). Odpovědi je nutné **dokázat**, správnost argumentace > správnost výsledku. Zpětnou vazbu k opravě řeší cvičící, ne Sovička. |

Číslování v repu: **sada N = cvičení N = `cviceni/cvNN.md`**; cvičí se v týdnu N a pokrývá přednášku týdne N−1
(sada 01 = opakování SŠ geometrie, bez přednášky; sada 02 Zobrazení = přednáška z 28. 9.). DÚ N = `ukoly/duNN.md`, kvízy = `kvizy/kvizy.md`.

## 3. Body a podmínky

**Zápočet**
- 12 sad, každá max 10 b (kvíz 2 + DÚ 8). Dvě nejhorší sady se škrtají.
- Ze zbylých 10 sad je potřeba **≥ 70 bodů** (ze 100). Žádné omluvy (ani nemoc), od toho je škrtání.
- Záchrana: **zápočtový test po 11. 1. 2027, 9:00, K2** (přihlášení v SISu) — 8 přímočarých početních
  příkladů, 90 min, potřeba ≥ 60 %. Body z DÚ a kvízů u testu nehrají roli.
  Vzor: [`zkouska/kurz/LA1_zapocet_vzor_2022.pdf`](zkouska/kurz/LA1_zapocet_vzor_2022.pdf).

**Midtermy** — **st 18. 11.** a **st 16. 12.**, místo přednášky, 90 min. Nelze opakovat. Bez kalkulačky, tabulek, softwaru a AI.
- 1. midterm: kapitoly 2, 3, 4 (+ kap. 1 bez důkazů a bez komplexních čísel).
- 2. midterm: kapitoly 2, 3, 4, 5 (+ kap. 1 stejně).
- Početní úlohy = základní úlohy ze sad, obtížností „spíš začátek sady“.
- Struktura pro NMAG113 (celkem 44 b): 3× ano/ne po 2 b · 2× definice po 3 b · 3 příklady „zpaměti“ (2×3 b) ·
  2× formulace věty po 3 b · 1 početní úloha s postupem 7 b · 1 jednoduchý důkaz 5 b · 1 úloha na zamyšlení 8 b.
  (NMAG111: totéž, ale 1×5 b početní, 2×5 b důkazy, 2×6 b zamyšlení, celkem 51 b.)
- Vzory: [`zkouska/kurz/LA1_midterm2_vzor_2016-12-15.pdf`](zkouska/kurz/LA1_midterm2_vzor_2016-12-15.pdf),
  [`zkouska/kurz/LA1_midterm2_vzor_2021-12-15_reseni.pdf`](zkouska/kurz/LA1_midterm2_vzor_2021-12-15_reseni.pdf)
  + Šťovíčkovy midtermy 2020 v `zkouska/od_starsich/LA1_zt*`.
- **Vyplatí se je psát dobře**: známka = lepší z (samotná písemka, vážený průměr 15 % M1 + 35 % M2 + 50 % zkouška).

**Zkouška NMAG113** — písemná, termíny v SISu, **2,5 h**, celkem **86 b**; první část (úlohy 1–4) se odevzdává
po 75 min nebo při prvním opuštění posluchárny:

| b | co |
|---|---|
| 8 | 4× ano/ne, bez zdůvodnění |
| 12 | 4× definice pojmu |
| 15 | 5× jednoduchý příklad, stačí výsledek |
| 12 | 4× formulace tvrzení |
| 21 | 3× početní příklad s postupem |
| 10 | 2× důkaz jednoduššího tvrzení |
| 8 | 1× úloha na zamyšlení |

Známky: **3 ≥ 47 b, 2 ≥ 58 b, 1 ≥ 68 b.** Zastoupení témat odpovídá času na přednášce. Testuje se hlavně
znalost pojmů, vztahy mezi nimi a **korektní matematický jazyk** (celé věty, všechny předpoklady,
vysvětlené značení, pozor na kvantifikátory). Početní úlohy = základní úlohy ze sad.
(NMAG111: 3 h, 100 b, víc důkazů; 3 ≥ 55, 2 ≥ 68, 1 ≥ 80.)

## 4. Plán kurzu

| Týden od | Téma přednášky | Kapitoly skript | Sada na cvičení (čt) | Kvíz do | DÚ do |
|---|---|---|---|---|---|
| 28. 9. | Úvod, analytická geometrie, zobrazení | 1.1–1.3, 1.5 | 01 opakování geometrie | po 5. 10. 12:00 | — |
| 5. 10. | Soustavy lineárních rovnic | (2.1), 2.2–2.5 | 02 zobrazení (z 28. 9.) | | DÚ 1: st 14. 10. |
| 12. 10. | Tělesa, úvod k maticím | 3.1–3.4, (3.5), 4.1, 4.2 | 03 soustavy | | |
| 19. 10. | Matice soustavy rovnic, matice jako zobrazení | 4.3, 4.4 | 04 tělesa a matice | | |
| 26. 10. | *přednášky nejsou* (imatrikulace út, svátek st) | | 05 matice soustavy a zobrazení | | |
| 2. 11. | Inverzní a regulární matice, vektorové prostory | 4.5, 5.1, 5.2 | 06 regulární matice | | |
| 9. 11. | Lineární (ne)závislost, báze, Steinitzova věta | 5.3, 5.4.1 | 07 vektorové prostory | | |
| 16. 11. | út 17. 11. svátek, **st 18. 11. 1. midterm** | | 08 lin. (ne)závislost | | |
| 23. 11. | Báze jako souřadnice, matice přechodu (na webu poznámka „čt“ — ověřit) | 5.4.2, 5.4.3 | 09 báze | | |
| 30. 11. | Hodnost, průnik a součet podprostorů, lineární zobrazení | 5.5, 5.6, 6.1, 6.2 | 10 báze – pokračování | | |
| 7. 12. | Skládání lin. zobrazení, typy, jádro a obraz | 6.3–6.5 | 11 lineární zobrazení | | |
| 14. 12. | Permutace, motivace k determinantům, **st 16. 12. 2. midterm** | 7.1, 7.2 | 12 typy a prostory lin. zobrazení | | |
| 4. 1. | Determinanty, vlastnosti, výpočet, adjungovaná matice | 7.3–7.5 | 13 permutace a determinanty | *kvíz není* | |

Kvízy a DÚ pro další týdny se objevují průběžně na webu kurzu — **každý týden zkontrolovat a doplnit
termíny sem a do `00_admin/harmonogram.md`.** Kvíz 1: <https://forms.gle/yVMthHL4yhmnGsaeA>.

## 5. Jak má Claude v tomto předmětu pracovat

- **Vždy vycházet ze skript.** Definice, značení a formulace vět citovat nebo parafrázovat ze skript
  (uvádět číslo kapitoly/definice/věty). Při nejasnosti se do skript podívat, ne hádat. Když se moje
  zápisky z přednášky liší od skript, upozornit a držet se skript.
- **Učení, ne odpovědi.** U sad, při učení i při kontrole řešení: navádět, ptát se, najít a ukázat
  **první chybu** — **neukazovat hned celé řešení**. Řešení až na výslovné vyžádání („ukaž řešení“)
  nebo po vlastním pokusu. Explicitní feedback vyučujících: AI má tendenci vysypat řešení příliš brzy,
  což rozbíjí učení.
- **Vzorová řešení sad** (`cviceni/kurz/*_reseni.pdf`) Claude neotvírá a necituje, dokud Adík
  nemá v `cviceni/cvNN.md` vlastní pokus u dané úlohy. Potom slouží ke kontrole.
- **AI je vítaná** pro porozumění skriptům, vysvětlení, hledání chyb, zrychlení učení, nápovědy k sadám.
  Oficiální doporučení UK: <https://www.ai.cuni.cz/AI-81.html>.
- **Kvízy**: podle pravidel kurzu samostatně, jen s materiály. Claude do kvízů nezasahuje; po odevzdání
  klidně rozebereme, co jsem nevěděl (`kvizy/kvizy.md`).
- **Domácí úkoly**: podle pravidel kurzu **bez AI** a bez ukazování řešení spolužákům (nápadně podobná
  řešení = odebrání bodů oběma). Adík si to hlídá sám. Když se na DÚ zeptá, Claude připomene, že DÚ je
  měřítko toho, co umí (a že body se dají dohnat), a pomůže maximálně obecným vysvětlením pojmu ze skript,
  ne vedením k řešení konkrétní úlohy. Po termínu odevzdání platí normální režim.
- **Midtermy a zkouška**: trénovat formát — definice a věty celou větou, jednoduché důkazy, ano/ne
  s protipříkladem. `/zkouska LA1` vychází ze `zkouska/` a z tohoto souboru.
- Cíl práce s Claudem: nadhled nad celou LA, propojování kapitol (a s MA1, financemi →
  `80_mapa_matematiky/`), příprava na formát zkoušky, korektní jazyk.

## 6. Původ materiálů — dva toky

Každá typová složka má podsložky podle **původu**. Co je v `kurz/`, pochází od přednášejícího nebo z webu kurzu
a je **autoritativní** (hierarchie skripta > web > tento soubor platí jen pro tento tok). Všechno ostatní je doplněk.
Moje texty (`.md`, `img/`) leží vždy přímo v typové složce, nikdy v podsložce původu.

| Značka | Podsložka | Co |
|---|---|---|
| 🎓 | `kurz/` | od profesora / z webu kurzu: skripta, sady, DÚ, vzory testů, doporučené texty |
| 👵 | `od_starsich/` | materiály od starších ročníků (z `90_od_starsich/`) |
| 🔎 | `jine/` | co si najdu sám: Strang, 3Blue1Brown, cizí skripta… |

Stejné značky se používají v indexech (`sady.md`, `zkouska/pisemky.md`, `_info.md`).

## 7. Struktura složky

```
LA1_algebra/
├── CLAUDE.md            ← tento soubor (nadřazený), obsah jen z toku 🎓
├── _info.md             ← fakta ze SISu, literatura se značkami původu, „co mi dělá problém“
├── prednasky/           p01.md … (moje zápisky po týdnech) + img/
├── cviceni/
│   ├── sady.md          přehled sad: číslo → téma → týden
│   ├── kurz/            🎓 LA1_sadaNN_zadani.pdf + LA1_sadaNN_reseni.pdf
│   └── cv01.md …        Zadání (odkaz na sadu) → Moje řešení → Poznámky / chyby + img/
├── ukoly/
│   ├── kurz/            🎓 LA1_duNN_zadani.pdf
│   └── duNN.md          moje řešení + odevzdané PDF + img/
├── kvizy/               kvizy.md — log kvízů: termín, body, co jsem nevěděl
├── zkouska/
│   ├── kurz/            🎓 vzory midtermů a zápočtového testu
│   ├── od_starsich/     👵 písemky 2020/21 od třeťačky
│   └── pisemky.md, otazky.md, tahak.md + img/
└── zdroje/
    ├── kurz/            🎓 skripta, sbírka přímočarých úloh, Hrnčíř
    ├── od_starsich/     👵
    ├── jine/            🔎
    └── sis/             uložený sylabus
```

## 8. Konzultace

Individuálně e-mailem nebo osobně, přednostně u cvičícího na cvičení (nebo ho požádat o konzultaci).
Přijít s konkrétními dotazy ke skriptům nebo s úlohami, které jsem sám zkoušel. Konzultace není doučování.

## 9. Doporučení od vyučujících (obecná)

- Kurz studovat **aktivně a průběžně** od začátku, témata na sebe silně navazují.
- Na zrychlení uvažování v algoritmizaci se doporučuje zapsat si Programování 2.
