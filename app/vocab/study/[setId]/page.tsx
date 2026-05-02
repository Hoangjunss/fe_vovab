import { MainLayout } from '@/components/layout/main-layout'
import { FlashcardStudy } from '@/components/vocab/flashcard-study'

export default function StudyPage({ params }: { params: { setId: string } }) {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 max-w-4xl">
        <FlashcardStudy setId={params.setId} />
      </div>
    </MainLayout>
  )
}
