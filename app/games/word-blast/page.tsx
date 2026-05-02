import { MainLayout } from '@/components/layout/main-layout'
import { WordBlastGame } from '@/components/games/word-blast'

export default function GamePage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 max-w-2xl">
        <WordBlastGame />
      </div>
    </MainLayout>
  )
}
