'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { ListeningModeSelector } from '@/components/listening/ListeningModeSelector';
import { ListeningCheck } from '@/components/listening/ListeningCheck';
import { ListeningDictation } from '@/components/listening/ListeningDictation';
import { ListeningFullTest } from '@/components/listening/ListeningFullTest';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ListeningMode = 'check' | 'dictation' | 'full' | null;

export default function ListeningPage() {
  const [mode, setMode] = useState<ListeningMode>(null);

  const renderContent = () => {
    switch (mode) {
      case 'check': return <ListeningCheck />;
      case 'dictation': return <ListeningDictation />;
      case 'full': return <ListeningFullTest />;
      default: return <ListeningModeSelector onSelectMode={setMode} />;
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {mode && (
          <Button variant="ghost" onClick={() => setMode(null)} className="mb-4 -ml-2">
            <ArrowLeft className="h-4 w-4 mr-1" /> Quay lại
          </Button>
        )}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Luyện nghe TOEIC</h1>
          <p className="text-muted-foreground">Rèn luyện kỹ năng nghe qua các dạng bài chuẩn TOEIC</p>
        </div>
        {renderContent()}
      </div>
    </MainLayout>
  );
}