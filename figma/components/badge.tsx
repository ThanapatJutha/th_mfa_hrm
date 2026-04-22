"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-3 py-0.5 text-body-caption whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-[>svg]:pl-2.5 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground [a&]:hover:bg-primary-hovered",
        secondary:
          "bg-secondary text-secondary-foreground [a&]:hover:bg-muted",
        outline:
          "bg-background border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        ghost:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        success:
          "bg-success text-success-foreground",
        warning:
          "bg-warning text-warning-foreground",
        error:
          "bg-destructive text-destructive-foreground",
        "info-lavender":
          "bg-info text-info-foreground",
        "info-purple":
          "bg-info-purple text-info-purple-foreground",
        "info-sky":
          "bg-info-sky text-info-sky-foreground",
        "success-subtle":
          "bg-success-subtle text-success",
        "warning-subtle":
          "bg-warning-subtle text-warning",
        "error-subtle":
          "bg-destructive-subtle text-destructive",
        "info-lavender-subtle":
          "bg-info-subtle text-info",
        "info-purple-subtle":
          "bg-info-purple-subtle text-info-purple",
        "info-sky-subtle":
          "bg-info-sky-subtle text-info-sky",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
