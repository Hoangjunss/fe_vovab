import { PracticeStatCard } from './PracticeStatCard'
import { PracticeModuleCard } from './PracticeModuleCard'
import { BookOpen, Headphones, Eye } from 'lucide-react'
const MODULES = [
  { id: 1, title: 'Listening Comprehension', description: 'Improve your listening skills', icon: Headphones, lessons: 24, difficulty: 'Intermediate', color: 'bg-blue-50 text-blue-700' },
  { id: 2, title: 'Reading Passages', description: 'Practice reading comprehension', icon: BookOpen, lessons: 18, difficulty: 'Advanced', color: 'bg-purple-50 text-purple-700' },
  { id: 3, title: 'Grammar & Vocabulary', description: 'Master grammar rules', icon: Eye, lessons: 32, difficulty: 'Intermediate', color: 'bg-green-50 text-green-700' },
]
export function PracticeModules() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3"><PracticeStatCard label="Tổng số bài học" value="74" /><PracticeStatCard label="Đã hoàn thành" value="28" /><PracticeStatCard label="Đang học" value="5" /></div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{MODULES.map(mod => <PracticeModuleCard key={mod.id} module={mod} />)}</div>
    </div>
  )
}