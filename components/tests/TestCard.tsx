import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
export function TestCard({ test, onClick }: { test: any; onClick: () => void }) {
  const difficultyColor: Record<string, string> = { Beginner: 'bg-green-100 text-green-700', Intermediate: 'bg-orange-100 text-orange-700', Advanced: 'bg-red-100 text-red-700' }
  return (
    <Card className="border-border/50 bg-white shadow-md hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer" onClick={onClick}>
      <CardHeader><div className="flex items-start justify-between"><div className="flex-1"><CardTitle className="text-base">{test.name}</CardTitle><p className="text-xs text-muted-foreground mt-2">{test.parts.join(' • ')}</p></div><span className={`px-2 py-1 rounded-full text-xs font-semibold ${difficultyColor[test.difficulty]}`}>{test.difficulty}</span></div></CardHeader>
      <CardContent className="space-y-3"><div className="grid grid-cols-3 gap-2 text-sm"><div className="text-center"><p className="text-muted-foreground">Thời gian</p><p className="font-semibold">{test.duration}m</p></div><div className="text-center"><p className="text-muted-foreground">Câu hỏi</p><p className="font-semibold">{test.questions}</p></div><div className="text-center"><p className="text-muted-foreground">Điểm cao</p><p className="font-semibold text-primary">{test.bestScore}</p></div></div><Button className="w-full bg-primary text-white shadow-md hover:shadow-lg">Làm bài 🎯</Button></CardContent>
    </Card>
  )
}