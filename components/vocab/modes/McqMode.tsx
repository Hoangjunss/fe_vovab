'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Volume2 } from 'lucide-react';

export type McqDirection = 'en-to-vi' | 'vi-to-en';

export interface McqOption {
  value: string;
  word: string;
  meaning: string;
  phonetic?: string;
  exampleSentence?: string;
}

interface McqModeProps {
  direction: McqDirection;
  question: string;
  options: McqOption[];
  correctOptionValue: string;
  onAnswer: (selectedValue: string, isCorrect: boolean) => void;
  onContinue: () => void;
}

export function McqMode({
  direction,
  question,
  options,
  correctOptionValue,
  onAnswer,
  onContinue,
}: McqModeProps) {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    setSelectedValue(null);
    setIsAnswered(false);
  }, [question]);

  const handleSelect = (val: string) => {
    if (isAnswered) return;
    const isCorrect = val === correctOptionValue;
    setSelectedValue(val);
    setIsAnswered(true);
    onAnswer(val, isCorrect);
  };

  const isCorrectSelected = isAnswered && selectedValue === correctOptionValue;
  const getOptionClass = (optValue: string) => {
    if (!isAnswered) return 'border-border hover:border-primary';
    if (optValue === correctOptionValue) return 'border-green-500 bg-green-50';
    if (optValue === selectedValue && selectedValue !== correctOptionValue)
      return 'border-red-500 bg-red-50';
    return 'border-border opacity-70';
  };

  const speak = (word: string) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const selectedOption = isAnswered && selectedValue
    ? options.find(opt => opt.value === selectedValue)
    : null;

  const otherOptions = isAnswered && selectedValue
    ? options.filter(opt => opt.value !== selectedValue)
    : [];

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
          {options.map((opt, idx) => (
            <button
              key={`${opt.value}-${idx}`}
              disabled={isAnswered}
              onClick={() => handleSelect(opt.value)}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all active:scale-95 ${getOptionClass(opt.value)}`}
            >
              <div className="flex items-center gap-2">
                {isAnswered && opt.value === correctOptionValue && (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                )}
                {isAnswered && selectedValue === opt.value && selectedValue !== correctOptionValue && (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
                <span>{opt.value}</span>
              </div>
            </button>
          ))}
        </CardContent>
      </Card>

      {isAnswered && selectedOption && (
        <div className="space-y-4">
          {/* Đáp án đã chọn (lớn, nổi bật) */}
          <div className={`p-5 rounded-xl border-2 shadow-md ${
            isCorrectSelected
              ? 'border-green-400 bg-green-50'
              : 'border-red-400 bg-red-50'
          }`}>
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                {isCorrectSelected ? (
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-600" />
                )}
                <span className="font-bold text-lg">
                  {isCorrectSelected ? '✅ Bạn đã chọn đúng!' : '❌ Bạn đã chọn sai.'}
                </span>
              </div>
              {/* Luôn hiển thị nút nghe cho đáp án đã chọn */}
              <Button variant="ghost" size="sm" onClick={() => speak(selectedOption.word)}>
                <Volume2 className="h-4 w-4 mr-1" /> Nghe
              </Button>
            </div>
            <div className="mt-3 text-base space-y-1">
              <div><strong>Từ:</strong> {selectedOption.word} {selectedOption.phonetic && <span className="text-muted-foreground">/{selectedOption.phonetic}/</span>}</div>
              <div><strong>Nghĩa:</strong> {selectedOption.meaning}</div>
              {selectedOption.exampleSentence && (
                <div><strong>Ví dụ:</strong> <span className="italic">{selectedOption.exampleSentence}</span></div>
              )}
            </div>
          </div>

          {/* Các đáp án còn lại - cùng kiểu dáng nhưng kích thước nhỏ hơn, có đầy đủ thông tin và nút nghe */}
          {otherOptions.length > 0 && (
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
              {otherOptions.map((opt, idx) => (
                <div key={`${opt.value}-${idx}`} className="p-3 rounded-lg border border-border bg-white/50 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div className="font-semibold text-base">{opt.word}</div>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => speak(opt.word)}>
                      <Volume2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  {opt.phonetic && (
                    <div className="text-xs text-muted-foreground mt-0.5">/{opt.phonetic}/</div>
                  )}
                  <div className="text-base mt-1">{opt.meaning}</div>
                  {opt.exampleSentence && (
                    <div className="text-xs italic text-muted-foreground mt-1 line-clamp-2">{opt.exampleSentence}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {isAnswered && (
        <Button onClick={onContinue} className="w-full bg-primary text-white shadow-md">
          Tiếp tục →
        </Button>
      )}
    </div>
  );
}