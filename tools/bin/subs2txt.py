#!/usr/bin/env python3
"""VTT/SRT -> readable timestamped transcript.

YouTube auto-captions arrive as a rolling window: each cue repeats a chunk of
the previous one and adds a few words. Naively concatenating them triples the
text. We strip the overlap word-by-word, then regroup into ~15 s paragraphs so
the result reads like a transcript rather than like subtitles.
"""
import html, re, sys

CUE = re.compile(r"(\d{1,2}:\d{2}:\d{2})[.,](\d{3})\s*-->\s*(\d{1,2}:\d{2}:\d{2})[.,](\d{3})")
GROUP_SECONDS = 15


def parse(path):
    raw = open(path, encoding="utf-8", errors="replace").read().replace("\r\n", "\n")
    cues = []
    for block in re.split(r"\n\s*\n", raw):
        lines = [l for l in block.split("\n") if l.strip()]
        m = ti = None
        for i, l in enumerate(lines):
            m = CUE.search(l)
            if m:
                ti = i
                break
        if not m:
            continue
        text = " ".join(lines[ti + 1:])
        text = re.sub(r"<[^>]+>", "", text)        # <00:00:05><c> karaoke tags
        text = html.unescape(text)
        text = re.sub(r"\s+", " ", text).strip()
        if text:
            cues.append((m.group(1), text))
    return cues


def strip_overlap(prev_words, words):
    """Drop the leading words of `words` that repeat the tail of `prev_words`."""
    for k in range(min(len(prev_words), len(words)), 0, -1):
        if prev_words[-k:] == words[:k]:
            return words[k:]
    return words


def secs(ts):
    h, m, s = (int(x) for x in ts.split(":"))
    return h * 3600 + m * 60 + s


def main():
    cues = parse(sys.argv[1])
    if not cues:
        sys.exit("subs2txt: no cues found")

    # 1) de-overlap into one continuous word stream, keeping each word's time
    stream, prev = [], []
    for ts, text in cues:
        words = text.split()
        new = strip_overlap(prev, words)
        for w in new:
            stream.append((ts, w))
        prev = (prev + new)[-40:]      # bounded lookback window

    # 2) regroup into readable paragraphs
    out, start, buf = [], stream[0][0], []
    for ts, w in stream:
        if buf and secs(ts) - secs(start) >= GROUP_SECONDS:
            out.append((start, " ".join(buf)))
            start, buf = ts, []
        buf.append(w)
    if buf:
        out.append((start, " ".join(buf)))

    for ts, text in out:
        print(f"[{ts}] {text}")


main()
