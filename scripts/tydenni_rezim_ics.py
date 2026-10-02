#!/usr/bin/env python3
"""Vygeneruje kalendáře týdenního režimu (00_admin/tydenni_rezim.md) do 00_admin/kalendare/:

  rezim_skola.ics      výuka s adresami
  rezim_beh.ics        běh
  rezim_posilovna.ics  posilovna
  rezim_plavani.ics    plavání (út Tyršův dům s trenérem, st TV Hostivař)
  rezim_uceni.ics      bloky učení a odevzdání

Jeden kalendář na kategorii, aby se daly v Kalendáři barvit a vypínat zvlášť. Připomínky LA1 (kvízy, DÚ, skripta)
jsou v LA1_pripominky_*.ics. Týdenní opakování od pondělí 5. 10. 2026 do pátku 8. 1. 2027 (konec výuky), s výjimkami
(27. 10. imatrikulace, 28. 10. a 17. 11. svátek). Importovat do Kalendáře jako samostatný kalendář,
aby se dal celý smazat/nahradit, až režim přepíšeme.

Použití:  python3 scripts/tydenni_rezim_ics.py
"""
from datetime import date, datetime, timedelta
from pathlib import Path
from uuid import uuid5, NAMESPACE_URL

OUTDIR = Path(__file__).resolve().parent.parent / "00_admin" / "kalendare"
KALENDARE = {"skola": "Režim – škola", "beh": "Režim – běh", "posilovna": "Režim – posilovna", "plavani": "Režim – plavání", "uceni": "Režim – učení"}
FIRST_MONDAY = date(2026, 10, 5)
UNTIL = "20270108T235959"  # lokální čas, Europe/Prague
TZ = "Europe/Prague"

KARLIN = "MFF UK Karlín, Sokolovská 83, Praha 8"
KEKARLOVU = "MFF UK, Ke Karlovu 3, Praha 2"
TROJA = "MFF UK Troja, V Holešovičkách 2, Praha 8"
KTV = "Sportovní centrum UK, Bruslařská 1132/10, Praha 10"
FF_BUT = "Form Factory Butovice, Radlická 117, Praha 5"
FF_KAR = "Form Factory Karlín, Praha 8"
MAXFIT = "Max Fitness Waltrovka, Walterovo nám., Praha 5"
TYRS = "Tyršův dům, Újezd 450/40, Praha 1"
DOMA = "doma"

# (kalendář, den 0=po, start, konec, název, místo, popis, exdates)
E = []
KAT = "skola"


def ev(day, start, end, title, loc="", desc="", ex=()):
    E.append((KAT, day, start, end, title, loc, desc, ex))


# --- škola (ověřený rozvrh: LA1 přednášky Stanovský v Troji, TV = plavání st 19:30) ---
ev(0, "09:00", "10:30", "🏫 UCE přednáška K1", KARLIN)
ev(0, "15:40", "17:10", "🏫 RIZ přednáška K1", KARLIN)
ev(1, "10:40", "12:10", "🏫 LA1 přednáška T2 (Stanovský)", TROJA, "autem, odjezd 10:00", ex=("20261027", "20261117"))
ev(2, "09:50", "11:20", "🏫 MA1 přednáška M1", KEKARLOVU, "MHD, odjezd 8:55", ex=("20261028",))
ev(2, "12:20", "13:50", "🏫 LA1 přednáška T1 (Stanovský)", TROJA, "18. 11. a 16. 12. midterm", ex=("20261028",))
ev(2, "15:40", "17:10", "🏫 MA1 cvičení N2 (Borji)", KARLIN, ex=("20261028",))
ev(3, "09:00", "10:30", "🏫 UCE cvičení K1", KARLIN)
ev(3, "11:30", "13:00", "🏫 PROS cvičení K5", KARLIN)
ev(3, "14:00", "15:30", "🏫 LA1 cvičení N4 (Janík)", KARLIN)
ev(3, "15:40", "17:10", "🏫 PRG1 cvičení N11", KARLIN)
ev(4, "12:20", "13:50", "🏫 MA1 přednáška M1", KEKARLOVU, "MHD, odjezd 11:25")

# --- plavání ---
KAT = "plavani"
ev(1, "06:30", "07:30", "🏊 plavání Etriatlon (trenér)", TYRS, "autem, odjezd 6:00; brýle, pullbuoy, ploutve; rezervace.etriatlon.cz", ex=("20261027", "20261117"))
ev(2, "19:30", "20:15", "🏊 plavání (TV)", KTV, "autem, odjezd 18:50; plavky!", ex=("20261028",))

# --- běh ---
KAT = "beh"
ev(0, "06:15", "07:15", "🏃 běh 60 lehký", DOMA)
ev(1, "08:00", "09:15", "🏃 běh 75 lehký/střední (po plavání)", DOMA)
ev(2, "06:15", "07:15", "🏃 běh 60 lehký", DOMA)
ev(3, "06:15", "07:15", "🏃 běh 60 lehký (v 6-běhovém týdnu volno)", DOMA)
ev(4, "06:45", "08:45", "🏃 běh 90–120 dlouhý/tempo", DOMA)
ev(5, "07:00", "09:00", "🏃 dlouhý běh 120", DOMA)
ev(6, "07:30", "08:45", "🏃 běh 60–75 lehký (nebo volno)", DOMA)

