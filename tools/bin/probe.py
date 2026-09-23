#!/usr/bin/env python3
"""Human-readable ffprobe summary."""
import json, sys
d = json.load(open(sys.argv[1])); fmt = d.get("format", {})
dur = float(fmt.get("duration", 0) or 0)
st = d.get("streams", [])
v = next((s for s in st if s.get("codec_type") == "video"), None)
a = next((s for s in st if s.get("codec_type") == "audio"), None)
print(f"file      : {sys.argv[2]}")
print(f"size      : {int(fmt.get('size',0))/1e6:.1f} MB")
print(f"duration  : {int(dur//3600):02d}:{int(dur%3600//60):02d}:{int(dur%60):02d}  ({dur:.0f}s)")
if v:
    n, _, de = v.get("avg_frame_rate", "0/1").partition("/")
    fps = float(n) / float(de) if de and float(de) else 0.0
    print(f"video     : {v.get('codec_name')} {v.get('width')}x{v.get('height')} @ {fps:.2f} fps")
else:
    print("video     : (none — audio only)")
print(f"audio     : {a.get('codec_name')} {a.get('sample_rate')}Hz {a.get('channels')}ch" if a
      else "audio     : (none)")
