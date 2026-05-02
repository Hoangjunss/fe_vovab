import { MainLayout } from '@/components/layout/main-layout'
import { TestsBrowser } from '@/components/tests/TestsBrowser'
export default function TestsPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl"><div className="mb-8"><h1 className="text-3xl font-bold">Luyện đề</h1><p className="text-muted-foreground mt-1">Làm quen với cấu trúc đề thi thật</p></div><TestsBrowser /></div>
    </MainLayout>
  )
}