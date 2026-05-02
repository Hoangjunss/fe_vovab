import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
export function VocabularyFilter({ searchQuery, setSearchQuery, selectedDifficulty, setSelectedDifficulty }: { searchQuery: string; setSearchQuery: (q: string) => void; selectedDifficulty: string; setSelectedDifficulty: (d: string) => void }) {
  const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced']
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="relative flex-1 md:max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Tìm kiếm bộ từ vựng..." className="pl-10 bg-white border-border/50" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} /></div>
      <div className="flex gap-2 flex-wrap">{difficulties.map(level => <Button key={level} variant={selectedDifficulty === level ? 'default' : 'outline'} size="sm" onClick={() => setSelectedDifficulty(level)} className={selectedDifficulty === level ? 'bg-primary text-white' : 'border-border/50 bg-white'}>{level === 'all' ? 'Tất cả' : level}</Button>)}</div>
    </div>
  )
}