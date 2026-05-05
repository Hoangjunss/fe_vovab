'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { SpeechService } from '@/lib/speechService';
import { cn } from '@/lib/utils';

interface VirtualAudioPlayerProps {
  text: string;
  autoPlay?: boolean;
  onStart?: () => void;
  onEnd?: () => void;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  className?: string;
}

export function VirtualAudioPlayer({
  text,
  autoPlay = false,
  onStart,
  onEnd,
  onTimeUpdate,
  className,
}: VirtualAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [duration, setDuration] = useState(60);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const pauseOffsetRef = useRef<number>(0); // vị trí dừng (giây)
  const isPausedRef = useRef<boolean>(false);

  const estimateDuration = (txt: string, rate: number): number => {
    const charsPerSec = 3 * rate;
    return Math.max(5, txt.length / charsPerSec);
  };

  useEffect(() => {
    const est = estimateDuration(text, playbackRate);
    setDuration(est);
    if (autoPlay) {
      startPlaying();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      SpeechService.stop();
    };
  }, [text, playbackRate, autoPlay]);

  // Bắt đầu phát từ vị trí hiện tại (pauseOffsetRef.current)
  const startPlaying = () => {
    if (isPlaying && !isPausedRef.current) return;
    SpeechService.stop();
    if (timerRef.current) clearInterval(timerRef.current);

    const remainingTime = duration - pauseOffsetRef.current;
    if (remainingTime <= 0.1) {
      pauseOffsetRef.current = 0;
      setCurrentTime(0);
    }

    const percent = pauseOffsetRef.current / duration;
    const charIndex = Math.min(Math.floor(text.length * percent), text.length - 1);
    const remainingText = text.slice(charIndex);
    if (!remainingText.trim()) return;

    startTimeRef.current = Date.now() - pauseOffsetRef.current * 1000;
    const remaining = duration - pauseOffsetRef.current;
    timerRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      if (elapsed >= remaining) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        setIsPlaying(false);
        setCurrentTime(duration);
        onEnd?.();
        onTimeUpdate?.(duration, duration);
      } else {
        setCurrentTime(pauseOffsetRef.current + elapsed);
        onTimeUpdate?.(pauseOffsetRef.current + elapsed, duration);
      }
    }, 100);

    SpeechService.speak(remainingText, 'en-US', playbackRate, () => {
      if (timerRef.current) clearInterval(timerRef.current);
      setIsPlaying(false);
      setCurrentTime(duration);
      onEnd?.();
      onTimeUpdate?.(duration, duration);
    });
    setIsPlaying(true);
    isPausedRef.current = false;
    onStart?.();
  };

  // Tạm dừng phát
  const pausePlaying = () => {
    if (!isPlaying) return;
    SpeechService.pause(); // tạm dừng utterance
    if (timerRef.current) clearInterval(timerRef.current);
    const elapsed = (Date.now() - startTimeRef.current) / 1000;
    pauseOffsetRef.current = Math.min(pauseOffsetRef.current + elapsed, duration);
    setCurrentTime(pauseOffsetRef.current);
    setIsPlaying(false);
    isPausedRef.current = true;
  };

  // Tiếp tục phát từ vị trí đã tạm dừng
  const resumePlaying = () => {
    if (isPlaying) return;
    if (pauseOffsetRef.current >= duration) {
      pauseOffsetRef.current = 0;
      setCurrentTime(0);
      startPlaying();
      return;
    }
    SpeechService.resume(); // tiếp tục utterance
    startTimeRef.current = Date.now() - pauseOffsetRef.current * 1000;
    const remaining = duration - pauseOffsetRef.current;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      if (elapsed >= remaining) {
        clearInterval(timerRef.current);
        setIsPlaying(false);
        setCurrentTime(duration);
        onEnd?.();
        onTimeUpdate?.(duration, duration);
      } else {
        setCurrentTime(pauseOffsetRef.current + elapsed);
        onTimeUpdate?.(pauseOffsetRef.current + elapsed, duration);
      }
    }, 100);
    setIsPlaying(true);
    isPausedRef.current = false;
  };

  const stopPlaying = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    SpeechService.stop();
    setIsPlaying(false);
    isPausedRef.current = false;
    pauseOffsetRef.current = 0;
    setCurrentTime(0);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pausePlaying();
    } else {
      if (pauseOffsetRef.current === 0 && currentTime === 0) {
        startPlaying();
      } else if (isPausedRef.current) {
        resumePlaying();
      } else {
        startPlaying();
      }
    }
  };

  const handleSeek = (value: number[]) => {
    const newTime = value[0];
    if (!text) return;
    const wasPlaying = isPlaying;
    if (wasPlaying) pausePlaying(); // tạm dừng
    // Cắt lại text
    const seekPercent = newTime / duration;
    const charIndex = Math.floor(text.length * seekPercent);
    const slicedText = text.slice(charIndex);
    if (slicedText.trim()) {
      // Dừng hẳn các utterance cũ
      SpeechService.stop();
      if (timerRef.current) clearInterval(timerRef.current);
      pauseOffsetRef.current = newTime;
      setCurrentTime(newTime);
      if (wasPlaying) {
        startPlaying(); // phát lại từ vị trí mới
      }
    }
  };

  const handleSpeedChange = (speed: number) => {
    if (speed === playbackRate) return;
    const wasPlaying = isPlaying;
    if (wasPlaying) pausePlaying();
    setPlaybackRate(speed);
    // Tính lại duration dựa trên text đầy đủ
    const newDuration = estimateDuration(text, speed);
    setDuration(newDuration);
    const ratio = pauseOffsetRef.current / duration;
    const newOffset = ratio * newDuration;
    pauseOffsetRef.current = newOffset;
    setCurrentTime(newOffset);
    if (wasPlaying) {
      startPlaying();
    }
  };

  const formatTime = (sec: number) => {
    if (isNaN(sec)) return '0:00';
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className={cn('bg-muted/50 rounded-xl p-4 shadow-sm', className)}>
      <div className="space-y-2">
        <Slider
          value={[currentTime]}
          max={duration}
          step={0.5}
          onValueChange={handleSeek}
          className="cursor-pointer"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <button onClick={togglePlay} className="p-1.5 rounded-full hover:bg-muted transition">
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </button>
          <div className="flex items-center gap-1">
            <button onClick={() => setIsMuted(!isMuted)} className="p-1.5 rounded-full hover:bg-muted">
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={1}
              step={0.01}
              onValueChange={(val) => setVolume(val[0])}
              className="w-24 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm">
          {[0.5, 0.75, 1, 1.25, 1.5, 2].map(speed => (
            <button
              key={speed}
              onClick={() => handleSpeedChange(speed)}
              className={`px-2 py-0.5 rounded ${playbackRate === speed ? 'bg-primary text-white' : 'bg-muted'}`}
            >
              {speed}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}