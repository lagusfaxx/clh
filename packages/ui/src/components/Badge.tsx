import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../cn'

const badgeVariants = cva(
  'inline-flex items-center rounded-sm border px-2.5 py-0.5 text-xs font-medium tracking-wide transition-colors',
  {
    variants: {
      variant: {
        default: 'border-accent-gold/30 bg-accent-gold/10 text-accent-gold',
        rust: 'border-accent-rust/40 bg-accent-rust/10 text-accent-rust',
        ink: 'border-accent-blue/40 bg-accent-blue/10 text-accent-blue',
        outline: 'border-border bg-transparent text-text-secondary',
        ghost: 'border-transparent bg-bg-card text-text-secondary',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}
