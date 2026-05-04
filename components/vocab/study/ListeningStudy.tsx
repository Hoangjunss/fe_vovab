'use client';

import { useState, useEffect } from 'react';
import { useVocabularyStudy } from '@/hooks/use-vocabulary-study';
import { MatchingGame } from '../modes/MatchingGame';
import { FlashcardSkeleton, ListeningSkeleton } from '@/components/skeletons';
import { useMinimumLoading } from '@/hooks/use-minimum-loading';
import { PartyPopper, Target, ArrowLeft, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useRouter } from 'next/navigation';

export function ListeningStudy({ setId }: { setId: string }) {
  const router = useRouter();
  const {
    cards,
    loading,
    totalElements,
    markAsLearned,
  } = useVocabularyStudy(setId, 'listening');

  const [currentBatch, setCurrentBatch] = useState<any[]>([]);
  const [matched, setMatched] = useState(0);
  const [points, setPoints] = useState(0);

  const showSkeleton = useMinimumLoading(loading && cards.length === 0, 500);

  // Random 6 từ từ cards (toàn bộ từ chưa học)
  const getRandomBatch = (allCards: any[]) => {
    const shuffled = [...allCards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 6);
  };

  useEffect(() => {
    if (!loading && cards.length > 0 && currentBatch.length === 0) {
      const batch = getRandomBatch(cards);
      setCurrentBatch(batch);
      setMatched(0);
    }
  }, [cards, loading, currentBatch.length]);

  const handleMatch = (cardId: string) => {
    markAsLearned(cardId, 3);
    setPoints(prev => prev + 10);
  };

  const handleProgress = (count: number) => {
    setMatched(count);
  };

  const handleComplete = () => {
    // Hoàn thành batch hiện tại, chuyển sang batch ngẫu nhiên mới
    setCurrentBatch([]);
  };

  const progressPercent = currentBatch.length > 0 ? (matched / currentBatch.length) * 100 : 0;

  if (showSkeleton) return <FlashcardSkeleton />;

  if (cards.length === 0 && !loading) {
    return (
      <div className="text-center py-12">
        <PartyPopper className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-green-600">Hoàn thành!</h2>
        <p className="mt-2">Bạn đã học hết {totalElements} từ.</p>
        <div className="mt-4 flex justify-center gap-3">
          <Button onClick={() => window.location.reload()} variant="outline">
            Học lại
          </Button>
          <Button onClick={() => router.push('/vocab')} variant="default">
            Về trang từ vựng
          </Button>
        </div>
      </div>
    );
  }

  if (currentBatch.length === 0) return <ListeningSkeleton />;

  return (
    <div className="space-y-6">
     


      <div className="space-y-1">
        <Progress value={progressPercent} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Tiến độ</span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
      </div>

      <MatchingGame
        cards={currentBatch}
        onMatch={handleMatch}
        onComplete={handleComplete}
        onProgress={handleProgress}
      />
    </div>
  );
}