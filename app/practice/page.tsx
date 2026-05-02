import { MainLayout } from '@/components/layout/main-layout'
import { PracticeModules } from '@/components/practice/PracticeModules'
export default function PracticePage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl"><div className="mb-8"><h1 className="text-3xl font-bold">Luyện tập</h1><p className="text-muted-foreground mt-1">Rèn luyện kỹ năng theo từng phần</p></div><PracticeModules /></div>
    </MainLayout>
  )
}