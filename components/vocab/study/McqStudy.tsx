'use client';

import { useState, useEffect } from 'react';
import { useVocabularyStudy } from '@/hooks/use-vocabulary-study';
import { McqMode, McqDirection, McqOption } from '../modes/McqMode';
import { FlashcardSkeleton, McqSkeleton } from '@/components/skeletons';
import { useMinimumLoading } from '@/hooks/use-minimum-loading';
import { PartyPopper } from 'lucide-react';

export function McqStudy({ setId }: { setId: string }) {
  const {
    currentCard,
    loading,
    totalElements,
    markAsLearned,
    nextCard,
    cards,
  } = useVocabularyStudy(setId, 'mcq');
  
  const [options, setOptions] = useState<McqOption[]>([]);
  const [direction, setDirection] = useState<McqDirection>('en-to-vi');
  const [question, setQuestion] = useState('');
  const [correctOptionValue, setCorrectOptionValue] = useState('');
  
  const showSkeleton = useMinimumLoading(loading && !currentCard, 500);

  useEffect(() => {
    if (currentCard) {
      const dir: McqDirection = Math.random() < 0.5 ? 'en-to-vi' : 'vi-to-en';
      setDirection(dir);
      
      let q: string;
      let correctValue: string;
      let correctOption: McqOption;
      
      if (dir === 'en-to-vi') {
        q = currentCard.word;
        correctValue = currentCard.meaning;
        correctOption = {
          value: currentCard.meaning,
          word: currentCard.word,
          meaning: currentCard.meaning,
          phonetic: (currentCard as any).phonetic,
          exampleSentence: currentCard.exampleSentence,
        };
      } else {
        q = currentCard.meaning;
        correctValue = currentCard.word;
        correctOption = {
          value: currentCard.word,
          word: currentCard.word,
          meaning: currentCard.meaning,
          phonetic: (currentCard as any).phonetic,
          exampleSentence: currentCard.exampleSentence,
        };
      }
      setQuestion(q);
      setCorrectOptionValue(correctValue);
      
      // Lấy tất cả thẻ khác làm đáp án nhiễu (tối đa 3)
      const otherCards = cards.filter(c => c.id !== currentCard.id);
      const shuffledOthers = [...otherCards].sort(() => Math.random() - 0.5);
      const distractors = shuffledOthers.slice(0, 3).map(card => {
        if (dir === 'en-to-vi') {
          return {
            value: card.meaning,
            word: card.word,
            meaning: card.meaning,
            phonetic: (card as any).phonetic,
            exampleSentence: card.exampleSentence,
          } as McqOption;
        } else {
          return {
            value: card.word,
            word: card.word,
            meaning: card.meaning,
            phonetic: (card as any).phonetic,
            exampleSentence: card.exampleSentence,
          } as McqOption;
        }
      });
      
      let opts = [correctOption, ...distractors];
      setOptions([...opts].sort(() => Math.random() - 0.5));
    }
  }, [currentCard, cards]);

  if (showSkeleton) return <McqSkeleton  />;
  
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

  const handleAnswer = (selectedValue: string, isCorrect: boolean) => {
    const quality = isCorrect ? 3 : 1;
    markAsLearned(currentCard.id, quality);
  };

  return (
    <McqMode
      direction={direction}
      question={question}
      options={options}
      correctOptionValue={correctOptionValue}
      onAnswer={handleAnswer}
      onContinue={nextCard}
    />
  );
}