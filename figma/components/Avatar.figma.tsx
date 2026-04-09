import React from "react";

/**
 * Figma component: Avatar
 * Figma node: 139:15 (COMPONENT_SET)
 * Figma page: Avatar (93:1480)
 *
 * Properties:
 *   - size: small (32px) | default (40px) | large (56px)
 *   - state: default (image) | fallback (initials)
 *   - badge: green status indicator
 *
 * Design tokens:
 *   - Fallback bg: --secondary (surface/secondary/default: #f5f6f7)
 *   - Text: --foreground (text/primary: #242526)
 *   - Badge fill: --success (secondary/green/main: #00a587)
 *   - Badge border: --background (border/inverse: #ffffff)
 */

/* ── Size config matching Figma exactly ── */
const sizes = {
    sm: { container: 32, fontSize: 12.8, badge: 10 },
    default: { container: 40, fontSize: 16, badge: 12 },
    lg: { container: 56, fontSize: 22.4, badge: 14 },
} as const;

type AvatarSize = keyof typeof sizes;

/* ── Avatar (self-contained, no external component dependency) ── */
function Avatar({
    size = "default",
    src,
    fallback,
    badge = false,
}: {
    size?: AvatarSize;
    src?: string;
    fallback?: string;
    badge?: boolean;
}) {
    const s = sizes[size];
    const r = s.container / 2;

    return (
        <div style={{ position: "relative", width: s.container, height: s.container, flexShrink: 0 }}>
            {/* Container */}
            <div
                style={{
                    width: s.container,
                    height: s.container,
                    borderRadius: r,
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: src ? undefined : "var(--color-secondary)",
                }}
            >
                {src ? (
                    <img
                        src={src}
                        alt=""
                        style={{ width: s.container, height: s.container, objectFit: "cover" }}
                    />
                ) : (
                    <span
                        style={{
                            fontSize: s.fontSize,
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 600,
                            color: "var(--color-foreground)",
                            lineHeight: 1,
                        }}
                    >
                        {fallback}
                    </span>
                )}
            </div>

            {/* Badge */}
            {badge && (
                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        width: s.badge,
                        height: s.badge,
                        borderRadius: s.badge / 2,
                        backgroundColor: "var(--color-success)",
                        border: "2px solid var(--color-background)",
                        boxSizing: "border-box",
                    }}
                />
            )}
        </div>
    );
}

export default function AvatarFigma() {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24, padding: 16 }}>
            {/* === Sizes — With Image === */}
            <div>
                <div style={{ marginBottom: 8, fontSize: 14, color: "var(--color-muted-foreground)" }}>
                    Sizes (Image)
                </div>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                    <Avatar size="sm" src="https://i.pravatar.cc/64?img=1" />
                    <Avatar size="default" src="https://i.pravatar.cc/64?img=2" />
                    <Avatar size="lg" src="https://i.pravatar.cc/64?img=3" />
                </div>
            </div>

            {/* === Sizes — Fallback === */}
            <div>
                <div style={{ marginBottom: 8, fontSize: 14, color: "var(--color-muted-foreground)" }}>
                    Sizes (Fallback)
                </div>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                    <Avatar size="sm" fallback="CN" />
                    <Avatar size="default" fallback="CN" />
                    <Avatar size="lg" fallback="CN" />
                </div>
            </div>

            {/* === With Badge === */}
            <div>
                <div style={{ marginBottom: 8, fontSize: 14, color: "var(--color-muted-foreground)" }}>
                    With Badge
                </div>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                    <Avatar size="sm" src="https://i.pravatar.cc/64?img=4" badge />
                    <Avatar size="default" src="https://i.pravatar.cc/64?img=5" badge />
                    <Avatar size="lg" src="https://i.pravatar.cc/64?img=6" badge />
                    <Avatar size="sm" fallback="CN" badge />
                    <Avatar size="default" fallback="CN" badge />
                    <Avatar size="lg" fallback="CN" badge />
                </div>
            </div>
        </div>
    );
}
