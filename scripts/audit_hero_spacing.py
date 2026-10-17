"""Measure and screenshot hero carousel spacing."""
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

URL = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:4331/"
OUT = Path("_audit")
OUT.mkdir(exist_ok=True)

JS = """
() => {
  const sec = document.querySelector('#inicio');
  const container = sec?.querySelector('.container');
  const grid = sec?.querySelector('.grid');
  const kids = grid ? [...grid.children] : [];
  const photo = sec?.querySelector('[data-hero-photo]');
  const img = photo?.querySelector('img');
  const textCol = kids.find((k) => k.querySelector('h1')) || kids[0];
  const photoCol = kids.find((k) => k.querySelector('[data-hero-photo]')) || kids[1];
  const card = textCol?.querySelector('[class*="rounded"]');
  const box = (el) => {
    if (!el) return null;
    const b = el.getBoundingClientRect();
    return { w: Math.round(b.width), h: Math.round(b.height), x: Math.round(b.x), y: Math.round(b.y) };
  };
  const g = grid ? getComputedStyle(grid) : null;
  const c = container ? getComputedStyle(container) : null;
  const tb = textCol?.getBoundingClientRect();
  const pb = photoCol?.getBoundingClientRect();
  let colGapPx = null;
  if (tb && pb && Math.abs(tb.top - pb.top) < 240) {
    colGapPx = Math.round(pb.left > tb.right ? pb.left - tb.right : tb.left - pb.right);
  }
  let crop = 0;
  if (img?.naturalWidth) {
    const fit = getComputedStyle(img).objectFit;
    if (fit === 'cover') {
      const ir = img.getBoundingClientRect();
      const scale = Math.max(ir.width / img.naturalWidth, ir.height / img.naturalHeight);
      const shown = (ir.width / (img.naturalWidth * scale)) * (ir.height / (img.naturalHeight * scale));
      crop = Math.round((1 - shown) * 100);
    }
  }
  return {
    vh: innerHeight,
    vw: innerWidth,
    sectionH: box(sec)?.h,
    padY: c ? `${c.paddingTop}/${c.paddingBottom}` : null,
    gap: g?.gap,
    cols: g?.gridTemplateColumns,
    colGapPx,
    photo: box(photo),
    img: box(img),
    card: box(card),
    crop,
  };
}
"""

with sync_playwright() as p:
    browser = p.chromium.launch()
    for name, w, h in [("desktop", 1440, 900), ("laptop", 1280, 800), ("mobile", 390, 844)]:
        page = browser.new_page(viewport={"width": w, "height": h})
        page.add_init_script("sessionStorage.setItem('guaufresh_popup_dismissed','true');")
        page.goto(URL, wait_until="networkidle")
        page.wait_for_timeout(1200)
        print(name, page.evaluate(JS))
        page.locator("#inicio").screenshot(path=str(OUT / f"{name}-inicio.png"))
        page.close()
    browser.close()
