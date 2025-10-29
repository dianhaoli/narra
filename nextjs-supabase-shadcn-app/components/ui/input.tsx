import * as React from "react"

import { cn } from "@/lib/utils"

type InputProps = React.ComponentProps<"input"> & {
  label?: string
  helperText?: string
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, helperText, error, id, ...props }, ref) => {
    const generatedId = React.useId()
    const inputId = id ?? generatedId
    const feedbackId = helperText || error ? `${inputId}-feedback` : undefined

    return (
      <div className="w-full space-y-2">
        {label ? (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold uppercase tracking-[0.18em] text-muted"
          >
            {label}
          </label>
        ) : null}

        <input
          ref={ref}
          id={inputId}
          type={type}
          data-slot="input"
          aria-invalid={error ? "true" : undefined}
          aria-describedby={feedbackId}
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            className
          )}
          {...props}
        />

        {helperText || error ? (
          <p
            id={feedbackId}
            className={cn(
              "text-xs leading-relaxed text-muted",
              error && "text-destructive"
            )}
          >
            {error ?? helperText}
          </p>
        ) : null}
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }
