import { expect, test } from "@playwright/test";

// The quick-enquiry popup auto-opens once per session (like the reference page).
// Mark it as already seen so it doesn't cover the page in unrelated tests;
// the "auto-opens" test below uses a fresh context without this flag.
test.beforeEach(async ({ context }, testInfo) => {
  if (testInfo.title.includes("[fresh session]")) return;
  await context.addInitScript(() => {
    try {
      window.sessionStorage.setItem("sp-quick-enquiry-seen", "1");
    } catch {
      /* ignore */
    }
  });
});

const routes = [
  { path: "/", h1: /Crafting Quality Homes for/ },
  { path: "/projects", h1: /Explore Our Projects/ },
  { path: "/projects/sripriya-roseland", h1: /RoseLand/ },
  { path: "/projects/sripriya-individual-house", h1: /Individual House/ },
  { path: "/gallery", h1: /Excellence in Every Frame/ },
  { path: "/about", h1: /Building Dreams Since 2008/ },
  { path: "/contact", h1: /We'd Love to Hear From You/ },
];

test.describe("routes", () => {
  for (const r of routes) {
    test(`${r.path} renders without errors or horizontal overflow`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (m) => {
        if (m.type() === "error") errors.push(m.text());
      });
      const res = await page.goto(r.path);
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveText(r.h1);
      await expect(page.locator("h1")).toHaveCount(1);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(0);
      await expect(page.getByRole("contentinfo")).toContainText("sripriyashelters@gmail.com");
      expect(errors.filter((e) => !/maps|google/i.test(e))).toEqual([]);
    });
  }

  test("legacy mixed-case project URLs permanently redirect", async ({ page }) => {
    const res = await page.request.get("/projects/sripriya-RoseLand", { maxRedirects: 0 });
    expect(res.status()).toBe(308);
    expect(res.headers()["location"]).toContain("/projects/sripriya-roseland");
    await page.goto("/projects/sripriya-Individual-house");
    await expect(page).toHaveURL(/\/projects\/sripriya-individual-house$/);
  });

  test("unknown project shows not-found page with noindex", async ({ page }) => {
    await page.goto("/projects/does-not-exist");
    await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
    // Next.js may emit the noindex tag twice (initial HTML + streamed metadata); what matters is
    // that it is present and never contradicted by an "index" directive.
    await expect(page.locator('meta[name="robots"][content*="noindex"]').first()).toBeAttached();
    await expect(page.locator('meta[name="robots"][content^="index"]')).toHaveCount(0);
  });

  test("sitemap and robots are served", async ({ request }) => {
    const sm = await request.get("/sitemap.xml");
    expect(sm.ok()).toBeTruthy();
    expect(await sm.text()).toContain("/projects/sripriya-roseland");
    const rb = await request.get("/robots.txt");
    expect(await rb.text()).toContain("Sitemap:");
  });
});

test.describe("navigation", () => {
  test("off-canvas menu opens, navigates and closes with Escape", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("menu-toggle").click();
    const panel = page.getByTestId("offcanvas");
    await expect(panel).toBeVisible();
    await expect(panel.getByRole("link", { name: "+91 96001 03760" })).toHaveAttribute("href", "tel:+919600103760");
    await page.keyboard.press("Escape");
    await expect(panel).toBeHidden();
    await page.getByTestId("menu-toggle").click();
    await panel.getByRole("link", { name: "Gallery" }).click();
    await expect(page).toHaveURL(/\/gallery$/);
    await expect(panel).toBeHidden();
  });

  test("desktop primary nav marks the active page", async ({ page, isMobile }) => {
    test.skip(isMobile, "primary nav is collapsed into the off-canvas on mobile");
    await page.goto("/about");
    const nav = page.getByRole("navigation", { name: "Primary" });
    await expect(nav.getByRole("link", { name: "About" })).toHaveAttribute("aria-current", "page");
    await nav.getByRole("link", { name: "Projects" }).click();
    await expect(page).toHaveURL(/\/projects$/);
  });

  test("header hides on scroll down and returns on scroll up", async ({ page }) => {
    await page.goto("/");
    const header = page.getByTestId("site-header");
    await page.mouse.wheel(0, 1500);
    await expect.poll(async () => (await header.boundingBox())?.y ?? 0).toBeLessThan(-40);
    await page.mouse.wheel(0, -600);
    await expect.poll(async () => (await header.boundingBox())?.y ?? -100).toBeGreaterThanOrEqual(-1);
  });

  test("project cards link to detail pages", async ({ page }) => {
    await page.goto("/projects");
    await page.getByRole("link", { name: /RoseLand, Shankar nagar/ }).click();
    await expect(page).toHaveURL(/\/projects\/sripriya-roseland$/);
    await page.locator("#overview").getByRole("button", { name: "Download Brochure" }).click();
    const modal = page.getByTestId("brochure-modal");
    await expect(modal).toBeVisible();
    await expect(modal.getByTestId("brochure-download")).toHaveAttribute("href", /drive\.google\.com/);
  });
});

