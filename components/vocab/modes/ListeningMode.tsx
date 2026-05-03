'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2 } from 'lucide-react';

interface ListeningModeProps {
  word: string;
  meaning: string;
  onSubmit: (isCorrect: boolean) => void;
}

export function ListeningMode({ word, meaning, onSubmit }: ListeningModeProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };
  const options = [meaning, 'Tạm thời', 'Nhanh chóng', 'Chậm rãi'].sort(() => Math.random() - 0.5);
  
  const handleSelect = (opt: string) => {
    setSelected(opt);
    onSubmit(opt === meaning);
  };

  return (
    <div className="space-y-6">
      <Card className="text-center py-8">
        <Button size="lg" onClick={speak} className="active:scale-95 transition-transform">
          <Volume2 className="mr-2" /> Nghe từ
        </Button>
      </Card>
      <div className="space-y-3">
        {options.map((opt) => (
          <button
            key={opt}
            disabled={selected !== null}
            onClick={() => handleSelect(opt)}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all active:scale-95 ${
              selected === opt
                ? opt === meaning
                  ? 'border-green-500 bg-green-50'
                  : 'border-red-500 bg-red-50'
                : 'border-border hover:border-primary'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}