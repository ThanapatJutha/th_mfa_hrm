import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Alert — MFA Design System
 *
 * Figma source: node 142:177
 *
 * Variants: default | destructive
 *
 * Token mapping:
 *   default:     bg --background, border --input, title --foreground, desc --muted-foreground, icon --icon-primary
 *   destructive: bg --destructive-subtle, border --border-destructive, title/desc/icon --destructive
 *
 * Layout: p-4, icon gap-x-4, rounded-lg (8px), action button absolute top-4 right-4
 */

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:size-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-12",
  {
    variants: {
      variant: {
        default:
          "bg-background border-input text-foreground [&>svg]:text-icon-primary",
        destructive:
          "bg-destructive-subtle border-border-destructive text-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      data-variant={variant}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"h5">) {
  return (
    <h5
      data-slot="alert-title"
      className={cn("text-body-accent-3 leading-none tracking-tight", className)}
      {...props}
    />
  )
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "mt-1 text-sm [&_p]:leading-relaxed",
        "group-data-[variant=default]/alert:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-4 right-4", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction, alertVariants }
