'use client';

import { useEffect } from 'react';
import { useVocabularyStudy } from '@/hooks/use-vocabulary-study';
import { TypingMode } from '../modes/TypingMode';
import { FlashcardSkeleton, TypingSkeleton } from '@/components/skeletons';
import { useMinimumLoading } from '@/hooks/use-minimum-loading';
import { PartyPopper } from 'lucide-react';

export function TypingStudy({ setId }: { setId: string }) {
  const {
    currentCard,
    loading,
    totalElements,
    markAsLearned,
    nextCard,
    jumpToRandomCard,
    cards,
  } = useVocabularyStudy(setId, 'typing');

  const showSkeleton = useMinimumLoading(loading && !currentCard, 500);

  // Random lần đầu khi có danh sách
  useEffect(() => {
    if (!loading && cards.length > 0 && currentCard) {
      jumpToRandomCard();
    }
    // Chạy 1 lần khi cards load xong
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, cards.length]);

  if (showSkeleton) return <TypingSkeleton  />;

  if (!currentCard && !loading) {
    return (
      <div className="text-center py-12">
        <PartyPopper className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-green-600">Hoàn thành!</h2>
        <p className="mt-2">Bạn đã học hết {totalElements} từ.</p>
        <button
          className="mt-6 clay-button px-6 py-2 rounded-full"
          onClick={() => window.location.reload()}
        >
          Học lại
        </button>
      </div>
    );
  }

  if (!currentCard) return null;

  const handleAnswer = (isCorrect: boolean) => {
    const quality = isCorrect ? 3 : 1;
    markAsLearned(currentCard.id, quality);
  };

  const handleSkip = () => {
    nextCard(); // chuyển tuần tự
  };

  const handleRandom = () => {
    jumpToRandomCard();
  };

  return (
    <TypingMode
      word={currentCard.word}
      meaning={currentCard.meaning}
      phonetic={(currentCard as any).phonetic}
      exampleSentence={currentCard.exampleSentence}
      onAnswer={handleAnswer}
      onSkip={handleSkip}
      onRandom={handleRandom}
      onContinue={nextCard}
    />
  );
}