'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, Headphones, Eye } from 'lucide-react'

const PRACTICE_MODULES = [
  {
    id: 1,
    title: 'Listening Comprehension',
    description: 'Improve your listening skills with real TOEIC audio',
    icon: Headphones,
    lessons: 24,
    difficulty: 'Intermediate',
    color: 'bg-blue-50',
  },
  {
    id: 2,
    title: 'Reading Passages',
    description: 'Practice reading comprehension with timed passages',
    icon: BookOpen,
    lessons: 18,
    difficulty: 'Advanced',
    color: 'bg-purple-50',
  },
  {
    id: 3,
    title: 'Grammar & Vocabulary',
    description: 'Master grammar rules and expand vocabulary',
    icon: Eye,
    lessons: 32,
    difficulty: 'Intermediate',
    color: 'bg-green-50',
  },
]

export function PracticeModules() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total Lessons" value="74" />
        <StatCard label="Completed" value="28" />
        <StatCard label="In Progress" value="5" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {PRACTICE_MODULES.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="border-border">
      <CardContent className="pt-6 text-center">
        <p className="text-sm text-foreground/60 mb-1">{label}</p>
        <p className="text-3xl font-bold text-foreground">{value}</p>
      </CardContent>
    </Card>
  )
}

function ModuleCard({ module }: { module: typeof PRACTICE_MODULES[0] }) {
  const Icon = module.icon

  return (
    <Card className="border-border hover:border-primary transition-colors overflow-hidden">
      <div className={`${module.color} h-24 flex items-center justify-center`}>
        <Icon className="h-12 w-12 text-foreground/40" />
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{module.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-foreground/60">{module.description}</p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-foreground/60">{module.lessons} lessons</span>
          <span className="px-2 py-1 rounded text-xs font-medium bg-secondary text-foreground">
            {module.difficulty}
          </span>
        </div>
        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
          Start Learning
        </Button>
      </CardContent>
    </Card>
  )
}
