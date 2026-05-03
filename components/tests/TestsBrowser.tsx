'use client'
import { useState } from 'react'
import { TestStats } from './TestStats'
import { TestCard } from './TestCard'
import { TestDetailView } from './TestDetailView'

const MOCK_TESTS = [
  { id: 1, name: 'Full Length Practice Test 1', duration: 120, questions: 200, parts: ['Listening', 'Reading'], difficulty: 'Intermediate', attempts: 3, bestScore: 850 },
  { id: 2, name: 'Listening Part 1-2 Mini Test', duration: 30, questions: 32, parts: ['Listening'], difficulty: 'Beginner', attempts: 5, bestScore: 95 },
  { id: 3, name: 'Reading Comprehension Challenge', duration: 45, questions: 54, parts: ['Reading'], difficulty: 'Advanced', attempts: 2, bestScore: 112 },
  { id: 4, name: 'Mixed Skills Practice', duration: 60, questions: 100, parts: ['Listening', 'Reading'], difficulty: 'Intermediate', attempts: 4, bestScore: 780 },
]

export function TestsBrowser() {
  const [selected, setSelected] = useState<typeof MOCK_TESTS[0] | null>(null)
  if (selected) return <TestDetailView test={selected} onBack={() => setSelected(null)} />
  return (
    <div className="space-y-6">
      <TestStats stats={[{ label: 'Tổng số đề', value: '24' }, { label: 'Đã hoàn thành', value: '12' }, { label: 'Điểm cao nhất', value: '890' }, { label: 'Điểm trung bình', value: '765' }]} />
      <div className="space-y-4"><h3 className="text-lg font-semibold text-foreground">Đề thi có sẵn</h3><div className="grid gap-6 md:grid-cols-2">{MOCK_TESTS.map(test => <TestCard key={test.id} test={test} onClick={() => setSelected(test)} />)}</div></div>
    </div>
  )
}