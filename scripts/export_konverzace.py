#!/usr/bin/env python3
"""Export konverzací s Claudem (Claude Code) do markdownu.

Čte přepisy z ~/.claude/projects/<slug repa>/*.jsonl a zapisuje
_kontext/konverzace/YYYY-MM-DD_<nazev>_<id>.md. Jen text uživatele a Clauda,
bez výstupů nástrojů a bez interního uvažování. Idempotentní (přepisuje).

Použití:  python3 scripts/export_konverzace.py          # všechny session
Vyřazení session: ID (nebo prefix) na řádek do _kontext/konverzace/.vyradit.
Spouští se i automaticky hookem Stop (.claude/settings.json).
"""
import json, re, sys, unicodedata
from datetime import datetime, timezone
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
SRC = Path.home() / ".claude" / "projects" / re.sub(r"[^A-Za-z0-9]", "-", str(REPO))
OUT = REPO / "_kontext" / "konverzace"
# Session, které se nemají exportovat (jeden prefix ID na řádek, # = komentář). Soubor je mimo git.
VYRADIT = OUT / ".vyradit"


def slug(s: str) -> str:
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+", "_", s).strip("_")[:50] or "konverzace"


def texts(content) -> str:
    if isinstance(content, str):
        return content
    parts = [b.get("text", "") for b in content if isinstance(b, dict) and b.get("type") == "text"]
    return "\n\n".join(p for p in parts if p.strip())


def clean(t: str) -> str:
    t = re.sub(r"<system-reminder>.*?</system-reminder>", "", t, flags=re.S)
    t = re.sub(r"<(ide_selection|ide_opened_file|command-[a-z]+|local-command-[a-z]+)>.*?</\1>", "", t, flags=re.S)
    return t.strip()


def export(path: Path):
    title, first, msgs, tools = None, None, [], 0
    for line in path.open(encoding="utf-8"):
        try:
            d = json.loads(line)
        except ValueError:
            continue
        t = d.get("type")
        if t == "ai-title":
            title = d.get("aiTitle") or title
        if t not in ("user", "assistant") or d.get("isSidechain"):
            continue
        content = d.get("message", {}).get("content", "")
        if isinstance(content, list):
            tools += sum(1 for b in content if isinstance(b, dict) and b.get("type") == "tool_use")
        txt = clean(texts(content))
        if not txt:
            continue
        ts = d.get("timestamp")
        if ts and not first:
            first = datetime.fromisoformat(ts.replace("Z", "+00:00")).astimezone()
        who = "Adík" if t == "user" else "Claude"
        if msgs and msgs[-1][0] == who:
            msgs[-1][1] += "\n\n" + txt
        else:
            msgs.append([who, txt])
    if not msgs:
        return None
    first = first or datetime.fromtimestamp(path.stat().st_mtime, timezone.utc).astimezone()
    title = title or msgs[0][1].splitlines()[0][:60]
    sid = path.stem[:8]
    for old in OUT.glob(f"*_{sid}.md"):
        old.unlink()
    out = OUT / f"{first:%Y-%m-%d}_{slug(title)}_{sid}.md"
    body = [f"# {title}", "",
            f"- Datum: {first:%Y-%m-%d %H:%M} · session `{path.stem}` · zpráv: {len(msgs)} · volání nástrojů: {tools}",
            "- Automatický export (`scripts/export_konverzace.py`): jen text, bez výstupů nástrojů.", ""]
    for who, txt in msgs:
        body += [f"## {who}", "", txt, ""]
    out.write_text("\n".join(body), encoding="utf-8")
    return out, title, first


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    skip = []
    if VYRADIT.exists():
        skip = [l.split("#")[0].strip() for l in VYRADIT.read_text().splitlines()]
        skip = [x for x in skip if x]
    rows = []
    for p in sorted(SRC.glob("*.jsonl")):
        if any(p.stem.startswith(x) for x in skip):
            for old in OUT.glob(f"*_{p.stem[:8]}.md"):
                old.unlink()
            continue
        r = export(p)
        if r:
            rows.append(r)
    rows.sort(key=lambda r: r[2])
    idx = ["# Konverzace s Claudem", "",
           "Automaticky exportované přepisy všech session v tomhle repu. Slouží jako kontext: co jsme řešili, jak a proč.",
           "Rozhodnutí a pravidla, která z nich plynou, patří do `CLAUDE.md` souborů, tady je jen záznam.", "",
           "| Datum | Téma | Soubor |", "|---|---|---|"]
    idx += [f"| {f:%Y-%m-%d} | {t} | [{o.name}]({o.name}) |" for o, t, f in rows]
    (OUT / "README.md").write_text("\n".join(idx) + "\n", encoding="utf-8")
    if sys.stdout.isatty():
        print(f"exportováno {len(rows)} konverzací do {OUT}")


if __name__ == "__main__":
    main()
