'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface McqModeProps {
  word: string;
  options: string[];
  selected: string | null;
  onSelect: (answer: string) => void;
}

export function McqMode({ word, options, selected, onSelect }: McqModeProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="text-3xl font-bold">{word}</div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {options.map((opt) => (
              <button
                key={opt}
                disabled={selected !== null}
                onClick={() => onSelect(opt)}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all active:scale-95 ${
                  selected === opt
                    ? opt === word
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : 'border-border hover:border-primary'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}