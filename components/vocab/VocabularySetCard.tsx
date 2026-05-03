import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
export function VocabularySetCard({ set, onClick }: { set: any; onClick?: () => void }) {
  const difficultyColor: Record<string, string> = { Beginner: 'bg-green-100 text-green-700', Intermediate: 'bg-orange-100 text-orange-700', Advanced: 'bg-red-100 text-red-700' }
  return (
    <Card className="border-border/50 bg-white shadow-md hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer overflow-hidden group" onClick={onClick}>
      <CardHeader className="pb-3"><CardTitle className="text-lg">{set.name}</CardTitle><CardDescription className="mt-1">{set.description}</CardDescription></CardHeader>
      <CardContent className="space-y-4"><div className="flex items-center justify-between"><div><p className="text-xs text-muted-foreground">Số từ</p><p className="text-xl font-bold text-foreground">{set.words}</p></div><span className={`px-2 py-1 rounded-full text-xs font-semibold ${difficultyColor[set.difficulty]}`}>{set.difficulty}</span></div><Button className="w-full bg-primary text-white shadow-md hover:shadow-lg group-hover:scale-105 transition">Học ngay 🚀</Button></CardContent>
    </Card>
  )
}