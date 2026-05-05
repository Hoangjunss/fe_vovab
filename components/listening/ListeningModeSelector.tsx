'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Headphones, FileText, Video, Mic } from 'lucide-react';

type ListeningMode = 'check' | 'dictation' | 'full';

interface Props {
  onSelectMode: (mode: ListeningMode) => void;
}

export function ListeningModeSelector({ onSelectMode }: Props) {
  const [selected, setSelected] = useState<ListeningMode | null>(null);

  const modes = [
    { id: 'check' as const, label: 'Nghe check', icon: Headphones, desc: 'Nghe câu hỏi và chọn đáp án' },
    { id: 'dictation' as const, label: 'Nghe chép', icon: FileText, desc: 'Nghe và gõ lại chính xác' },
    { id: 'full' as const, label: 'Nghe full', icon: Video, desc: 'Thi thử TOEIC Listening' },
  ];

  const handleSelect = (mode: ListeningMode) => {
    setSelected(mode);
    onSelectMode(mode);
  };

  if (selected) {
    return (
      <div className="text-center">
        <Button variant="ghost" onClick={() => setSelected(null)} className="mb-4">
          ← Chọn chế độ khác
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {modes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => handleSelect(mode.id)}
          className="p-6 rounded-xl border-2 border-border text-left hover:border-primary transition-all hover:shadow-md"
        >
          <mode.icon className="h-8 w-8 text-primary mb-3" />
          <h3 className="font-bold text-lg">{mode.label}</h3>
          <p className="text-sm text-muted-foreground mt-1">{mode.desc}</p>
        </button>
      ))}
    </div>
  );
}