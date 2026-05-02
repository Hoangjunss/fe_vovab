'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'
import { TestTakingView } from './TestTakingView'
export function TestDetailView({ test, onBack }: { test: any; onBack: () => void }) {
  const [started, setStarted] = useState(false)
  if (started) return <TestTakingView test={test} onFinish={() => setStarted(false)} />
  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={onBack} className="border-border/50 bg-white">← Quay lại</Button>
      <Card className="border-border/50 bg-white shadow-md"><CardHeader><CardTitle className="text-2xl">{test.name}</CardTitle></CardHeader><CardContent className="space-y-6"><div className="grid gap-6 md:grid-cols-2"><div className="p-4 rounded-lg bg-secondary/20"><p className="text-sm text-muted-foreground">Thời gian</p><p className="text-3xl font-bold">{test.duration} phút</p></div><div className="p-4 rounded-lg bg-secondary/20"><p className="text-sm text-muted-foreground">Số câu hỏi</p><p className="text-3xl font-bold">{test.questions}</p></div><div className="p-4 rounded-lg bg-secondary/20"><p className="text-sm text-muted-foreground">Điểm cao nhất</p><p className="text-3xl font-bold text-primary">{test.bestScore}</p></div><div className="p-4 rounded-lg bg-secondary/20"><p className="text-sm text-muted-foreground">Số lần thi</p><p className="text-3xl font-bold">{test.attempts}</p></div></div><div><h4 className="font-semibold mb-3">Các phần thi:</h4>{test.parts.map((part: string) => <div key={part} className="flex items-center gap-2 p-3 rounded-lg bg-secondary/20"><CheckCircle2 className="h-5 w-5 text-primary"/><span>{part}</span></div>)}</div><Button onClick={() => setStarted(true)} className="w-full bg-primary text-white shadow-md hover:shadow-lg py-6 text-lg">Bắt đầu thi</Button></CardContent></Card>
    </div>
  )
}