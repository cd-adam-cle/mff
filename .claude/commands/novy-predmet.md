---
description: Založí nový předmět (složky, šablona _info.md, řádek v _prehled.md)
argument-hint: <název předmětu>
---
Založ nový předmět: `$ARGUMENTS`.

1. Když chybí zkratka, zakončení, vyučující nebo semestr, zeptej se mě. **Nevymýšlej je.**
   Když znám kód předmětu nebo mám uložený sylabus ze SISu, vytáhni údaje odtamtud.
2. Navrhni název složky `<ZKR>_<nazev>` (malá písmena, bez diakritiky) a počkej na potvrzení.
3. Vytvoř `0N_semestr_N/<ZKR>_<nazev>/` s podsložkami `prednasky/img`, `cviceni/img`, `ukoly/img`,
   `zkouska/img`, `zdroje/` (do prázdných dej `.gitkeep`) a soubory `zkouska/{pisemky,otazky,tahak}.md`.
4. `_info.md` vyplň podle šablony z CLAUDE.md.
5. Přidej řádek do `_prehled.md` daného semestru a přepočítej kredity.
6. Když má předmět něco v `90_od_starsich/prvak_index.md`, zkopíruj to podle kroku inventury a aktualizuj stav v indexu.
7. Commit: `<ZKR>: nový předmět`.
