/**
 * Light ("classic") theme CSS custom property values, applied as inline
 * styles on <html> (via ThemeProvider + the anti-flash init script) rather
 * than through a `[data-theme="light"] { --x: ... }` stylesheet rule.
 *
 * That stylesheet approach was tried first and silently failed in
 * production builds only — Tailwind v4's build (Lightning CSS) appears to
 * constant-fold these custom properties, so a conditional override written
 * in CSS never took effect there even though dev-mode-style manual checks
 * suggested it should. Inline styles have the highest possible CSS
 * specificity and are applied directly via the CSSOM, so they aren't
 * subject to that optimization — this is the reliable mechanism.
 */
export const lightThemeVars: Record<string, string> = {
  "--background": "#f6f1e6",
  "--foreground": "#17223a",

  "--color-brand-950": "#f6f1e6",
  "--color-brand-900": "#ffffff",
  "--color-brand-800": "#ede6d4",
  "--color-brand-700": "#ddd2b8",
  "--color-brand-600": "#c9bb9d",
  "--color-brand-500": "#a89678",
  "--color-brand-400": "#4b5568",
  "--color-brand-300": "#1c2740",
  "--color-brand-200": "#141b2c",
  "--color-brand-100": "#f0ece0",
  "--color-brand-50": "#faf7ef",

  "--color-accent-600": "#8a4028",
  "--color-accent-500": "#bd5a3e",
  "--color-accent-400": "#a8532f",
  "--color-accent-300": "#8f4527",
  "--color-accent-200": "#f0d9cd",
  "--color-accent-100": "#f9ece5",
};

export function applyLightThemeVars(target: HTMLElement) {
  for (const [key, value] of Object.entries(lightThemeVars)) {
    target.style.setProperty(key, value);
  }
}

export function clearLightThemeVars(target: HTMLElement) {
  for (const key of Object.keys(lightThemeVars)) {
    target.style.removeProperty(key);
  }
}
