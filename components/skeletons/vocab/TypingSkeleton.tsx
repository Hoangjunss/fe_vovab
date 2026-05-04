import { GlassSkeleton } from '@/components/ui/glass-skeleton';

export function TypingSkeleton() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <GlassSkeleton variant="text" className="h-4 w-24 mx-auto mb-1" shimmer />
        <GlassSkeleton variant="title" className="h-10 w-48 mx-auto" shimmer />
      </div>
      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <GlassSkeleton key={i} variant="circle" className="w-12 h-12" shimmer />
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <GlassSkeleton variant="button" className="h-9 w-20" shimmer />
        <GlassSkeleton variant="button" className="h-9 w-20" shimmer />
        <GlassSkeleton variant="button" className="h-9 w-20" shimmer />
        <GlassSkeleton variant="button" className="h-9 w-20" shimmer />
      </div>
    </div>
  );
}