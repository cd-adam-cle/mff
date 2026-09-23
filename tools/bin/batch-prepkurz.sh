#!/usr/bin/env bash
# Ingest the MFF preparatory-course lectures.
# Resumable: a lecture that already has a transcript AND frames is skipped.
# Verifies real output — `media grab` keeps going after a failed step, so
# "it ran" is not the same as "it produced anything".
set -uo pipefail
ROOT="/Users/adamzikmund/Claude/Projects/Mff"
export MEDIA_DIR="$ROOT/opakovani_stredoskolske_matiky/videa"
M="$ROOT/tools/bin/media"

LECTURES="
rovnice-a-nerovnice|OlG8aC2YAKg|Rovnice a nerovnice
posloupnosti-dukazy|KEOaBi5-Ya0|Posloupnosti
kombinatorika|loMxebgwggo|Kombinatorika
komplexni-cisla|TJ9zxGsBMA0|Komplexn
trigonometrie|-zX8GjpZ16o|Trigonometrie
analyticka-geometrie|z9f31uQaIg8|geometrie
"

have_net(){ nslookup www.youtube.com >/dev/null 2>&1; }

wait_for_net(){            # the network dropped mid-batch once; don't burn the queue on it
  local n=0
  while ! have_net; do
    n=$((n+1))
    [ "$n" -gt 60 ] && { echo "!! no DNS for 30 min, giving up"; return 1; }
    echo "!! network down, waiting 30 s (attempt $n)"
    sleep 30
  done
  return 0
}

done_ok(){                 # a lecture counts as done only with transcript + frames
  local wd="$1"
  [ -s "$wd/transcript.txt" ] && \
  [ -n "$(find "$wd/frames" -maxdepth 1 -name '*.jpg' 2>/dev/null | head -1)" ]
}

OK=""; FAILED=""
for L in $LECTURES; do
  slug="${L%%|*}"; rest="${L#*|}"; vid="${rest%%|*}"; expect="${rest##*|}"
  wd="$MEDIA_DIR/$slug"
  echo
  echo "################ $slug ################"
  if done_ok "$wd"; then echo "$(date +%H:%M:%S)  already done, skipping"; OK="$OK $slug"; continue; fi
  wait_for_net || { FAILED="$FAILED $slug"; continue; }

  title="$(yt-dlp --no-warnings --print '%(title)s' "https://www.youtube.com/watch?v=$vid" 2>/dev/null | head -1)"
  if [ -z "$title" ]; then
    echo "!! could not read the title of $vid — skipping rather than guessing"
    FAILED="$FAILED $slug"; continue
  fi
  case "$title" in
    *"$expect"*) : ;;
    *) echo "!! MISMATCH: folder '$slug' expects '$expect' but $vid is '$title' — skipping"
       FAILED="$FAILED $slug"; continue;;
  esac
  echo "$(date +%H:%M:%S)  start — $title"
  "$M" grab "https://www.youtube.com/watch?v=$vid" --name "$slug" --lang cs --max 90

  if done_ok "$wd"; then
    echo "$(date +%H:%M:%S)  OK $slug — $(find "$wd/frames" -name '*.jpg' | wc -l | tr -d ' ') frames, $(wc -l < "$wd/transcript.txt" | tr -d ' ') transcript lines"
    OK="$OK $slug"
    rm -f "$wd"/source.f*.mp4.part "$wd"/audio-src.* "$wd"/audio.wav   # bulky, rebuildable
  else
    echo "$(date +%H:%M:%S)  FAILED $slug — no usable output"
    FAILED="$FAILED $slug"
  fi
done

echo
echo "================ SUMMARY ================"
echo "OK:     ${OK:-(none)}"
echo "FAILED:${FAILED:-  (none)}"
du -sh "$MEDIA_DIR" 2>/dev/null
[ -z "$FAILED" ] && echo "ALL DONE" || echo "RERUN NEEDED"
