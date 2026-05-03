import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { GlassSkeleton } from '@/components/ui/glass-skeleton';

export function TestCardSkeleton() {
  return (
    <Card className="border-border/50 bg-white/80 backdrop-blur-sm shadow-md overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <GlassSkeleton variant="title" className="h-6 w-32" shimmer />
          <GlassSkeleton variant="button" className="h-6 w-20 rounded-full" shimmer />
        </div>
        <GlassSkeleton variant="text" className="h-4 w-24 mt-2" shimmer />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center space-y-1">
            <GlassSkeleton variant="text" className="h-3 w-12 mx-auto" shimmer />
            <GlassSkeleton variant="title" className="h-6 w-16 mx-auto" shimmer />
          </div>
          <div className="text-center space-y-1">
            <GlassSkeleton variant="text" className="h-3 w-12 mx-auto" shimmer />
            <GlassSkeleton variant="title" className="h-6 w-16 mx-auto" shimmer />
          </div>
          <div className="text-center space-y-1">
            <GlassSkeleton variant="text" className="h-3 w-12 mx-auto" shimmer />
            <GlassSkeleton variant="title" className="h-6 w-16 mx-auto" shimmer />
          </div>
        </div>
        <GlassSkeleton variant="button" className="h-10 w-full rounded-md" shimmer />
      </CardContent>
    </Card>
  );
}