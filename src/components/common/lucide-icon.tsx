import React from "react";

/**
 * Lucide icon wrapper component with project-standard
 * sizing, stroke control, and semantic color token integration.
 */
export type LucideIconSize = 16 | 20 | 24 | 32 | 48;
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

export interface LucideIconProps {
  icon: React.ComponentType<{
    size?: number | string;
    color?: string;
    strokeWidth?: number | string;
    className?: string;
  }>;
  size?: LucideIconSize;
  strokeWidth?: number;
  color?: IconColor | (string & {});
  className?: string;
}

export function LucideIcon({
  icon: IconComponent,
  size = 24,
  strokeWidth = 2,
  color = "primary",
  className,
}: LucideIconProps) {
  const resolvedColor = iconColorMap[color as IconColor] ?? color;
  return (
    <span
      className={className}
      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}
    >
      <IconComponent size={size} color={resolvedColor} strokeWidth={strokeWidth} />
    </span>
  );
}
