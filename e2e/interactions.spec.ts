import { expect, test, type Locator, type Page } from "@playwright/test";

/** Touch, keyboard, focus-trap, responsive menu and reduced-motion behaviour. */

test.beforeEach(async ({ context }) => {
  await context.addInitScript(() => {
    try {
      window.sessionStorage.setItem("sp-quick-enquiry-seen", "1");
    } catch {
      /* ignore */
    }
  });
});

/** Dispatch a real touch drag through CDP (generates touch + pointer events). */
async function swipe(page: Page, target: Locator, dx: number) {
  await target.scrollIntoViewIfNeeded();
  const box = await target.boundingBox();
  if (!box) throw new Error("no box");
  const y = box.y + box.height / 2;
  const x0 = box.x + box.width / 2 + (dx < 0 ? 60 : -60);
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: x0, y }] });
  for (let i = 1; i <= 8; i++) {
    await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: x0 + (dx * i) / 8, y: y + i }] });
  }
  await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await cdp.detach();
}

async function tabUntilOutsideOrCount(page: Page, dialog: Locator, presses: number) {
  for (let i = 0; i < presses; i++) {
    await page.keyboard.press("Tab");
    const inside = await dialog.evaluate((d) => d.contains(document.activeElement));
    if (!inside) return false;
  }
  return true;
}

test.describe("touch", () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

  test("swipe changes the shorts coverflow and the films slider", async ({ page }) => {
    await page.goto("/");
    const track = page.getByTestId("shorts-track");
    await expect(track).toHaveAttribute("data-index", "0");
    await swipe(page, track, -160);
    await expect(track).toHaveAttribute("data-index", "1");
    await swipe(page, track, 160);
    await expect(track).toHaveAttribute("data-index", "0");

    const caption = page.getByTestId("film-caption");
    const first = await caption.textContent();
    await swipe(page, page.getByTestId("films-frame"), -160);
    await expect(caption).not.toHaveText(first ?? "");
  });

  test("gallery carousel scrolls natively with a swipe", async ({ page }) => {
    await page.goto("/");
    const track = page.getByTestId("gallery-track");
    await track.scrollIntoViewIfNeeded();
    const before = await track.evaluate((el) => el.scrollLeft);
    await swipe(page, track, -200);
    await expect.poll(() => track.evaluate((el) => el.scrollLeft)).toBeGreaterThan(before + 40);
  });

  test("tapping the menu opens the off-canvas; links are at least 44px tall", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("navigation", { name: "Primary" })).toBeHidden();
    await page.getByTestId("menu-toggle").tap();
    const panel = page.getByTestId("offcanvas");
    await expect(panel).toBeVisible();
    const heights = await panel.locator("nav a").evaluateAll((as) => as.map((a) => a.getBoundingClientRect().height));
    expect(Math.min(...heights)).toBeGreaterThanOrEqual(44);
    await panel.getByRole("button", { name: "Close menu" }).tap();
    await expect(panel).toBeHidden();
  });
});

test.describe("responsive navigation", () => {
  for (const w of [320, 600, 768, 820]) {
    test(`menu button replaces the primary nav at ${w}px`, async ({ page }) => {
      await page.setViewportSize({ width: w, height: 900 });
      await page.goto("/about");
      await expect(page.getByTestId("menu-toggle")).toBeVisible();
      await expect(page.getByRole("navigation", { name: "Primary" })).toBeHidden();
    });
  }
  for (const w of [1024, 1280, 1920]) {
    // Like the reference, the off-canvas toggle stays available next to the full nav on desktop.
    test(`primary nav is shown alongside the menu toggle at ${w}px`, async ({ page }) => {
      await page.setViewportSize({ width: w, height: 900 });
      await page.goto("/about");
      await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
      await expect(page.getByTestId("menu-toggle")).toBeVisible();
    });
  }
});

