# Příprava semestru — playbook

Postup, kterým jsme připravili ZS 2026/27 (vzor: LA1, 29. 9. 2026). Použít znovu před LS 2026/27 a každým dalším
semestrem, ať nevymýšlíme znovu, co má být hotové. Spouští se příkazem `/pripravit-predmet <ZKR> <url webu kurzu>`
pro každý předmět; kroky 1 a 5 jsou pro celý semestr.

Stav ZS 2026/27: LA1 ✅ · MA1 ⬜ · UCE ⬜ · PRG1 ⬜ · PROS ⬜ · RIZ ⬜ (⬜ = jen `_info.md`, chybí kroky 2–4)

## 1. Před semestrem (celý semestr najednou)

- [ ] Nová složka `0N_semestr_N/` s `_prehled.md` (předměty, kódy, rozsah, zakončení, kredity, podmínky) — vzor [`01_semestr_1/_prehled.md`](../01_semestr_1/_prehled.md).
- [ ] Každý předmět založit přes `/novy-predmet` (složky `prednasky/ cviceni/ ukoly/ zkouska/ zdroje/` + `_info.md`, uložený sylabus ze SISu do `zdroje/sis/`).
- [ ] Export rozvrhu ze SISu (CSV) → `00_admin/rozvrh_sis_export.csv` → přepsat do [`rozvrh.md`](rozvrh.md). Zkontrolovat kódy předmětů a paralelky (ZS: nesouhlasil NMAG111/113).
- [ ] [`harmonogram.md`](harmonogram.md): začátek a konec výuky, svátky, zkouškové, termíny ze všech předmětů.
- [ ] Inventura od starších: projít [`90_od_starsich/prvak_index.md`](../90_od_starsich/prvak_index.md), zkopírovat co patří k předmětům semestru do `zkouska/od_starsich/` a `zdroje/od_starsich/`, index aktualizovat.
- [ ] Projít, co se má smazat z kořenového `CLAUDE.md` (sekce bootstrap) a aktualizovat README (tabulka předmětů).

## 2. Pro každý předmět: kontext od vyučujícího (tok 🎓 `kurz/`)

Vstup od Adíka: **odkaz na web kurzu** + co řekl vyučující na první přednášce (organizace, doporučení, AI).

- [ ] Stáhnout web kurzu (curl) a vytáhnout: pravidla zápočtu a zkoušky, body, termíny, plán po týdnech s kapitolami, odkazy na materiály, pravidla pro AI.
  Podstránky (midtermy, požadavky) taky. Google Drive stahovat přes `https://drive.usercontent.google.com/download?id=<ID>&export=download`, název souboru z `<title>` stránky `/file/d/<ID>/view`.
- [ ] Stáhnout do `kurz/` podsložek: skripta a sbírky → `zdroje/kurz/`, sady ke cvičením (zadání + řešení) → `cviceni/kurz/`, zadání DÚ → `ukoly/kurz/`, vzory testů a písemek → `zkouska/kurz/`. Názvy `<ZKR>_<co>_<rok>.pdf`. Ověřit `file` (že to je PDF) a limit 50 MB. Duplicity s tím, co už v repu je, řešit `git mv`, ne kopií.
- [ ] Napsat **`CLAUDE.md` předmětu** podle vzoru [`01_semestr_1/LA1_algebra/CLAUDE.md`](../01_semestr_1/LA1_algebra/CLAUDE.md). Sekce: hierarchie zdrojů · týdenní cyklus · body a podmínky · plán kurzu · jak má Claude pracovat (pravidla AI od vyučujícího!) · původ materiálů · struktura složky · konzultace · doporučení. Nahoře blok ⚠️ „k ověření“ pro cokoli, co nesedí.
- [ ] `_info.md` přepsat: odkaz na CLAUDE.md nahoře, fakta ze SISu, literatura se značkami 🎓/👵/🔎, cvičící, web kurzu.
- [ ] Indexy: `cviceni/sady.md` (číslo → téma → týden; ověřit posun číslování sad vůči přednáškám z názvů PDF), `zkouska/pisemky.md` (sloupec Původ), `kvizy/kvizy.md` nebo obdoba pro průběžné body, kostry `cv01.md`, `du01.md`.
- [ ] **`plan.md`** předmětu: týden po týdnu s daty, tématy, kapitolami, sadami, kvízy, DÚ, testy + zaškrtávací tracker. Vzor [`01_semestr_1/LA1_algebra/plan.md`](../01_semestr_1/LA1_algebra/plan.md). Nepotvrzené termíny označit `?`.
- [ ] Zkontrolovat relativní odkazy skriptem (žádný rozbitý), commitnout česky a konkrétně.

## 3. Pro každý předmět: kalendář

- [ ] Vygenerovat `00_admin/<ZKR>_pripominky.ics` podle vzoru [`LA1_pripominky.ics`](LA1_pripominky.ics): každý typ události zvlášť
  (čtení skript 2 dny před přednáškou · kvíz/test s upozorněním den před · DÚ s upozorněním 2 dny a 6 h před · příprava na cvičení · midtermy/zápočtové písemky den před · opravné termíny).
  Potvrzené termíny jako jednotlivé události, odhadnuté jako týdenní řada s poznámkou „ověřit“ a EXDATE pro prázdné týdny.
- [ ] Adík naimportuje do samostatného kalendáře (jde smazat najednou). Odkaz na `.ics` do `harmonogram.md`.

## 4. Pro každý předmět: zápis do společných souborů

- [ ] Kořenový `CLAUDE.md`: doplnit předmět do věty „CLAUDE.md zatím má: …“.
- [ ] `README.md`: řádek předmětu v tabulce (co v repu je), odkaz na CLAUDE.md místo `_info.md`.
- [ ] `_prehled.md`: odkaz na CLAUDE.md, poznámka, otevřené otázky (⚠️).
- [ ] `80_mapa_matematiky/souvislosti.md`: pokud vyučující zmínil návaznosti na jiné předměty.

## 5. Průběžně během semestru

- [ ] Každý týden zkontrolovat web kurzu (nové kvízy, DÚ, změny termínů) → `plan.md`, `harmonogram.md`, `.ics`.
- [ ] Po prvním cvičení potvrdit cvičícího a čas, po prvním testu doplnit reálnou strukturu do `zkouska/`.
- [ ] Před koncem semestru: zapsat do `_prehled.md`, co bylo splněno, a do tohoto souboru, co v postupu chybělo.

## Co v ZS 2026/27 zdrželo (poučení)

- Export rozvrhu ze SISu měl jiný kód a paralelku, než web kurzu — **ověřit zápis v SISu hned první týden.**
- Google Drive přes `uc?export=download` vracel 400, funguje `drive.usercontent.google.com`.
- Číslování sad ke cvičením bylo posunuté o týden proti přednáškám (sada 01 = opakování) — číst názvy v PDF, ne hádat z tabulky.
- Materiály od starších a z webu se pletly dohromady → konvence `kurz/ od_starsich/ jine/` (kořenový CLAUDE.md, bod 5).
