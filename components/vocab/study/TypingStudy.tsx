'use client';

import { useState } from 'react';
import { useVocabularyStudy } from '@/hooks/use-vocabulary-study';
import { TypingMode } from '../modes/TypingMode';
import { FlashcardSkeleton } from '@/components/skeletons';
import { useMinimumLoading } from '@/hooks/use-minimum-loading';
import { PartyPopper } from 'lucide-react';

export function TypingStudy({ setId }: { setId: string }) {
  const { currentCard, loading, totalElements, markAsLearned, nextCard } = useVocabularyStudy(setId, 'typing');
  const [answer, setAnswer] = useState('');
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

  const handleSubmit = () => {
    const isCorrect = answer.trim().toLowerCase() === currentCard.word.toLowerCase();
    const quality = isCorrect ? 3 : 1;
    markAsLearned(currentCard.id, quality);
    nextCard();
    setAnswer('');
  };

  return (
    <TypingMode
      meaning={currentCard.meaning}
      exampleSentence={currentCard.exampleSentence}
      answer={answer}
      setAnswer={setAnswer}
      onSubmit={handleSubmit}
    />
  );
}