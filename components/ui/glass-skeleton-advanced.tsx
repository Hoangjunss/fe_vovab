'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function GlassSkeletonAdvanced({ className, ...props }: React.ComponentProps<'div'>) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setPosition({ x, y });
    };

    element.addEventListener('mousemove', handleMouseMove);
    return () => element.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        'relative overflow-hidden backdrop-blur-md bg-white/30 rounded-xl',
        'animate-pulse border border-white/20 shadow-lg',
        className
      )}
      {...props}
    >
      <div
        className="absolute inset-0 transition-opacity duration-150"
        style={{
          background: `radial-gradient(circle at ${position.x}% ${position.y}%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 80%)`,
        }}
      />
    </div>
  );
}