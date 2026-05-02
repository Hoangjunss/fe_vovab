'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart3, Clock, CheckCircle2, XCircle } from 'lucide-react'

const MOCK_TESTS = [
  {
    id: 1,
    name: 'Full Length Practice Test 1',
    duration: 120,
    questions: 200,
    parts: ['Listening', 'Reading'],
    difficulty: 'Intermediate',
    attempts: 3,
    bestScore: 850,
  },
  {
    id: 2,
    name: 'Listening Part 1-2 Mini Test',
    duration: 30,
    questions: 32,
    parts: ['Listening'],
    difficulty: 'Beginner',
    attempts: 5,
    bestScore: 95,
  },
  {
    id: 3,
    name: 'Reading Comprehension Challenge',
    duration: 45,
    questions: 54,
    parts: ['Reading'],
    difficulty: 'Advanced',
    attempts: 2,
    bestScore: 112,
  },
  {
    id: 4,
    name: 'Mixed Skills Practice',
    duration: 60,
    questions: 100,
    parts: ['Listening', 'Reading'],
    difficulty: 'Intermediate',
    attempts: 4,
    bestScore: 780,
  },
]

export function TestsBrowser() {
  const [selectedTest, setSelectedTest] = useState<typeof MOCK_TESTS[0] | null>(null)

  if (selectedTest) {
    return <TestDetailView test={selectedTest} onBack={() => setSelectedTest(null)} />
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Total Tests" value="24" />
        <StatCard label="Completed" value="12" />
        <StatCard label="Best Score" value="890" />
        <StatCard label="Avg Score" value="765" />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Available Tests</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {MOCK_TESTS.map((test) => (
            <TestCard
              key={test.id}
              test={test}
              onClick={() => setSelectedTest(test)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="border-border">
      <CardContent className="pt-6 text-center">
        <p className="text-sm text-foreground/60 mb-1">{label}</p>
        <p className="text-3xl font-bold text-foreground">{value}</p>
      </CardContent>
    </Card>
  )
}

function TestCard({
  test,
  onClick,
}: {
  test: typeof MOCK_TESTS[0]
  onClick: () => void
}) {
  const difficultyColor = {
    'Beginner': 'bg-green-50 text-green-700',
    'Intermediate': 'bg-blue-50 text-blue-700',
    'Advanced': 'bg-red-50 text-red-700',
  } as const

  return (
    <Card className="border-border hover:border-primary transition-colors cursor-pointer" onClick={onClick}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-base">{test.name}</CardTitle>
            <p className="text-xs text-foreground/60 mt-2">{test.parts.join(' • ')}</p>
          </div>
          <span className={`px-2 py-1 rounded text-xs font-semibold ${difficultyColor[test.difficulty]}`}>
            {test.difficulty}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="text-center">
            <p className="text-foreground/60">Duration</p>
            <p className="font-semibold text-foreground">{test.duration}m</p>
          </div>
          <div className="text-center">
            <p className="text-foreground/60">Questions</p>
            <p className="font-semibold text-foreground">{test.questions}</p>
          </div>
          <div className="text-center">
            <p className="text-foreground/60">Best</p>
            <p className="font-semibold text-primary">{test.bestScore}</p>
          </div>
        </div>
        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
          Start Test
        </Button>
      </CardContent>
    </Card>
  )
}

function TestDetailView({
  test,
  onBack,
}: {
  test: typeof MOCK_TESTS[0]
  onBack: () => void
}) {
  const [testStarted, setTestStarted] = useState(false)

  if (testStarted) {
    return <TestTakingView test={test} onFinish={() => setTestStarted(false)} />
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={onBack}>
        ← Back to Tests
      </Button>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-2xl">{test.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded-lg bg-secondary">
              <p className="text-sm text-foreground/60 mb-1">Duration</p>
              <p className="text-3xl font-bold text-foreground">{test.duration} minutes</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary">
              <p className="text-sm text-foreground/60 mb-1">Questions</p>
              <p className="text-3xl font-bold text-foreground">{test.questions}</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary">
              <p className="text-sm text-foreground/60 mb-1">Best Attempt</p>
              <p className="text-3xl font-bold text-primary">{test.bestScore}</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary">
              <p className="text-sm text-foreground/60 mb-1">Attempts</p>
              <p className="text-3xl font-bold text-foreground">{test.attempts}</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3">Test Sections:</h4>
            <div className="space-y-2">
              {test.parts.map((part) => (
                <div key={part} className="flex items-center gap-2 p-3 rounded-lg bg-secondary">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-foreground">{part}</span>
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={() => setTestStarted(true)}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg"
          >
            Start Test
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function TestTakingView({
  test,
  onFinish,
}: {
  test: typeof MOCK_TESTS[0]
  onFinish: () => void
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [testFinished, setTestFinished] = useState(false)

  const questions = Array.from({ length: Math.min(test.questions, 5) }).map((_, i) => ({
    id: i,
    text: `Question ${i + 1}: What is the meaning of the word "accommodate"?`,
    options: ['To provide housing', 'To disagree', 'To rush', 'To delay'],
    correct: 0,
  }))

  const handleAnswer = (optionIndex: number) => {
    setAnswers({ ...answers, [currentQuestion]: `${optionIndex}` })
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setTestFinished(true)
    }
  }

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  if (testFinished) {
    const correctAnswers = Object.entries(answers).filter(
      ([idx, ans]) => parseInt(ans) === questions[parseInt(idx)].correct
    ).length

    return (
      <TestResultsView
        test={test}
        correctAnswers={correctAnswers}
        totalQuestions={questions.length}
        onBack={onFinish}
      />
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{test.name}</h2>
          <p className="text-sm text-foreground/60 mt-1">Question {currentQuestion + 1} of {questions.length}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">10:45</div>
          <p className="text-xs text-foreground/60">Time Left</p>
        </div>
      </div>

      {/* Progress */}
      <div className="w-full bg-border rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question */}
      <Card className="border-border">
        <CardContent className="pt-6 space-y-6">
          <p className="text-lg text-foreground">{question.text}</p>

          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={`w-full p-4 rounded-lg border-2 text-left transition-colors ${
                  answers[currentQuestion] === `${idx}`
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border hover:border-primary'
                }`}
              >
                <span className="font-medium">{String.fromCharCode(65 + idx)}.</span> {option}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex gap-4 justify-between">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>
        <div className="text-sm text-foreground/60 self-center">
          {Object.keys(answers).length} answered
        </div>
        <Button
          onClick={handleNext}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>
  )
}

function TestResultsView({
  test,
  correctAnswers,
  totalQuestions,
  onBack,
}: {
  test: typeof MOCK_TESTS[0]
  correctAnswers: number
  totalQuestions: number
  onBack: () => void
}) {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100)
  const score = Math.round((correctAnswers / totalQuestions) * 990)

  return (
    <div className="space-y-6">
      <Card className="border-primary bg-primary/5">
        <CardHeader className="text-center">
          <div className="text-6xl mb-4">
            {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '💪'}
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Test Completed!</h2>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 rounded-lg bg-secondary">
              <p className="text-sm text-foreground/60 mb-1">Estimated Score</p>
              <p className="text-4xl font-bold text-primary">{score}</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-secondary">
              <p className="text-sm text-foreground/60 mb-1">Correct Answers</p>
              <p className="text-4xl font-bold text-foreground">{correctAnswers}/{totalQuestions}</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-secondary">
              <p className="text-sm text-foreground/60 mb-1">Percentage</p>
              <p className="text-4xl font-bold text-foreground">{percentage}%</p>
            </div>
          </div>

          <div className="space-y-3">
            <Button onClick={onBack} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Take Another Test
            </Button>
            <Button variant="outline" className="w-full">
              Review Answers
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
