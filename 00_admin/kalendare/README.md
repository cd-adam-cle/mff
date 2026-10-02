# Kalendáře k importu

Každý soubor = jeden kalendář v Apple Kalendáři (Soubor → Importovat, při dotazu zvolit **nový kalendář**).
Díky tomu se dají barvit a vypínat zvlášť a při změně režimu se starý kalendář smaže a naimportuje nový.

| Soubor | Kalendář | Co | Zdroj |
|---|---|---|---|
| [`rezim_skola.ics`](rezim_skola.ics) | Režim – škola | výuka s adresami budov | generuje `scripts/tydenni_rezim_ics.py` |
| [`rezim_beh.ics`](rezim_beh.ics) | Režim – běh | ranní běhy po dnech | generuje `scripts/tydenni_rezim_ics.py` |
| [`rezim_posilovna.ics`](rezim_posilovna.ics) | Režim – posilovna | po Karlín, út Waltrovka, pá Butovice, so volitelná | generuje `scripts/tydenni_rezim_ics.py` |
| [`rezim_plavani.ics`](rezim_plavani.ics) | Režim – plavání | út 6:30 Tyršův dům (Etriatlon, trenér), st 19:30 TV Hostivař | generuje `scripts/tydenni_rezim_ics.py` |
| [`rezim_uceni.ics`](rezim_uceni.ics) | Režim – učení | bloky učení a odevzdání DÚ | generuje `scripts/tydenni_rezim_ics.py` |
| [`rezim_ostatni.ics`](rezim_ostatni.ics) | Režim – ostatní | pá 15:30 doučování němčiny Kladno, ne 9:00 kostel | generuje `scripts/tydenni_rezim_ics.py` |
| [`LA1_pripominky_kvizy_skripta.ics`](LA1_pripominky_kvizy_skripta.ics) | LA1 připomínky | kvízy (po 12:00), čtení skript (ne 18:00), midtermy, příprava na cvičení | ručně, podle webu kurzu |
| [`LA1_pripominky_domaci_ukoly.ics`](LA1_pripominky_domaci_ukoly.ics) | LA1 DÚ | odevzdání DÚ (st 23:55) + připomínka 2 dny předem | ručně, podle webu kurzu |

Režim běží od po 5. 10. 2026 do pá 8. 1. 2027 (konec výuky), svátky a imatrikulace jsou vyřazené.
Rozpis a zdůvodnění: [`../tydenni_rezim.md`](../tydenni_rezim.md). Po změně režimu: upravit skript → `python3 scripts/tydenni_rezim_ics.py`
→ v Kalendáři smazat staré kalendáře „Režim – …“ a naimportovat znovu.
