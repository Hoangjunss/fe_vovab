'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { useVocabularyStudy } from '@/hooks/use-vocabulary-study';
import { TypingMode } from '../modes/TypingMode';
import { FlashcardSkeleton } from '@/components/skeletons';
import { useMinimumLoading } from '@/hooks/use-minimum-loading';

export function TypingStudy({ setId }: { setId: string }) {
  const { currentCard, loading, totalElements, correctCount, markAsLearned, nextCard } = useVocabularyStudy(setId);
  const [answer, setAnswer] = useState('');
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

  const handleSubmit = () => {
    const isCorrect = answer.trim().toLowerCase() === currentCard.word.toLowerCase();
    const quality = isCorrect ? 3 : 1;
    markAsLearned(currentCard.id, quality);
    // correctCount sẽ được tăng trong nextCard
    nextCard();
    setAnswer('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gõ chính tả</h2>
          <p className="text-sm text-muted-foreground">Đã đúng {correctCount} từ</p>
        </div>
        <Button variant="outline" onClick={() => window.location.href = '/vocab'} className="active:scale-95">
          <RotateCcw className="mr-2 h-4 w-4" /> Quay lại
        </Button>
      </div>
      <TypingMode
        meaning={currentCard.meaning}
        exampleSentence={currentCard.exampleSentence}
        answer={answer}
        setAnswer={setAnswer}
        onSubmit={handleSubmit}
      />
    </div>
  );
}