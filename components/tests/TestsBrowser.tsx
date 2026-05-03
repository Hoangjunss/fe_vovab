'use client';

import { useState, useEffect } from 'react';
import { TestStats } from './TestStats';
import { TestCard } from './TestCard';
import { TestDetailView } from './TestDetailView';
import { StaggeredSkeleton } from '@/components/ui/staggered-skeleton';
import { TestCardSkeleton } from '@/components/skeletons';
import { GlassSkeleton } from '@/components/ui/glass-skeleton';
import { useMinimumLoading } from '@/hooks/use-minimum-loading';

const MOCK_TESTS = [
  { id: 1, name: 'Full Length Practice Test 1', duration: 120, questions: 200, parts: ['Listening', 'Reading'], difficulty: 'Intermediate', attempts: 3, bestScore: 850 },
  { id: 2, name: 'Listening Part 1-2 Mini Test', duration: 30, questions: 32, parts: ['Listening'], difficulty: 'Beginner', attempts: 5, bestScore: 95 },
  { id: 3, name: 'Reading Comprehension Challenge', duration: 45, questions: 54, parts: ['Reading'], difficulty: 'Advanced', attempts: 2, bestScore: 112 },
  { id: 4, name: 'Mixed Skills Practice', duration: 60, questions: 100, parts: ['Listening', 'Reading'], difficulty: 'Intermediate', attempts: 4, bestScore: 780 },
];

export function TestsBrowser() {
  const [selected, setSelected] = useState<typeof MOCK_TESTS[0] | null>(null);
  const [loading, setLoading] = useState(true);
  const showSkeleton = useMinimumLoading(loading, 500);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (selected) return <TestDetailView test={selected} onBack={() => setSelected(null)} />;

  if (showSkeleton) {
    return (
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <GlassSkeleton key={i} variant="card" className="h-24 w-full" shimmer />
          ))}
        </div>
        <GlassSkeleton variant="text" className="h-7 w-32" shimmer />
        <StaggeredSkeleton direction="vertical" staggerDelay={0.08}>
          {Array.from({ length: 4 }).map((_, i) => (
            <TestCardSkeleton key={i} />
          ))}
        </StaggeredSkeleton>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <TestStats stats={[
        { label: 'Tổng số đề', value: '24' },
        { label: 'Đã hoàn thành', value: '12' },
        { label: 'Điểm cao nhất', value: '890' },
        { label: 'Điểm trung bình', value: '765' }
      ]} />
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Đề thi có sẵn</h3>
        <div className="grid gap-6 md:grid-cols-2">
          {MOCK_TESTS.map(test => (
            <TestCard key={test.id} test={test} onClick={() => setSelected(test)} />
          ))}
        </div>
      </div>
    </div>
  );
}