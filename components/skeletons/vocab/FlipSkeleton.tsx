import { Card } from '@/components/ui/card';
import { GlassSkeleton } from '@/components/ui/glass-skeleton';

export function FlipSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <GlassSkeleton variant="title" className="h-6 w-32" shimmer />
          <GlassSkeleton variant="text" className="h-4 w-24 mt-1" shimmer />
        </div>
        <GlassSkeleton variant="button" className="h-8 w-24" shimmer />
      </div>
      <Card className="h-80 w-full flex items-center justify-center">
        <GlassSkeleton variant="card" className="h-64 w-11/12 rounded-xl" shimmer />
      </Card>
      <div className="flex gap-4">
        <GlassSkeleton variant="button" className="h-10 flex-1" shimmer />
        <GlassSkeleton variant="button" className="h-10 flex-1" shimmer />
      </div>
    </div>
  );
}