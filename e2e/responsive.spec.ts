import { expect, test, type Page } from "@playwright/test";

/**
 * Responsive matrix: every route × every target width.
 *  - no horizontal scrolling (scrollWidth <= viewport)
 *  - no visible element inside header/main/footer pokes past the viewport
 *    (unless an ancestor that fits the viewport clips it, e.g. carousels)
 *  - every image that is on-screen loads (naturalWidth > 0) and every video
 *    gets its source once scrolled near, with a poster that resolves.
 * Runs in its own Playwright project ("responsive"); touch/mobile emulation
 * is enabled below 1024px.
 */
const routes = ["/", "/projects", "/projects/sripriya-roseland", "/projects/sripriya-individual-house", "/gallery", "/about", "/contact"];
export const WIDTHS = [320, 360, 375, 390, 430, 600, 768, 820, 1024, 1280, 1366, 1440, 1920, 2560, 3440];

const heightFor = (w: number) => (w < 600 ? 800 : w < 1280 ? 1000 : w >= 2560 ? 1440 : 900);

async function scrollThrough(page: Page) {
  await page.evaluate(async () => {
    // the site uses CSS smooth scrolling; jump instantly so every section really enters the viewport
    document.documentElement.style.scrollBehavior = "auto";
    const step = Math.max(400, Math.round(window.innerHeight * 0.8));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      await new Promise((r) => setTimeout(r, 50));
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
    await new Promise((r) => setTimeout(r, 300));
  });
}

