#!/usr/bin/env python3
"""Keep ~k evenly spaced frames, delete the rest."""
import os, sys, glob
d, k = sys.argv[1], int(sys.argv[2])
fs = sorted(glob.glob(os.path.join(d, "*.jpg")))
if len(fs) > k:
    keep = {fs[round(i * (len(fs) - 1) / (k - 1))] for i in range(k)} if k > 1 else {fs[0]}
    for f in fs:
        if f not in keep: os.remove(f)
