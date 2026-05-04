'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MascotMessage {
  type: 'idle' | 'hover' | 'click' | 'complete' | 'correct' | 'wrong';
  text: string;
}

const MESSAGES: Record<MascotMessage['type'], string[]> = {
  idle: ['👋 Học đi nào!', 'Cố lên bạn ơi! 📚', 'Mình cùng học nhé!', 'Hôm nay học gì thế?'],
  hover: ['👀 Tuyệt vời!', '🔍 Click vào để khám phá!', '🌟 Bộ từ này hay lắm đó!'],
  click: ['🚀 Bắt đầu thôi!', '💪 Cố gắng nhé!', '🎯 Mục tiêu hôm nay của bạn là gì?'],
  complete: ['🎉 Xuất sắc!', '🏆 Bạn đã hoàn thành!', '🌟 Level tiếp theo đang chờ!'],
  correct: ['✅ Đúng rồi!', '👏 Thông minh quá!', '🌟 Tuyệt vời!'],
  wrong: ['❌ Không sao, thử lại nhé!', '📖 Xem lại đáp án nha!', '💪 Gần đúng rồi!'],
};

export function Mascot() {
  const [currentMessage, setCurrentMessage] = useState<MascotMessage | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showMessage = (type: MascotMessage['type'], customText?: string) => {
    const texts = MESSAGES[type];
    const text = customText || texts[Math.floor(Math.random() * texts.length)];
    setCurrentMessage({ type, text });
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrentMessage(null);
    }, 3500);
  };

  // Lắng nghe sự kiện từ toàn cục
  useEffect(() => {
    const handler = (e: CustomEvent) => {
      const { type, text } = e.detail;
      showMessage(type, text);
    };
    window.addEventListener('mascot-message', handler as EventListener);
    return () => {
      window.removeEventListener('mascot-message', handler as EventListener);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 pointer-events-none">
      <AnimatePresence>
        {currentMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="pointer-events-auto bg-white/90 backdrop-blur-md rounded-2xl px-4 py-2 shadow-lg border border-primary/30 max-w-[220px] text-sm text-foreground"
          >
            {currentMessage.text}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="pointer-events-auto w-20 h-20 cursor-pointer hover:scale-105 transition-transform duration-200">
        <img
          src="/mascot-owl.svg"
          alt="Cú mascot"
          className="w-full h-full drop-shadow-lg"
          onMouseEnter={() => showMessage('hover')}
          onClick={() => showMessage('click')}
        />
      </div>
    </div>
  );
}