'use client';

import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { MainLayout } from '@/components/layout/main-layout';
import { FlipStudy } from '@/components/vocab/study/FlipStudy';
import { McqStudy } from '@/components/vocab/study/McqStudy';
import { TypingStudy } from '@/components/vocab/study/TypingStudy';
import { ListeningStudy } from '@/components/vocab/study/ListeningStudy';
import { ModeSwitcher } from '@/components/vocab/study/ModeSwitcher';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

export default function StudyPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const setId = params.setId as string;
  const mode = searchParams.get('mode') as 'flip' | 'mcq' | 'typing' | 'listening' | null;

  if (!setId) return <div>Loading...</div>;

  const renderStudy = () => {
    switch (mode) {
      case 'flip': return <FlipStudy setId={setId} />;
      case 'mcq': return <McqStudy setId={setId} />;
      case 'typing': return <TypingStudy setId={setId} />;
      case 'listening': return <ListeningStudy setId={setId} />;
      default: return null;
    }
  };

  // Nếu chưa chọn mode, hiển thị màn hình chọn mode
  if (!mode) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Chọn chế độ học</h1>
            <Button variant="outline" onClick={() => router.push('/vocab')} className="clay-button-outline">
              <RotateCcw className="mr-2 h-4 w-4" /> Quay lại
            </Button>
          </div>
          <ModeSwitcher setId={setId} currentMode={null} />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header với nút quay lại và mode switcher */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold capitalize">{mode}</h1>
          <Button variant="outline" onClick={() => router.push('/vocab')} className="clay-button-outline">
            <RotateCcw className="mr-2 h-4 w-4" /> Quay lại
          </Button>
        </div>
        <ModeSwitcher setId={setId} currentMode={mode} />
        <div className="mt-8">
          {renderStudy()}
        </div>
      </div>
    </MainLayout>
  );
}