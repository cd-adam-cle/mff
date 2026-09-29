---
description: Připraví předmět na semestr podle playbooku (web kurzu → CLAUDE.md, materiály do kurz/, plan.md, kalendář)
---

Argumenty: `$ARGUMENTS` = `<ZKR> <url webu kurzu>` (např. `MA1 https://…`). Bez URL se zeptej.

Postupuj přesně podle [`00_admin/priprava_semestru.md`](../../00_admin/priprava_semestru.md), kroky 2–4, pro předmět
`01_semestr_1/<ZKR>_*` (nebo aktuální semestr). Vzor hotového předmětu: `01_semestr_1/LA1_algebra/`.

Pravidla:
1. Nejdřív stáhni a přečti web kurzu včetně podstránek, teprve pak piš. Nic nevymýšlej — co na webu není, označ „[DOPLNIT]“ nebo dej do bloku ⚠️ k ověření.
2. Materiály jen do podsložek podle původu (`kurz/`, `od_starsich/`, `jine/`). Co nejde stáhnout, vypiš, nenahrazuj.
3. Když web kurzu obsahuje pravidla pro AI nebo doporučení, jak studovat, přenes je doslova do sekce „Jak má Claude pracovat“.
4. Kalendář `.ics` generuj až po tom, co Adík potvrdí termíny (nebo označ odhadnuté „ověřit“).
5. Na konci: strom složky, co se nepodařilo, otázky k ověření. Commit až na vyzvání; aktualizuj řádek stavu v playbooku.
