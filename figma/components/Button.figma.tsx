import React from "react"
import { Mail, AlertCircle } from "lucide-react"

/**
 * Figma component: Button
 * Figma node: 157:3172 (COMPONENT_SET)
 * Figma page: ↪ Button (153:496)
 *
 * Properties:
 *   - type: primary | secondary | tertiary | destructive | destructive-outline | text link | destructive-text link | disabled
 *   - size: small (h=32px) | medium (h=36px) | large (h=40px) | icon (36×36px)
 *   - state: default | hover | pressed | disabled
 *   - icon: true | false
 *
 * Border radius: 6px (rounded-sm) for all sizes, 8px (rounded-md) for icon
 *
 * Design tokens — state matrix:
 *
 * | Variant            | Default bg              | Hovered bg                   | Pressed bg                   | Text color               | Border                     |
 * |--------------------|-------------------------|------------------------------|------------------------------|--------------------------|----------------------------|
 * | primary            | --primary (#0a5fa4)     | --primary-hovered (#3b7fb6)  | --primary-pressed (#6c9fc8)  | --primary-fg (#fff)      | none                       |
 * | secondary          | --secondary (#f5f6f7)   | --secondary-hovered (#ebedef)| --secondary-pressed (#e2e3e6)| --foreground (#242526)   | 1px --border (#ced1d6)     |
 * | tertiary           | transparent             | --secondary (#f5f6f7)        | --secondary-hovered (#ebedef)| --foreground (#242526)   | none                       |
 * | destructive        | --destructive (#e6504c) | --destructive-hovered (#eb7370)| --destructive-pressed (#f09694)| --destructive-fg (#fff)| none                       |
 * | destructive-outline| --destructive-subtle (#fadcdb)| --destructive-subtle-hovered (#f5b9b7)| --destructive-subtle-pressed (#f09694)| --destructive (#e6504c)| 1px --border-destructive |
 * | link               | transparent             | transparent                  | transparent                  | --link (#0492c2) → hovered (#36a8ce) → pressed (#68beda) | none, underline |
 * | destructive-link   | transparent             | transparent                  | transparent                  | --destructive (#e6504c)  | none, underline            |
 * | disabled           | --disabled (#ebedef)    | —                            | —                            | --disabled-fg (#bec0c5)  | none                       |
 */

/* ── Inline Button matching Figma tokens exactly ── */
type ButtonVariant = "primary" | "secondary" | "tertiary" | "destructive" | "destructive-outline" | "link" | "destructive-link";
type ButtonSize = "sm" | "default" | "lg" | "icon";
type ButtonState = "default" | "hovered" | "pressed";

const variantStateStyles: Record<ButtonVariant, Record<ButtonState, React.CSSProperties>> = {
  primary: {
    default:  { backgroundColor: "var(--color-primary)", color: "var(--color-primary-foreground)", border: "none" },
    hovered:  { backgroundColor: "var(--color-primary-hovered)", color: "var(--color-primary-foreground)", border: "none" },
    pressed:  { backgroundColor: "var(--color-primary-pressed)", color: "var(--color-primary-foreground)", border: "none" },
  },
  secondary: {
    default:  { backgroundColor: "var(--color-secondary)", color: "var(--color-foreground)", border: "1px solid var(--color-border)" },
    hovered:  { backgroundColor: "var(--color-secondary-hovered)", color: "var(--color-foreground)", border: "1px solid var(--color-border)" },
    pressed:  { backgroundColor: "var(--color-secondary-pressed)", color: "var(--color-foreground)", border: "1px solid var(--color-border)" },
  },
  tertiary: {
    default:  { backgroundColor: "transparent", color: "var(--color-foreground)", border: "none" },
    hovered:  { backgroundColor: "var(--color-secondary)", color: "var(--color-foreground)", border: "none" },
    pressed:  { backgroundColor: "var(--color-secondary-hovered)", color: "var(--color-foreground)", border: "none" },
  },
  destructive: {
    default:  { backgroundColor: "var(--color-destructive)", color: "var(--color-destructive-foreground)", border: "none" },
    hovered:  { backgroundColor: "var(--color-destructive-hovered)", color: "var(--color-destructive-foreground)", border: "none" },
    pressed:  { backgroundColor: "var(--color-destructive-pressed)", color: "var(--color-destructive-foreground)", border: "none" },
  },
  "destructive-outline": {
    default:  { backgroundColor: "var(--color-destructive-subtle)", color: "var(--color-destructive)", border: "1px solid var(--color-border-destructive)" },
    hovered:  { backgroundColor: "var(--color-destructive-subtle-hovered)", color: "var(--color-destructive)", border: "1px solid var(--color-border-destructive)" },
    pressed:  { backgroundColor: "var(--color-destructive-subtle-pressed)", color: "var(--color-destructive)", border: "1px solid var(--color-border-destructive)" },
  },
  link: {
    default:  { backgroundColor: "transparent", color: "var(--color-link)", border: "none", textDecoration: "underline" },
    hovered:  { backgroundColor: "transparent", color: "var(--color-link-hovered)", border: "none", textDecoration: "underline" },
    pressed:  { backgroundColor: "transparent", color: "var(--color-link-pressed)", border: "none", textDecoration: "underline" },
  },
  "destructive-link": {
    default:  { backgroundColor: "transparent", color: "var(--color-destructive)", border: "none", textDecoration: "underline" },
    hovered:  { backgroundColor: "transparent", color: "var(--color-destructive-hovered)", border: "none", textDecoration: "underline" },
    pressed:  { backgroundColor: "transparent", color: "var(--color-destructive-pressed)", border: "none", textDecoration: "underline" },
  },
};

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm:      { height: 32, padding: "0 12px", fontSize: 14, borderRadius: 6 },
  default: { height: 36, padding: "0 16px", fontSize: 14, borderRadius: 6 },
  lg:      { height: 40, padding: "0 20px", fontSize: 14, borderRadius: 6 },
  icon:    { height: 36, width: 36, padding: 0, fontSize: 14, borderRadius: 8 },
};

