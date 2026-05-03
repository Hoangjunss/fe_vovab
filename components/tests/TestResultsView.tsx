import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
export function TestResultsView({ test, correctAnswers, totalQuestions, onBack }: { test: any; correctAnswers: number; totalQuestions: number; onBack: () => void }) {
  const percentage = Math.round((correctAnswers/totalQuestions)*100)
  const score = Math.round((correctAnswers/totalQuestions)*990)
  return (
    <div className="space-y-6">
      <Card className="border-primary/30 bg-white shadow-lg"><CardHeader className="text-center"><div className="text-6xl mb-4">{percentage>=80?'🎉':percentage>=60?'👍':'💪'}</div><h2 className="text-3xl font-bold mb-2">Hoàn thành bài thi!</h2></CardHeader><CardContent className="space-y-6"><div className="grid gap-6 md:grid-cols-3"><div className="text-center p-4 rounded-lg bg-secondary/20"><p className="text-sm text-muted-foreground mb-1">Điểm ước tính</p><p className="text-4xl font-bold text-primary">{score}</p></div><div className="text-center p-4 rounded-lg bg-secondary/20"><p className="text-sm text-muted-foreground mb-1">Số câu đúng</p><p className="text-4xl font-bold text-foreground">{correctAnswers}/{totalQuestions}</p></div><div className="text-center p-4 rounded-lg bg-secondary/20"><p className="text-sm text-muted-foreground mb-1">Tỉ lệ</p><p className="text-4xl font-bold text-foreground">{percentage}%</p></div></div><div className="space-y-3"><Button onClick={onBack} className="w-full bg-primary text-white shadow-md">Làm đề khác</Button><Button variant="outline" className="w-full border-border/50 bg-white">Xem lại đáp án</Button></div></CardContent></Card>
    </div>
  )
}