# --- posilovna ---
KAT = "posilovna"
ev(0, "10:45", "11:45", "🏋️ posilovna FF Karlín (jen pokud členství platí; jinak večer Butovice)", FF_KAR)
ev(1, "12:45", "13:45", "🏋️ posilovna Waltrovka", MAXFIT, "autem z Troje")
ev(4, "15:15", "16:15", "🏋️ posilovna FF Butovice", FF_BUT, "parkování zdarma 2 h")
ev(5, "17:30", "18:30", "🏋️ volitelná 4. posilovna", FF_BUT)

# --- učení ---
KAT = "uceni"
ev(0, "12:45", "15:30", "📚 LA1 skripta / sada; UCE opakování", KARLIN)
ev(0, "19:00", "20:30", "📚 MA1 příprava na st cvičení", DOMA)
ev(1, "14:45", "17:15", "📚 DÚ LA1 dokončit (termín st 23:55)", DOMA)
ev(1, "17:45", "19:15", "📚 MA1 úlohy na st; sada LA1 na čt", DOMA)
ev(1, "20:00", "21:00", "📚 PRG1 DÚ / UCE na čt", DOMA)
ev(2, "14:25", "15:30", "📚 oběd + dojet úlohy na MA1 cvičení", KARLIN)
ev(2, "18:00", "18:50", "📬 odevzdat DÚ LA1 (Sovička) + večeře", DOMA)
ev(2, "21:00", "22:00", "📚 zápisky z přednášek, otázky", DOMA)
ev(3, "10:30", "11:30", "📚 UCE dodělat / PROS připravit", KARLIN)
ev(3, "19:00", "20:30", "📚 PRG1 DÚ; LA1 cvičení → cvNN.md", DOMA)
ev(4, "09:30", "11:15", "📚 MA1 před přednáškou; UCE", DOMA)
ev(4, "16:45", "18:45", "📚 LA1 sada na čt; týdenní revize", DOMA)
ev(5, "10:00", "13:00", "📚 LA1 skripta podrobně + sada; MA1 těžší úlohy", DOMA)
ev(5, "15:00", "17:00", "📚 UCE / PRG1 DÚ / RIZ", DOMA)
ev(6, "10:00", "13:00", "📚 LA1 kvíz (do po 12:00) + MA1 na st", DOMA)
ev(6, "17:00", "19:00", "📚 skripta před přednáškou; plán týdne", DOMA)


def esc(s):
    return s.replace("\\", "\\\\").replace(",", "\\,").replace(";", "\\;")


def main():
    stamp = datetime.now().strftime("%Y%m%dT%H%M%SZ")
    for kat, name in KALENDARE.items():
        lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Mff repo//tydenni_rezim//CS",
                 f"X-WR-CALNAME:{name}", f"X-WR-TIMEZONE:{TZ}",
                 "BEGIN:VTIMEZONE", f"TZID:{TZ}",
                 "BEGIN:DAYLIGHT", "TZOFFSETFROM:+0100", "TZOFFSETTO:+0200", "TZNAME:CEST",
                 "DTSTART:19700329T020000", "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU", "END:DAYLIGHT",
                 "BEGIN:STANDARD", "TZOFFSETFROM:+0200", "TZOFFSETTO:+0100", "TZNAME:CET",
                 "DTSTART:19701025T030000", "RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU", "END:STANDARD",
                 "END:VTIMEZONE"]
        n = 0
        for k, day, start, end, title, loc, desc, ex in E:
            if k != kat:
                continue
            n += 1
            d = (FIRST_MONDAY + timedelta(days=day)).strftime("%Y%m%d")
            uid = uuid5(NAMESPACE_URL, f"mff-rezim/{day}/{start}/{title}")
            lines += ["BEGIN:VEVENT", f"UID:{uid}@mff-rezim", f"DTSTAMP:{stamp}",
                      f"DTSTART;TZID={TZ}:{d}T{start.replace(':', '')}00",
                      f"DTEND;TZID={TZ}:{d}T{end.replace(':', '')}00",
                      f"RRULE:FREQ=WEEKLY;UNTIL={UNTIL}", f"SUMMARY:{esc(title)}"]
            if loc:
                lines.append(f"LOCATION:{esc(loc)}")
            if desc:
                lines.append(f"DESCRIPTION:{esc(desc)}")
            for x in ex:
                lines.append(f"EXDATE;TZID={TZ}:{x}T{start.replace(':', '')}00")
            lines.append("END:VEVENT")
        lines.append("END:VCALENDAR")
        out = OUTDIR / f"rezim_{kat}.ics"
        out.write_text("\r\n".join(lines) + "\r\n", encoding="utf-8")
        print(f"{out.name}: {n} opakujících se událostí")


if __name__ == "__main__":
    main()
