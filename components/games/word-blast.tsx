'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Zap, RotateCcw, Volume2 } from 'lucide-react'

const WORD_PAIRS = [
  { english: 'Accommodate', vietnamese: 'Phục vụ', points: 10 },
  { english: 'Meticulous', vietnamese: 'Cẩn thận', points: 10 },
  { english: 'Ubiquitous', vietnamese: 'Có mặt khắp nơi', points: 15 },
  { english: 'Alleviate', vietnamese: 'Giảm nhẹ', points: 10 },
  { english: 'Ephemeral', vietnamese: 'Tạm thời', points: 12 },
  { english: 'Benevolent', vietnamese: 'Tốt bụng', points: 10 },
]

export function WordBlastGame() {
  const [gameStarted, setGameStarted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [score, setScore] = useState(0)
  const [matched, setMatched] = useState<Set<number>>(new Set())
  const [selected, setSelected] = useState<number | null>(null)
  const [words, setWords] = useState<{ word: string; type: 'english' | 'vietnamese'; index: number }[]>([])

  // Initialize game
  useEffect(() => {
    const shuffled = [
      ...WORD_PAIRS.map((p, i) => ({ word: p.english, type: 'english' as const, index: i })),
      ...WORD_PAIRS.map((p, i) => ({ word: p.vietnamese, type: 'vietnamese' as const, index: i })),
    ].sort(() => Math.random() - 0.5)
    setWords(shuffled)
  }, [])

  // Timer
  useEffect(() => {
    if (!gameStarted) return
    if (timeLeft <= 0) {
      setGameStarted(false)
      return
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    return () => clearTimeout(timer)
  }, [gameStarted, timeLeft])

  const handleStart = () => {
    setGameStarted(true)
    setTimeLeft(60)
    setScore(0)
    setMatched(new Set())
    setSelected(null)
  }

  const handleWordClick = (index: number) => {
    if (matched.has(index)) return

    if (selected === null) {
      setSelected(index)
      return
    }

    const selectedWord = words[selected]
    const currentWord = words[index]

    // Check if they match
    if (selectedWord.index === currentWord.index && selectedWord.type !== currentWord.type) {
      const newMatched = new Set(matched)
      newMatched.add(selected)
      newMatched.add(index)
      setMatched(newMatched)
      setScore(score + WORD_PAIRS[selectedWord.index].points)
      setSelected(null)

      // Game won
      if (newMatched.size === words.length) {
        setGameStarted(false)
      }
    } else {
      setSelected(null)
    }
  }

  const handleReset = () => {
    setGameStarted(false)
    setTimeLeft(60)
    setScore(0)
    setMatched(new Set())
    setSelected(null)
    const shuffled = [
      ...WORD_PAIRS.map((p, i) => ({ word: p.english, type: 'english' as const, index: i })),
      ...WORD_PAIRS.map((p, i) => ({ word: p.vietnamese, type: 'vietnamese' as const, index: i })),
    ].sort(() => Math.random() - 0.5)
    setWords(shuffled)
  }

  if (!gameStarted) {
    return (
      <div className="space-y-6">
        <Card className="border-border">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">⚡</div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Word Blast</h2>
            <p className="text-foreground/60">Match English words with their meanings in 60 seconds!</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="text-center p-4 rounded-lg bg-secondary">
                <p className="text-sm text-foreground/60 mb-1">Best Score</p>
                <p className="text-3xl font-bold text-foreground">450</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-secondary">
                <p className="text-sm text-foreground/60 mb-1">Best Time</p>
                <p className="text-3xl font-bold text-foreground">12s</p>
              </div>
            </div>
            <Button onClick={handleStart} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg">
              <Zap className="mr-2" /> Start Game
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <h3 className="font-semibold text-foreground">How to Play</h3>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-foreground/80">
            <p>• Click on an English word to select it</p>
            <p>• Then click its matching Vietnamese meaning</p>
            <p>• Correct matches earn points and disappear</p>
            <p>• Match all pairs before time runs out!</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Word Blast</h2>
          <p className="text-sm text-foreground/60">Match pairs to earn points</p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold text-primary">{score}</div>
          <p className="text-sm text-foreground/60">Points</p>
        </div>
      </div>

      {/* Timer */}
      <div className="flex gap-4">
        <div className="flex-1 p-4 rounded-lg bg-secondary">
          <p className="text-sm text-foreground/60 mb-1">Time Left</p>
          <div className={`text-3xl font-bold ${timeLeft <= 10 ? 'text-red-600' : 'text-foreground'}`}>
            {timeLeft}s
          </div>
        </div>
        <div className="flex-1 p-4 rounded-lg bg-secondary">
          <p className="text-sm text-foreground/60 mb-1">Matched</p>
          <div className="text-3xl font-bold text-foreground">{Math.floor(matched.size / 2)}/{WORD_PAIRS.length}</div>
        </div>
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {words.map((item, idx) => (
          <button
  key={idx}
  onClick={() => handleWordClick(idx)}
  disabled={matched.has(idx)}
  className={`p-4 rounded-xl font-medium text-sm transition-all ${
    matched.has(idx)
      ? 'opacity-30 cursor-default'
      : selected === idx
      ? 'bg-gradient-to-r from-primary to-accent text-white scale-105 shadow-lg'
      : 'bg-gradient-to-br from-card to-muted text-foreground hover:shadow-md'
  }`}
>
            <div className="text-xs text-foreground/60 mb-1">
              {item.type === 'english' ? 'English' : 'Vietnamese'}
            </div>
            {item.word}
          </button>
        ))}
      </div>

      {/* Game Over */}
      {matched.size === words.length && (
        <Card className="border-primary bg-primary/5">
          <CardContent className="pt-6 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Awesome!</h3>
            <p className="text-foreground/60 mb-4">You matched all pairs and earned {score} points!</p>
            <Button onClick={handleReset} className="bg-primary text-primary-foreground hover:bg-primary/90">
              <RotateCcw className="mr-2 h-4 w-4" /> Play Again
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
