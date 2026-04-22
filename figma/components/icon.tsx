import React from "react";

/**
 * Icon wrapper component that re-exports iconsax-react icons
 * with project-standard sizing and color token integration.
 */
export type IconVariant = "Outline" | "Bold" | "Linear" | "Bulk" | "Broken" | "TwoTone";
export type IconSize = 16 | 20 | 24 | 32 | 48;
export type IconColor =
  | "primary"
  | "primary-blue"
  | "secondary"
  | "tertiary"
  | "disabled"
  | "inverse"
  | "accent"
  | "link"
  | "selected"
  | "success"
  | "warning"
  | "error"
  | "destructive";

const iconColorMap: Record<IconColor, string> = {
  primary: "var(--icon-primary)",
  "primary-blue": "var(--icon-primary-blue)",
  secondary: "var(--icon-secondary)",
  tertiary: "var(--icon-tertiary)",
  disabled: "var(--icon-disabled)",
  inverse: "var(--icon-inverse)",
  accent: "var(--icon-accent)",
  link: "var(--icon-link)",
  selected: "var(--icon-selected)",
  success: "var(--icon-success)",
  warning: "var(--icon-warning)",
  error: "var(--icon-error)",
  destructive: "var(--icon-destructive)",
};

export interface IconProps {
  /** The iconsax-react icon component */
  icon: React.ComponentType<{ variant?: string; color?: string; size?: number | string }>;
  variant?: IconVariant;
  size?: IconSize;
  /** Semantic color token name, or a raw CSS color string */
  color?: IconColor | (string & {});
  className?: string;
}

export function Icon({
  icon: IconComponent,
  variant = "Outline",
  size = 24,
  color = "primary",
  className,
}: IconProps) {
  const resolvedColor = iconColorMap[color as IconColor] ?? color;
  return (
    <span
      className={className}
      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}
    >
      <IconComponent variant={variant} color={resolvedColor} size={size} />
    </span>
  );
}
