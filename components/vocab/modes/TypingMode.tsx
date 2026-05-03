'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface TypingModeProps {
  meaning: string;
  exampleSentence?: string;
  answer: string;
  setAnswer: (value: string) => void;
  onSubmit: () => void;
}

export function TypingMode({ meaning, exampleSentence, answer, setAnswer, onSubmit }: TypingModeProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="text-lg text-foreground/60">Nghĩa:</div>
          <div className="text-3xl font-bold">{meaning}</div>
        </CardHeader>
        <CardContent>
          <Input
            autoFocus
            placeholder="Gõ từ tiếng Anh..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSubmit()}
          />
          {exampleSentence && (
            <p className="text-sm text-muted-foreground mt-2">Ví dụ: {exampleSentence}</p>
          )}
        </CardContent>
      </Card>
      <Button className="w-full active:scale-95 transition-transform" onClick={onSubmit} disabled={!answer}>
        Kiểm tra
      </Button>
    </div>
  );
}