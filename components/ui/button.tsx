import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-clay-button font-bold transition-all duration-200 active:scale-[0.92] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "clay-button",
        secondary: "bg-white text-foreground shadow-clay-button hover:-translate-y-1 active:shadow-clay-pressed",
        outline: "border-2 border-primary/20 bg-transparent text-primary hover:border-primary hover:bg-primary/5 hover:-translate-y-1 active:scale-[0.92]",
        ghost: "text-foreground hover:bg-primary/10 hover:text-primary",
        destructive: "bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-clay-button hover:-translate-y-1",
      },
      size: {
        default: "h-14 px-6",
        sm: "h-11 px-4 text-sm",
        lg: "h-16 px-8 text-lg",
        icon: "h-14 w-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }