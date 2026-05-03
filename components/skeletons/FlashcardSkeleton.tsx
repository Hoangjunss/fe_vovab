import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { GlassSkeleton } from '@/components/ui/glass-skeleton';

export function FlashcardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <GlassSkeleton variant="title" className="h-8 w-48" shimmer />
          <GlassSkeleton variant="text" className="h-4 w-32 mt-2" shimmer />
        </div>
        <GlassSkeleton variant="button" className="h-10 w-28" shimmer />
      </div>

      {/* Progress bar skeleton */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <GlassSkeleton variant="text" className="h-4 w-20" shimmer />
          <GlassSkeleton variant="text" className="h-4 w-16" shimmer />
        </div>
        <GlassSkeleton variant="image" className="h-2 w-full rounded-full" shimmer />
      </div>

      {/* Main card skeleton */}
      <div className="h-64 w-full rounded-xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg overflow-hidden">
        <div className="h-full flex items-center justify-center">
          <GlassSkeleton variant="title" className="h-12 w-48" shimmer />
        </div>
      </div>

      {/* Next button skeleton */}
      <GlassSkeleton variant="button" className="h-10 w-full rounded-md" shimmer />
    </div>
  );
}