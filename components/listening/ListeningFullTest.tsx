// components/listening/ListeningFullTestTyping.tsx
'use client';

import { useState, useEffect } from 'react';
import { VirtualAudioPlayer } from '@/components/ui/virtual-audio-player';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle } from 'lucide-react';

const testData = {
  transcript: "The quarterly report is due by Friday afternoon. Please submit it before the deadline.",
  questions: [
    { id: 1, text: "The quarterly report is due by Friday afternoon.", answer: "The quarterly report is due by Friday afternoon." },
    { id: 2, text: "Please submit it before the deadline.", answer: "Please submit it before the deadline." },
  ]
};

export function ListeningFullTest() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0); // tổng điểm qua các câu (nếu cần)

  const current = testData.questions[currentIndex];
  const isLast = currentIndex === testData.questions.length - 1;
  const words = current.text.split(' ');

  // Khởi tạo userAnswers khi chuyển câu
  useEffect(() => {
    setUserAnswers(Array(words.length).fill(''));
    setShowResult(false);
  }, [currentIndex, words.length]);

  const handleWordChange = (idx: number, value: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[idx] = value;
    setUserAnswers(newAnswers);
  };

  const checkAnswer = () => {
    let correctCount = 0;
    userAnswers.forEach((ans, i) => {
      if (ans.trim().toLowerCase() === words[i].toLowerCase()) correctCount++;
    });
    setScore(correctCount);
    setTotalScore(prev => prev + correctCount);
    setShowResult(true);
  };

  const handleNext = () => {
    if (isLast) {
      alert(`Hoàn thành! Tổng điểm: ${totalScore + score}/${testData.questions.reduce((sum, q) => sum + q.text.split(' ').length, 0)}`);
      // Reset về câu đầu (tuỳ chọn)
      setCurrentIndex(0);
      setTotalScore(0);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  return (
    <div className="space-y-6">
      <VirtualAudioPlayer text={testData.transcript} autoPlay />
      <div className="p-5 border rounded-xl bg-white shadow-sm">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {words.map((word, idx) => (
            <input
              key={idx}
              type="text"
              value={userAnswers[idx] ?? ''} // luôn là string, tránh undefined
              onChange={(e) => handleWordChange(idx, e.target.value)}
              disabled={showResult}
              className={`w-24 border-b-2 p-1 text-center transition-colors ${
                showResult
                  ? userAnswers[idx]?.toLowerCase() === word.toLowerCase()
                    ? 'border-green-500 text-green-600'
                    : 'border-red-500 text-red-600'
                  : 'border-gray-300 focus:border-primary focus:outline-none'
              }`}
            />
          ))}
        </div>
        {!showResult ? (
          <Button onClick={checkAnswer} className="w-full">Kiểm tra</Button>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              {words.map((word, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  {userAnswers[idx]?.toLowerCase() === word.toLowerCase() ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600 shrink-0" />
                  )}
                  <span className="break-words">{word}</span>
                </div>
              ))}
            </div>
            <div className="text-center text-sm font-medium">
              Đúng {score}/{words.length} từ
            </div>
            <Button onClick={handleNext} className="w-full">
              {isLast ? 'Hoàn thành' : 'Câu tiếp theo'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}