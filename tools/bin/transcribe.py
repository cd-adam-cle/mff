#!/usr/bin/env python3
"""Local Whisper (MLX / Apple GPU) -> transcript.txt + transcript.json"""
import json, sys, os

wav, wd, model = sys.argv[1], sys.argv[2], sys.argv[3]
lang = sys.argv[4] if len(sys.argv) > 4 and sys.argv[4] else None

import mlx_whisper
kw = dict(path_or_hf_repo=model, word_timestamps=False, verbose=False)
if lang: kw["language"] = lang
r = mlx_whisper.transcribe(wav, **kw)

def hms(s):
    return "%02d:%02d:%02d" % (s // 3600, s % 3600 // 60, s % 60)

with open(os.path.join(wd, "transcript.txt"), "w", encoding="utf-8") as f:
    f.write(f"# language: {r.get('language','?')}   model: {model}\n\n")
    for s in r["segments"]:
        f.write(f"[{hms(s['start'])}] {s['text'].strip()}\n")

json.dump(r, open(os.path.join(wd, "transcript.json"), "w", encoding="utf-8"),
          ensure_ascii=False, indent=1)
print(f"language={r.get('language','?')}  segments={len(r['segments'])}", file=sys.stderr)
