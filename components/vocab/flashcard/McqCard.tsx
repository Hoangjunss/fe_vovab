// components/vocab/flashcard/McqCard.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CheckCircle2, XCircle, Check } from 'lucide-react';

export type McqDirection = 'en-to-vi' | 'vi-to-en';

interface McqCardProps {
  word: string;
  meaning: string;
  exampleSentence?: string;
  options: string[];
  direction: McqDirection;
  question: string;
  correctAnswer: string;
  onSelect: (answer: string, isCorrect: boolean) => void;
}

export function McqCard({
  word,
  meaning,
  exampleSentence,
  options,
  direction,
  question,
  correctAnswer,
  onSelect,
}: McqCardProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleClick = (opt: string) => {
    if (isAnswered) return;
    const isCorrect = opt === correctAnswer;
    setSelected(opt);
    setIsAnswered(true);
    onSelect(opt, isCorrect);
  };

  const getOptionClass = (opt: string) => {
    if (!isAnswered) return 'border-border hover:border-primary';
    if (opt === correctAnswer) return 'border-green-500 bg-green-50';
    if (opt === selected && selected !== correctAnswer)
      return 'border-red-500 bg-red-50';
    return 'border-border opacity-70';
  };

  const renderDescription = (opt: string) => {
    if (!isAnswered) return null;
    const isCorrectOpt = opt === correctAnswer;
    if (isCorrectOpt) {
      return (
        <div className="ml-4 text-sm text-muted-foreground mt-1">
          <span className="font-medium text-green-700 flex items-center gap-1">
            <Check className="h-4 w-4" /> Đáp án đúng:
          </span>
          <div className="pl-5">
            <p><strong>{direction === 'en-to-vi' ? correctAnswer : word}</strong> – {direction === 'en-to-vi' ? meaning : correctAnswer}</p>
            {exampleSentence && <p className="italic text-xs mt-1">📖 Ví dụ: {exampleSentence}</p>}
          </div>
        </div>
      );
    } else {
      let displayText = direction === 'en-to-vi' ? `Nghĩa: ${opt}` : `Từ: ${opt}`;
      return (
        <div className="ml-4 text-sm text-muted-foreground mt-1">
          <XCircle className="inline h-3 w-3 mr-1 text-red-500" />
          {displayText}
        </div>
      );
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="text-3xl font-bold text-primary">{question}</div>
          <p className="text-sm text-muted-foreground">
            {direction === 'en-to-vi' ? 'Chọn nghĩa tiếng Việt đúng' : 'Chọn từ tiếng Anh đúng'}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {options.map((opt) => (
            <div key={opt}>
              <button
                disabled={isAnswered}
                onClick={() => handleClick(opt)}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${getOptionClass(opt)}`}
              >
                <div className="flex items-center gap-2">
                  {isAnswered && opt === correctAnswer && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                  {isAnswered && selected === opt && selected !== correctAnswer && <XCircle className="h-5 w-5 text-red-600" />}
                  <span>{opt}</span>
                </div>
              </button>
              {renderDescription(opt)}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}