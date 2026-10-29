import { describe, expect, it } from "vitest";
import { isNavratri, nextSiteTheme, resolveTheme, siteThemes } from "@/frontend/lib/site-theme";
import { publicPages } from "@/frontend/content/site-pages";
import { HIDDEN_PAGES_LIVE, lockHiddenPage } from "@/frontend/lib/hidden-pages";

describe("imported site navigation and themes", () => {
  it("offers four themes while recovering removed saved selections", () => {
    expect(siteThemes).toEqual(["navratri", "dark", "light", "sharad"]);
    expect(resolveTheme("navratri-dark")).toBe("dark");
    expect(resolveTheme("bome")).toBe("dark");
    expect(resolveTheme("moonlight")).toBe("dark");
    expect(nextSiteTheme("navratri")).toBe("dark");
    expect(nextSiteTheme("dark")).toBe("light");
    expect(nextSiteTheme("light")).toBe("sharad");
    expect(nextSiteTheme("sharad")).toBe("navratri");
    expect(isNavratri("dark")).toBe(false);
  });
  it("defaults new visitors and unknown selections to Sharad Purnima", () => {
    expect(resolveTheme(null)).toBe("sharad");
    expect(resolveTheme("unknown")).toBe("sharad");
    expect(resolveTheme("navratri")).toBe("navratri");
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