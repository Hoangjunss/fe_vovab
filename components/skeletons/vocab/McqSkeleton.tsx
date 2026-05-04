import { Card } from '@/components/ui/card';
import { GlassSkeleton } from '@/components/ui/glass-skeleton';

export function McqSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <GlassSkeleton variant="title" className="h-6 w-32" shimmer />
          <GlassSkeleton variant="text" className="h-4 w-24 mt-1" shimmer />
        </div>
        <GlassSkeleton variant="button" className="h-8 w-24" shimmer />
      </div>
      <Card className="p-6">
        <GlassSkeleton variant="title" className="h-8 w-48 mb-4" shimmer />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <GlassSkeleton key={i} variant="button" className="h-14 w-full" shimmer />
          ))}
        </div>
      </Card>
    </div>
  );
}