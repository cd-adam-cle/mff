#!/usr/bin/env python3
"""Readable summary of a yt-dlp -J metadata dump (no media downloaded)."""
import json, sys
d = json.load(open(sys.argv[1]))
dur = d.get("duration") or 0
subs = sorted(set(list(d.get("subtitles") or {})))
auto = sorted(set(list(d.get("automatic_captions") or {})))
interesting = [l for l in auto if l.split("-")[0] in ("cs", "sk", "en")]
print(f"title     : {d.get('title')}")
print(f"channel   : {d.get('uploader')}   ({d.get('upload_date','?')})")
print(f"duration  : {int(dur//3600):02d}:{int(dur%3600//60):02d}:{int(dur%60):02d}  ({dur}s)")
print(f"subtitles : {', '.join(subs) if subs else '(none published)'}")
print(f"auto-caps : {', '.join(interesting) if interesting else '(none in cs/sk/en)'}")
ch = d.get("chapters") or []
if ch:
    print(f"chapters  : {len(ch)}")
    for c in ch[:40]:
        s = int(c.get("start_time", 0))
        print(f"   {s//3600:02d}:{s%3600//60:02d}:{s%60:02d}  {c.get('title')}")
