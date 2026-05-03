import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { GlassSkeleton } from '@/components/ui/glass-skeleton';

export function PracticeModuleSkeleton() {
  return (
    <Card className="border-border/50 bg-white/80 backdrop-blur-sm shadow-md overflow-hidden">
      <GlassSkeleton variant="image" className="h-24 w-full rounded-none" shimmer />
      <CardHeader>
        <GlassSkeleton variant="title" className="h-6 w-32" shimmer />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <GlassSkeleton variant="text" className="h-4 w-full" shimmer />
          <GlassSkeleton variant="text" className="h-4 w-3/4" shimmer />
        </div>
        <div className="flex justify-between items-center">
          <GlassSkeleton variant="text" className="h-4 w-16" shimmer />
          <GlassSkeleton variant="button" className="h-6 w-20 rounded-full" shimmer />
        </div>
        <GlassSkeleton variant="button" className="h-10 w-full rounded-md" shimmer />
      </CardContent>
    </Card>
  );
}