'use client';

import { useState } from 'react';
import { useVocabularyStudy } from '@/hooks/use-vocabulary-study';
import { ListeningMode } from '../modes/ListeningMode';
import { FlashcardSkeleton } from '@/components/skeletons';
import { useMinimumLoading } from '@/hooks/use-minimum-loading';
import { PartyPopper } from 'lucide-react';

export function ListeningStudy({ setId }: { setId: string }) {
  const { currentCard, loading, totalElements, markAsLearned, nextCard } = useVocabularyStudy(setId, 'listening');
  const showSkeleton = useMinimumLoading(loading && !currentCard, 500);

  if (showSkeleton) return <FlashcardSkeleton />;
  if (!currentCard && !loading) {
    return (
      <div className="text-center py-12">
        <PartyPopper className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-green-600">Hoàn thành!</h2>
        <p className="mt-2">Bạn đã học hết {totalElements} từ.</p>
        <button className="mt-6 clay-button px-6 py-2 rounded-full" onClick={() => window.location.reload()}>Học lại</button>
      </div>
    );
  }
  if (!currentCard) return null;

  const handleSubmit = (isCorrect: boolean) => {
    const quality = isCorrect ? 3 : 1;
    markAsLearned(currentCard.id, quality);
    nextCard();
  };

  return (
    <ListeningMode
      word={currentCard.word}
      meaning={currentCard.meaning}
      onSubmit={handleSubmit}
    />
  );
}