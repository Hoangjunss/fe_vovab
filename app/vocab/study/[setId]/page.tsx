'use client';
import { useParams, useSearchParams } from 'next/navigation';
import { MainLayout } from '@/components/layout/main-layout';
import { FlipStudy } from '@/components/vocab/study/FlipStudy';
import { McqStudy } from '@/components/vocab/study/McqStudy';
import { TypingStudy } from '@/components/vocab/study/TypingStudy';
import { ListeningStudy } from '@/components/vocab/study/ListeningStudy';

export default function StudyPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const setId = params.setId as string;
  const mode = searchParams.get('mode') as 'flip' | 'mcq' | 'typing' | 'listening' | null;

  if (!setId) return <div>Loading...</div>;

  // Hiển thị component tương ứng với mode
  const renderStudy = () => {
    switch (mode) {
      case 'flip':
        return <FlipStudy setId={setId} />;
      case 'mcq':
        return <McqStudy setId={setId} />;
      case 'typing':
        return <TypingStudy setId={setId} />;
      case 'listening':
        return <ListeningStudy setId={setId} />;
      default:
        // Nếu không có mode, hiển thị màn hình chọn chế độ
        return <ModeSelectionScreen setId={setId} />;
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {renderStudy()}
      </div>
    </MainLayout>
  );
}