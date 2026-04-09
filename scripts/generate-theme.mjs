/**
 * Generate shadcn/ui-compatible theme CSS from figma/tokens/tokens.json
 *
 * Usage: node scripts/generate-theme.mjs
 *
 * Reads:  figma/tokens/tokens.json  (copied from th_mfa_dl)
 * Writes: src/index.css              (shadcn theme with MFA design tokens)
 *
 * The output follows the official shadcn/ui + Tailwind CSS v4 theming
 * convention: CSS variables under :root, @theme inline for Tailwind
 * color/radius registration, and @layer base for defaults.
 *
 * Reference: https://ui.shadcn.com/docs/theming
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const tokensPath = resolve(ROOT, "figma/tokens/tokens.json");
let tokens;
try {
  tokens = JSON.parse(readFileSync(tokensPath, "utf-8"));
} catch (err) {
  console.error(`❌ Cannot read ${tokensPath}`);
  console.error("   Run ./scripts/copy-design-assets.sh first to copy tokens from th_mfa_dl.");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Look up a semantic color token value by path */
function sem(path) {
  const col = tokens.collections["02 Color - Semantic Token"]?.variables?.[path];
  return col?.values?.default ?? null;
}

/** Look up a primitive color token value */
function prim(path) {
  const col = tokens.collections["01 Color - Primitive Token"]?.variables?.[path];
  return col?.values?.default ?? null;
}

// ---------------------------------------------------------------------------
// Token mapping: shadcn token name → resolved hex value
// ---------------------------------------------------------------------------

const colorMap = {
  // Core surfaces
  background: sem("surface/primary/default"),
  foreground: sem("text/primary"),
  card: sem("surface/primary/default"),
  "card-foreground": sem("text/primary"),
  popover: sem("surface/primary/default"),
  "popover-foreground": sem("text/primary"),

  // Primary = MFA accent blue
  primary: sem("surface/accent/default"),
  "primary-foreground": sem("text/inverse"),

  // Secondary
  secondary: sem("surface/secondary/default"),
  "secondary-foreground": sem("text/primary"),

  // Muted
  muted: sem("surface/secondary/default"),
  "muted-foreground": sem("text/secondary"),

  // Accent (hover/selected states)
  accent: sem("surface/selected/default"),
  "accent-foreground": sem("text/primary"),

  // Destructive
  destructive: sem("surface/status/error/default"),
  "destructive-foreground": sem("text/inverse"),
  "destructive-subtle": sem("surface/status/error/subtle/default"),

  // Link
  link: sem("text/link/default"),

  // Disabled
  disabled: sem("surface/disabled"),
  "disabled-foreground": sem("text/disabled"),

  // Borders
  border: sem("border/secondary"),
  "border-destructive": sem("border/status/error"),
  input: sem("border/primary"),
  ring: prim("primary/blue/main"),

  // Radius
  radius: "0.625rem",

  // Interactive state tokens
  "primary-hovered": sem("surface/accent/hovered"),
  "primary-pressed": sem("surface/accent/pressed"),
  "secondary-hovered": sem("surface/secondary/hovered"),
  "secondary-pressed": sem("surface/secondary/pressed"),
  "destructive-hovered": sem("surface/status/error/hovered"),
  "destructive-pressed": sem("surface/status/error/pressed"),
  "destructive-subtle-hovered": sem("surface/status/error/subtle/hovered"),
  "destructive-subtle-pressed": sem("surface/status/error/subtle/pressed"),
  "link-hovered": sem("text/link/hovered"),
  "link-pressed": sem("text/link/pressed"),

  // MFA extensions
  success: sem("surface/status/success/default"),
  "success-foreground": "#ffffff",
  warning: sem("surface/status/warning/default"),
  "warning-foreground": "#ffffff",
  info: sem("surface/status/info/lavender-default"),
  "info-foreground": "#ffffff",

  // Sidebar
  sidebar: sem("surface/primary/default"),
  "sidebar-foreground": sem("text/primary"),
  "sidebar-primary": sem("surface/accent/default"),
  "sidebar-primary-foreground": sem("text/inverse"),
  "sidebar-accent": sem("surface/selected/default"),
  "sidebar-accent-foreground": sem("text/primary"),
  "sidebar-border": sem("border/secondary"),
  "sidebar-ring": prim("primary/blue/main"),
};

