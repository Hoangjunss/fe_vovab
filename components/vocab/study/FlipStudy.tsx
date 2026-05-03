'use client';

import { useState } from 'react';
import { useVocabularyStudy } from '@/hooks/use-vocabulary-study';
import { FlipMode } from '../modes/FlipMode';
import { FlashcardSkeleton } from '@/components/skeletons';
import { useMinimumLoading } from '@/hooks/use-minimum-loading';

export function FlipStudy({ setId }: { setId: string }) {
  const { currentCard, loading, totalElements, correctCount, markAsLearned, nextCard } = useVocabularyStudy(setId);
  const [isFlipped, setIsFlipped] = useState(false);
  const showSkeleton = useMinimumLoading(loading && !currentCard, 500);

  if (showSkeleton) return <FlashcardSkeleton />;
  if (!currentCard && !loading) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-green-600">🎉 Hoàn thành!</h2>
        <p className="mt-2">Bạn đã học hết {totalElements} từ trong bộ này.</p>
        <button className="mt-6 clay-button px-6 py-2 rounded-full" onClick={() => window.location.reload()}>Học lại</button>
      </div>
    );
  }
  if (!currentCard) return null;

  const handleMarkKnown = async () => {
    await markAsLearned(currentCard.id, 4);
    nextCard();
    setIsFlipped(false);
  };

  const handleNext = async () => {
    await markAsLearned(currentCard.id, 1);
    nextCard();
    setIsFlipped(false);
  };

  return (
    <FlipMode
      key={currentCard.id}
      word={currentCard.word}
      meaning={currentCard.meaning}
      exampleSentence={currentCard.exampleSentence}
      isFlipped={isFlipped}
      onFlip={() => setIsFlipped(!isFlipped)}
      onMarkKnown={handleMarkKnown}
      onNext={handleNext}
    />
  );
}