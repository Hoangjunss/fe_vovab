'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { TestResultsView } from './TestResultsView'

export function TestTakingView({ test, onFinish }: { test: any; onFinish: () => void }) {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [finished, setFinished] = useState(false)
  const questions = Array.from({ length: Math.min(test.questions, 5) }).map((_, i) => ({ id: i, text: `Câu ${i+1}: Từ "accommodate" có nghĩa là gì?`, options: ['Cung cấp chỗ ở', 'Không đồng ý', 'Vội vàng', 'Trì hoãn'], correct: 0 }))
  const handleAnswer = (idx: number) => setAnswers({ ...answers, [current]: `${idx}` })
  const handleNext = () => current < questions.length-1 ? setCurrent(current+1) : setFinished(true)
  const handlePrev = () => current > 0 && setCurrent(current-1)
  if (finished) {
    const correct = Object.entries(answers).filter(([i, ans]) => parseInt(ans) === questions[parseInt(i)].correct).length
    return <TestResultsView test={test} correctAnswers={correct} totalQuestions={questions.length} onBack={onFinish} />
  }
  const q = questions[current]
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center"><div><h2 className="text-2xl font-bold">{test.name}</h2><p className="text-muted-foreground">Câu {current+1}/{questions.length}</p></div><div className="text-right"><div className="text-2xl font-bold text-primary">10:45</div><p className="text-xs text-muted-foreground">Thời gian</p></div></div>
      <div className="w-full bg-border/50 rounded-full h-2"><div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${((current+1)/questions.length)*100}%` }} /></div>
      <Card className="border-border/50 bg-white shadow-md"><CardContent className="pt-6 space-y-6"><p className="text-lg">{q.text}</p><div className="space-y-3">{q.options.map((opt, idx) => (<button key={idx} onClick={() => handleAnswer(idx)} className={`w-full p-4 rounded-lg border-2 text-left transition-all ${answers[current] === `${idx}` ? 'border-primary bg-primary/10 shadow-md' : 'border-border/50 hover:border-primary/50'}`}><span className="font-medium">{String.fromCharCode(65+idx)}.</span> {opt}</button>))}</div></CardContent></Card>
      <div className="flex gap-4 justify-between"><Button variant="outline" onClick={handlePrev} disabled={current===0}>Câu trước</Button><div className="text-sm text-muted-foreground">Đã trả lời: {Object.keys(answers).length}</div><Button onClick={handleNext} className="bg-primary text-white shadow-md">{current === questions.length-1 ? 'Nộp bài' : 'Câu tiếp'}</Button></div>
    </div>
  )
}