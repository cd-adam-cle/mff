#!/usr/bin/env python3
"""Slug that survives Czech diacritics: 'Základní příklady' -> 'zakladni-priklady'."""
import re, sys, unicodedata
s = unicodedata.normalize("NFKD", " ".join(sys.argv[1:]))
s = "".join(c for c in s if not unicodedata.combining(c))
s = re.sub(r"[^a-zA-Z0-9]+", "-", s).strip("-").lower()
print((s or "video")[:60].strip("-"))
