import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { GlassSkeleton } from '@/components/ui/glass-skeleton';

export function VocabularySetSkeleton() {
  return (
    <Card className="border-border/50 bg-white/80 backdrop-blur-sm shadow-md overflow-hidden">
      <CardHeader className="pb-3">
        <GlassSkeleton variant="title" className="h-6 w-3/4 mb-2" shimmer />
        <GlassSkeleton variant="text" className="h-4 w-1/2" shimmer />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <GlassSkeleton variant="text" className="h-3 w-16" shimmer />
            <GlassSkeleton variant="title" className="h-6 w-12" shimmer />
          </div>
          <GlassSkeleton variant="button" className="h-6 w-20 rounded-full" shimmer />
        </div>
        <GlassSkeleton variant="button" className="h-10 w-full rounded-md" shimmer />
      </CardContent>
    </Card>
  );
}