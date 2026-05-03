'use client';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';

export function ModeSelectionScreen({ setId }: { setId: string }) {
  const router = useRouter();
  const modes = [
    { name: 'flip', label: 'Lật thẻ', icon: '🔄' },
    { name: 'mcq', label: 'Trắc nghiệm', icon: '📖' },
    { name: 'typing', label: 'Gõ chính tả', icon: '⌨️' },
    { name: 'listening', label: 'Nghe - chọn', icon: '🔊' },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {modes.map((mode) => (
        <Card
          key={mode.name}
          className="cursor-pointer hover:shadow-lg transition active:scale-95"
          onClick={() => router.push(`/vocab/study/${setId}?mode=${mode.name}`)}
        >
          <CardContent className="pt-6 text-center">
            <div className="text-3xl mb-2">{mode.icon}</div>
            <h3 className="font-semibold capitalize">{mode.label}</h3>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}