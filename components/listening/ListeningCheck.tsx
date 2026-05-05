'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Volume2, CheckCircle, XCircle } from 'lucide-react';
import { SpeechService } from '@/lib/speechService';

interface Question {
  id: number;
  text: string;        // câu hỏi sẽ được đọc lên
  questionDisplay: string; // hiển thị trên màn hình (có thể là câu hỏi dạng text)
  options: string[];
  correct: number;
}

// Mock data TOEIC style
const sampleQuestions: Question[] = [
  {
    id: 1,
    text: "What is the man going to do after work?",
    questionDisplay: "What is the man going to do after work?",
    options: ["Go to the library", "Visit a client", "Attend a meeting", "Take a break"],
    correct: 2,
  },
  // thêm các câu hỏi khác
];

export function ListeningCheck() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const current = sampleQuestions[currentIndex];
  const isLast = currentIndex === sampleQuestions.length - 1;

  const handlePlay = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    try {
      await SpeechService.speak(current.text, 'en-US', 0.9);
    } finally {
      setIsPlaying(false);
    }
  };

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    const isCorrect = idx === current.correct;
    if (isCorrect) setScore(prev => prev + 1);
    setShowResult(true);
  };

  const handleNext = () => {
    if (isLast) {
      alert(`Bạn đã hoàn thành! Điểm: ${score}/${sampleQuestions.length}`);
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelected(null);
      setShowResult(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Button onClick={handlePlay} size="lg" className="gap-2" disabled={isPlaying}>
          <Volume2 className="h-5 w-5" /> {isPlaying ? 'Đang phát...' : 'Nghe câu hỏi'}
        </Button>
        <p className="text-sm text-muted-foreground mt-2">Câu {currentIndex + 1}/{sampleQuestions.length}</p>
      </div>
      <Card>
        <CardContent className="pt-6">
          <p className="font-medium mb-4">{current.questionDisplay}</p>
          <div className="space-y-3">
            {current.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={showResult}
                className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                  showResult && idx === current.correct
                    ? 'border-green-500 bg-green-50'
                    : showResult && selected === idx && idx !== current.correct
                    ? 'border-red-500 bg-red-50'
                    : 'border-border hover:border-primary'
                }`}
              >
                <span className="font-medium">{String.fromCharCode(65 + idx)}.</span> {opt}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
      {showResult && (
        <div className="flex justify-end">
          <Button onClick={handleNext}>{isLast ? 'Xem kết quả' : 'Câu tiếp'}</Button>
        </div>
      )}
    </div>
  );
}