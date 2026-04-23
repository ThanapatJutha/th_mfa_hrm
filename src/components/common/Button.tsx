import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-sm border border-transparent bg-clip-padding whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:bg-disabled disabled:text-disabled-foreground disabled:border-transparent aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary-hovered active:bg-primary-pressed",
        primary:
          "bg-primary text-primary-foreground hover:bg-primary-hovered active:bg-primary-pressed",
        outline:
          "bg-background text-muted-foreground border-border hover:bg-secondary",
        secondary:
          "bg-background text-muted-foreground border-border hover:bg-secondary",
        ghost:
          "text-muted-foreground hover:bg-secondary",
        tertiary:
          "text-muted-foreground hover:bg-secondary",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive-hovered active:bg-destructive-pressed",
        "destructive-outline":
          "bg-destructive-subtle text-destructive border-border-destructive hover:bg-destructive-subtle-hovered active:bg-destructive-subtle-pressed",
        link: "text-link px-0! underline-offset-4 hover:underline hover:text-link-hovered active:text-link-pressed",
        "destructive-link":
          "text-destructive px-0! underline-offset-4 hover:underline hover:text-destructive-hovered active:text-destructive-pressed",
      },
      size: {
        default:
          "h-9 gap-2 px-3 text-[20px] leading-[24px] font-bold has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-2 px-3 text-[16px] leading-[20px] font-normal has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 gap-2 px-4 text-[24px] leading-[30px] font-bold has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-9",
        "icon-xs":
          "size-6 in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
