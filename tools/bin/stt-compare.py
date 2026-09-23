#!/usr/bin/env python3
"""Run one audio file through every transcription service we have a key for,
and print the results side by side.

Benchmarks do not cover Czech, and this audio is unusually quiet lecture-hall
material full of maths terminology — so pick the service by what it actually
produces on a real sample, not by published WER.

Usage:  stt-compare.py <audio.mp3>
Keys are read from the environment; services without a key are skipped.
"""
import os, sys, time, json, urllib.request, mimetypes

AUDIO = sys.argv[1]
NAME = os.path.basename(AUDIO)


def post(url, headers, fields, files):
    """multipart/form-data POST without external deps."""
    b = "----stt" + os.urandom(8).hex()
    body = b""
    for k, v in fields.items():
        body += f"--{b}\r\nContent-Disposition: form-data; name=\"{k}\"\r\n\r\n{v}\r\n".encode()
    for k, (fn, data, ct) in files.items():
        body += (f"--{b}\r\nContent-Disposition: form-data; name=\"{k}\"; "
                 f"filename=\"{fn}\"\r\nContent-Type: {ct}\r\n\r\n").encode() + data + b"\r\n"
    body += f"--{b}--\r\n".encode()
    h = dict(headers); h["Content-Type"] = f"multipart/form-data; boundary={b}"
    req = urllib.request.Request(url, body, h)
    return json.load(urllib.request.urlopen(req, timeout=600))


def groq(data, model):
    return post("https://api.groq.com/openai/v1/audio/transcriptions",
                {"Authorization": f"Bearer {os.environ['GROQ_API_KEY']}"},
                {"model": model, "language": "cs", "response_format": "json"},
                {"file": (NAME, data, "audio/mpeg")})["text"]


def openai(data, model):
    return post("https://api.openai.com/v1/audio/transcriptions",
                {"Authorization": f"Bearer {os.environ['OPENAI_API_KEY']}"},
                {"model": model, "language": "cs"},
                {"file": (NAME, data, "audio/mpeg")})["text"]


def elevenlabs(data):
    return post("https://api.elevenlabs.io/v1/speech-to-text",
                {"xi-api-key": os.environ["ELEVENLABS_API_KEY"]},
                {"model_id": "scribe_v1", "language_code": "ces"},
                {"file": (NAME, data, "audio/mpeg")})["text"]


def deepgram(data):
    req = urllib.request.Request(
        "https://api.deepgram.com/v1/listen?model=nova-3&language=cs&punctuate=true&smart_format=true",
        data, {"Authorization": f"Token {os.environ['DEEPGRAM_API_KEY']}",
               "Content-Type": "audio/mpeg"})
    r = json.load(urllib.request.urlopen(req, timeout=600))
    return r["results"]["channels"][0]["alternatives"][0]["transcript"]


SERVICES = [
    ("Groq whisper-large-v3",       "GROQ_API_KEY",       lambda d: groq(d, "whisper-large-v3"),       "$0.111/h"),
    ("Groq whisper-turbo",          "GROQ_API_KEY",       lambda d: groq(d, "whisper-large-v3-turbo"), "$0.04/h"),
    ("OpenAI gpt-4o-transcribe",    "OPENAI_API_KEY",     lambda d: openai(d, "gpt-4o-transcribe"),    "$0.36/h"),
    ("ElevenLabs Scribe",           "ELEVENLABS_API_KEY", elevenlabs,                                   "viz ceník"),
    ("Deepgram Nova-3",             "DEEPGRAM_API_KEY",   deepgram,                                     "~$0.26/h"),
]

data = open(AUDIO, "rb").read()
print(f"vzorek: {AUDIO}  ({len(data)/1e6:.1f} MB)\n")
results = {}
for label, key, fn, price in SERVICES:
    if not os.environ.get(key):
        print(f"--- {label:28s} PŘESKOČENO (chybí {key})")
        continue
    try:
        t0 = time.time()
        text = fn(data).strip()
        dt = time.time() - t0
        results[label] = text
        print(f"\n=== {label}   [{dt:.0f} s, {price}] ===")
        print(f"    slov: {len(text.split())}")
        print("   ", text[:400].replace("\n", " "), "…")
    except Exception as e:
        print(f"\n=== {label} === CHYBA: {type(e).__name__}: {str(e)[:200]}")

if results:
    print("\n\n=== SOUHRN (víc slov = víc zachycené řeči) ===")
    for label, text in sorted(results.items(), key=lambda kv: -len(kv[1].split())):
        print(f"  {len(text.split()):5d} slov   {label}")
    out = os.path.splitext(AUDIO)[0] + "_srovnani.json"
    json.dump(results, open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(f"\nplné přepisy: {out}")
