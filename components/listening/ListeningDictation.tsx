'use client';

import { useState, useEffect } from 'react';
import { VirtualAudioPlayer } from '@/components/ui/virtual-audio-player';
import { Button } from '@/components/ui/button';

const sentences = [
  { id: 1, text: "The customer requested a full refund.", hiddenIndices: [2, 4] }, // ẩn 'requested', 'full'
  { id: 2, text: "We will schedule the meeting for next Monday.", hiddenIndices: [3, 6] },
];

export function ListeningDictation() {
  const [index, setIndex] = useState(0);
  const [userInputs, setUserInputs] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const current = sentences[index];
  const isLast = index === sentences.length - 1;
  const words = current.text.split(' ');
  const hiddenPositions = current.hiddenIndices;

  useEffect(() => {
    setUserInputs(Array(hiddenPositions.length).fill(''));
    setShowResult(false);
  }, [index, hiddenPositions.length]);

  const handleInputChange = (posIdx: number, value: string) => {
    if (showResult) return;
    const newInputs = [...userInputs];
    newInputs[posIdx] = value;
    setUserInputs(newInputs);
  };

  const checkAnswer = () => {
    let correctCount = 0;
    hiddenPositions.forEach((_, i) => {
      if (userInputs[i]?.trim().toLowerCase() === words[hiddenPositions[i]].toLowerCase()) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setShowResult(true);
  };

  const handleNext = () => {
    if (isLast) {
      alert(`Hoàn thành! Đúng ${score}/${hiddenPositions.length} từ`);
    } else {
      setIndex(prev => prev + 1);
    }
  };

  return (
    <div className="space-y-6">
      <VirtualAudioPlayer text={current.text}  />
      <div className="p-5 border rounded-xl bg-white shadow-sm">
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {words.map((word, idx) => {
            const hiddenIdx = hiddenPositions.indexOf(idx);
            if (hiddenIdx !== -1) {
              return (
                <input
                  key={idx}
                  type="text"
                  value={userInputs[hiddenIdx] ?? ''}
                  onChange={(e) => handleInputChange(hiddenIdx, e.target.value)}
                  disabled={showResult}
                  className={`w-24 border-b-2 p-1 text-center transition ${
                    showResult
                      ? userInputs[hiddenIdx]?.toLowerCase() === word.toLowerCase()
                        ? 'border-green-500 text-green-600'
                        : 'border-red-500 text-red-600'
                      : 'border-gray-300 focus:border-primary'
                  }`}
                  placeholder="___"
                />
              );
            }
            return <span key={idx} className="text-base">{word}</span>;
          })}
        </div>
        {!showResult ? (
          <Button onClick={checkAnswer} className="w-full">Kiểm tra</Button>
        ) : (
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              Kết quả: {score}/{hiddenPositions.length} từ đúng
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