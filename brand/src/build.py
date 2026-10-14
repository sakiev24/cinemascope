"""Builds the CinemaScope logo masters into ../logo.

Symbol: a C whose opening is the 2.39:1 CinemaScope frame.
Wordmark: Inter ExtraBold (SIL OFL), outlined to paths.
Run: python build.py
"""
import math
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

HERE = Path(__file__).parent
OUT = HERE.parent / "logo"
OUT.mkdir(exist_ok=True)

SUNBURST = "#F8C61E"
MIDNIGHT = "#252C37"
WHITE = "#FFFFFF"

R = 104          # outer radius
CY = 128
SLOT_LEFT = 78   # leftmost point of the counter (before centring)


def c_path(slot_r, dx=0.0, dy=0.0, scale=1.0):
    """Outer disc with a stadium-shaped slot that runs out the right side."""
    chord = math.sqrt(R * R - slot_r * slot_r)
    right = 128 + chord
    # Centre the bounding box horizontally (the opening makes it 'short' on the right)
    shift = (256 - (right - 24)) / 2 - 24
    sx = lambda x: (x + shift) * scale + dx
    sy = lambda y: y * scale + dy
    r, sr = R * scale, slot_r * scale
    top, bot = CY - slot_r, CY + slot_r
    cx = SLOT_LEFT + slot_r
    return (f"M{sx(right):.2f} {sy(top):.2f}A{r:.2f} {r:.2f} 0 1 0 {sx(right):.2f} {sy(bot):.2f}"
            f"H{sx(cx):.2f}A{sr:.2f} {sr:.2f} 0 0 1 {sx(cx):.2f} {sy(top):.2f}Z")


SLOT = 31        # 62 px tall slot -> visible opening ~2.4:1
SLOT_SMALL = 36  # opened up for 16-32 px


def svg(w, h, body, title="CinemaScope"):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:g} {h:g}" role="img">'
            f"<title>{title}</title>{body}</svg>\n")


def write(name, text):
    (OUT / name).write_text(text, encoding="utf-8")
    print("wrote", name)


# --- symbol --------------------------------------------------------------
for suffix, slot in (("", SLOT), ("-small", SLOT_SMALL)):
    write(f"symbol{suffix}-black.svg", svg(256, 256, f'<path fill="#000" d="{c_path(slot)}"/>'))
    write(f"symbol{suffix}-sunburst.svg", svg(256, 256, f'<path fill="{SUNBURST}" d="{c_path(slot)}"/>'))
    # App tile: Sunburst C on a Midnight squircle, symbol at 70 %
    s = 0.7
    off = 128 - 128 * s
    write(f"tile{suffix}.svg", svg(256, 256,
          f'<rect width="256" height="256" rx="56" fill="{MIDNIGHT}"/>'
          f'<path fill="{SUNBURST}" d="{c_path(slot, off, off, s)}"/>'))

# --- wordmark ------------------------------------------------------------
font = TTFont(HERE / "Inter-ExtraBold.ttf")
gs = font.getGlyphSet()
cmap = font.getBestCmap()
upm = font["head"].unitsPerEm
cap = font["OS/2"].sCapHeight
TRACK = -0.01 * upm   # slight tightening, matches the site's tracking-tight


def wordmark(text, cap_px):
    """Returns (path_d, width) with the baseline at y=cap_px and cap top at y=0."""
    k = cap_px / cap
    pen = SVGPathPen(gs)
    x = 0.0
    names = [cmap[ord(ch)] for ch in text]
    for i, n in enumerate(names):
        tp = TransformPen(pen, (k, 0, 0, -k, x * k, cap_px))
        gs[n].draw(tp)
        x += gs[n].width + (TRACK if i < len(names) - 1 else 0)
    return pen.getCommands(), x * k


CAP = 80          # wordmark cap height in a 256-tall lockup (symbol is 208 tall)
GAP = 62          # clear-space unit = the slot height
word_d, word_w = wordmark("CINEMASCOPE", CAP)


def horizontal(sym_fill, text_fill):
    sym_w = 256 - 2 * 24       # symbol drawn edge-to-edge in the lockup
    w = sym_w + GAP + word_w
    body = (f'<path fill="{sym_fill}" d="{c_path(SLOT, -24, -24)}"/>'
            f'<path fill="{text_fill}" transform="translate({sym_w + GAP:.2f} {104 - CAP / 2:.2f})" d="{word_d}"/>')
    return svg(w, 208, body)


def stacked(sym_fill, text_fill):
    w = max(word_w, 208)
    h = 208 + GAP * 0.75 + CAP
    body = (f'<path fill="{sym_fill}" d="{c_path(SLOT, (w - 208) / 2 - 24, -24)}"/>'
            f'<path fill="{text_fill}" transform="translate({(w - word_w) / 2:.2f} {208 + GAP * 0.75:.2f})" d="{word_d}"/>')
    return svg(w, h, body)


write("wordmark-black.svg", svg(word_w, CAP, f'<path fill="#000" d="{word_d}"/>'))
for kind, fn in (("horizontal", horizontal), ("stacked", stacked)):
    write(f"{kind}-black.svg", fn("#000", "#000"))
    write(f"{kind}-white.svg", fn(WHITE, WHITE))
    write(f"{kind}-on-dark.svg", fn(SUNBURST, WHITE))
    write(f"{kind}-on-light.svg", fn(MIDNIGHT, MIDNIGHT))

print("C path (site):", c_path(SLOT))
