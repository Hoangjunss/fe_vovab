import { MainLayout } from '@/components/layout/main-layout'
import { TestsBrowser } from '@/components/tests/tests-browser'

export default function TestsPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Mock Tests</h1>
          <p className="text-foreground/60">Practice with full-length and mini tests to prepare for TOEIC</p>
        </div>

        <TestsBrowser />
      </div>
    </MainLayout>
  )
}
