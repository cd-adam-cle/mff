#!/usr/bin/env python3
"""Vygeneruje 00_admin/kalendare/MA1_pripominky.ics z plánu MA1 (ZS 2026/27).

Tři řady připomínek (každá jako samostatné události, ať jdou po týdnu měnit):
  - ne 17:00  📖 skripta před st přednáškou + kontrola Halasova PDF a Borjiho webu
  - pá 10:00  📖 skripta před pá přednáškou
  - po 19:00  ✏️ úlohy na st cvičení (sbírka k tématu)
Kapitoly jsou ODHAD (plan.md); po každé změně plánu upravit PLAN a spustit:
    python3 scripts/ma1_pripominky_ics.py
V Kalendáři pak smazat starý kalendář „MA1 připomínky“ a naimportovat znovu.
"""
from datetime import date, datetime, timedelta
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "00_admin" / "kalendare" / "MA1_pripominky.ics"

# (týden, pondělí, kapitoly na st, kapitoly na pá, téma cvičení + sbírka)  — None = odpadá
PLAN = [
    (1, date(2026, 9, 28), "1.1 Jazyk a logika, 1.2.1 Operace s množinami", "1.2.2 Relace a zobrazení, 1.2.3 Mohutnost množin", "úvod, organizace; sbírka 01 úvod"),
    (2, date(2026, 10, 5), "1.3.1–1.3.3 Reálná čísla, uspořádané těleso", "1.3.4 Věta o supremu a důsledky, 1.3.5 rozšířené sup/inf", "opakování SŠ, výroky, množiny — sbírka 01 (+ sbírka 1 výroky od starších)"),
    (3, date(2026, 10, 12), "2.1 Limita posloupnosti: definice, jednoznačnost, omezenost, VOAL", "2.1 dokončení: policajti, monotónní posloupnosti", "supremum/infimum, první limity — sbírka 2 sup/inf (od starších), sbírka 02 úlohy 1–3"),
    (4, date(2026, 10, 19), "2.2 R*, nevlastní limita, aritmetika v R*", "2.3.1 Limita a nerovnosti, 2.3.2 Vybrané posloupnosti, Cantor, Bolzano–Weierstrass", "limity posloupností I — sbírka 02 úlohy 3–5"),
    (5, date(2026, 10, 26), None, "2.3.3 Drobnosti k výpočtům; 3.1 Funkce: základní pojmy", None),
    (6, date(2026, 11, 2), "3.2.1 Definice limity funkce, 3.2.2 Souvislost s limitou posloupnosti (Heine)", "3.2.3 Metody výpočtu (VOLSF), 3.2.4 Limita a nerovnosti, lokální chování", "limity posloupností II (e, odmocniny, růstová škála) — sbírka 02 dokončit; Staněk cv 03–05"),
    (7, date(2026, 11, 9), "3.3 Bolzanova a Weierstrassova věta", "3.3 důsledky (inverzní funkce, spojitost); 4.1 Derivace: definice", "limita funkce I — sbírka 03"),
    (8, date(2026, 11, 16), "4.1 Pravidla derivování, derivace elementárních funkcí, složená a inverzní", "4.2.1 Extrémy (Fermat), 4.2.2 Věty o střední hodnotě (Rolle, Lagrange, Cauchy)", "limita funkce II, spojitost — sbírka 03 (ZT1 možná ~ konec listopadu)"),
    (9, date(2026, 11, 23), "4.2.3 Intervaly monotonie, 4.2.4 Limita derivace", "4.3 Konvexnost a konkávnost, 4.4 Asymptoty → průběh funkce", "derivace I — sbírka 04"),
    (10, date(2026, 11, 30), "5.1 Řady: základní fakta, geometrická řada, nutná podmínka", "5.2 Kritéria konvergence pro řady s nezápornými členy", "derivace II, průběh funkce — sbírka 04, Pošta, Brno"),
    (11, date(2026, 12, 7), "5.3 Absolutní a neabsolutní konvergence, Leibniz", "5.4 Přerovnání řady (Riemann)", "průběh funkce / řady I — sbírka 05"),
    (12, date(2026, 12, 14), "6.1 l'Hospitalovo pravidlo (jen znění)", "6.2 Bolzanova–Cauchyova podmínka, 6.3 Zavedení elementárních funkcí", "řady II — sbírka 05 (ZT2 možná ~ začátek ledna)"),
    (13, date(2027, 1, 4), "rezerva / opakování", "rezerva / opakování (poslední den výuky)", "opakování, průběhy funkcí, staré ZT"),
]

HEAD = """BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Mff repo//MA1 pripominky ZS 2026/27//CS
CALSCALE:GREGORIAN
X-WR-CALNAME:MA1 – skripta, cvičení
X-WR-TIMEZONE:Europe/Prague
BEGIN:VTIMEZONE
TZID:Europe/Prague
BEGIN:STANDARD
DTSTART:19701025T030000
RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU
TZOFFSETFROM:+0200
TZOFFSETTO:+0100
END:STANDARD
BEGIN:DAYLIGHT
DTSTART:19700329T020000
RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU
TZOFFSETFROM:+0100
TZOFFSETTO:+0200
END:DAYLIGHT
END:VTIMEZONE
"""


def esc(s: str) -> str:
    return s.replace("\\", "\\\\").replace(",", "\\,").replace(";", "\\;")


def fmt(d: date, h: int, m: int = 0) -> str:
    return datetime(d.year, d.month, d.day, h, m).strftime("%Y%m%dT%H%M%S")


def cz(d: date) -> str:
    return f"{d.day}. {d.month}."


def event(uid: str, start: date, h: int, m: int, dur_min: int, summary: str, desc: str, alarm: str) -> str:
    end = datetime(start.year, start.month, start.day, h, m) + timedelta(minutes=dur_min)
    return (
        "BEGIN:VEVENT\n"
        f"UID:{uid}@mff\n"
        f"DTSTART;TZID=Europe/Prague:{fmt(start, h, m)}\n"
        f"DTEND;TZID=Europe/Prague:{end.strftime('%Y%m%dT%H%M%S')}\n"
        f"SUMMARY:{esc(summary)}\n"
        f"DESCRIPTION:{esc(desc)}\n"
        "BEGIN:VALARM\nTRIGGER:PT0M\nACTION:DISPLAY\n"
        f"DESCRIPTION:{esc(alarm)}\nEND:VALARM\nEND:VEVENT\n"
    )


def allday(uid: str, d: date, summary: str, desc: str) -> str:
    return (
        "BEGIN:VEVENT\n"
        f"UID:{uid}@mff\n"
        f"DTSTART;VALUE=DATE:{d.strftime('%Y%m%d')}\n"
        f"DTEND;VALUE=DATE:{(d + timedelta(days=1)).strftime('%Y%m%d')}\n"
        f"SUMMARY:{esc(summary)}\nDESCRIPTION:{esc(desc)}\nEND:VEVENT\n"
    )


def main() -> None:
    out = [HEAD]
    today = date.today()
    for t, mon, st_ch, pa_ch, cv in PLAN:
        wed, fri, sun_before = mon + timedelta(days=2), mon + timedelta(days=4), mon - timedelta(days=1)
        if st_ch and sun_before >= today:
            out.append(event(
                f"ma1-skripta-st-{t:02d}", sun_before, 17, 0, 60,
                f"MA1 📖 skripta před st přednáškou: {st_ch}",
                f"Letmo projít kapitoly (odhad, plan.md). Zkontrolovat Halasovo PDF (co se probralo minulý týden) a Borjiho web. Přednáška st {cz(wed)} 9:50 M1.",
                "MA1 skripta + kontrola Halasova PDF"))
        if pa_ch and fri >= today:
            out.append(event(
                f"ma1-skripta-pa-{t:02d}", fri, 10, 0, 75,
                f"MA1 📖 skripta před pá přednáškou: {pa_ch}",
                f"Letmo projít kapitoly (odhad, plan.md). Přednáška pá {cz(fri)} 12:20 M1.",
                "MA1 skripta"))
        if cv and mon >= today:
            out.append(event(
                f"ma1-cviceni-{t:02d}", mon, 19, 0, 90,
                f"MA1 ✏️ úlohy na st cvičení: {cv}",
                f"Spočítat úlohy ze sbírky (cviceni/sady.md), výsledky zkontrolovat pod úlohou, postup nechat zkontrolovat. Cvičení st {cz(wed)} 15:40 N2. V sobotu dopočítat, co nešlo.",
                "MA1 úlohy na cvičení"))
        if t == 5:
            out.append(allday("ma1-svatek-28-10", wed, "MA1 přednáška + cvičení odpadá (státní svátek)",
                              "Doma: sbírka 02 úlohy 6–7 (odmocniny, číslo e). Páteční přednáška 30. 10. je."))
    out.append("END:VCALENDAR\n")
    OUT.write_text("".join(out), encoding="utf-8")
    n = sum(s.count("BEGIN:VEVENT") for s in out)
    print(f"{OUT.relative_to(OUT.parents[2])}: {n} událostí")


if __name__ == "__main__":
    main()
