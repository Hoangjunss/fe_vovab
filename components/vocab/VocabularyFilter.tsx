import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export function VocabularyFilter({ searchQuery, setSearchQuery, selectedDifficulty, setSelectedDifficulty }: any) {
  const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced'];
  const displayDifficulty = (level: string) => {
    if (level === 'all') return 'Tất cả';
    return level;
  };

  return (
    <div className="filter-container">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 md:max-w-md">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Tìm kiếm bộ từ vựng..."
            className="pl-12 clay-input w-full bg-white/70 focus:bg-white"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {difficulties.map(level => (
            <Button
              key={level}
              size="sm"
              onClick={() => setSelectedDifficulty(level)}
              className={selectedDifficulty === level ? 'clay-button' : 'clay-button-outline'}
            >
              {displayDifficulty(level)}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}