test.describe("keyboard", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("tab order starts with the skip link, then header controls, with a visible focus ring", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();
    const order: string[] = [];
    for (let i = 0; i < 4; i++) {
      await page.keyboard.press("Tab");
      order.push(await page.evaluate(() => (document.activeElement?.getAttribute("aria-label") || document.activeElement?.textContent || "").trim().slice(0, 40)));
      const ring = await page.evaluate(() => {
        const s = getComputedStyle(document.activeElement as Element);
        return s.outlineStyle !== "none" && parseFloat(s.outlineWidth) >= 2;
      });
      expect(ring, `focus ring on ${order.at(-1)}`).toBe(true);
      const inHeader = await page.evaluate(() => Boolean(document.activeElement?.closest("header")));
      expect(inHeader).toBe(true);
    }
    expect(order[0]).toMatch(/Sripriya/i); // logo first
  });

  test("enquiry popup traps focus and Escape closes it, returning focus", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: /Enquire Now/i }).first();
    await trigger.focus();
    await page.keyboard.press("Enter");
    const dialog = page.getByTestId("enquiry-modal");
    await expect(dialog).toBeVisible();
    await expect.poll(() => dialog.evaluate((d) => d.contains(document.activeElement))).toBe(true);
    expect(await tabUntilOutsideOrCount(page, dialog, 25)).toBe(true);
    await page.keyboard.press("Shift+Tab");
    expect(await dialog.evaluate((d) => d.contains(document.activeElement))).toBe(true);
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("brochure popup traps focus and closes with Escape", async ({ page }) => {
    await page.goto("/projects/sripriya-roseland");
    await page.getByTestId("header-brochure").click();
    const dialog = page.getByTestId("brochure-modal");
    await expect(dialog).toBeVisible();
    expect(await tabUntilOutsideOrCount(page, dialog, 20)).toBe(true);
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("gallery lightbox traps focus, arrow keys navigate, Escape closes", async ({ page }) => {
    await page.goto("/");
    const track = page.getByTestId("gallery-track");
    await track.scrollIntoViewIfNeeded();
    const opener = track.getByRole("button").first();
    await opener.focus();
    await page.keyboard.press("Enter");
    const box = page.getByTestId("lightbox");
    await expect(box).toBeVisible();
    await expect(box.getByRole("button", { name: "Close gallery" })).toBeFocused();
    expect(await tabUntilOutsideOrCount(page, box, 12)).toBe(true);
    const label = await box.getAttribute("aria-label");
    await page.keyboard.press("ArrowRight");
    await expect(box).not.toHaveAttribute("aria-label", label ?? "");
    await page.keyboard.press("Escape");
    await expect(box).toBeHidden();
  });

  test("walkthrough video modal traps focus and closes with Escape", async ({ page }) => {
    await page.goto("/");
    const band = page.locator("#walkthrough");
    await band.scrollIntoViewIfNeeded();
    const play = band.getByRole("button", { name: /Play/ });
    await play.focus();
    await page.keyboard.press("Enter");
    const dialog = page.getByTestId("video-modal");
    await expect(dialog).toBeVisible();
    await expect.poll(() => dialog.evaluate((d) => d.contains(document.activeElement))).toBe(true);
    expect(await tabUntilOutsideOrCount(page, dialog, 8)).toBe(true);
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(play).toBeFocused();
  });

  test("off-canvas menu traps focus", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1000 });
    await page.goto("/");
    await page.getByTestId("menu-toggle").click();
    const panel = page.getByTestId("offcanvas");
    await expect(panel.getByRole("button", { name: "Close menu" })).toBeFocused();
    expect(await tabUntilOutsideOrCount(page, panel, 30)).toBe(true);
    await page.keyboard.press("Escape");
    await expect(panel).toBeHidden();
  });

  test("specification tabs are reachable and switch with the keyboard", async ({ page }) => {
    await page.goto("/");
    const tabs = page.getByTestId("specs-tabs").getByRole("tab");
    await tabs.first().focus();
    await page.keyboard.press("ArrowRight");
    await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
  });
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce", viewport: { width: 1440, height: 900 } });

  test("content is visible without animation and nothing auto-advances", async ({ page }) => {
    await page.goto("/");
    // headings / reveal blocks are fully visible straight away
    const words = await page.locator(".split-word").evaluateAll((els) => els.slice(0, 40).map((e) => getComputedStyle(e).opacity));
    expect(words.every((o) => o === "1")).toBe(true);
    // marquees are static
    const anim = await page.locator(".marquee-track").first().evaluate((e) => getComputedStyle(e).animationName);
    expect(anim).toBe("none");
    // hero image has no zoom animation
    const heroAnim = await page.getByTestId("hero").locator("img").first().evaluate((e) => getComputedStyle(e).animationName);
    expect(heroAnim).toBe("none");
    // gallery carousel does not autoplay
    const track = page.getByTestId("gallery-track");
    await track.scrollIntoViewIfNeeded();
    const s0 = await track.evaluate((e) => e.scrollLeft);
    await page.waitForTimeout(4500);
    expect(await track.evaluate((e) => e.scrollLeft)).toBe(s0);
    // ambient shorts video is not autoplaying
    const playing = await page.locator("#shorts video").first().evaluate((v: HTMLVideoElement) => !v.paused);
    expect(playing).toBe(false);
  });

  test("modals still open and close under reduced motion", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("header-brochure").click();
    await expect(page.getByTestId("brochure-modal")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByTestId("brochure-modal")).toBeHidden();
  });
});
