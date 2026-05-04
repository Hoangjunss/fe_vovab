import { useState, useEffect, useCallback } from 'react';
import { vocabApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export interface CardData {
  id: string;
  word: string;
  meaning: string;
  phonetic?: string;
  exampleSentence?: string;
}

export function useVocabularyStudy(setId: string, mode: 'flip' | 'mcq' | 'typing' | 'listening') {
  const { user } = useAuth();
  const [cards, setCards] = useState<CardData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [learnedSet, setLearnedSet] = useState<Set<string>>(new Set());
  const [initialized, setInitialized] = useState(false);

  const storageKey = `learned_${setId}_${mode}`;

  // Load learnedSet từ localStorage theo mode
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setLearnedSet(new Set(JSON.parse(stored)));
      }
      setInitialized(true);
    }
  }, [storageKey]);

  // Lưu learnedSet khi thay đổi
  useEffect(() => {
    if (initialized && typeof window !== 'undefined') {
      localStorage.setItem(storageKey, JSON.stringify(Array.from(learnedSet)));
    }
  }, [learnedSet, initialized, storageKey]);

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
        // Lọc bỏ những từ đã học trong mode này
        let filtered = newCards.filter(c => !learnedSet.has(c.id));
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
  }, [setId, page, hasMore, learnedSet]);

  // Tự động fetch thêm khi số từ còn lại ít hơn 8
  useEffect(() => {
    if (!loading && cards.length < 8 && hasMore && initialized) {
      fetchCards();
    }
  }, [cards.length, loading, hasMore, fetchCards, initialized]);

  // Khởi tạo lần đầu
  useEffect(() => {
    if (initialized) {
      fetchCards(true);
    }
  }, [setId, initialized]);

  const markAsLearned = async (cardId: string, quality: number = 3) => {
    // Chỉ đánh dấu đã học nếu trả lời đúng (quality >= 3)
    if (quality >= 3) {
      setLearnedSet(prev => new Set(prev).add(cardId));
    }
    if (user) {
      try {
        await vocabApi.submitAnswer(cardId, quality);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const nextCard = () => {
    if (cards.length === 0) return;
    setCards(prev => prev.filter((_, idx) => idx !== currentIndex));
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