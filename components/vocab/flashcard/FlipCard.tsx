import { Button } from '@/components/ui/button';

interface Props {
  word: string;
  meaning: string;
  exampleSentence?: string;
  isFlipped: boolean;
  onFlip: () => void;
  onNext: () => void;
}

export function FlipCard({ word, meaning, exampleSentence, isFlipped, onFlip, onNext }: Props) {
  return (
    <div className="space-y-6">
      <div className="h-64 w-full [perspective:1000px] cursor-pointer" onClick={onFlip}>
        <div
          className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${
            isFlipped ? '[transform:rotateY(180deg)]' : ''
          }`}
        >
          {/* Mặt trước */}
          <div className="absolute inset-0 [backface-visibility:hidden] bg-gradient-to-br from-primary/10 to-transparent rounded-xl flex items-center justify-center shadow-md">
            <div className="text-center">
              <div className="text-sm text-foreground/60 mb-4">Từ</div>
              <div className="text-4xl font-bold">{word}</div>
            </div>
          </div>
          {/* Mặt sau */}
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-secondary/20 to-background rounded-xl flex items-center justify-center shadow-md">
            <div className="text-center">
              <div className="text-sm text-foreground/60 mb-4">Nghĩa</div>
              <div className="text-4xl font-bold">{meaning}</div>
              {exampleSentence && <p className="text-sm text-muted-foreground mt-4 italic">{exampleSentence}</p>}
            </div>
          </div>
        </div>
      </div>
      <Button className="w-full active:scale-95 transition-transform" onClick={onNext}>
        Tiếp theo
      </Button>
    </div>
  );
}