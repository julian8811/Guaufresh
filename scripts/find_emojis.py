"""List emoji and pictographic symbols in source files."""
import pathlib
import unicodedata


def is_emoji(char: str) -> bool:
    code = ord(char)
    return (
        unicodedata.category(char) == "So"
        or 0x1F000 <= code <= 0x1FFFF
        or code == 0xFE0F
    )


for path in pathlib.Path("src").rglob("*"):
    if path.suffix not in {".tsx", ".ts", ".astro"}:
        continue
    for number, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
        hits = "".join(c for c in line if is_emoji(c))
        if hits:
            print(f"{path}:{number}: {hits} | {line.strip()[:110]}")
