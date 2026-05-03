'use client';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';

export function ModeSelectionScreen({ setId }: { setId: string }) {
  const router = useRouter();
  const modes = [
    { name: 'flip', label: 'Lật thẻ', icon: '🔄', desc: 'Học qua thẻ lật' },
    { name: 'mcq', label: 'Trắc nghiệm', icon: '📖', desc: 'Chọn đáp án đúng' },
    { name: 'typing', label: 'Gõ chính tả', icon: '⌨️', desc: 'Gõ từ tiếng Anh' },
    { name: 'listening', label: 'Nghe - chọn', icon: '🔊', desc: 'Nghe và chọn nghĩa' },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {modes.map((mode) => (
        <Card
          key={mode.name}
          className="cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 clay-card"
          onClick={() => router.push(`/vocab/study/${setId}?mode=${mode.name}`)}
        >
          <CardContent className="pt-8 pb-6 text-center">
            <div className="text-5xl mb-4">{mode.icon}</div>
            <h3 className="text-xl font-bold mb-2">{mode.label}</h3>
            <p className="text-sm text-muted-foreground">{mode.desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}