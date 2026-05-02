import { MainLayout } from '@/components/layout/main-layout'
import { ArenaPageContent } from '@/components/arena/ArenaPageContent'
import { Swords } from 'lucide-react'
export default function ArenaPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-6xl"><div className="mb-8"><h1 className="text-3xl font-bold flex items-center gap-2"><Swords className="h-8 w-8 text-primary" />Đấu trường</h1><p className="text-muted-foreground mt-1">Thi đấu trực tiếp với người chơi khác</p></div><ArenaPageContent /></div>
    </MainLayout>
  )
}