Style Guide — Adsilo

Purpose
- Centralize design tokens and ensure theme-aware styling across the app.

Canonical token locations
- `src/app/globals.css` — canonical source for CSS variables (`--primary`, `--card`, etc.). Use this file for global token edits.
- `tailwind.config.ts` — Tailwind maps `adsilo.*` color tokens to these CSS variables. Keep mapping here when adding new tokens.

Token list (common)
- `--primary` — brand primary hue (used for CTAs, emphasis)
- `--secondary` — secondary hue for accents and gentle emphasis
- `--accent` — accent color for important UI elements
- `--card` — surface background token used in cards and panels
- `--card-foreground` — text on card surfaces
- `--background` / `--foreground` — page background and default text
- `--border` — border color used by semantic `border-adsilo-border`
- `--success`, `--warning`, `--destructive` — semantic feedback colors
- `--text-primary` — primary text color (high contrast)
- `--text-secondary` — secondary text color (muted)

Typography Scale
- `--font-display`: Playfair Display, used for headings.
- `--font-body`: Inter (applied by `src/app/globals.css`) — consistent UI body font.
- To change body font, update `--font-body` in `src/app/globals.css`.
- Tailwind utilities: `text-heading1` (2.5rem), `text-heading2` (2rem), `text-heading3` (1.5rem), `text-body` (1rem), `text-caption` (0.875rem).

Spacing System
- `--space-1` (0.25rem), `--space-2` (0.5rem), `--space-3` (0.75rem), `--space-4` (1rem), `--space-5` (1.25rem), `--space-6` (1.5rem), `--space-8` (2rem), `--space-10` (2.5rem), `--space-12` (3rem), `--space-16` (4rem), `--space-20` (5rem), `--space-24` (6rem).
- Tailwind utilities: `p-1` (0.25rem), `p-2` (0.5rem), etc., mapped to CSS variables for consistency.

Semantic classes to prefer
- `bg-card` — used for surfaces instead of `bg-white` so dark mode works automatically.
- `bg-sidebar` — sidebar background semantic token.
- `border-adsilo-border` — map for borders; uses `--border` variable.
- `text-muted-foreground`, `text-card-foreground` — semantic text color tokens.
- `text-adsilo-text-primary`, `text-adsilo-text-secondary` — adsilo-specific text tokens.

Button Variants
- `default`: Primary action, uses `--primary`.
- `cta`: Call-to-action, larger and more prominent, uses `--primary`.
- `secondary`: Subtle actions, uses `--secondary`.
- `outline`: Bordered, uses `--border`.
- `ghost`: Minimal, hover-only, uses `--accent`.
- `link`: Text-only link, uses `--primary`.
- `destructive`: Danger actions, uses `--destructive`.
- `success`: Positive feedback, uses `--success`.
- `warning`: Caution feedback, uses `--warning`.

Card Components
- `Card`: Base surface, uses `--card` background and `--text-primary` text.
- `CardTitle`: Headings, uses `text-heading2`.
- `CardDescription`: Subtext, uses `text-body` and `--text-secondary`.

Common fixes when visuals don't change locally
1. Restart dev server
   - Tailwind config changes require a restart so the JIT can rebuild CSS.
   - Commands (PowerShell):
```pwsh
npm install
npm run dev
```
2. Hard reload in browser
   - Open DevTools > Network > check "Disable cache" then reload, or press `Ctrl+Shift+R`.
3. Toggle dark mode to validate tokens
   - In browser console:
```js
document.documentElement.classList.toggle('dark')
```
4. Inspect element styling
   - In DevTools, inspect an element that should use `bg-card` or `border-adsilo-border` and ensure the computed style is `hsl(var(--card))` / `hsl(var(--border))`.

Recommended next steps
- Sweep remaining hardcoded colors used only for documentation/examples (SVG fills or style guide) and replace with tokens if needed.
- Standardize token usage across components: prefer semantic tokens over brand hex values for UI surfaces.
 - Add centralized CTA `Button` variant — a large, high-contrast button for lead conversion pages.
     - Use `variant="cta"` on `Button` in `src/components/ui/button.tsx` to render consistent CTAs.
 - Use `page-wrapper` utility to keep consistent page paddings and width and apply to the main page container (e.g., use in `AppLayout`).

Quick token check:
- Open `src/app/globals.css` and confirm the HSL triplet values for each token (they follow `H S% L%` format).
- The syntax used in Tailwind is `hsl(var(--token))` which reads the token and inserts it as an HSL triplet.

If you want, I can:
- Convert any remaining hard-coded hex usages to CSS variables across the repo.
- Create a small `style-preview` page that shows tokens and interactive color toggles for quick QA.