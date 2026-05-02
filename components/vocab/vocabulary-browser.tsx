'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Search, BookOpen, Target, Zap } from 'lucide-react'

const VOCAB_CATEGORIES = [
  { id: 1, name: 'Business English', description: 'Professional vocabulary and phrases', words: 124, difficulty: 'Intermediate' },
  { id: 2, name: 'Technology', description: 'Tech and IT terminology', words: 98, difficulty: 'Intermediate' },
  { id: 3, name: 'Travel & Tourism', description: 'Travel related vocabulary', words: 76, difficulty: 'Beginner' },
  { id: 4, name: 'Finance', description: 'Financial and banking terms', words: 112, difficulty: 'Advanced' },
  { id: 5, name: 'Medicine', description: 'Medical and health terminology', words: 89, difficulty: 'Advanced' },
  { id: 6, name: 'Environmental', description: 'Environmental and climate terms', words: 67, difficulty: 'Intermediate' },
]

export function VocabularyBrowser() {
  const [activeTab, setActiveTab] = useState('suggested')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')

  const filteredSets = VOCAB_CATEGORIES.filter((set) => {
    const matchesSearch = set.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      set.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDifficulty = selectedDifficulty === 'all' || set.difficulty === selectedDifficulty
    return matchesSearch && matchesDifficulty
  })

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm bộ từ vựng..."
            className="pl-10 bg-white border-border/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
            <Button
              key={level}
              variant={selectedDifficulty === level ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedDifficulty(level)}
              className={selectedDifficulty === level ? 'bg-primary text-white' : 'border-border/50 bg-white'}
            >
              {level === 'all' ? 'Tất cả' : level}
            </Button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        {['suggested', 'my-sets', 'challenges', 'games'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium transition-all relative ${
              activeTab === tab
                ? 'text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab === 'suggested' && 'Gợi ý'}
            {tab === 'my-sets' && 'Bộ của tôi'}
            {tab === 'challenges' && 'Thử thách'}
            {tab === 'games' && '🎮 Trò chơi'}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'suggested' && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSets.map((set) => (
            <VocabSetCard key={set.id} set={set} />
          ))}
        </div>
      )}

      {activeTab === 'my-sets' && (
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/20 mb-4" />
          <p className="text-muted-foreground">Bạn chưa có bộ từ nào. Hãy tạo bộ đầu tiên!</p>
          <Button className="mt-4 bg-primary text-white shadow-md hover:shadow-lg">Tạo bộ mới</Button>
        </div>
      )}

      {activeTab === 'challenges' && (
        <div className="text-center py-12">
          <Target className="mx-auto h-12 w-12 text-muted-foreground/20 mb-4" />
          <p className="text-muted-foreground">Chưa có thử thách nào. Hãy quay lại sau!</p>
        </div>
      )}

      {activeTab === 'games' && (
        <div className="text-center py-12">
          <Zap className="mx-auto h-12 w-12 text-muted-foreground/20 mb-4" />
          <p className="text-muted-foreground">Trò chơi sắp ra mắt! Hãy học từ vựng để nhận ưu đãi.</p>
        </div>
      )}
    </div>
  )
}

function VocabSetCard({ set }: { set: typeof VOCAB_CATEGORIES[0] }) {
  const difficultyColor = {
    Beginner: 'bg-green-100 text-green-700',
    Intermediate: 'bg-orange-100 text-orange-700',
    Advanced: 'bg-red-100 text-red-700',
  }[set.difficulty]

  return (
    <Card className="border-border/50 bg-white shadow-md hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer overflow-hidden group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{set.name}</CardTitle>
            <CardDescription className="mt-1">{set.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Số từ</p>
            <p className="text-xl font-bold text-foreground">{set.words}</p>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${difficultyColor}`}>
            {set.difficulty}
          </span>
        </div>
        <Button className="w-full bg-primary text-white shadow-md hover:shadow-lg group-hover:scale-105 transition">
          Học ngay 🚀
        </Button>
      </CardContent>
    </Card>
  )
}