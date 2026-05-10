import { cn } from '../cn'

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-sm bg-bg-card/60', className)}
      {...props}
    />
  )
}
