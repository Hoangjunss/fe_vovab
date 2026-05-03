import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export function VocabularyFilter({ searchQuery, setSearchQuery, selectedDifficulty, setSelectedDifficulty }: any) {
  const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced'];
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="relative flex-1 md:max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
        <Input
          placeholder="Tìm kiếm bộ từ vựng..."
          className="pl-10 bg-white border-border/50 transition-all duration-200 focus:scale-105 focus:shadow-md"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex gap-2 flex-wrap">
        {difficulties.map(level => (
          <Button
            key={level}
            variant={selectedDifficulty === level ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedDifficulty(level)}
            className="transition-all duration-200 hover:scale-105"
          >
            {level === 'all' ? 'Tất cả' : level}
          </Button>
        ))}
      </div>
    </div>
  );
}