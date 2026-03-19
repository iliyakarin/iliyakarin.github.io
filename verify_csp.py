from playwright.sync_api import sync_playwright

def verify_csp():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Capture console messages
        console_messages = []
        page.on("console", lambda msg: console_messages.append(msg))

        # Use port 4321 as seen in logs
        page.goto("http://localhost:4321")

        # Verify title to ensure page loaded
        print(f"Page Title: {page.title()}")

        # Scroll to the bottom of the page to trigger IntersectionObserver
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")

        # Verify Calendly widget is present (iframe)
        try:
            # The widget loads an iframe. We can check for the class or the iframe itself.
            page.wait_for_selector(".calendly-inline-widget iframe", timeout=10000)
            print("SUCCESS: Calendly widget iframe found.")
        except Exception as e:
            print(f"ERROR: Calendly widget iframe NOT found. {e}")

        # Check for CSP errors in console
        csp_errors = [msg.text for msg in console_messages if "Content Security Policy" in msg.text]
        if csp_errors:
            print("ERROR: CSP Violations found:")
            for error in csp_errors:
                print(f"- {error}")
        else:
            print("SUCCESS: No CSP violations found in console.")

        # Check for styles (visual check via screenshot mostly, but can check computed style)
        # Checking body background color as a proxy for tailwind working
        body_bg = page.eval_on_selector("body", "el => window.getComputedStyle(el).backgroundColor")
        print(f"Body Background Color: {body_bg}")
        # slate-900 is rgb(15, 23, 42) or close to it
        if body_bg == "rgb(15, 23, 42)" or "oklch" in body_bg:
             print("SUCCESS: Tailwind styles appear to be applied (body bg is slate-900).")
        else:
             print(f"WARNING: Body background color {body_bg} might indicate styles are broken.")

        page.screenshot(path="verification_csp.png")
        print("Screenshot saved to verification_csp.png")

        browser.close()

if __name__ == "__main__":
    verify_csp()