test.describe("interactions", () => {
  test("project status filters work, including the empty Upcoming state", async ({ page }) => {
    await page.goto("/projects");
    const grid = page.getByTestId("project-grid");
    await expect(grid.getByRole("link")).toHaveCount(2);
    await page.getByRole("button", { name: "Ongoing" }).click();
    await expect(grid.getByRole("link")).toHaveCount(1);
    await expect(grid).toContainText("RoseLand");
    await page.getByRole("button", { name: "Completed" }).click();
    await expect(grid).toContainText("Individual House");
    await page.getByRole("button", { name: "Upcoming" }).click();
    await expect(page.getByTestId("projects-empty")).toBeVisible();
  });

  test("gallery filter + lightbox with keyboard navigation and Escape", async ({ page }) => {
    await page.goto("/gallery");
    const grid = page.getByTestId("gallery-grid");
    await expect(grid.locator("li")).toHaveCount(12);
    await page.getByRole("button", { name: "Floor Plans", exact: true }).click();
    await expect(grid.locator("li")).toHaveCount(2);
    await page.getByRole("button", { name: "All", exact: true }).click();
    await grid.getByRole("button").first().click();
    const lb = page.getByTestId("lightbox");
    await expect(lb).toBeVisible();
    await expect(lb).toContainText("1 / 12");
    await page.keyboard.press("ArrowRight");
    await expect(lb).toContainText("2 / 12");
    await page.keyboard.press("Escape");
    await expect(lb).toBeHidden();
  });

  test("plans tabs switch with click and arrow keys", async ({ page }) => {
    await page.goto("/projects/sripriya-roseland");
    const tablist = page.getByRole("tablist", { name: "Plan categories" });
    await tablist.scrollIntoViewIfNeeded();
    await tablist.getByRole("tab", { name: "Parking Plan" }).click();
    await expect(page.locator("#plans").getByRole("tabpanel")).toContainText("Parking Plan");
    await page.keyboard.press("ArrowDown");
    await expect(tablist.getByRole("tab", { name: "Location Map" })).toHaveAttribute("aria-selected", "true");
  });

  test("enquiry modal opens from the side tab and closes", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("enquiry-tab").click();
    const modal = page.getByTestId("enquiry-modal");
    await expect(modal).toBeVisible();
    await expect(modal.getByRole("heading", { name: /Quick Enquiry/ })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(modal).toBeHidden();
  });

  test("contact form validates and never fakes success without an endpoint", async ({ page }) => {
    await page.goto("/contact");
    const form = page.getByTestId("enquiry-form").first();
    await form.scrollIntoViewIfNeeded();
    await form.getByRole("button", { name: /Submit Now/ }).click();
    await expect(form.getByText("Name must be at least 2 characters")).toBeVisible();
    await expect(form.getByText("Please enter a valid phone number")).toBeVisible();
    await expect(form.getByText("Please enter a valid email address")).toBeVisible();
    await expect(form.getByText("Message must be at least 10 characters")).toBeVisible();
    await expect(form.getByLabel(/Full Name/)).toBeFocused();

    await form.getByLabel(/Full Name/).fill("Test Visitor");
    await form.getByLabel(/Phone Number/).fill("98765 43210");
    await form.getByLabel(/Email Address/).fill("visitor@example.com");
    await form.getByLabel(/Your Message/).fill("I would like to know more about RoseLand.");
    await page.waitForTimeout(2600); // minimum time-to-submit anti-spam guard
    // Intercept the mailto navigation so the test doesn't leave the page.
    await page.evaluate(() => {
      window.addEventListener("beforeunload", (e) => e.preventDefault());
    });
    await form.getByRole("button", { name: /Submit Now/ }).click();
    await expect(form.getByTestId("mail-client-notice")).toBeVisible();
    await expect(form.getByText(/Your enquiry has been sent/)).toHaveCount(0);
  });

  test("contact details use tel:/mailto: links with verified values", async ({ page }) => {
    await page.goto("/contact");
    const main = page.locator("main");
    await expect(main.getByRole("link", { name: "+91 96001 03760" }).first()).toHaveAttribute("href", "tel:+919600103760");
    await expect(main.getByRole("link", { name: "sripriyashelters@gmail.com" }).first()).toHaveAttribute("href", "mailto:sripriyashelters@gmail.com");
    await expect(page.locator('iframe[title^="Map showing"]')).toHaveAttribute("src", /google\.com\/maps/);
    await expect(page.getByRole("link", { name: "Chat on WhatsApp" })).toHaveAttribute("href", /wa\.me\/919962863133/);
  });

  test("individual house shows the sample floor plan and no visible placeholders", async ({ page }) => {
    await page.goto("/projects/sripriya-individual-house");
    await expect(page.locator('[data-placeholder="true"]')).toHaveCount(0);
    const plans = page.locator("#plans");
    await plans.scrollIntoViewIfNeeded();
    await expect(plans.locator('img[src*="individual-house-sample-floor-plan.svg"]')).toHaveCount(1);
    await expect(page.locator("body")).not.toContainText(/placeholder/i);
  });
});

