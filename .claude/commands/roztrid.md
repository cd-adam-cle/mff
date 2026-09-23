---
description: Roztřídí nové soubory z _inbox/ do předmětů (zmenšení, přejmenování, přepis do markdownu)
---
Roztřiď všechno, co je v `_inbox/`, podle workflow „Třídění `_inbox/`“ v CLAUDE.md. `_inbox/_nejasne/` ani `.gitkeep` neber.

Postup:
1. `ls -la _inbox/`. Když je prázdný, řekni to a skonči.
2. Obrázky nejdřív zmenši: `uv run scripts/optimize_images.py _inbox/`.
   Originály skončí v `_inbox/_raw/` (je v .gitignore). Po úspěšném roztřídění je smaž.
   Fotky **tabule z přednášky** zmenšuj přes `tools/bin/media photos _inbox/` (3200 px), ne na 1600.
3. U každého souboru zjisti, co to je: otevři ho (`Read` — obrázek vidíš, PDF čteš po stránkách).
   Urči předmět (podle `01_semestr_1/_prehled.md`), typ (přednáška / cvičení / úkol / písemka / zdroj) a týden.
   Týden odvoď z obsahu a z data pořízení, ne z pořadí souborů.
4. Přejmenuj podle konvence (`LA1_cv03_reseni_1.jpg`, `MA1_zk_2025-01_pisemka.pdf`) a přesuň:
   obrázky do `<ZKR>/<typ>/img/`, PDF do `<ZKR>/zdroje/` nebo `<ZKR>/zkouska/`. Chybějící složky založ.
5. Obsah přepiš do odpovídajícího `.md` (`cviceni/cv03.md` …) v LaTeXu, strukturou
   **Zadání → Moje řešení → Poznámky / chyby → obrázky**, a vlož relativní odkaz na obrázek.
   Když soubor `.md` už existuje, doplň ho, nepřepisuj. Co na fotce nejde přečíst, označ `[nečitelné]`, nedomýšlej.
6. Co nejde jednoznačně zařadit, přesuň do `_inbox/_nejasne/` a na konci se zeptej.
7. Když se objeví nový termín (písemka, odevzdání), zapiš ho do `00_admin/harmonogram.md`.
8. Commit: `inbox: 4 fotky → LA1/cviceni, 1 PDF → MA1/zdroje`. Na větvi session otevři PR.
9. Na konci napiš krátký souhrn: co kam šlo a co čeká v `_nejasne/`.
