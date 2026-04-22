import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Empty — MFA Design System
 *
 * Figma source: COMPONENT_SET 555:575, page 532:5648
 *
 * Variant property: style = "default" | "outline" | "background"
 * Boolean properties: icon, action, primary button, secondary button, text link
 *
 * Token mapping:
 *   default:    no bg, no border
 *   outline:    bg --background, border --border
 *   background: bg --secondary
 *
 * Layout: p-6, gap-4, rounded-xl (12px), centered column
 */

const emptyVariants = cva(
  "flex flex-col items-center justify-center gap-4 rounded-xl p-6 text-center",
  {
    variants: {
      variant: {
        default: "",
        outline: "border border-border bg-background",
        background: "bg-secondary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Empty({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof emptyVariants>) {
  return (
    <div
      data-slot="empty"
      className={cn(emptyVariants({ variant }), className)}
      {...props}
    />
  )
}

function EmptyMedia({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-media"
      className={cn(
        "flex size-10 items-center justify-center rounded-full bg-secondary",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function EmptyTitle({
  className,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="empty-title"
      className={cn("text-body-accent-3 text-foreground", className)}
      {...props}
    />
  )
}

function EmptyDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="empty-description"
      className={cn("text-body-3 text-muted-foreground", className)}
      {...props}
    />
  )
}

function EmptyActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-actions"
      className={cn("flex items-center justify-center gap-2", className)}
      {...props}
    />
  )
}

export { Empty, emptyVariants, EmptyMedia, EmptyTitle, EmptyDescription, EmptyActions }
