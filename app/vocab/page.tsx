import { MainLayout } from '@/components/layout/main-layout'
import { VocabularyBrowser } from '@/components/vocab/vocabulary-browser'

export default function VocabPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Vocabulary</h1>
          <p className="text-foreground/60">Master TOEIC vocabulary with our curated sets and games</p>
        </div>

        <VocabularyBrowser />
      </div>
    </MainLayout>
  )
}
