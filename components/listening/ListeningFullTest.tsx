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

  const current = testData.questions[currentIndex];
  const isLast = currentIndex === testData.questions.length - 1;

  useEffect(() => {
    setUserAnswers(Array(current.text.split(' ').length).fill(''));
    setShowResult(false);
  }, [currentIndex]);

  const words = current.text.split(' ');

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
    setShowResult(true);
  };

  const handleNext = () => {
    if (isLast) {
      alert(`Hoàn thành! Đúng ${score}/${words.length} từ`);
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
              value={userAnswers[idx]}
              onChange={(e) => handleWordChange(idx, e.target.value)}
              disabled={showResult}
              className={`w-24 border-b-2 p-1 text-center ${
                showResult
                  ? userAnswers[idx]?.toLowerCase() === word.toLowerCase()
                    ? 'border-green-500 text-green-600'
                    : 'border-red-500 text-red-600'
                  : 'border-gray-300 focus:border-primary'
              }`}
              placeholder="___"
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
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600" />
                  )}
                  <span>{word}</span>
                </div>
              ))}
            </div>
            <Button onClick={handleNext} className="w-full">{isLast ? 'Hoàn thành' : 'Câu tiếp'}</Button>
          </div>
        )}
      </div>
    </div>
  );
}