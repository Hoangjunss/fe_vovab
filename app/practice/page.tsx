import { MainLayout } from '@/components/layout/main-layout'
import { PracticeModules } from '@/components/practice/practice-modules'

export default function PracticePage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Practice</h1>
          <p className="text-foreground/60">Master each skill with targeted practice modules</p>
        </div>

        <PracticeModules />
      </div>
    </MainLayout>
  )
}