for (const width of WIDTHS) {
  test.describe(`${width}px`, () => {
    test.use({
      viewport: { width, height: heightFor(width) },
      isMobile: width < 1024,
      hasTouch: width < 1024,
      deviceScaleFactor: 1,
    });

    for (const route of routes) {
      test(`${route} fits ${width}px and loads media`, async ({ page, context }) => {
        await context.addInitScript(() => {
          try {
            window.sessionStorage.setItem("sp-quick-enquiry-seen", "1");
          } catch {
            /* ignore */
          }
        });
        const errors: string[] = [];
        page.on("pageerror", (e) => errors.push(e.message));
        const res = await page.goto(route, { waitUntil: "load" });
        expect(res?.status()).toBe(200);
        await scrollThrough(page);

        // 1. media: on-screen (horizontally) images must load; videos get a src near the viewport.
        const media = await page.evaluate(async () => {
          const W = document.documentElement.clientWidth;
          const shown = (el: Element) => {
            const s = getComputedStyle(el);
            const r = el.getBoundingClientRect();
            return s.display !== "none" && s.visibility !== "hidden" && r.width > 0 && r.height > 0 && r.right > 0 && r.left < W && !el.closest("[aria-hidden=true]");
          };
          const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
          const imgs = [...document.querySelectorAll<HTMLImageElement>("header img, main img, footer img")].filter(shown);
          const broken: string[] = [];
          for (const img of imgs) {
            if (!img.complete || img.naturalWidth === 0) {
              img.scrollIntoView({ block: "center" });
              for (let i = 0; i < 50 && (!img.complete || img.naturalWidth === 0); i++) await wait(100);
            }
            if (img.naturalWidth === 0) broken.push(img.currentSrc || img.src);
          }
          const videos = [...document.querySelectorAll<HTMLVideoElement>("main video")].filter(shown);
          const noSrc: string[] = [];
          const posters = new Set<string>();
          for (const v of videos) {
            v.scrollIntoView({ block: "center" });
            for (let i = 0; i < 30 && !v.getAttribute("src") && !v.querySelector("source"); i++) await wait(100);
            if (!v.getAttribute("src") && !v.querySelector("source")) noSrc.push(v.poster);
            if (v.poster) posters.add(v.poster);
          }
          window.scrollTo(0, 0);
          return { images: imgs.length, broken, videos: videos.length, noSrc, posters: [...posters] };
        });
        // Any reveal block the fast pass skipped must still appear once it is scrolled into view.
        const hiddenReveals = await page.evaluate(async () => {
          const pending = () => [...document.querySelectorAll(".reveal:not(.is-visible):not(.reveal-none)")].filter((el) => el.getClientRects().length > 0 && !el.closest("[aria-hidden=true]"));
          for (const el of pending()) {
            el.scrollIntoView({ block: "center" });
            await new Promise((r) => setTimeout(r, 150));
          }
          return pending().map((el) => (el.closest("section")?.id ?? "?") + ": " + (el.textContent ?? "").slice(0, 30));
        });
        expect(hiddenReveals, "scroll reveals that never became visible").toEqual([]);
        expect(media.broken, "broken images").toEqual([]);
        expect(media.noSrc, "videos without a source after scrolling into view").toEqual([]);
        for (const poster of media.posters) {
          const r = await page.request.get(poster);
          expect(r.status(), poster).toBe(200);
        }

        // 2. layout: nothing wider than the viewport.
        await page.waitForTimeout(300);
        const layout = await page.evaluate(() => {
          const W = document.documentElement.clientWidth;
          const visible = (el: Element) => {
            const s = getComputedStyle(el);
            const r = el.getBoundingClientRect();
            return s.visibility !== "hidden" && s.display !== "none" && r.width > 0 && r.height > 0 && parseFloat(s.opacity) > 0.01;
          };
          const clippedByAncestor = (el: Element) => {
            for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
              const s = getComputedStyle(a);
              if (s.overflowX !== "visible") {
                const r = a.getBoundingClientRect();
                if (r.right <= W + 1 && r.left >= -1) return true;
              }
            }
            return false;
          };
          const offenders = [...document.querySelectorAll("header *, main *, footer *")]
            .filter((el) => {
              const r = el.getBoundingClientRect();
              return (r.right > W + 1 || r.left < -1) && visible(el) && !el.closest("[aria-hidden=true]") && getComputedStyle(el).position !== "fixed" && !clippedByAncestor(el);
            })
            .slice(0, 5)
            .map((el) => `${el.tagName.toLowerCase()}.${String((el as HTMLElement).className).slice(0, 60)} [${Math.round(el.getBoundingClientRect().left)}, ${Math.round(el.getBoundingClientRect().right)}]`);
          return { scrollWidth: document.documentElement.scrollWidth, W, offenders };
        });
        // 3. the hero copy must not sit under the price badge or the fixed side "Enquire Now" tab.
        const heroClash = await page.evaluate(() => {
          const copy = document.querySelector('[data-testid="hero-copy"] h1');
          if (!copy) return [];
          const a = copy.getBoundingClientRect();
          const hits: string[] = [];
          for (const sel of ['[data-testid="hero-price"]', '[data-testid="enquiry-tab"]']) {
            const el = document.querySelector(sel);
            if (!el || getComputedStyle(el).display === "none") continue;
            const b = el.getBoundingClientRect();
            if (b.width === 0) continue;
            const overlap = a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
            if (overlap) hits.push(sel);
          }
          return hits;
        });
        expect(heroClash, "hero heading overlapped").toEqual([]);
        expect(layout.scrollWidth, "horizontal scroll").toBeLessThanOrEqual(layout.W);
        expect(layout.offenders, "elements past the viewport").toEqual([]);
        expect(errors).toEqual([]);
      });
    }
  });
}

test("every stock video source is served", async ({ request, page }) => {
  await page.goto("/");
  const html = await (await request.get("/")).text();
  const srcs = new Set<string>([...html.matchAll(/(\/videos\/[A-Za-z0-9_\-./]+\.mp4)/g)].map((m) => m[1]));
  const fromPage: string[] = await page.evaluate(() => [...document.querySelectorAll("video")].map((v) => v.getAttribute("data-src") || v.getAttribute("src") || "").filter(Boolean));
  fromPage.forEach((s) => srcs.add(s));
  expect(srcs.size).toBeGreaterThan(0);
  for (const src of srcs) {
    const r = await request.get(src, { headers: { Range: "bytes=0-1023" } });
    expect([200, 206], src).toContain(r.status());
    expect(r.headers()["content-type"], src).toContain("video");
  }
});
