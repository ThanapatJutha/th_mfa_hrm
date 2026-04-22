/**
 * Alert — MFA Design System
 *
 * Wraps the shadcn Alert (src/components/ui/alert.tsx) and overrides
 * the variant styles to match the Figma spec (node 142:177), using
 * the CSS variables from generate-theme.mjs.
 *
 * Token mapping:
 *   default     → bg-background  border-input             text-foreground
 *   destructive → bg-destructive-subtle  border-border-destructive  text-destructive
 *
 * Compound API (same as shadcn, plus AlertIcon and AlertContent):
 *   <Alert variant="destructive">
 *     <AlertIcon><AlertCircle /></AlertIcon>
 *     <AlertContent>
 *       <AlertTitle>Title</AlertTitle>
 *       <AlertDescription>Body</AlertDescription>
 *     </AlertContent>
 *     <AlertAction><Button size="sm">Retry</Button></AlertAction>
 *   </Alert>
 *
 * AlertTitle, AlertDescription, AlertAction are re-exported directly
 * from shadcn (they already use the correct data-slot attributes).
 */

import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
    Alert as BaseAlert,
    AlertTitle,
    AlertDescription,
    AlertAction,
} from "@/components/ui/alert";
import { cn } from "@/lib/utils";

// ── Variant override ─────────────────────────────────────────
// We switch from shadcn's grid layout to flex so our AlertIcon slot
// (a <span> wrapper) works without requiring direct SVG children.

const mfaAlertVariants = cva(
    "flex gap-4 items-start",
    {
        variants: {
            variant: {
                default: "bg-background border-input text-foreground",
                destructive:
                    "bg-destructive-subtle border-border-destructive text-destructive",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

// ── Alert container ──────────────────────────────────────────

export interface AlertProps
    extends Omit<ComponentProps<typeof BaseAlert>, "variant">,
    VariantProps<typeof mfaAlertVariants> { }

function Alert({ className, variant, ...props }: AlertProps) {
    return (
        <BaseAlert
            // Pass "default" to shadcn so it doesn't inject destructive colour
            // classes; our mfaAlertVariants className fully owns presentation.
            variant="default"
            className={cn(mfaAlertVariants({ variant }), className)}
            {...props}
        />
    );
}

// ── Icon slot ────────────────────────────────────────────────
// Normalises icon sizing and top-aligns it with the first line of text.

function AlertIcon({ className, ...props }: ComponentProps<"span">) {
    return (
        <span
            className={cn("mt-0.5 shrink-0 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-current", className)}
            {...props}
        />
    );
}

// ── Content wrapper ──────────────────────────────────────────

function AlertContent({ className, ...props }: ComponentProps<"div">) {
    return (
        <div className={cn("flex min-w-0 flex-1 flex-col gap-0.5", className)} {...props} />
    );
}

// Re-export shadcn sub-components unchanged — they already carry the
// correct data-slot props and base typography styles.
export {
    Alert,
    AlertIcon,
    AlertContent,
    AlertTitle,
    AlertDescription,
    AlertAction,
};
