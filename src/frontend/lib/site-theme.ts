import { useEffect, useState } from "react";

export const siteThemes = ["diwali", "dark", "light"] as const;
export type SiteTheme = typeof siteThemes[number];
export const themeLabels: Record<SiteTheme, string> = { dark: "Dark", light: "Light", diwali: "Diwali" };
export function resolveTheme(value: string | null): SiteTheme {
  if (value === "navratri-dark" || value === "bome" || value === "moonlight") return "dark";
  if (value === "navratri") return "light";
  return siteThemes.find((theme) => theme === value) ?? "diwali";
}
// Retained for unreachable historical offerings; no current theme enables them.
export function isNavratri(_theme: SiteTheme) { return false; }
export function isSeasonal(theme: SiteTheme) { return theme === "diwali"; }
export function nextSiteTheme(theme: SiteTheme): SiteTheme {
  return siteThemes[(siteThemes.indexOf(theme) + 1) % siteThemes.length] ?? "diwali";
}
export function setSiteTheme(theme: SiteTheme) {
  document.documentElement.classList.remove(...siteThemes, "navratri", "sharad", "navratri-dark", "bome", "moonlight");
  document.documentElement.classList.add(theme);
  sessionStorage.setItem("rishishwar-theme", theme);
  window.dispatchEvent(new CustomEvent("site-theme", { detail: theme }));
}
export function useSiteTheme() {
  const [theme, setTheme] = useState<SiteTheme>("diwali");
  useEffect(() => {
    const saved = resolveTheme(sessionStorage.getItem("rishishwar-theme"));
    setSiteTheme(saved);
    setTheme(saved);
    const update = (event: Event) => setTheme(resolveTheme((event as CustomEvent<string>).detail));
    window.addEventListener("site-theme", update);
    return () => window.removeEventListener("site-theme", update);
  }, []);
  return theme;
}