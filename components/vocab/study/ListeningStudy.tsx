'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { useVocabularyStudy } from '@/hooks/use-vocabulary-study';
import { ListeningMode } from '../modes/ListeningMode';
import { FlashcardSkeleton } from '@/components/skeletons';
import { useMinimumLoading } from '@/hooks/use-minimum-loading';

export function ListeningStudy({ setId }: { setId: string }) {
  const { currentCard, loading, totalElements, correctCount, markAsLearned, nextCard } = useVocabularyStudy(setId);
  const [selected, setSelected] = useState<string | null>(null);
  const showSkeleton = useMinimumLoading(loading && !currentCard, 500);

  if (showSkeleton) return <FlashcardSkeleton />;
  if (!currentCard && !loading) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-green-600">🎉 Hoàn thành!</h2>
        <p className="mt-2">Bạn đã học hết {totalElements} từ.</p>
        <Button className="mt-6" onClick={() => window.location.reload()}>Học lại</Button>
      </div>
    );
  }
  if (!currentCard) return null;

  const handleSelect = (isCorrect: boolean) => {
    // ListeningMode sẽ gọi onSubmit(isCorrect)
    const quality = isCorrect ? 3 : 1;
    markAsLearned(currentCard.id, quality);
    nextCard();
    setSelected(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Nghe - chọn</h2>
          <p className="text-sm text-muted-foreground">Đã đúng {correctCount} từ</p>
        </div>
        <Button variant="outline" onClick={() => window.location.href = '/vocab'} className="active:scale-95">
          <RotateCcw className="mr-2 h-4 w-4" /> Quay lại
        </Button>
      </div>
      <ListeningMode
        word={currentCard.word}
        meaning={currentCard.meaning}
        onSubmit={handleSelect}
      />
    </div>
  );
}