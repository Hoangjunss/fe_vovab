'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { useVocabularyStudy } from '@/hooks/use-vocabulary-study';
import { McqMode } from '../modes/McqMode';
import { FlashcardSkeleton } from '@/components/skeletons';
import { useMinimumLoading } from '@/hooks/use-minimum-loading';

export function McqStudy({ setId }: { setId: string }) {
  const { currentCard, loading, totalElements, correctCount, markAsLearned, nextCard, cards } = useVocabularyStudy(setId);
  const [options, setOptions] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const showSkeleton = useMinimumLoading(loading && !currentCard, 500);

  useEffect(() => {
    if (currentCard) {
      const otherMeanings = cards.filter(c => c.id !== currentCard.id).map(c => c.meaning).slice(0, 3);
      const all = [currentCard.meaning, ...otherMeanings];
      while (all.length < 4) all.push('Từ khác');
      setOptions([...all].sort(() => Math.random() - 0.5));
      setSelected(null);
    }
  }, [currentCard, cards]);

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

  const handleSelect = (ans: string) => {
    setSelected(ans);
    const isCorrect = ans === currentCard.meaning;
    const quality = isCorrect ? 3 : 1;
    markAsLearned(currentCard.id, quality);
    if (isCorrect) {
      // correctCount sẽ tăng ở nextCard
    }
    setTimeout(() => {
      nextCard();
      setSelected(null);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Trắc nghiệm</h2>
          <p className="text-sm text-muted-foreground">Đã đúng {correctCount} từ</p>
        </div>
        <Button variant="outline" onClick={() => window.location.href = '/vocab'} className="active:scale-95">
          <RotateCcw className="mr-2 h-4 w-4" /> Quay lại
        </Button>
      </div>
      <McqMode word={currentCard.word} options={options} selected={selected} onSelect={handleSelect} />
    </div>
  );
}