'use client';

import { Button } from '@/components/ui/button';
import { Volume2, Check, ArrowRight } from 'lucide-react';

interface FlipModeProps {
  word: string;
  meaning: string;
  exampleSentence?: string;
  isFlipped: boolean;
  onFlip: () => void;
  onMarkKnown: () => void;
  onNext: () => void;
}

export function FlipMode({
  word,
  meaning,
  exampleSentence,
  isFlipped,
  onFlip,
  onMarkKnown,
  onNext,
}: FlipModeProps) {
  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-8">
      {/* Thẻ lật */}
      <div
        className="relative h-96 w-full cursor-pointer [perspective:1000px] group"
        onClick={onFlip}
      >
        <div
          className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${
            isFlipped ? '[transform:rotateY(180deg)]' : ''
          }`}
        >
          {/* Mặt trước (từ) */}
          <div className="absolute inset-0 [backface-visibility:hidden] clay-card flex flex-col items-center justify-center text-center p-8 border border-white/30 shadow-xl">
            <div className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
              <span>🔊 Click to flip & hear</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  speak();
                }}
                className="p-2 rounded-full hover:bg-white/20 transition"
                aria-label="Phát âm"
              >
                <Volume2 className="h-5 w-5" />
              </button>
            </div>
            <div className="text-5xl font-black text-foreground">{word}</div>
          </div>

          {/* Mặt sau (nghĩa) */}
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] clay-card flex flex-col items-center justify-center text-center p-8 border border-white/30 shadow-xl">
            <div className="text-sm text-muted-foreground mb-4">Nghĩa & ví dụ</div>
            <div className="text-3xl font-bold text-foreground mb-4">{meaning}</div>
            {exampleSentence && (
              <p className="text-muted-foreground italic max-w-md">{exampleSentence}</p>
            )}
          </div>
        </div>
      </div>

      {/* Hai nút bấm */}
      <div className="flex gap-4 justify-center">
        <Button
          onClick={onMarkKnown}
          className="flex-1 clay-button-outline bg-white/80 hover:bg-white gap-2"
        >
          <Check className="h-4 w-4" />
          😊 Đã thuộc
        </Button>
        <Button
          onClick={onNext}
          className="flex-1 clay-button gap-2"
        >
          <ArrowRight className="h-4 w-4" />
          Chưa nhớ / Bỏ qua
        </Button>
      </div>
    </div>
  );
}