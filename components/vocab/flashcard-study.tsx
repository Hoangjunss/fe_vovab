'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, ChevronRight, RotateCcw, Volume2 } from 'lucide-react';
import { vocabApi } from '@/lib/api';

type StudyMode = 'flip' | 'mcq' | 'typing' | 'listening';

interface FlashcardData {
  cardId: string;
  word: string;
  meaning: string;
  exampleSentence?: string;
  audioUrl?: string;
  imageUrl?: string;
  currentSrsLevel: number;
  totalCardsInSet: number;
  reviewedCount: number;
  cardsDueToday: number;
}

export function FlashcardStudy({ setId }: { setId: string }) {
  const [loading, setLoading] = useState(true);
  const [card, setCard] = useState<FlashcardData | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studyMode, setStudyMode] = useState<StudyMode | null>(null);
  const [typingAnswer, setTypingAnswer] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [message, setMessage] = useState('');

 const fetchNextCard = async () => {
  setLoading(true);
  try {
    const res = await vocabApi.getNextFlashcard(setId);
    setCard(res.data);          
    setTypingAnswer('');
    setIsFlipped(false);
    setMessage('');
  } catch (err: any) {
    setMessage(err.message || 'Không thể tải thẻ. Có thể bạn đã học hết từ trong bộ này.');
    setCard(null);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    if (setId) {
      fetchNextCard();
    }
  }, [setId]);

  const submitAnswer = async (quality: number) => {
    if (!card) return;
    try {
      await vocabApi.submitAnswer(card.cardId, quality);
      if (quality >= 3) setCorrectCount(prev => prev + 1);
      await fetchNextCard();
    } catch (err) {
      console.error('Submit failed', err);
    }
  };

  const handleNext = () => {
    if (!card) return;
    if (studyMode === 'typing') {
      const isCorrect = typingAnswer.toLowerCase().trim() === card.word.toLowerCase();
      submitAnswer(isCorrect ? 3 : 1);
    } else {
      submitAnswer(3); // default easy for flip and mcq? MCQ will handle separately
    }
  };

  if (!studyMode) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {(['flip', 'mcq', 'typing', 'listening'] as StudyMode[]).map((mode) => (
          <Card key={mode} className="border-border/50 bg-white shadow-md hover:shadow-lg cursor-pointer" onClick={() => setStudyMode(mode)}>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl mb-2">
                {mode === 'flip' && '🔄'}
                {mode === 'mcq' && '✓'}
                {mode === 'typing' && '⌨️'}
                {mode === 'listening' && '🔊'}
              </div>
              <h3 className="font-semibold capitalize">{mode === 'mcq' ? 'Multiple Choice' : mode}</h3>
              <p className="text-sm text-muted-foreground">
                {mode === 'flip' && 'Lật thẻ để học'}
                {mode === 'mcq' && 'Chọn đáp án đúng'}
                {mode === 'typing' && 'Gõ từ tiếng Anh'}
                {mode === 'listening' && 'Nghe và chọn nghĩa'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (loading) return <div className="text-center py-12">Đang tải thẻ...</div>;
  if (message) return <div className="text-center py-12 text-red-500">{message}</div>;
  if (!card) return <div className="text-center py-12">Không có thẻ nào để học.</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Học từ vựng</h2>
          <p className="text-sm text-muted-foreground">Đã học {card.reviewedCount}/{card.totalCardsInSet} từ</p>
        </div>
        <Button variant="outline" onClick={() => setStudyMode(null)}>
          <RotateCcw className="mr-2 h-4 w-4" /> Chọn chế độ khác
        </Button>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Tiến độ</span>
          <span className="text-primary font-semibold">{correctCount} đúng</span>
        </div>
        <div className="w-full bg-border rounded-full h-2">
          <div className="bg-primary h-2 rounded-full" style={{ width: `${(card.reviewedCount / card.totalCardsInSet) * 100}%` }} />
        </div>
      </div>

      {studyMode === 'flip' && (
        <FlipCard card={card} isFlipped={isFlipped} setIsFlipped={setIsFlipped} onNext={() => submitAnswer(3)} />
      )}
      {studyMode === 'mcq' && <MCQCard card={card} onSubmit={(isCorrect: boolean) => submitAnswer(isCorrect ? 3 : 1)} />}
      {studyMode === 'typing' && (
        <TypingCard card={card} answer={typingAnswer} setAnswer={setTypingAnswer} onSubmit={() => handleNext()} />
      )}
      {studyMode === 'listening' && (
        <ListeningCard card={card} onSubmit={() => submitAnswer(3)} />
      )}
    </div>
  );
}

// Sub-components (simplified, reuse existing styling)
function FlipCard({ card, isFlipped, setIsFlipped, onNext }: any) {
  return (
    <div className="space-y-6">
      <Card className="cursor-pointer h-64 flex items-center justify-center bg-gradient-to-br from-primary/10 to-transparent hover:shadow-xl transition-all" onClick={() => setIsFlipped(!isFlipped)}>
        <CardContent className="text-center">
          <div className="text-sm text-foreground/60 mb-4">{isFlipped ? 'Nghĩa' : 'Từ'}</div>
          <div className="text-4xl font-bold">{isFlipped ? card.meaning : card.word}</div>
          {isFlipped && <p className="text-sm text-foreground/60 mt-4 italic">{card.exampleSentence}</p>}
        </CardContent>
      </Card>
      <Button className="w-full" onClick={onNext}>Tiếp theo</Button>
    </div>
  );
}

function MCQCard({ card, onSubmit }: any) {
  const [selected, setSelected] = useState<number | null>(null);
  const options = [
    card.meaning,
    'Tạm thời, không bền vững',
    'Làm xấu đi, gây hại',
    'Phát triển, tiến bộ',
  ].sort(() => Math.random() - 0.5);
  const handleSelect = (opt: string) => {
    const idx = options.indexOf(opt);
    setSelected(idx);
    onSubmit(opt === card.meaning);
  };
  return (
    <div className="space-y-6">
      <Card><CardHeader><div className="text-3xl font-bold">{card.word}</div></CardHeader><CardContent><div className="space-y-3">{options.map((opt, i) => (<button key={i} onClick={() => handleSelect(opt)} className={`w-full p-4 rounded-lg border-2 text-left transition-all ${selected === i ? (opt === card.meaning ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50') : 'border-border hover:border-primary'}`}>{opt}</button>))}</div></CardContent></Card>
      {selected !== null && <Button className="w-full" onClick={() => {}} disabled>Đã trả lời</Button>}
    </div>
  );
}

function TypingCard({ card, answer, setAnswer, onSubmit }: any) {
  return (
    <div className="space-y-6">
      <Card><CardHeader><div className="text-lg text-foreground/60">Nghĩa:</div><div className="text-3xl font-bold">{card.meaning}</div></CardHeader><CardContent><Input autoFocus placeholder="Gõ từ tiếng Anh..." value={answer} onChange={e => setAnswer(e.target.value)} onKeyPress={e => e.key === 'Enter' && onSubmit()} /><p className="text-sm text-muted-foreground mt-2">Ví dụ: {card.exampleSentence}</p></CardContent></Card>
      <Button className="w-full" onClick={onSubmit} disabled={!answer}>Kiểm tra</Button>
    </div>
  );
}

function ListeningCard({ card, onSubmit }: any) {
  const [selected, setSelected] = useState<number | null>(null);
  const speak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(card.word);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Trình duyệt không hỗ trợ đọc');
    }
  };
  const options = [card.meaning, 'Tạm thời', 'Nhanh chóng', 'Chậm rãi'].sort(() => Math.random() - 0.5);
  const handleSelect = (opt: string) => {
    setSelected(options.indexOf(opt));
    onSubmit(opt === card.meaning);
  };
  return (
    <div className="space-y-6">
      <Card className="text-center py-8"><Button size="lg" onClick={speak}><Volume2 className="mr-2" /> Nghe từ</Button></Card>
      <div className="space-y-3">{options.map((opt, i) => (<button key={i} onClick={() => handleSelect(opt)} className="w-full p-4 rounded-lg border-2 text-left">{opt}</button>))}</div>
    </div>
  );
}