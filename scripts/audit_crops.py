"""Playwright audit: report images cropped by object-fit/background-size cover."""
import json
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

URL = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:4321/"
OUT = Path("_audit")
OUT.mkdir(exist_ok=True)

MEASURE_JS = """
() => {
  const results = [];
  const visible = (r) => r.width > 40 && r.height > 40;
  const cropOf = (nw, nh, bw, bh) => {
    const scale = Math.max(bw / nw, bh / nh);
    const shownW = bw / (nw * scale);
    const shownH = bh / (nh * scale);
    return Math.round((1 - shownW * shownH) * 100);
  };
  for (const img of document.querySelectorAll('img')) {
    const r = img.getBoundingClientRect();
    if (!visible(r) || !img.naturalWidth) continue;
    const fit = getComputedStyle(img).objectFit;
    const crop = fit === 'cover' ? cropOf(img.naturalWidth, img.naturalHeight, r.width, r.height) : 0;
    results.push({ kind: 'img', src: img.currentSrc.split('/').slice(-2).join('/'), fit,
      natural: `${img.naturalWidth}x${img.naturalHeight}`, box: `${Math.round(r.width)}x${Math.round(r.height)}`, crop });
  }
  for (const el of document.querySelectorAll('*')) {
    const bg = getComputedStyle(el).backgroundImage;
    if (!bg || !bg.startsWith('url(')) continue;
    const r = el.getBoundingClientRect();
    if (!visible(r)) continue;
    results.push({ kind: 'bg', src: bg.slice(5, -2).split('/').slice(-2).join('/'),
      size: getComputedStyle(el).backgroundSize, box: `${Math.round(r.width)}x${Math.round(r.height)}` });
  }
  return results;
}
"""

VIEWPORTS = {"desktop": {"width": 1440, "height": 900}, "mobile": {"width": 390, "height": 844}}

with sync_playwright() as p:
    browser = p.chromium.launch()
    for name, viewport in VIEWPORTS.items():
        page = browser.new_page(viewport=viewport)
        page.add_init_script(
            "sessionStorage.setItem('guaufresh_popup_dismissed','true');"
            "localStorage.setItem('guaufresh_lead_submitted','true');"
        )
        page.goto(URL, wait_until="networkidle")
        found = {}
        height = page.evaluate("document.body.scrollHeight")
        for y in range(0, height, viewport["height"] // 2):
            page.evaluate(f"window.scrollTo(0, {y})")
            page.wait_for_timeout(350)
            for item in page.evaluate(MEASURE_JS):
                key = (item["kind"], item["src"], item["box"])
                found[key] = item
        page.evaluate("window.scrollTo(0, 0)")
        page.wait_for_timeout(1500)
        page.screenshot(path=str(OUT / f"{name}-hero.png"))
        for section in ["beneficios", "producto", "como-usar"]:
            loc = page.locator(f"#{section}")
            if loc.count():
                loc.scroll_into_view_if_needed()
                page.wait_for_timeout(700)
                loc.screenshot(path=str(OUT / f"{name}-{section}.png"))
        print(f"== {name} ==")
        for item in sorted(found.values(), key=lambda i: -i.get("crop", 0)):
            print(json.dumps(item, ensure_ascii=False))
        page.close()
    browser.close()
