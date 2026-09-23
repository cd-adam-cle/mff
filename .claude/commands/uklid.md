---
description: Audit struktury repa — duplicity, špatné názvy, nezmenšené obrázky, přeplněné složky
---
Projdi repo a najdi, co nesedí s pravidly v CLAUDE.md. **Nejdřív jen navrhni, nic neměň.**

Kontroluj:
- **duplicity:** stejný obsah pod víc jmény (`shasum` na binárky mimo `90_od_starsich/prvak_original/`, kde jsou kopie záměrné);
- **názvy:** diakritika, mezery, velká písmena, chybějící prefix předmětu u obrázků a PDF;
- **zařazení:** soubor v jiném předmětu nebo typu, než kam obsahem patří; obrázek mimo `img/`;
- **nezmenšené obrázky:** `find . -path ./tools -prune -o \( -iname '*.jpg' -o -iname '*.png' -o -iname '*.heic' \) -size +500k -print`
  (výjimka: `00_pripravny_kurz/tabule/` a `media/` — ty jsou schválně 3200 px);
- **soubory nad 50 MB** kdekoliv;
- **rozbité odkazy:** relativní odkazy v `.md`, které nevedou na existující soubor;
- **přeplněné složky:** víc než ~30 souborů v jedné složce → navrhni rozdělení;
- **aktuálnost:** `_prehled.md` a `_info.md` proti tomu, co v předmětech opravdu je;
- **`_inbox/`:** něco, co tam leží víc než týden.

Výstup: tabulka `problém → soubor → navržená oprava`. Po mém OK oprav přes `git mv`.
Smazání duplicity dej do samostatného commitu se zprávou, co a proč. Nejasné věci přesuň do `_archiv/`.
