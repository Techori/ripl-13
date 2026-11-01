import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { nextSiteTheme, setSiteTheme, siteThemes, themeLabels, useSiteTheme } from "../lib/site-theme";

export function ThemeCycle() {
  const theme = useSiteTheme();
  const Icon = theme === "dark" ? Moon : Sun;
  return <Button variant="outline" size="icon" className="theme-cycle hidden md:inline-flex" aria-label="Change theme" title={`${themeLabels[theme]} → ${themeLabels[nextSiteTheme(theme)]}`} onClick={() => setSiteTheme(nextSiteTheme(theme))}><Icon /></Button>;
}

export function ThemeMenuOptions() {
  const theme = useSiteTheme();
  return (
    <div className="mb-3 grid gap-2 border-b border-border pb-4">
      <span className="px-1 font-display text-xs font-semibold uppercase tracking-wider text-foreground/60">Theme</span>
      <div className="grid grid-cols-2 gap-2">
        {siteThemes.map((t) => (
          <Button key={t} type="button" variant={theme === t ? "default" : "outline"} aria-pressed={theme === t} onClick={() => setSiteTheme(t)} className="h-auto whitespace-normal px-2 py-2 font-display text-[11px] font-semibold uppercase">{themeLabels[t]}</Button>
        ))}
      </div>
    </div>
  );
}
