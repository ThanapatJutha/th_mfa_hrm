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
 * Badge: green status indicator (render <AvatarBadge /> or use badge prop)
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

const badgeSizeMap: Record<"sm" | "default" | "lg", string> = {
  sm: "size-2.5",
  default: "size-3",
  lg: "size-3.5",
}

function Avatar({
  className,
  size = "default",
  badge = false,
  children,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof avatarVariants> & { badge?: boolean }) {
  return (
    <div
      data-slot="avatar"
      data-size={size}
      className={cn(avatarVariants({ size }), className)}
      {...props}
    >
      {children}
      {badge && (
        <AvatarBadge
          className={cn(badgeSizeMap[size as "sm" | "default" | "lg"])}
        />
      )}
    </div>
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

function AvatarBadge({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-badge"
      className={cn(
        "absolute bottom-0 right-0 rounded-full border-2 border-background bg-success",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "relative flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-sm text-foreground ring-2 ring-background",
        className
      )}
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
  avatarVariants,
}
