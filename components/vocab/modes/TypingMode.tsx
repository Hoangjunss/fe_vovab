'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Volume2, Eye, SkipForward, Shuffle } from 'lucide-react';

interface TypingModeProps {
  word: string;
  meaning: string;
  phonetic?: string;
  exampleSentence?: string;
  onAnswer: (isCorrect: boolean) => void;
  onSkip: () => void;
  onRandom: () => void;
  onContinue: () => void;
}

export function TypingMode({
  word,
  meaning,
  phonetic,
  exampleSentence,
  onAnswer,
  onSkip,
  onRandom,
  onContinue,
}: TypingModeProps) {
  const [inputs, setInputs] = useState<string[]>(() => Array(word.length).fill(''));
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [letterStatus, setLetterStatus] = useState<('correct' | 'wrong' | null)[]>(() => Array(word.length).fill(null));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Reset state khi word thay đổi
  useEffect(() => {
    setInputs(Array(word.length).fill(''));
    setIsAnswered(false);
    setIsCorrect(false);
    setLetterStatus(Array(word.length).fill(null));
    // Focus vào ô đầu tiên sau một khoảng thời gian ngắn để DOM cập nhật
    setTimeout(() => inputRefs.current[0]?.focus(), 50);
  }, [word]);

  const handleInputChange = (index: number, value: string) => {
    if (isAnswered) return;
    const lastChar = value.slice(-1).toLowerCase();
    const newInputs = [...inputs];
    newInputs[index] = lastChar;
    setInputs(newInputs);
    if (lastChar && index < word.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !inputs[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'Enter' && !isAnswered && inputs.every(ch => ch !== '')) {
      checkAnswer();
    }
  };

  const checkAnswer = () => {
    const userWord = inputs.join('');
    const correctWord = word.toLowerCase();
    const isAnsCorrect = userWord === correctWord;
    setIsCorrect(isAnsCorrect);
    setIsAnswered(true);
    onAnswer(isAnsCorrect);

    const statuses = inputs.map((ch, idx) => {
      if (ch === correctWord[idx]) return 'correct';
      return 'wrong';
    });
    setLetterStatus(statuses);
  };

  const showAnswer = () => {
    const correctLetters = word.toLowerCase().split('');
    setInputs(correctLetters);
    checkAnswer();
  };

  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-8">
      {/* Câu hỏi căn giữa */}
      <div className="text-center">
        <div className="text-sm font-medium text-muted-foreground mb-1">Nghĩa của từ:</div>
        <div className="text-3xl font-bold text-primary">{meaning}</div>
      </div>

      {/* Các ô nhập ký tự (mỗi ô có key riêng theo word và vị trí) */}
      <div className="flex flex-wrap justify-center gap-2 py-4">
        {word.split('').map((_, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <input
              key={`${word}-${idx}`} // 👈 Quan trọng: key làm mới input khi word thay đổi
              ref={el => { inputRefs.current[idx] = el; }}
              type="text"
              maxLength={1}
              value={inputs[idx] ?? ''} // 👈 Đảm bảo value luôn là string, không undefined
              onChange={(e) => handleInputChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              disabled={isAnswered}
              className={`w-10 h-10 sm:w-12 sm:h-12 text-center text-lg sm:text-xl font-bold border-0 border-b-4 focus:ring-0 focus:outline-none transition-all
                ${!isAnswered ? 'border-gray-300 focus:border-primary' : ''}
                ${isAnswered && letterStatus[idx] === 'correct' ? 'border-green-500 text-green-600' : ''}
                ${isAnswered && letterStatus[idx] === 'wrong' ? 'border-red-500 text-red-600' : ''}
              `}
            />
          </div>
        ))}
      </div>

      {/* Hàng nút chức năng */}
      {!isAnswered && (
        <div className="flex flex-wrap gap-2 justify-center">
          <Button 
            onClick={checkAnswer} 
            disabled={inputs.some(ch => !ch)} 
             
            size="sm" 
            className="text-xs px-3 py-1 h-9 gap-1"
          >
            <CheckCircle2 className="h-3 w-3" /> Kiểm tra
          </Button>
          <Button  onClick={showAnswer} size="sm" className="text-xs px-3 py-1 h-9 gap-1">
            <Eye className="h-3 w-3" /> Đáp án
          </Button>
          <Button  onClick={onSkip} size="sm" className="text-xs px-3 py-1 h-9 gap-1">
            <SkipForward className="h-3 w-3" /> Bỏ qua
          </Button>
          <Button  onClick={onRandom} size="sm" className="text-xs px-3 py-1 h-9 gap-1">
            <Shuffle className="h-3 w-3" /> Ngẫu nhiên
          </Button>
        </div>
      )}

      {/* Phần kết quả sau khi trả lời */}
      {isAnswered && (
        <div className="space-y-4">
          {isCorrect ? (
            <div className="p-5 rounded-xl border-2 border-green-400 bg-green-50 shadow-md">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2 text-green-700 font-semibold">
                  <CheckCircle2 className="h-6 w-6" />
                  <span className="text-lg">Chính xác!</span>
                </div>
                <Button variant="ghost" size="sm" onClick={speak}>
                  <Volume2 className="h-4 w-4 mr-1" /> Nghe
                </Button>
              </div>
              <div className="mt-2 space-y-1">
                <div><strong>Từ:</strong> {word} {phonetic && <span className="text-muted-foreground">/{phonetic}/</span>}</div>
                <div><strong>Nghĩa:</strong> {meaning}</div>
                {exampleSentence && (
                  <div><strong>Ví dụ:</strong> <span className="italic">{exampleSentence}</span></div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-xl border-2 border-red-400 bg-red-50 shadow-md">
              <div className="flex items-center gap-2 text-red-700 font-semibold mb-2">
                <XCircle className="h-6 w-6" />
                <span className="text-lg">Sai rồi!</span>
              </div>
              <div className="mt-2">
                <strong>Đáp án đúng:</strong> {word}
                <Button variant="ghost" size="sm" onClick={speak} className="ml-2">
                  <Volume2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )}

          <Button onClick={onContinue} className="w-full bg-primary text-white">
            Tiếp tục →
          </Button>
        </div>
      )}
    </div>
  );
}