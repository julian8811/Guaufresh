"""Verify each HowToUse step click swaps the panel image."""
import sys

from playwright.sync_api import sync_playwright

URL = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:4321/"

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.add_init_script("sessionStorage.setItem('guaufresh_popup_dismissed','true');")
    page.goto(URL, wait_until="networkidle")
    page.locator("#como-usar").scroll_into_view_if_needed()
    page.wait_for_timeout(800)

    panel = page.locator("#howto-step-image img")
    seen = []
    for number in ["01", "02", "03", "04"]:
        page.locator(f"#howto-step-{number}").click()
        page.wait_for_timeout(450)
        src = panel.get_attribute("src") or ""
        badge = page.locator("#howto-step-image").inner_text()
        seen.append({"step": number, "src": src.split("/")[-1], "badge": badge.strip()})
        assert f"paso-{number}" in src, f"Expected paso-{number} in {src}"
        assert number in badge, f"Expected badge for {number}, got {badge}"

    unique = {item["src"] for item in seen}
    assert len(unique) == 4, f"Expected 4 distinct images, got {unique}"
    print("OK", seen)
    browser.close()
