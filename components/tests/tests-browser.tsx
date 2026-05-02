'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'

const MOCK_TESTS = [
  { id: 1, name: 'Full Length Practice Test 1', duration: 120, questions: 200, parts: ['Listening', 'Reading'], difficulty: 'Intermediate', attempts: 3, bestScore: 850 },
  { id: 2, name: 'Listening Part 1-2 Mini Test', duration: 30, questions: 32, parts: ['Listening'], difficulty: 'Beginner', attempts: 5, bestScore: 95 },
  { id: 3, name: 'Reading Comprehension Challenge', duration: 45, questions: 54, parts: ['Reading'], difficulty: 'Advanced', attempts: 2, bestScore: 112 },
  { id: 4, name: 'Mixed Skills Practice', duration: 60, questions: 100, parts: ['Listening', 'Reading'], difficulty: 'Intermediate', attempts: 4, bestScore: 780 },
]

export function TestsBrowser() {
  const [selectedTest, setSelectedTest] = useState<typeof MOCK_TESTS[0] | null>(null)

  if (selectedTest) {
    return <TestDetailView test={selectedTest} onBack={() => setSelectedTest(null)} />
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-4">
        <StatCard label="Tổng số đề" value="24" />
        <StatCard label="Đã hoàn thành" value="12" />
        <StatCard label="Điểm cao nhất" value="890" />
        <StatCard label="Điểm trung bình" value="765" />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Đề thi có sẵn</h3>
        <div className="grid gap-6 md:grid-cols-2">
          {MOCK_TESTS.map((test) => (
            <TestCard key={test.id} test={test} onClick={() => setSelectedTest(test)} />
          ))}
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="border-border/50 bg-white shadow-md text-center">
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        <p className="text-3xl font-bold text-foreground">{value}</p>
      </CardContent>
    </Card>
  )
}

