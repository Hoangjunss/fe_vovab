'use client';
import { useParams } from 'next/navigation';
import { MainLayout } from '@/components/layout/main-layout';
import { FlashcardStudy } from '@/components/vocab/flashcard/flashcard-study';

export default function StudyPage() {
  const params = useParams();
  const setId = params.setId as string;
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <FlashcardStudy setId={setId} />
      </div>
    </MainLayout>
  );
}