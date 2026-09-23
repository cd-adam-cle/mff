#!/usr/bin/env python3
"""Local Whisper (MLX / Apple GPU) -> transcript.txt + transcript.json

Tuned for quiet lecture-hall recordings, where the default settings both
hallucinate and, worse, silently skip most of the speech:

* `condition_on_previous_text=False` — with it on, one bad segment seeds a
  repetition loop ("Titulky vytvořil JohnyX." 59x in a 100-minute lecture).
* the caller feeds us loudness-normalised audio (see `media audio`).
* a blocklist drops the handful of phrases Whisper emits over silence; these
  come from its subtitle training data and carry no_speech_prob 0.0, so they
  cannot be filtered by confidence.
"""
import json, re, sys, os

wav, wd, model = sys.argv[1], sys.argv[2], sys.argv[3]
lang = sys.argv[4] if len(sys.argv) > 4 and sys.argv[4] else None
prompt = os.environ.get("WHISPER_PROMPT") or None

# phrases Whisper invents over silence in Czech audio
JUNK = re.compile(
    r"^\W*("
    r"titulky\s+(vytvořil|pro|z)\b.*"
    r"|děkuji\s+význame\w*"
    r"|přepis\s+titulků.*"
    r"|www\.\S+|\S+\.(cz|com)\s*$"
    r"|amara\.org.*"
    r")\W*$", re.IGNORECASE)

import mlx_whisper
kw = dict(path_or_hf_repo=model, word_timestamps=False, verbose=False,
          condition_on_previous_text=False)
if lang:   kw["language"] = lang
if prompt: kw["initial_prompt"] = prompt
r = mlx_whisper.transcribe(wav, **kw)


def hms(s):
    return "%02d:%02d:%02d" % (s // 3600, s % 3600 // 60, s % 60)


kept, dropped, prev = [], 0, None
for seg in r["segments"]:
    t = seg["text"].strip()
    if not t or JUNK.match(t):
        dropped += 1
        continue
    if t == prev:                      # consecutive verbatim repeat
        dropped += 1
        continue
    kept.append((seg["start"], t))
    prev = t

with open(os.path.join(wd, "transcript.txt"), "w", encoding="utf-8") as f:
    f.write(f"# language: {r.get('language','?')}   model: {model}\n")
    f.write(f"# segments: {len(kept)} kept, {dropped} dropped as silence artefacts\n\n")
    for start, t in kept:
        f.write(f"[{hms(start)}] {t}\n")

json.dump(r, open(os.path.join(wd, "transcript.json"), "w", encoding="utf-8"),
          ensure_ascii=False, indent=1)
print(f"language={r.get('language','?')}  kept={len(kept)}  dropped={dropped}",
      file=sys.stderr)
