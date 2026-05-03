import * as React from 'react'
import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Claymorphism styles
        'rounded-[24px] bg-[#EFEBF5] shadow-[inset_10px_10px_20px_#d9d4e3,inset_-10px_-10px_20px_#ffffff]',
        'border-0 px-6 py-4 text-lg text-foreground placeholder:text-muted',
        'transition-all duration-200 focus:bg-white focus:ring-4 focus:ring-primary/20',
        'w-full outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
}

export { Input }