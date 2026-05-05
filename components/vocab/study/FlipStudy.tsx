'use client';

import { useState, useEffect } from 'react';
import { FlipMode } from '../modes/FlipMode';
import { vocabApi } from '@/lib/api';
import { FlashcardSkeleton } from '@/components/skeletons';
import { useMinimumLoading } from '@/hooks/use-minimum-loading';
import { PartyPopper } from 'lucide-react';

export function FlipStudy({ setId }: { setId: string }) {
  const [cards, setCards] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);
  const showSkeleton = useMinimumLoading(loading && cards.length === 0, 500);

  // Tải toàn bộ thẻ của bộ (không dùng SRS)
  useEffect(() => {
    const fetchAllCards = async () => {
      try {
        // Lấy trang đầu với kích thước lớn (giả sử mỗi bộ ít hơn 500 từ)
        const res = await vocabApi.getCardsBySet(setId, 0, 500);
        setCards(res.data.content || []);
      } catch (error) {
        console.error('Failed to load cards', error);
        setCards([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAllCards();
  }, [setId]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  if (showSkeleton) return <FlashcardSkeleton />;
  if (!loading && cards.length === 0) {
    return (
      <div className="text-center py-12">
        <PartyPopper className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-green-600">Không có thẻ nào</h2>
        <p className="mt-2">Bộ từ này chưa có thẻ nào để học.</p>
      </div>
    );
  }

  const currentCard = cards[currentIndex];
  if (!currentCard) return null;

  return (
    <FlipMode
      key={currentCard.id}
      word={currentCard.word}
      meaning={currentCard.meaning}
      exampleSentence={currentCard.exampleSentence}
      isFlipped={isFlipped}
      onFlip={() => setIsFlipped(!isFlipped)}
      onPrev={handlePrev}
      onNext={handleNext}
      isFirst={currentIndex === 0}
      isLast={currentIndex === cards.length - 1}
    />
  );
}