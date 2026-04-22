import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"

import { cn } from "@/lib/utils"

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M2.5 6L5 8.5L9.5 3.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IndeterminateIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M3 6H9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function Checkbox({
  className,
  ...props
}: CheckboxPrimitive.Root.Props & {
  indeterminate?: boolean
}) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "inline-flex shrink-0 items-center justify-center size-5 rounded-lg border transition-colors outline-none select-none",
        "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
        "border-input bg-background",
        "data-checked:bg-primary data-checked:border-primary data-checked:text-primary-foreground",
        "data-indeterminate:bg-primary data-indeterminate:border-primary data-indeterminate:text-primary-foreground",
        "data-disabled:bg-disabled data-disabled:border-disabled-foreground data-disabled:cursor-not-allowed data-disabled:opacity-100",
        "data-disabled:data-checked:bg-disabled data-disabled:data-checked:border-disabled-foreground data-disabled:data-checked:text-disabled-foreground",
        "data-disabled:data-indeterminate:bg-disabled data-disabled:data-indeterminate:border-disabled-foreground data-disabled:data-indeterminate:text-disabled-foreground",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center">
        {props.indeterminate ? <IndeterminateIcon /> : <CheckIcon />}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
