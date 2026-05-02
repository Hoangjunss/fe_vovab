'use client'
import { useState } from 'react'
import { VocabularyTabs } from './VocabularyTabs'
import { VocabularyFilter } from './VocabularyFilter'
import { VocabularySetCard } from './VocabularySetCard'
import { EmptyState } from '@/components/common/EmptyState'
import { BookOpen, Target, Zap } from 'lucide-react'

const MOCK_SETS = [{ id: 1, name: 'Business English', description: 'Professional vocabulary', words: 124, difficulty: 'Intermediate' }, { id: 2, name: 'Technology', description: 'Tech terminology', words: 98, difficulty: 'Intermediate' }, { id: 3, name: 'Travel & Tourism', description: 'Travel vocabulary', words: 76, difficulty: 'Beginner' }, { id: 4, name: 'Finance', description: 'Financial terms', words: 112, difficulty: 'Advanced' }, { id: 5, name: 'Medicine', description: 'Medical terms', words: 89, difficulty: 'Advanced' }, { id: 6, name: 'Environmental', description: 'Climate terms', words: 67, difficulty: 'Intermediate' }]

export function VocabularyBrowser() {
  const [activeTab, setActiveTab] = useState('suggested')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const filteredSets = MOCK_SETS.filter(set => (set.name.toLowerCase().includes(searchQuery.toLowerCase()) || set.description.toLowerCase().includes(searchQuery.toLowerCase())) && (selectedDifficulty === 'all' || set.difficulty === selectedDifficulty))
  return (
    <div className="space-y-6">
      <VocabularyFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedDifficulty={selectedDifficulty} setSelectedDifficulty={setSelectedDifficulty} />
      <VocabularyTabs activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === 'suggested' && <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{filteredSets.map(set => <VocabularySetCard key={set.id} set={set} />)}</div>}
      {activeTab === 'my-sets' && <EmptyState icon={BookOpen} message="Bạn chưa có bộ từ nào. Hãy tạo bộ đầu tiên!" buttonText="Tạo bộ mới" />}
      {activeTab === 'challenges' && <EmptyState icon={Target} message="Chưa có thử thách nào. Hãy quay lại sau!" />}
      {activeTab === 'games' && <EmptyState icon={Zap} message="Trò chơi sắp ra mắt! Hãy học từ vựng để nhận ưu đãi." />}
    </div>
  )
}