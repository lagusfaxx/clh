'use client'
import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '../cn'

export const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn('relative flex w-full touch-none select-none items-center', className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-accent-gold" />
    </SliderPrimitive.Track>
    {Array.isArray(props.value)
      ? props.value.map((_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            className="block h-5 w-5 rounded-full border-2 border-accent-gold bg-bg-primary ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/50 disabled:pointer-events-none disabled:opacity-50"
          />
        ))
      : (
          <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-accent-gold bg-bg-primary ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/50 disabled:pointer-events-none disabled:opacity-50" />
        )}
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName
