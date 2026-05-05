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
    <div className="space-y-5">
      <Card className="text-center py-3 sm:py-5 shadow-sm">
        <Button 
          size="default" 
          onClick={speak} 
          className="active:scale-95 transition-transform text-sm sm:text-base px-4 sm:px-5 h-10 sm:h-11"
        >
          <Volume2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Nghe từ
        </Button>
      </Card>
      
      {/* Grid: mobile 3 cột, desktop 4 cột */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
        {options.map((opt) => (
          <button
            key={opt}
            disabled={selected !== null}
            onClick={() => handleSelect(opt)}
            className={`p-2 sm:p-3 rounded-lg border-2 text-center transition-all active:scale-95 text-sm sm:text-base ${
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