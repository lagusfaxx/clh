import * as React from 'react'
import { cn } from '../cn'

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-sm border border-border bg-bg-secondary px-3 py-2 text-sm text-text-primary',
        'placeholder:text-text-secondary file:border-0 file:bg-transparent file:text-sm',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/60 focus-visible:border-accent-gold',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'transition-colors',
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
)
Input.displayName = 'Input'
