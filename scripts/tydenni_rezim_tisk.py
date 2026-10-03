#!/usr/bin/env python3
"""Tisknutelná týdenní mřížka (A4 na šířku) z událostí v tydenni_rezim_ics.py → 00_admin/kalendare/tydenni_rezim_tisk.html (+ .pdf přes Chrome, když je)."""
import html, subprocess, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
import tydenni_rezim_ics as R

OUT = R.OUTDIR / "tydenni_rezim_tisk.html"
DNY = ["Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota", "Neděle"]
BARVY = {"skola": "#dbe7f6", "beh": "#dff3e3", "posilovna": "#fde9cf", "plavani": "#d8f1f6", "uceni": "#f3e6f7", "ostatni": "#eeeeee"}
H0, H1 = 5, 23  # zobrazené hodiny


def mins(t):
    h, m = t.split(":"); return int(h) * 60 + int(m)


rows = ['<!doctype html><meta charset="utf-8"><title>Týdenní režim ZS 2026/27</title><style>',
        '@page{size:A4 landscape;margin:8mm} body{font:9px -apple-system,Helvetica,sans-serif;margin:0}',
        'h1{font-size:14px;margin:0 0 4px} .grid{position:relative;display:grid;grid-template-columns:28px repeat(7,1fr);gap:0 2px}',
        f'.col{{position:relative;height:{(H1-H0)*34}px;border-left:1px solid #ddd}} .hd{{text-align:center;font-weight:600;padding:2px 0;border-bottom:1px solid #999}}',
        '.hl{position:absolute;left:0;right:0;border-top:1px solid #eee} .hr{position:absolute;right:3px;font-size:8px;color:#888;transform:translateY(-50%)}',
        '.ev{position:absolute;left:1px;right:1px;border-radius:3px;padding:1px 3px;overflow:hidden;line-height:1.15;border:1px solid rgba(0,0,0,.12)}',
        '.ev b{display:block;font-size:8px;color:#333} .leg{margin-top:4px;color:#555} .leg span{display:inline-block;padding:1px 6px;margin-right:6px;border-radius:3px}',
        '</style><h1>Týdenní režim — ZS 2026/27 (od 5. 10. 2026)</h1><div class="grid"><div class="hd"></div>']
rows += [f'<div class="hd">{d}</div>' for d in DNY]
rows.append('<div class="col" style="border:0">' + "".join(f'<div class="hr" style="top:{(h-H0)*34}px">{h}</div>' for h in range(H0, H1 + 1)) + '</div>')
for d in range(7):
    cells = [f'<div class="hl" style="top:{(h-H0)*34}px"></div>' for h in range(H0, H1 + 1)]
    for kat, day, start, end, title, loc, desc, ex in R.E:
        if day != d: continue
        top = (mins(start) - H0 * 60) * 34 / 60; hgt = (mins(end) - mins(start)) * 34 / 60
        where = loc if loc and loc != "doma" else ""
        cells.append(f'<div class="ev" style="top:{top:.0f}px;height:{hgt-2:.0f}px;background:{BARVY[kat]}">'
                     f'<b>{start}–{end}</b>{html.escape(title)}' + (f'<br><i>{html.escape(where.split(",")[0])}</i>' if where and hgt > 40 else "") + '</div>')
    rows.append('<div class="col">' + "".join(cells) + '</div>')
rows.append('</div><div class="leg">' + "".join(f'<span style="background:{c}">{k}</span>' for k, c in BARVY.items()) +
            ' · svátky 27.–28. 10. a 17. 11. bez výuky · midtermy LA1 st 18. 11. a 16. 12. 12:20 · podrobnosti a přejezdy: 00_admin/tydenni_rezim.md</div>')
OUT.write_text("\n".join(rows), encoding="utf-8")
print(OUT.name)
chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
if Path(chrome).exists():
    pdf = OUT.with_suffix(".pdf")
    subprocess.run([chrome, "--headless=new", "--disable-gpu", "--no-pdf-header-footer", f"--print-to-pdf={pdf}", OUT.as_uri()],
                   capture_output=True, timeout=60)
    print(pdf.name if pdf.exists() else "PDF se nepovedlo (Chrome)")
