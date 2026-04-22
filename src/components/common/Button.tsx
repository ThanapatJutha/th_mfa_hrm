/**
 * Button — MFA Design System
 *
 * Wraps the shadcn Button (src/components/ui/button.tsx), which uses
 * @base-ui/react for accessible behaviour (focus, disabled, keyboard).
 *
 * Extends it with the full MFA Figma variant set (node 157:3172),
 * wired directly to the CSS variables from generate-theme.mjs.
 *
 * Variants : primary | secondary | tertiary | destructive |
 *            destructive-outline | link | destructive-link
 * Sizes    : sm (32px) | default (36px) | lg (40px) | icon (36×36px)
 * Radius   : 6px for all, 8px for icon — per Figma spec.
 * Disabled : delegated to shadcn's `disabled:opacity-50 disabled:pointer-events-none`.
 */

import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Button as BaseButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// MFA visual layer on top of shadcn's structural/accessible base.
// twMerge ensures these classes win over the base "ghost" variant.
const mfaButtonVariants = cva("font-body font-medium", {
    variants: {
        variant: {
            primary: [
                "bg-primary text-primary-foreground border-transparent",
                "hover:bg-primary-hovered active:bg-primary-pressed",
            ],
            secondary: [
                "bg-secondary text-foreground border border-border",
                "hover:bg-secondary-hovered active:bg-secondary-pressed",
            ],
            tertiary: [
                "bg-transparent text-foreground border-transparent",
                "hover:bg-secondary active:bg-secondary-hovered",
            ],
            destructive: [
                "bg-destructive text-destructive-foreground border-transparent",
                "hover:bg-destructive-hovered active:bg-destructive-pressed",
            ],
            "destructive-outline": [
                "bg-destructive-subtle text-destructive border border-border-destructive",
                "hover:bg-destructive-subtle-hovered active:bg-destructive-subtle-pressed",
            ],
            link: [
                "bg-transparent text-link border-transparent underline underline-offset-2",
                "hover:text-link-hovered active:text-link-pressed",
            ],
            "destructive-link": [
                "bg-transparent text-destructive border-transparent underline underline-offset-2",
                "hover:text-destructive-hovered active:text-destructive-pressed",
            ],
        },
        size: {
            sm: "h-8 px-3 rounded-[6px] text-sm",
            default: "h-9 px-4 rounded-[6px] text-sm",
            lg: "h-10 px-5 rounded-[6px] text-sm",
            icon: "h-9 w-9 p-0 rounded-[8px] text-sm",
        },
    },
    defaultVariants: {
        variant: "primary",
        size: "default",
    },
});

export type ButtonVariant = NonNullable<VariantProps<typeof mfaButtonVariants>["variant"]>;
export type ButtonSize = NonNullable<VariantProps<typeof mfaButtonVariants>["size"]>;

export interface ButtonProps
    extends Omit<ComponentProps<typeof BaseButton>, "variant" | "size">,
    VariantProps<typeof mfaButtonVariants> { }

function Button({ className, variant, size, ...props }: ButtonProps) {
    return (
        <BaseButton
            // "ghost" provides the minimal structural base (accessible primitive,
            // focus ring, disabled handling) without visual colour opinions.
            variant="ghost"
            size={size === "icon" ? "icon" : "default"}
            data-mfa-variant={variant}
            className={cn(mfaButtonVariants({ variant, size }), className)}
            {...props}
        />
    );
}

export { Button, mfaButtonVariants as buttonVariants };
