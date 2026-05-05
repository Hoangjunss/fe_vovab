'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { FlipHorizontal, HelpCircle, Keyboard, Headphones } from 'lucide-react';

interface ModeSwitcherProps {
  setId: string;
  currentMode: 'flip' | 'mcq' | 'typing' | 'listening' | null;
}

const modes = [
  { id: 'flip', label: 'Lật thẻ', icon: FlipHorizontal },
  { id: 'mcq', label: 'Trắc nghiệm', icon: HelpCircle },
  { id: 'typing', label: 'Gõ chính tả', icon: Keyboard },
  { id: 'listening', label: 'Nghe', icon: Headphones },
];

export function ModeSwitcher({ setId, currentMode }: ModeSwitcherProps) {
  const router = useRouter();

  const switchMode = (modeId: string) => {
    if (modeId === currentMode) return;
    router.push(`/vocab/study/${setId}?mode=${modeId}`);
  };

  return (
    <div className="flex flex-nowrap justify-center gap-1 sm:gap-2 overflow-x-auto pb-1 sm:pb-0">
      {modes.map((mode) => {
        const Icon = mode.icon;
        const isActive = currentMode === mode.id;
        return (
          <Button
            key={mode.id}
            onClick={() => switchMode(mode.id)}
            size="sm"
            className={`
              transition-all duration-200 rounded-full px-2 sm:px-3 py-1 text-[11px] sm:text-sm font-medium h-auto whitespace-nowrap
              ${isActive 
                ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-sm' 
                : 'clay-button-outline bg-white/70 hover:bg-white/90'
              }
            `}
          >
            <Icon className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 mr-0.5 sm:mr-1.5" />
            <span>{mode.label}</span>
          </Button>
        );
      })}
    </div>
  );
}