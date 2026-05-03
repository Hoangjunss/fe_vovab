import { MainLayout } from '@/components/layout/main-layout'
import { VocabularyBrowser } from '@/components/vocab/VocabularyBrowser'
export default function VocabPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl"><div className="mb-8"><h1 className="text-3xl font-bold">Từ vựng</h1><p className="text-muted-foreground mt-1">Khám phá và học 10,000+ từ vựng TOEIC</p></div><VocabularyBrowser /></div>
    </MainLayout>
  )
}