'use client';
import { useEffect, useState } from 'react';
import { VocabularyTabs } from './VocabularyTabs';
import { VocabularyFilter } from './VocabularyFilter';
import { VocabularySetCard } from './VocabularySetCard';
import { EmptyState } from '@/components/common/EmptyState';
import { BookOpen, Target, Zap } from 'lucide-react';
import { vocabApi } from '@/lib/api';

export function VocabularyBrowser() {
  const [activeTab, setActiveTab] = useState('suggested');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [sets, setSets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSets = async () => {
      setLoading(true);
      try {
        let response;
        if (activeTab === 'suggested') {
          response = await vocabApi.getPublicSets(searchQuery || undefined);
        } else {
          // For my-sets, still use public if no auth; or you can keep mock
          response = await vocabApi.getPublicSets(searchQuery || undefined);
        }
        // API trả về Page object { content, ... }
        setSets(response.data?.content || []);
      } catch (error) {
        console.error('Failed to fetch sets:', error);
        setSets([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSets();
  }, [activeTab, searchQuery]);

  // Filter by difficulty (if difficulty_level exists)
  const filteredSets = sets.filter(set => {
    if (selectedDifficulty === 'all') return true;
    const level = set.difficultyLevel?.toString();
    return level === selectedDifficulty;
  });

  // Helper to map difficulty string to numeric for filter
  const difficultyMap: Record<string, string> = { 'all': 'all', 'Beginner': '1', 'Intermediate': '3', 'Advanced': '5' };

  const handleDifficultyChange = (diff: string) => {
    setSelectedDifficulty(diff);
  };

  return (
    <div className="space-y-6">
      <VocabularyFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedDifficulty={selectedDifficulty}
        setSelectedDifficulty={handleDifficultyChange}
      />
      <VocabularyTabs activeTab={activeTab} onTabChange={setActiveTab} />
      {loading && <div className="text-center py-12">Đang tải...</div>}
      {!loading && (activeTab === 'suggested' || activeTab === 'my-sets') && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSets.map(set => (
            <VocabularySetCard key={set.id} set={set} />
          ))}
        </div>
      )}
      {!loading && activeTab === 'my-sets' && filteredSets.length === 0 && (
        <EmptyState icon={BookOpen} message="Bạn chưa có bộ từ nào. Hãy tạo bộ đầu tiên!" buttonText="Tạo bộ mới" />
      )}
      {activeTab === 'challenges' && <EmptyState icon={Target} message="Chưa có thử thách nào. Hãy quay lại sau!" />}
      {activeTab === 'games' && <EmptyState icon={Zap} message="Trò chơi sắp ra mắt! Hãy học từ vựng để nhận ưu đãi." />}
    </div>
  );
}