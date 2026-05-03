import { Card, CardContent } from '@/components/ui/card';

type StudyMode = 'flip' | 'mcq' | 'typing' | 'listening';

interface Props {
  onSelectMode: (mode: StudyMode) => void;
}

export function FlashcardModeSelector({ onSelectMode }: Props) {
  const modes: StudyMode[] = ['flip', 'mcq', 'typing', 'listening'];
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {modes.map((mode) => (
        <Card
          key={mode}
          className="cursor-pointer hover:shadow-lg transition active:scale-95"
          onClick={() => onSelectMode(mode)}
        >
          <CardContent className="pt-6 text-center">
            <div className="text-3xl mb-2">
              {mode === 'flip' && '🔄'}
              {mode === 'mcq' && '📖'}
              {mode === 'typing' && '⌨️'}
              {mode === 'listening' && '🔊'}
            </div>
            <h3 className="font-semibold capitalize">{mode === 'mcq' ? 'Trắc nghiệm' : mode}</h3>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}