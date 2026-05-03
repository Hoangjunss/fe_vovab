'use client';

import { useEffect, useState } from 'react';
import { VocabularyTabs } from './VocabularyTabs';
import { VocabularyFilter } from './VocabularyFilter';
import { VocabularySetCard } from './VocabularySetCard';
import { EmptyState } from '@/components/common/EmptyState';
import { BookOpen, Target, Zap } from 'lucide-react';
import { vocabApi } from '@/lib/api';
import { StaggeredSkeleton } from '@/components/ui/staggered-skeleton';
import { VocabularySetSkeleton } from '@/components/skeletons';
import { GlassSkeleton } from '@/components/ui/glass-skeleton';
import { useMinimumLoading } from '@/hooks/use-minimum-loading';

export function VocabularyBrowser() {
  const [activeTab, setActiveTab] = useState('suggested');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [sets, setSets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const showSkeleton = useMinimumLoading(loading, 500);

  useEffect(() => {
    const fetchSets = async () => {
      setLoading(true);
      try {
        const response = await vocabApi.getPublicSets(searchQuery || undefined);
        setSets(response.data?.content || []);
      } catch (error) {
        console.error(error);
        setSets([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSets();
  }, [activeTab, searchQuery]);

  const filteredSets = sets.filter(set => {
    if (selectedDifficulty === 'all') return true;
    const level = set.difficultyLevel?.toString();
    return level === selectedDifficulty;
  });

  const handleDifficultyChange = (diff: string) => setSelectedDifficulty(diff);

  if (showSkeleton) {
    return (
      <div className="space-y-6">
        {/* Skeleton cho filter */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <GlassSkeleton variant="card" className="h-10 w-full md:max-w-md rounded-md" shimmer />
          <div className="flex gap-2 flex-wrap">
            {[1, 2, 3, 4].map(i => (
              <GlassSkeleton key={i} variant="card" className="h-9 w-16 rounded-md" shimmer />
            ))}
          </div>
        </div>
        {/* Skeleton cho tabs */}
        <div className="flex gap-2 border-b border-border">
          {[1, 2, 3, 4].map(i => (
            <GlassSkeleton key={i} variant="text" className="h-10 w-20" shimmer />
          ))}
        </div>
        {/* Skeleton cho card grid */}
        <StaggeredSkeleton direction="horizontal" staggerDelay={0.05}>
          {Array.from({ length: 6 }).map((_, i) => (
            <VocabularySetSkeleton key={i} />
          ))}
        </StaggeredSkeleton>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <VocabularyFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedDifficulty={selectedDifficulty}
        setSelectedDifficulty={handleDifficultyChange}
      />
      <VocabularyTabs activeTab={activeTab} onTabChange={setActiveTab} />
      {(activeTab === 'suggested' || activeTab === 'my-sets') && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSets.map(set => (
            <VocabularySetCard key={set.id} set={set} />
          ))}
        </div>
      )}
      {activeTab === 'my-sets' && filteredSets.length === 0 && !loading && (
        <EmptyState icon={BookOpen} message="Bạn chưa có bộ từ nào. Hãy tạo bộ đầu tiên!" buttonText="Tạo bộ mới" />
      )}
      {activeTab === 'challenges' && <EmptyState icon={Target} message="Chưa có thử thách nào. Hãy quay lại sau!" />}
      {activeTab === 'games' && <EmptyState icon={Zap} message="Trò chơi sắp ra mắt! Hãy học từ vựng để nhận ưu đãi." />}
    </div>
  );
}