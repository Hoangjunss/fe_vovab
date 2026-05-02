'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronLeft, ChevronRight, Volume2, RotateCcw } from 'lucide-react'

const FLASHCARDS = [
  { id: 1, english: 'Accommodate', vietnamese: 'Phục vụ, cung cấp chỗ ở', example: 'The hotel can accommodate 500 guests.' },
  { id: 2, english: 'Meticulous', vietnamese: 'Cẩn thận, chu đáo', example: 'Her meticulous attention to detail is impressive.' },
  { id: 3, english: 'Ubiquitous', vietnamese: 'Có mặt ở khắp nơi', example: 'Smartphones are ubiquitous in modern society.' },
  { id: 4, english: 'Alleviate', vietnamese: 'Giảm nhẹ, làm dễ bớt', example: 'This medicine will alleviate your symptoms.' },
  { id: 5, english: 'Ephemeral', vietnamese: 'Tạm thời, ngoài nhất thời', example: 'Fashion trends are often ephemeral.' },
]

type StudyMode = 'flip' | 'mcq' | 'typing' | 'listening'

export function FlashcardStudy({ setId }: { setId?: string }) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [studyMode, setStudyMode] = useState<StudyMode>('flip')
  const [typingAnswer, setTypingAnswer] = useState('')
  const [correctCount, setCorrectCount] = useState(0)
  const [sessionStarted, setSessionStarted] = useState(false)

  const currentCard = FLASHCARDS[currentCardIndex]

  const handleNext = () => {
    if (currentCardIndex < FLASHCARDS.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
      setIsFlipped(false)
      setTypingAnswer('')
    }
  }

  const handlePrev = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1)
      setIsFlipped(false)
      setTypingAnswer('')
    }
  }

  const handleCheckTyping = () => {
    const isCorrect = typingAnswer.toLowerCase().trim() === currentCard.english.toLowerCase()
    if (isCorrect) {
      setCorrectCount(correctCount + 1)
    }
    handleNext()
  }

  const handleReset = () => {
    setCurrentCardIndex(0)
    setIsFlipped(false)
    setStudyMode('flip')
    setTypingAnswer('')
    setCorrectCount(0)
    setSessionStarted(false)
  }

  if (!sessionStarted) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {(['flip', 'mcq', 'typing', 'listening'] as StudyMode[]).map((mode) => (
          <Card key={mode} className="border-border cursor-pointer hover:border-primary transition-colors" onClick={() => { setStudyMode(mode); setSessionStarted(true) }}>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl mb-2">
                  {mode === 'flip' && '🔄'}
                  {mode === 'mcq' && '✓'}
                  {mode === 'typing' && '⌨️'}
                  {mode === 'listening' && '🔊'}
                </div>
                <h3 className="font-semibold text-foreground capitalize mb-1">{mode === 'mcq' ? 'Multiple Choice' : mode}</h3>
                <p className="text-sm text-foreground/60">
                  {mode === 'flip' && 'Flip cards to study'}
                  {mode === 'mcq' && 'Choose the correct answer'}
                  {mode === 'typing' && 'Type the English word'}
                  {mode === 'listening' && 'Listen and match'}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Study Session</h2>
          <p className="text-sm text-foreground/60">Business English • {currentCardIndex + 1} of {FLASHCARDS.length}</p>
        </div>
        <Button variant="outline" onClick={handleReset}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-foreground/60">Progress</span>
          <span className="font-semibold text-primary">{correctCount} correct</span>
        </div>
        <div className="w-full bg-border rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all"
            style={{ width: `${((currentCardIndex + 1) / FLASHCARDS.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Study Content */}
      {studyMode === 'flip' && (
        <FlipCardMode
          card={currentCard}
          isFlipped={isFlipped}
          setIsFlipped={setIsFlipped}
          onNext={handleNext}
          onPrev={handlePrev}
          canNext={currentCardIndex < FLASHCARDS.length - 1}
          canPrev={currentCardIndex > 0}
        />
      )}

      {studyMode === 'mcq' && (
        <MCQMode
          card={currentCard}
          onNext={handleNext}
          canNext={currentCardIndex < FLASHCARDS.length - 1}
          onCorrect={() => setCorrectCount(correctCount + 1)}
        />
      )}

      {studyMode === 'typing' && (
        <TypingMode
          card={currentCard}
          answer={typingAnswer}
          setAnswer={setTypingAnswer}
          onSubmit={handleCheckTyping}
        />
      )}
    </div>
  )
}

function FlipCardMode({
  card,
  isFlipped,
  setIsFlipped,
  onNext,
  onPrev,
  canNext,
  canPrev,
}: {
  card: typeof FLASHCARDS[0]
  isFlipped: boolean
  setIsFlipped: (v: boolean) => void
  onNext: () => void
  onPrev: () => void
  canNext: boolean
  canPrev: boolean
}) {
  return (
    <div className="space-y-6">
      <Card
        className="border-border cursor-pointer h-64 flex items-center justify-center bg-gradient-to-br from-primary/10 to-transparent hover:border-primary transition-all"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <CardContent className="text-center">
          <div className="text-sm text-foreground/60 mb-4">{isFlipped ? 'Meaning' : 'Word'}</div>
          <div className="text-4xl font-bold text-foreground">
            {isFlipped ? card.vietnamese : card.english}
          </div>
          {isFlipped && (
            <p className="text-sm text-foreground/60 mt-4 italic">{card.example}</p>
          )}
        </CardContent>
      </Card>

      <div className="flex items-center justify-between gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={onPrev}
          disabled={!canPrev}
          className="h-12 w-12"
        >
          <ChevronLeft />
        </Button>
        <div className="text-center text-sm text-foreground/60">Click card to flip</div>
        <Button
          variant="outline"
          size="icon"
          onClick={onNext}
          disabled={!canNext}
          className="h-12 w-12"
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}

function MCQMode({
  card,
  onNext,
  canNext,
  onCorrect,
}: {
  card: typeof FLASHCARDS[0]
  onNext: () => void
  canNext: boolean
  onCorrect: () => void
}) {
  const [selected, setSelected] = useState<number | null>(null)

  const options = [
    card.vietnamese,
    'Tạm thời, không bền vững',
    'Làm xấu đi, gây hại',
    'Phát triển, tiến bộ',
  ].sort(() => Math.random() - 0.5)

  const handleSelect = (option: string) => {
    setSelected(options.indexOf(option))
    if (option === card.vietnamese) {
      onCorrect()
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardHeader>
          <div className="text-3xl font-bold text-foreground">{card.english}</div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground/60 mb-6">Select the correct meaning:</p>
          <div className="space-y-3">
            {options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(option)}
                className={`w-full p-4 rounded-lg border-2 text-left transition-colors ${
                  selected === idx
                    ? option === card.vietnamese
                      ? 'border-green-500 bg-green-50 text-foreground'
                      : 'border-red-500 bg-red-50 text-foreground'
                    : 'border-border hover:border-primary'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={onNext} disabled={!canNext || selected === null} className="bg-primary text-primary-foreground hover:bg-primary/90">
          Next
        </Button>
      </div>
    </div>
  )
}

function TypingMode({
  card,
  answer,
  setAnswer,
  onSubmit,
}: {
  card: typeof FLASHCARDS[0]
  answer: string
  setAnswer: (v: string) => void
  onSubmit: () => void
}) {
  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardHeader>
          <div className="text-lg text-foreground/60 mb-2">Meaning:</div>
          <div className="text-3xl font-bold text-foreground">{card.vietnamese}</div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm text-foreground/60 block mb-2">Type the English word:</label>
            <Input
              autoFocus
              placeholder="Enter the word..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onSubmit()}
              className="text-lg p-3 bg-card"
            />
          </div>
          <p className="text-sm text-foreground/60 italic">Example: {card.example}</p>
        </CardContent>
      </Card>

      <Button onClick={onSubmit} disabled={!answer} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6">
        Check Answer
      </Button>
    </div>
  )
}
