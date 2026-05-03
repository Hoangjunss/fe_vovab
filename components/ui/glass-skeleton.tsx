'use client';
import { cn } from '@/lib/utils';

interface GlassSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'title' | 'button' | 'image' | 'card' | 'circle';
  shimmer?: boolean;
}

export function GlassSkeleton({
  className,
  variant = 'text',
  shimmer = true,
  ...props
}: GlassSkeletonProps) {
  const baseClasses = cn(
    'relative overflow-hidden backdrop-blur-sm bg-white/40 dark:bg-white/10 rounded-xl',
    {
      'h-4 w-full': variant === 'text',
      'h-8 w-3/4': variant === 'title',
      'h-10 w-32 rounded-lg': variant === 'button',
      'h-32 w-full': variant === 'image',
      'h-64 w-full rounded-2xl': variant === 'card',
      'h-12 w-12 rounded-full': variant === 'circle',
    },
    className
  );

  return (
    <div className={baseClasses} {...props}>
      {shimmer && (
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      )}
    </div>
  );
}