"""Playwright checks for paw aspect, hero crop/height, gallery lightbox/filters."""
import json
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

URL = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:4321/"
OUT = Path("_audit")
OUT.mkdir(exist_ok=True)

INIT = (
    "sessionStorage.setItem('guaufresh_popup_dismissed','true');"
    "localStorage.setItem('guaufresh_lead_submitted','true');"
)

PAW_JS = """
() => Array.from(document.querySelectorAll('[style*="mask-image"], [style*="MaskImage"]'))
  .concat(Array.from(document.querySelectorAll('.paw-divider-icon')))
  .map(el => {
    const r = el.getBoundingClientRect();
    return { w: Math.round(r.width*10)/10, h: Math.round(r.height*10)/10, square: Math.abs(r.width-r.height) < 0.6 };
  })
"""

HERO_JS = """
() => {
  const sec = document.querySelector('#inicio');
  const img = sec?.querySelector('img');
  if (!sec || !img) return null;
  const sr = sec.getBoundingClientRect();
  const ir = img.getBoundingClientRect();
  const fit = getComputedStyle(img).objectFit;
  const crop = (() => {
    if (fit !== 'cover' || !img.naturalWidth) return 0;
    const scale = Math.max(ir.width/img.naturalWidth, ir.height/img.naturalHeight);
    const shown = (ir.width/(img.naturalWidth*scale)) * (ir.height/(img.naturalHeight*scale));
    return Math.round((1-shown)*100);
  })();
  return {
    sectionH: Math.round(sr.height),
    viewportH: window.innerHeight,
    belowViewport: sr.height < window.innerHeight * 0.95,
    fit, crop,
    natural: `${img.naturalWidth}x${img.naturalHeight}`,
    box: `${Math.round(ir.width)}x${Math.round(ir.height)}`,
  };
}
"""

with sync_playwright() as p:
    browser = p.chromium.launch()
    for name, vw, vh in [("desktop", 1440, 900), ("mobile", 390, 844)]:
        page = browser.new_page(viewport={"width": vw, "height": vh})
        page.add_init_script(INIT)
        page.goto(URL, wait_until="networkidle")
        page.wait_for_timeout(1500)

        paws = page.evaluate(PAW_JS)
        hero = page.evaluate(HERO_JS)
        page.locator("#inicio").screenshot(path=str(OUT / f"{name}-inicio.png"))

        # Gallery filter + lightbox
        page.locator("#galeria").scroll_into_view_if_needed()
        page.wait_for_timeout(600)
        page.get_by_role("tab", name="Producto").click()
        page.wait_for_timeout(400)
        visible = page.locator("#galeria button[aria-label^='Ampliar']").count()
        page.locator("#galeria button[aria-label^='Ampliar']").first.click()
        page.wait_for_timeout(400)
        dialog = page.locator('[data-testid="image-lightbox"]')
        dialog_open = dialog.count() > 0
        if dialog_open:
            dialog.locator('button[aria-label="Siguiente imagen"]').click()
            page.wait_for_timeout(300)
            dialog.locator('button[aria-label="Cerrar"]').click()
            page.wait_for_timeout(500)
            try:
                dialog.wait_for(state="detached", timeout=2000)
            except Exception:
                pass
        dialog_closed = page.locator('[data-testid="image-lightbox"]').count() == 0

        print(f"== {name} ==")
        print("paws", json.dumps(paws))
        print("hero", json.dumps(hero))
        print(
            "gallery",
            json.dumps(
                {
                    "productoVisible": visible,
                    "lightboxOpen": dialog_open,
                    "lightboxClosed": dialog_closed,
                }
            ),
        )
        page.close()
    browser.close()
