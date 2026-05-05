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
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">Chọn chế độ học</h1>
            <Button variant="outline" onClick={() => router.push('/vocab')} className="clay-button-outline h-8 px-3">
              <RotateCcw className="mr-1 h-3 w-3" /> Quay lại
            </Button>
          </div>
          <ModeSwitcher setId={setId} currentMode={null} />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          
          <Button variant="outline" onClick={() => router.push('/vocab')} className="clay-button-outline h-8 px-3">
            <RotateCcw className="mr-1 h-3 w-3" /> Quay lại
          </Button>
        </div>
        <ModeSwitcher setId={setId} currentMode={mode} />
        <div className="mt-6">{renderStudy()}</div>
      </div>
    </MainLayout>
  );
}