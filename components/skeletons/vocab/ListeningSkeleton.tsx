import { GlassSkeleton } from '@/components/ui/glass-skeleton';

export function ListeningSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <GlassSkeleton variant="button" className="h-8 w-20" shimmer />
        <div className="flex gap-2">
          <GlassSkeleton variant="text" className="h-5 w-12" shimmer />
          <GlassSkeleton variant="text" className="h-5 w-12" shimmer />
        </div>
      </div>
      <div className="text-center">
        <GlassSkeleton variant="text" className="h-5 w-32 mx-auto mb-1" shimmer />
        <GlassSkeleton variant="text" className="h-4 w-48 mx-auto" shimmer />
      </div>
      <GlassSkeleton variant="progress" className="h-2 w-full rounded-full" shimmer />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <GlassSkeleton key={i} variant="card" className="h-20 rounded-xl" shimmer />
        ))}
      </div>
    </div>
  );
}