// ---------------------------------------------------------------------------
// Typography from textStyles
// ---------------------------------------------------------------------------

const textStyles = tokens.textStyles || {};
const fontFamilies = new Set();
for (const style of Object.values(textStyles)) {
  if (style.fontFamily) fontFamilies.add(style.fontFamily);
}

const weightMap = {
  Thin: "100",
  Light: "300",
  Regular: "400",
  Medium: "500",
  SemiBold: "600",
  Bold: "700",
  ExtraBold: "800",
  Black: "900",
};

// ---------------------------------------------------------------------------
// Generate CSS
// ---------------------------------------------------------------------------

let css = `@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

/* ============================================================
 * Theme generated from figma/tokens/tokens.json
 * Run: node scripts/generate-theme.mjs
 * DO NOT EDIT — re-run the script to regenerate.
 * ============================================================ */

@theme inline {
    --font-heading: "Kanit", sans-serif;
    --font-body: "CS ChatThai", sans-serif;
    --font-sans: "CS ChatThai", sans-serif;
`;

// Register all color tokens as --color-* in @theme inline
for (const key of Object.keys(colorMap)) {
  if (key === "radius") continue;
  css += `    --color-${key}: var(--${key});\n`;
}

// Radius scale (shadcn convention)
css += `    --radius-sm: calc(var(--radius) * 0.6);
    --radius-md: calc(var(--radius) * 0.8);
    --radius-lg: var(--radius);
    --radius-xl: calc(var(--radius) * 1.4);
    --radius-2xl: calc(var(--radius) * 1.8);
    --radius-3xl: calc(var(--radius) * 2.2);
    --radius-4xl: calc(var(--radius) * 2.6);
`;

css += `}\n\n`;

// :root with resolved values
css += `:root {\n`;
for (const [key, val] of Object.entries(colorMap)) {
  if (val == null) {
    css += `    /* --${key}: TODO — no matching token */\n`;
  } else {
    css += `    --${key}: ${val};\n`;
  }
}
css += `}\n\n`;

css += `/* .dark { } — no dark mode tokens defined in Figma yet */\n\n`;

// Base layer (shadcn convention)
css += `@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground font-body;
  }
  h1, h2, h3, h4, h5, h6 {
    @apply font-heading;
  }
}\n\n`;

// Text style utilities
css += `/* ============================================================
 * Text Style Utilities — generated from Figma text styles
 * Usage: <h1 className="text-heading-1">...</h1>
 * ============================================================ */\n\n`;

css += `@layer utilities {\n`;

for (const [name, style] of Object.entries(textStyles)) {
  const className = name
    .replace(/\//g, "-")
    .replace(/\s+/g, "-")
    .toLowerCase()
    .replace(/^(\w+)-\1/, "$1");

  const weight = weightMap[style.fontWeight] || "400";
  const family =
    style.fontFamily === "Kanit"
      ? "var(--font-heading)"
      : "var(--font-body)";

  css += `  .text-${className} {\n`;
  css += `    font-family: ${family};\n`;
  css += `    font-size: ${style.fontSize}px;\n`;
  css += `    line-height: ${style.lineHeight}px;\n`;
  css += `    font-weight: ${weight};\n`;
  if (style.letterSpacing && style.letterSpacing !== 0 && style.letterSpacing !== "0%") {
    const ls =
      typeof style.letterSpacing === "number"
        ? `${style.letterSpacing}px`
        : style.letterSpacing;
    css += `    letter-spacing: ${ls};\n`;
  }
  css += `  }\n`;
}

css += `}\n`;

// ---------------------------------------------------------------------------
// Write output
// ---------------------------------------------------------------------------

const outPath = resolve(ROOT, "src/index.css");
writeFileSync(outPath, css);

console.log(`✅ Generated src/index.css from figma/tokens/tokens.json`);
console.log(`   ${Object.keys(colorMap).length} color tokens`);
console.log(`   ${Object.keys(textStyles).length} text style utilities`);
console.log(`   Font families: ${[...fontFamilies].join(", ")}`);
