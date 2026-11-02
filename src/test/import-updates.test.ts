import { describe, expect, it } from "vitest";
import { isNavratri, nextSiteTheme, resolveTheme, siteThemes } from "@/frontend/lib/site-theme";
import { publicPages } from "@/frontend/content/site-pages";
import { HIDDEN_PAGES_LIVE, lockHiddenPage } from "@/frontend/lib/hidden-pages";

describe("imported site navigation and themes", () => {
  it("offers only Diwali, Dark and Light and cycles through them", () => {
    expect(siteThemes).toEqual(["diwali", "dark", "light"]);
    expect(resolveTheme("navratri-dark")).toBe("dark");
    expect(resolveTheme("bome")).toBe("dark");
    expect(resolveTheme("moonlight")).toBe("dark");
    expect(nextSiteTheme("diwali")).toBe("dark");
    expect(nextSiteTheme("dark")).toBe("light");
    expect(nextSiteTheme("light")).toBe("diwali");
    expect(resolveTheme("diwali")).toBe("diwali");
    expect(isNavratri("dark")).toBe(false);
  });
  it("defaults new visitors and unknown selections to Diwali", () => {
    expect(resolveTheme(null)).toBe("diwali");
    expect(resolveTheme("unknown")).toBe("diwali");
  });
  it("migrates retired themes without enabling seasonal content", () => {
    expect(resolveTheme("navratri")).toBe("light");
    expect(resolveTheme("sharad")).toBe("diwali");
    expect(isNavratri(resolveTheme("navratri"))).toBe(false);
  });
  it("lists family pages but excludes removed offerings", () => {
    const paths = publicPages.map(page => page.path);
    expect(paths).not.toContain("/products");
    for (const path of ["/our-investors", "/our-mentors", "/our-team"]) expect(paths).toContain(path);
    for (const path of ["/funding-programme", "/summit-2026", "/fund-your-startup", "/startup-with-ripl", "/business-valuation-calculator", "/scale-your-startup"]) expect(paths).not.toContain(path);
  });
  it("keeps all existing family pages publicly unlocked", () => {
    expect(HIDDEN_PAGES_LIVE).toBe(true);
    expect(() => lockHiddenPage()).not.toThrow();
  });
});