function TestCard({ test, onClick }: { test: typeof MOCK_TESTS[0]; onClick: () => void }) {
  const difficultyColor = {
    Beginner: 'bg-green-100 text-green-700',
    Intermediate: 'bg-orange-100 text-orange-700',
    Advanced: 'bg-red-100 text-red-700',
  }[test.difficulty]

  return (
    <Card className="border-border/50 bg-white shadow-md hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer" onClick={onClick}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-base">{test.name}</CardTitle>
            <p className="text-xs text-muted-foreground mt-2">{test.parts.join(' • ')}</p>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${difficultyColor}`}>
            {test.difficulty}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="text-center">
            <p className="text-muted-foreground">Thời gian</p>
            <p className="font-semibold text-foreground">{test.duration}m</p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Câu hỏi</p>
            <p className="font-semibold text-foreground">{test.questions}</p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Điểm cao</p>
            <p className="font-semibold text-primary">{test.bestScore}</p>
          </div>
        </div>
        <Button className="w-full bg-primary text-white shadow-md hover:shadow-lg">Làm bài 🎯</Button>
      </CardContent>
    </Card>
  )
}

function TestDetailView({ test, onBack }: { test: typeof MOCK_TESTS[0]; onBack: () => void }) {
  const [testStarted, setTestStarted] = useState(false)

  if (testStarted) {
    return <TestTakingView test={test} onFinish={() => setTestStarted(false)} />
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={onBack} className="border-border/50 bg-white">← Quay lại danh sách</Button>
      <Card className="border-border/50 bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl">{test.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-4 rounded-lg bg-secondary/20"><p className="text-sm text-muted-foreground">Thời gian</p><p className="text-3xl font-bold">{test.duration} phút</p></div>
            <div className="p-4 rounded-lg bg-secondary/20"><p className="text-sm text-muted-foreground">Số câu hỏi</p><p className="text-3xl font-bold">{test.questions}</p></div>
            <div className="p-4 rounded-lg bg-secondary/20"><p className="text-sm text-muted-foreground">Điểm cao nhất</p><p className="text-3xl font-bold text-primary">{test.bestScore}</p></div>
            <div className="p-4 rounded-lg bg-secondary/20"><p className="text-sm text-muted-foreground">Số lần thi</p><p className="text-3xl font-bold">{test.attempts}</p></div>
          </div>
          <div><h4 className="font-semibold mb-3">Các phần thi:</h4>{test.parts.map(part => <div key={part} className="flex items-center gap-2 p-3 rounded-lg bg-secondary/20"><CheckCircle2 className="h-5 w-5 text-primary"/><span>{part}</span></div>)}</div>
          <Button onClick={() => setTestStarted(true)} className="w-full bg-primary text-white shadow-md hover:shadow-lg py-6 text-lg">Bắt đầu thi</Button>
        </CardContent>
      </Card>
    </div>
  )
}

function TestTakingView({ test, onFinish }: { test: typeof MOCK_TESTS[0]; onFinish: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [testFinished, setTestFinished] = useState(false)
  const questions = Array.from({ length: Math.min(test.questions, 5) }).map((_, i) => ({ id: i, text: `Câu ${i+1}: Từ "accommodate" có nghĩa là gì?`, options: ['Cung cấp chỗ ở', 'Không đồng ý', 'Vội vàng', 'Trì hoãn'], correct: 0 }))

  const handleAnswer = (idx: number) => setAnswers({ ...answers, [currentQuestion]: `${idx}` })
  const handleNext = () => currentQuestion < questions.length-1 ? setCurrentQuestion(currentQuestion+1) : setTestFinished(true)
  const handlePrev = () => currentQuestion > 0 && setCurrentQuestion(currentQuestion-1)

  if (testFinished) {
    const correct = Object.entries(answers).filter(([i, ans]) => parseInt(ans) === questions[parseInt(i)].correct).length
    return <TestResultsView test={test} correctAnswers={correct} totalQuestions={questions.length} onBack={onFinish} />
  }

  const q = questions[currentQuestion]
  return (
    <div className="space-y-6">
      <div className="flex justify-between"><div><h2 className="text-2xl font-bold">{test.name}</h2><p className="text-muted-foreground">Câu {currentQuestion+1}/{questions.length}</p></div><div className="text-right"><div className="text-2xl font-bold text-primary">10:45</div><p className="text-xs text-muted-foreground">Thời gian còn lại</p></div></div>
      <div className="w-full bg-border/50 rounded-full h-2"><div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${((currentQuestion+1)/questions.length)*100}%` }} /></div>
      <Card className="border-border/50 bg-white shadow-md"><CardContent className="pt-6 space-y-6"><p className="text-lg">{q.text}</p><div className="space-y-3">{q.options.map((opt, idx) => (<button key={idx} onClick={() => handleAnswer(idx)} className={`w-full p-4 rounded-lg border-2 text-left transition-all ${answers[currentQuestion] === `${idx}` ? 'border-primary bg-primary/10 shadow-md' : 'border-border/50 hover:border-primary/50'}`}><span className="font-medium">{String.fromCharCode(65+idx)}.</span> {opt}</button>))}</div></CardContent></Card>
      <div className="flex gap-4 justify-between"><Button variant="outline" onClick={handlePrev} disabled={currentQuestion===0}>Câu trước</Button><div className="text-sm text-muted-foreground">Đã trả lời: {Object.keys(answers).length}</div><Button onClick={handleNext} className="bg-primary text-white shadow-md">{currentQuestion === questions.length-1 ? 'Nộp bài' : 'Câu tiếp'}</Button></div>
    </div>
  )
}

function TestResultsView({ correctAnswers, totalQuestions, onBack }: { test: any; correctAnswers: number; totalQuestions: number; onBack: () => void }) {
  const percentage = Math.round((correctAnswers/totalQuestions)*100)
  const score = Math.round((correctAnswers/totalQuestions)*990)
  return (
    <div className="space-y-6">
      <Card className="border-primary/30 bg-white shadow-lg"><CardHeader className="text-center"><div className="text-6xl mb-4">{percentage>=80?'🎉':percentage>=60?'👍':'💪'}</div><h2 className="text-3xl font-bold mb-2">Hoàn thành bài thi!</h2></CardHeader><CardContent className="space-y-6"><div className="grid gap-6 md:grid-cols-3"><div className="text-center p-4 rounded-lg bg-secondary/20"><p className="text-sm text-muted-foreground mb-1">Điểm ước tính</p><p className="text-4xl font-bold text-primary">{score}</p></div><div className="text-center p-4 rounded-lg bg-secondary/20"><p className="text-sm text-muted-foreground mb-1">Số câu đúng</p><p className="text-4xl font-bold text-foreground">{correctAnswers}/{totalQuestions}</p></div><div className="text-center p-4 rounded-lg bg-secondary/20"><p className="text-sm text-muted-foreground mb-1">Tỉ lệ</p><p className="text-4xl font-bold text-foreground">{percentage}%</p></div></div><div className="space-y-3"><Button onClick={onBack} className="w-full bg-primary text-white shadow-md">Làm đề khác</Button><Button variant="outline" className="w-full border-border/50 bg-white">Xem lại đáp án</Button></div></CardContent></Card>
    </div>
  )
}