import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function VocabularySetCard({ set }: { set: any }) {
  const difficultyColor: Record<string, string> = {
    '1': 'bg-green-100 text-green-700',
    '2': 'bg-blue-100 text-blue-700',
    '3': 'bg-yellow-100 text-yellow-700',
    '4': 'bg-orange-100 text-orange-700',
    '5': 'bg-red-100 text-red-700',
  };
  const level = set.difficultyLevel || 1;

  return (
    <Link href={`/vocab/study/${set.id}`}>
      <Card className="border-border/50 bg-white shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer overflow-hidden group relative">
        {/* Overlay gradient khi hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <CardHeader className="pb-3 relative z-10">
          <CardTitle className="text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {set.title}
          </CardTitle>
          <CardDescription className="mt-1 line-clamp-2">
            {set.description || 'Không có mô tả'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Số từ</p>
              <p className="text-xl font-bold text-foreground">{set.wordCount || 0}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${difficultyColor[level]} transition-transform group-hover:scale-110`}>
              Cấp độ {level}
            </span>
          </div>
          <Button className="w-full bg-primary text-white shadow-md hover:shadow-lg group-hover:scale-105 transition-all duration-200">
            Học ngay 🚀
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}