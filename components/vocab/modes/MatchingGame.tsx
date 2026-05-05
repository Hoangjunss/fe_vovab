'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';

export interface MatchCard {
  id: string;
  cardId: string;
  type: 'word' | 'meaning';
  content: string;
}

interface MatchingGameProps {
  cards: { id: string; word: string; meaning: string }[];
  onMatch: (cardId: string) => void;
  onComplete: () => void;
  onProgress?: (matchedCount: number) => void;
}

export function MatchingGame({ cards, onMatch, onComplete, onProgress }: MatchingGameProps) {
  const [gameCards, setGameCards] = useState<MatchCard[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [wrongPair, setWrongPair] = useState<{ first: string; second: string } | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [matchedSet, setMatchedSet] = useState<Set<string>>(new Set());

  // Tạo bộ bài và xáo trộn
  useEffect(() => {
    const newCards: MatchCard[] = [];
    cards.forEach(card => {
      newCards.push({
        id: `word-${card.id}`,
        cardId: card.id,
        type: 'word',
        content: card.word,
      });
      newCards.push({
        id: `meaning-${card.id}`,
        cardId: card.id,
        type: 'meaning',
        content: card.meaning,
      });
    });
    // Xáo trộn
    for (let i = newCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
    }
    setGameCards(newCards);
    setSelectedId(null);
    setWrongPair(null);
    setDisabled(false);
    setMatchedSet(new Set());
  }, [cards]);

  const matchedCount = matchedSet.size / 2;
  useEffect(() => {
    onProgress?.(matchedCount);
  }, [matchedCount, onProgress]);

  // Khi ghép đủ hết
  useEffect(() => {
    if (matchedCount === cards.length) {
      setTimeout(() => onComplete(), 300);
    }
  }, [matchedCount, cards.length, onComplete]);

  const handleCardClick = (clickedCard: MatchCard) => {
    if (disabled) return;
    if (matchedSet.has(clickedCard.id)) return; // đã matched rồi

    if (selectedId === null) {
      setSelectedId(clickedCard.id);
      return;
    }

    const firstCard = gameCards.find(c => c.id === selectedId)!;
    const secondCard = clickedCard;

    if (firstCard.cardId === secondCard.cardId && firstCard.type !== secondCard.type) {
      // Đúng: highlight xanh, sau 0.3s đánh dấu matched và xóa khỏi bộ nhớ
      setDisabled(true);
      // Tạo hiệu ứng xanh tạm thời
      const tempCorrect = { first: firstCard.id, second: secondCard.id };
      // Thực tế ta có thể dùng state để hiển thị xanh cho hai ô đó
      // Rồi sau đó thêm vào matchedSet và xóa selection
      setTimeout(() => {
        setMatchedSet(prev => new Set([...prev, firstCard.id, secondCard.id]));
        setSelectedId(null);
        setDisabled(false);
        onMatch(firstCard.cardId);
      }, 300);
      // Hiển thị màu xanh ngay lập tức
      // Tạm thời lưu để CSS chuyển màu xanh
      // Ta dùng state để biết hai ô này đang được matched chờ
      setWrongPair(null); // clear sai
      // Set selected id null để không bị nhầm
      setSelectedId(null);
      // Cần lưu tạm pair đúng để hiển thị màu xanh
      // Dùng state riêng cho "correct highlight"
      // Đơn giản: thêm style cho hai ô đó nhưng không đánh dấu matched ngay
      // Ta sẽ dùng state correctHighlight
      setCorrectHighlight({ first: firstCard.id, second: secondCard.id });
      setTimeout(() => setCorrectHighlight(null), 300);
    } else {
      // Sai: highlight đỏ 2 ô
      setWrongPair({ first: firstCard.id, second: secondCard.id });
      setSelectedId(null);
      setTimeout(() => setWrongPair(null), 500);
    }
  };

  const [correctHighlight, setCorrectHighlight] = useState<{ first: string; second: string } | null>(null);

  const isMatched = (id: string) => matchedSet.has(id);
  const isSelected = (id: string) => selectedId === id;
  const isWrong = (id: string) => wrongPair && (wrongPair.first === id || wrongPair.second === id);
  const isCorrectHighlight = (id: string) => correctHighlight && (correctHighlight.first === id || correctHighlight.second === id);

  return (
    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {gameCards.map((card) => {
        const matched = isMatched(card.id);
        return (
          <div
            key={card.id}
            onClick={() => !matched && handleCardClick(card)}
            className={cn(
              'relative flex items-center justify-center p-4 rounded-xl transition-all duration-200 cursor-pointer',
              'bg-white border shadow-sm hover:shadow-md',
              'aspect-square h-auto min-h-[80px] text-center',
              // Khi matched: ẩn đi nhưng vẫn giữ chỗ
              matched && 'opacity-0 pointer-events-none',
              // Khi được chọn
              isSelected(card.id) && 'ring-2 ring-primary ring-offset-2 bg-primary/5 shadow-md scale-102',
              // Khi sai
              isWrong(card.id) && 'bg-red-100 border-red-400 animate-shake',
              // Khi đúng (highlight xanh trước khi biến mất)
              isCorrectHighlight(card.id) && 'bg-green-100 border-green-500 scale-102',
              'transition-all duration-200'
            )}
          >
            {!matched && (
              <span className="break-words font-medium text-gray-800">{card.content}</span>
            )}
            {isCorrectHighlight(card.id) && (
              <CheckCircle2 className="absolute top-2 right-2 h-5 w-5 text-green-600" />
            )}
          </div>
        );
      })}
    </div>
  );
}