test.describe("reference landing sections", () => {
  const order = ["home", "why", "terrace-view", "overview", "location", "films", "walkthrough", "shorts", "gallery", "amenities", "specifications", "approvals", "testimonials", "about-company", "contact", "projects"];

  for (const path of ["/", "/projects/sripriya-roseland", "/projects/sripriya-individual-house"]) {
    test(`${path} renders every reference section in order`, async ({ page }) => {
      await page.goto(path);
      const ids = await page.evaluate((wanted) => wanted.map((id) => document.getElementById(id)?.getBoundingClientRect().top ?? null), order);
      expect(ids.every((y) => y !== null)).toBeTruthy();
      const ys = ids as number[];
      for (let i = 1; i < ys.length; i++) expect(ys[i]).toBeGreaterThan(ys[i - 1]);
    });
  }

  test("quick-enquiry popup auto-opens once per session [fresh session]", async ({ page }) => {
    await page.goto("/");
    const modal = page.getByTestId("enquiry-modal");
    await expect(modal).toBeVisible({ timeout: 8000 });
    await expect(modal.getByLabel("When are you planning to buy?")).toBeVisible();
    await expect(modal.getByLabel("Interested In")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(modal).toBeHidden();
    await page.reload();
    await page.waitForTimeout(4500);
    await expect(modal).toBeHidden();
  });

  test("quick-enquiry form only needs name and phone", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("enquiry-tab").click();
    const modal = page.getByTestId("enquiry-modal");
    await modal.getByRole("button", { name: /Submit Enquiry/ }).click();
    await expect(modal.getByText("Name must be at least 2 characters")).toBeVisible();
    await expect(modal.getByText("Please enter a valid phone number")).toBeVisible();
    await expect(modal.getByText("Please enter a valid email address")).toHaveCount(0);
  });

  test("header Brochure pill opens the brochure popup", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("header-brochure").click();
    const modal = page.getByTestId("brochure-modal");
    await expect(modal).toBeVisible();
    await expect(modal.getByTestId("brochure-download")).toHaveAttribute("href", /drive\.google\.com/);
    await page.keyboard.press("Escape");
    await expect(modal).toBeHidden();
    await page.goto("/projects/sripriya-individual-house");
    await page.getByTestId("header-brochure").click();
    await expect(modal.getByRole("button", { name: /Request Brochure/ })).toBeVisible();
  });

  test("specifications: tabs on desktop, accordion on mobile", async ({ page, isMobile }) => {
    await page.goto("/projects/sripriya-roseland");
    const section = page.locator("#specifications");
    await section.scrollIntoViewIfNeeded();
    if (isMobile) {
      const acc = page.getByTestId("specs-accordion");
      await expect(acc).toBeVisible();
      const btn = acc.getByRole("button", { name: "Tiling Works" });
      await btn.click();
      await expect(btn).toHaveAttribute("aria-expanded", "true");
      await expect(acc.getByRole("button", { name: "Structure" })).toHaveAttribute("aria-expanded", "false");
    } else {
      const tabs = section.getByRole("tablist", { name: "Specification categories" });
      await tabs.getByRole("tab", { name: "Kitchen" }).click();
      await expect(section.getByRole("tabpanel")).toContainText("Kitchen");
      await page.keyboard.press("ArrowDown");
      await expect(tabs.getByRole("tab", { name: "CP & Sanitary" })).toHaveAttribute("aria-selected", "true");
    }
  });

  test("films slider, shorts coverflow and walkthrough video work", async ({ page }) => {
    await page.goto("/");
    const films = page.locator("#films");
    await films.scrollIntoViewIfNeeded();
    const caption = page.getByTestId("film-caption");
    const first = await caption.textContent();
    await films.getByRole("button", { name: "Next video" }).click();
    await expect(caption).not.toHaveText(first ?? "");

    const shorts = page.locator("#shorts");
    await shorts.scrollIntoViewIfNeeded();
    const track = page.getByTestId("shorts-track");
    await expect(track).toHaveAttribute("data-index", "0");
    await shorts.getByRole("button", { name: "Next clip" }).click();
    await expect(track).toHaveAttribute("data-index", "1");
    if ((page.viewportSize()?.width ?? 0) >= 430) {
      await expect(shorts.getByRole("tablist", { name: "Choose clip" }).getByRole("tab").nth(1)).toHaveAttribute("aria-selected", "true");
    } else {
      await expect(page.getByTestId("shorts-counter")).toHaveText(/2 \/ \d/);
    }

    const band = page.locator("#walkthrough");
    await band.scrollIntoViewIfNeeded();
    await band.getByRole("button", { name: /Play/ }).click();
    await expect(page.getByTestId("video-modal")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByTestId("video-modal")).toBeHidden();
  });

  test("landmark videos are lazy-loaded with posters", async ({ page }) => {
    await page.goto("/projects/sripriya-roseland");
    const vids = page.getByTestId("landmarks").locator("video");
    await expect(vids).toHaveCount(4);
    await expect(vids.first()).toHaveAttribute("data-poster", /\/images\/stock\/posters\//);
    await expect(vids.first()).not.toHaveAttribute("src", /.+/);
    await page.getByTestId("landmarks").scrollIntoViewIfNeeded();
    await expect(vids.first()).toHaveAttribute("poster", /\/images\/stock\/posters\//);
    await expect(vids.first()).toHaveAttribute("src", /\/videos\/landmark-/);
  });

  test("project gallery carousel opens the lightbox; amenities and approvals render", async ({ page }) => {
    await page.goto("/projects/sripriya-roseland");
    const gallery = page.locator("#gallery");
    await gallery.scrollIntoViewIfNeeded();
    await page.getByTestId("gallery-track").getByRole("button").first().click();
    const lb = page.getByTestId("lightbox");
    await expect(lb).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(lb).toBeHidden();

    await expect(page.getByTestId("amenity-marquee")).toContainText("Potable Water");
    await expect(page.getByTestId("approval-card").first()).toContainText("TN/XX/Building/XXXX/2026");
  });
});