const disabledStyles: React.CSSProperties = {
  backgroundColor: "var(--color-disabled)", color: "var(--color-disabled-foreground)",
  border: "none", cursor: "not-allowed", opacity: 1,
};

function Button({
  variant = "primary",
  size = "default",
  state = "default",
  disabled = false,
  children,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  state?: ButtonState;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  const base: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    gap: 8, fontWeight: 500, cursor: disabled ? "not-allowed" : "pointer",
    whiteSpace: "nowrap", boxSizing: "border-box",
    ...sizeStyles[size],
    ...(disabled ? disabledStyles : variantStateStyles[variant][state]),
  };
  return <button style={base} disabled={disabled}>{children}</button>;
}

function StateLabel({ children }: { children: React.ReactNode }) {
  return <div style={{ width: 80, fontSize: 12, color: "var(--color-muted-foreground)", flexShrink: 0 }}>{children}</div>;
}

export default function ButtonFigma() {
  const variants: ButtonVariant[] = ["primary", "secondary", "tertiary", "destructive", "destructive-outline", "link", "destructive-link"];
  const states: ButtonState[] = ["default", "hovered", "pressed"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, padding: 16 }}>
      {/* === All Types × All States === */}
      <div>
        <div style={{ marginBottom: 12, fontSize: 14, fontWeight: 600 }}>Type × State</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {states.map((state) => (
            <div key={state} style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <StateLabel>{state}</StateLabel>
              {variants.map((variant) => (
                <Button key={variant} variant={variant} state={state}>{variant}</Button>
              ))}
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <StateLabel>disabled</StateLabel>
            {variants.map((variant) => (
              <Button key={variant} disabled>{variant}</Button>
            ))}
          </div>
        </div>
      </div>

      {/* === Sizes === */}
      <div>
        <div style={{ marginBottom: 12, fontSize: 14, fontWeight: 600 }}>Size</div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Button size="sm">Small (32px)</Button>
          <Button size="default">Medium (36px)</Button>
          <Button size="lg">Large (40px)</Button>
          <Button size="icon"><Mail size={16} /></Button>
        </div>
      </div>

      {/* === With Icon === */}
      <div>
        <div style={{ marginBottom: 12, fontSize: 14, fontWeight: 600 }}>With Icon</div>
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <Button variant="primary"><Mail size={16} /> Primary</Button>
          <Button variant="secondary"><Mail size={16} /> Secondary</Button>
          <Button variant="tertiary"><Mail size={16} /> Tertiary</Button>
          <Button variant="destructive"><AlertCircle size={16} /> Destructive</Button>
          <Button size="icon" variant="secondary"><Mail size={16} /></Button>
        </div>
      </div>
    </div>
  )
}
