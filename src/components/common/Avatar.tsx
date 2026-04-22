/**
 * Avatar — MFA Design System
 *
 * Wraps the shadcn Avatar (src/components/ui/avatar.tsx), which uses
 * @base-ui/react/avatar for native image-load-state management
 * (no useState needed, browser-handled).
 *
 * Figma spec overrides (node 139:15):
 *   Sizes     sm=32px | default=40px | lg=56px
 *             (shadcn defaults: sm=24px / default=32px / lg=40px)
 *   Fallback  bg-secondary (#f5f6f7), text-foreground (#242526)
 *             (shadcn uses bg-muted + text-muted-foreground)
 *   Badge     bg-success (#00a587) — online indicator
 *             (shadcn AvatarBadge uses bg-primary)
 *
 * Usage:
 *   <Avatar size="lg" badge>
 *     <AvatarImage src="..." alt="..." />
 *     <AvatarFallback>CN</AvatarFallback>
 *   </Avatar>
 *
 * Also re-exports AvatarGroup / AvatarGroupCount from shadcn unchanged.
 */

import type { ComponentProps } from "react";
import {
    Avatar as BaseAvatar,
    AvatarImage as BaseAvatarImage,
    AvatarFallback as BaseAvatarFallback,
    AvatarBadge as BaseAvatarBadge,
    AvatarGroup,
    AvatarGroupCount,
} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// ── Size map: Figma values via data-size attribute ────────────
// We keep shadcn's data-[size=*] convention but override the pixel values.

const sizeClass = {
    sm: "size-8",      // 32px — Figma sm
    default: "size-10", // 40px — Figma default
    lg: "size-14",     // 56px — Figma lg
} as const;

type AvatarSize = keyof typeof sizeClass;

const fallbackTextClass: Record<AvatarSize, string> = {
    sm: "text-[12.8px]",
    default: "text-base",
    lg: "text-[22.4px]",
};

// ── Avatar container ─────────────────────────────────────────

export interface AvatarProps extends Omit<ComponentProps<typeof BaseAvatar>, "size"> {
    size?: AvatarSize;
    badge?: boolean;
}

function Avatar({ size = "default", badge = false, className, children, ...props }: AvatarProps) {
    return (
        <BaseAvatar
            // Pass size so shadcn's group-data-[size=*] selectors still work
            // (e.g. AvatarGroupCount sizing), but our explicit sizeClass wins visually.
            size={size}
            className={cn(sizeClass[size], "after:hidden", className)}
            {...props}
        >
            {children}
            {badge && (
                <AvatarBadge className={cn(
                    size === "sm" && "size-2",
                    size === "default" && "size-2.5",
                    size === "lg" && "size-3.5",
                )} />
            )}
        </BaseAvatar>
    );
}

// ── Image ────────────────────────────────────────────────────
// Delegates load/error state to @base-ui/react/avatar natively.

export interface AvatarImageProps extends ComponentProps<typeof BaseAvatarImage> { }

function AvatarImage({ className, ...props }: AvatarImageProps) {
    return (
        <BaseAvatarImage
            className={cn("aspect-square size-full rounded-full object-cover", className)}
            {...props}
        />
    );
}

// ── Fallback ─────────────────────────────────────────────────
// bg-secondary + text-foreground to match Figma token spec.

export interface AvatarFallbackProps extends ComponentProps<typeof BaseAvatarFallback> {
    size?: AvatarSize;
}

function AvatarFallback({ size = "default", className, ...props }: AvatarFallbackProps) {
    return (
        <BaseAvatarFallback
            className={cn(
                "bg-secondary text-foreground font-semibold",
                fallbackTextClass[size],
                className
            )}
            {...props}
        />
    );
}

// ── Badge ────────────────────────────────────────────────────
// Uses bg-success (green) per Figma spec instead of shadcn's bg-primary.

function AvatarBadge({ className, ...props }: ComponentProps<typeof BaseAvatarBadge>) {
    return (
        <BaseAvatarBadge
            className={cn("bg-success", className)}
            {...props}
        />
    );
}

export {
    Avatar,
    AvatarImage,
    AvatarFallback,
    AvatarBadge,
    AvatarGroup,
    AvatarGroupCount,
};
