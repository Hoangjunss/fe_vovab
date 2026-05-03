import { useState, useEffect, useCallback } from 'react';
import { vocabApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export interface CardData {
  id: string;
  word: string;
  meaning: string;
  exampleSentence?: string;
}

export function useVocabularyStudy(setId: string) {
  const { user } = useAuth();
  const [cards, setCards] = useState<CardData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [learnedSet, setLearnedSet] = useState<Set<string>>(new Set());
  const [isGuestReady, setIsGuestReady] = useState(!!user);

  useEffect(() => {
    if (!user && typeof window !== 'undefined') {
      const stored = localStorage.getItem(`learned_${setId}`);
      if (stored) setLearnedSet(new Set(JSON.parse(stored)));
      setIsGuestReady(true);
    }
  }, [setId, user]);

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

  const markAsLearned = async (cardId: string, quality: number = 3) => {
    if (user) {
      try {
        await vocabApi.submitAnswer(cardId, quality);
      } catch (err) {
        console.error(err);
      }
    } else {
      const newSet = new Set(learnedSet);
      newSet.add(cardId);
      setLearnedSet(newSet);
      localStorage.setItem(`learned_${setId}`, JSON.stringify(Array.from(newSet)));
    }
  };

  const nextCard = () => {
    if (cards.length === 0) return;
    const newCards = cards.filter((_, idx) => idx !== currentIndex);
    setCards(newCards);
    if (newCards.length <= 5 && hasMore && !loading) {
      fetchCards();
    }
    setCorrectCount(prev => prev + 1);
  };

  const currentCard = cards[currentIndex];

  return {
    cards,
    currentCard,
    loading,
    totalElements,
    correctCount,
    markAsLearned,
    nextCard,
  };
}