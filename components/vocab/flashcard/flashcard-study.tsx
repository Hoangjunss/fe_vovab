'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { vocabApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { FlashcardComplete } from './FlashcardComplete';
import { FlipCard } from './FlipCard';
import { McqCard } from './McqCard';
import { TypingCard } from './TypingCard';
import { ListeningCard } from './ListeningCard';
import { FlashcardModeSelector } from './FlashcardModeSelector';
import { FlashcardSkeleton } from '@/components/skeletons';
import { useMinimumLoading } from '@/hooks/use-minimum-loading';

type StudyMode = 'flip' | 'mcq' | 'typing' | 'listening';

interface CardData {
  id: string;
  word: string;
  meaning: string;
  exampleSentence?: string;
}

export function FlashcardStudy({ setId }: { setId: string }) {
  const { user } = useAuth();
  const [mode, setMode] = useState<StudyMode | null>(null);
  const [cards, setCards] = useState<CardData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [typingAnswer, setTypingAnswer] = useState('');
  const [mcqOptions, setMcqOptions] = useState<string[]>([]);
  const [selectedAns, setSelectedAns] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [learnedSet, setLearnedSet] = useState<Set<string>>(new Set());
  const [isGuestReady, setIsGuestReady] = useState(!!user);

  const showSkeleton = useMinimumLoading(loading && cards.length === 0, 500);

  useEffect(() => {
    if (!user && typeof window !== 'undefined') {
      const stored = localStorage.getItem(`learned_${setId}`);
      if (stored) setLearnedSet(new Set(JSON.parse(stored)));
      setIsGuestReady(true);
    }
  }, [setId, user]);

  const shuffleArray = (arr: string[]) => [...arr].sort(() => Math.random() - 0.5);

  const fetchCards = useCallback(async (reset = false) => {
    if (!hasMore && !reset) return;
    setLoading(true);
    try {
      let currentPage = reset ? 0 : page;
      let fetched = false;
      let attempts = 0;
      while (!fetched && attempts < 10) {
        const res = await vocabApi.getCardsBySet(setId, currentPage, 20);
        const newCards = res.data.content;
        const total = res.data.totalElements;
        setTotalElements(total);
        if (newCards.length === 0) {
          setHasMore(false);
          break;
        }
        let filtered = newCards;
        if (!user) filtered = newCards.filter(c => !learnedSet.has(c.id));
        if (filtered.length > 0 || currentPage + 1 >= res.data.totalPages) {
          setCards(prev => reset ? filtered : [...prev, ...filtered]);
          setPage(prev => reset ? 1 : prev + 1);
          setHasMore(currentPage + 1 < res.data.totalPages);
          fetched = true;
        } else {
          currentPage++;
          attempts++;
        }
      }
      if (!fetched) setHasMore(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [setId, page, hasMore, user, learnedSet]);

  useEffect(() => {
    if (user || isGuestReady) fetchCards(true);
  }, [setId, user, isGuestReady]);

  useEffect(() => {
    if (mode === 'mcq' && cards[currentIndex]) {
      const otherMeanings = cards
        .filter((_, idx) => idx !== currentIndex)
        .map(c => c.meaning)
        .slice(0, 3);
      const all = [cards[currentIndex].meaning, ...otherMeanings];
      while (all.length < 4) all.push('Từ khác');
      setMcqOptions(shuffleArray(all));
      setSelectedAns(null);
    }
  }, [mode, currentIndex, cards]);

  const currentCard = cards[currentIndex];

  const handleAnswer = async (isCorrect: boolean, quality: number) => {
    if (!currentCard) return;
    if (user) {
      try { await vocabApi.submitAnswer(currentCard.id, quality); } catch (err) { console.error(err); }
    } else {
      const newSet = new Set(learnedSet);
      newSet.add(currentCard.id);
      setLearnedSet(newSet);
      localStorage.setItem(`learned_${setId}`, JSON.stringify(Array.from(newSet)));
    }
    if (isCorrect) setCorrectCount(prev => prev + 1);
    const newCards = cards.filter((_, idx) => idx !== currentIndex);
    setCards(newCards);
    if (newCards.length <= 5 && hasMore && !loading) fetchCards();
    setIsFlipped(false);
    setTypingAnswer('');
    setSelectedAns(null);
  };

  if (showSkeleton) {
    return <FlashcardSkeleton />;
  }

  if (!currentCard && cards.length === 0) {
    return <FlashcardComplete totalElements={totalElements} />;
  }

  if (!mode) {
    return <FlashcardModeSelector onSelectMode={setMode} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Học {mode === 'mcq' ? 'trắc nghiệm' : mode}</h2>
          <p className="text-sm text-muted-foreground">Còn {cards.length} từ | Đã đúng {correctCount}</p>
        </div>
        <Button variant="outline" onClick={() => setMode(null)} className="active:scale-95 transition-transform">
          <RotateCcw className="mr-2 h-4 w-4" /> Đổi chế độ
        </Button>
      </div>

      {mode === 'flip' && (
        <FlipCard
          key={currentCard.id}
          word={currentCard.word}
          meaning={currentCard.meaning}
          exampleSentence={currentCard.exampleSentence}
          isFlipped={isFlipped}
          onFlip={() => setIsFlipped(!isFlipped)}
          onNext={() => handleAnswer(true, 3)}
        />
      )}
      {mode === 'mcq' && (
        <McqCard
          word={currentCard.word}
          options={mcqOptions}
          selected={selectedAns}
          onSelect={(ans) => {
            setSelectedAns(ans);
            const isCorrect = ans === currentCard.meaning;
            handleAnswer(isCorrect, isCorrect ? 3 : 1);
          }}
        />
      )}
      {mode === 'typing' && (
        <TypingCard
          meaning={currentCard.meaning}
          exampleSentence={currentCard.exampleSentence}
          answer={typingAnswer}
          setAnswer={setTypingAnswer}
          onSubmit={() => {
            const isCorrect = typingAnswer.trim().toLowerCase() === currentCard.word.toLowerCase();
            handleAnswer(isCorrect, isCorrect ? 3 : 1);
          }}
        />
      )}
      {mode === 'listening' && (
        <ListeningCard
          word={currentCard.word}
          meaning={currentCard.meaning}
          onSubmit={(isCorrect) => handleAnswer(isCorrect, isCorrect ? 3 : 1)}
        />
      )}
    </div>
  );
}