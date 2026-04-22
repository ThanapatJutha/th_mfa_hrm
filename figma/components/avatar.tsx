import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Avatar — MFA Design System
 *
 * Figma source: node 139:15
 *
 * Sizes: sm (32px) | default (40px) | lg (56px)
 * States: image | fallback (initials)
 * Badge: green status indicator
 *
 * Token mapping:
 *   Fallback bg: --secondary (#f5f6f7)
 *   Fallback text: --foreground (#242526)
 *   Badge fill: --success (#00a587)
 *   Badge border: --background (#ffffff)
 */

const avatarVariants = cva(
    "relative inline-flex shrink-0",
    {
        variants: {
            size: {
                sm: "size-8",
                default: "size-10",
                lg: "size-14",
            },
        },
        defaultVariants: {
            size: "default",
        },
    }
)

function Avatar({
    className,
    size,
    ...props
}: React.ComponentProps<"div"> & VariantProps<typeof avatarVariants>) {
    return (
        <div
            data-slot="avatar"
            className={cn(avatarVariants({ size }), className)}
            {...props}
        />
    )
}

function AvatarImage({
    className,
    ...props
}: React.ComponentProps<"img">) {
    return (
        <img
            data-slot="avatar-image"
            className={cn("aspect-square size-full rounded-full object-cover", className)}
            {...props}
        />
    )
}

function AvatarFallback({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="avatar-fallback"
            className={cn(
                "flex size-full items-center justify-center rounded-full bg-secondary text-foreground font-semibold",
                className
            )}
            {...props}
        />
    )
}

const badgeSizeMap = {
    sm: "size-2.5",
    default: "size-3",
    lg: "size-3.5",
} as const

function AvatarBadge({
    className,
    size = "default",
    ...props
}: React.ComponentProps<"div"> & { size?: "sm" | "default" | "lg" }) {
    return (
        <div
            data-slot="avatar-badge"
            className={cn(
                "absolute bottom-0 right-0 rounded-full border-2 border-background bg-success",
                badgeSizeMap[size],
                className
            )}
            {...props}
        />
    )
}

export { Avatar, AvatarImage, AvatarFallback, AvatarBadge, avatarVariants }
