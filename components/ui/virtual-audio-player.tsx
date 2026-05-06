'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, ChevronDown } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { SpeechService } from '@/lib/speechService';
import { cn } from '@/lib/utils';

interface VirtualAudioPlayerProps {
  text: string;
  autoPlay?: boolean;
  duration?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  className?: string;
}

export function VirtualAudioPlayer({
  text,
  autoPlay = false,
  duration: customDuration,
  onStart,
  onEnd,
  onTimeUpdate,
  className,
}: VirtualAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [duration, setDuration] = useState(customDuration ?? 5);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showVolumeMenu, setShowVolumeMenu] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const pauseOffsetRef = useRef<number>(0);
  const isPausedRef = useRef<boolean>(false);
  const waitingForStartRef = useRef<boolean>(false);
  const speedMenuRef = useRef<HTMLDivElement>(null);
  const volumeMenuRef = useRef<HTMLDivElement>(null);

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

  const estimateDuration = (txt: string, rate: number): number => {
    if (customDuration !== undefined) return customDuration;
    const charsPerSec = 12 * rate;
    const estimated = txt.length / charsPerSec;
    return Math.max(2, Math.min(estimated, 120));
  };

  // Cập nhật duration & scale offset
  useEffect(() => {
    const newDuration = customDuration ?? estimateDuration(text, playbackRate);
    if (newDuration === duration) return;
    const ratio = duration > 0 ? pauseOffsetRef.current / duration : 0;
    const newOffset = Math.min(Math.max(ratio * newDuration, 0), newDuration);
    pauseOffsetRef.current = newOffset;
    setCurrentTime(newOffset);
    setDuration(newDuration);
    if (isPlaying && !isPausedRef.current) {
      SpeechService.stop();
      if (timerRef.current) clearInterval(timerRef.current);
      startPlaying();
    }
  }, [text, playbackRate, customDuration]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (speedMenuRef.current && !speedMenuRef.current.contains(event.target as Node)) {
        setShowSpeedMenu(false);
      }
      if (volumeMenuRef.current && !volumeMenuRef.current.contains(event.target as Node)) {
        setShowVolumeMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      SpeechService.stop();
    };
  }, []);

  const startTimer = (offsetSec: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    startTimeRef.current = Date.now() - offsetSec * 1000;
    timerRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      let newTime = offsetSec + elapsed;
      if (newTime >= duration) {
        newTime = duration;
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = null;
        setIsPlaying(false);
        setCurrentTime(duration);
        onTimeUpdate?.(duration, duration);
      } else {
        setCurrentTime(newTime);
        onTimeUpdate?.(newTime, duration);
      }
    }, 100);
  };

  const startPlaying = () => {
    if (isPlaying && !isPausedRef.current) return;
    SpeechService.stop();
    if (timerRef.current) clearInterval(timerRef.current);

    let offset = pauseOffsetRef.current;
    if (offset >= duration - 0.1 || currentTime >= duration - 0.1) {
      offset = 0;
      pauseOffsetRef.current = 0;
      setCurrentTime(0);
    }
    if (offset >= duration) offset = duration - 0.1;

    const percent = offset / duration;
    let charIndex = Math.floor(text.length * percent);
    charIndex = Math.min(charIndex, text.length - 1);
    const remainingText = text.slice(charIndex);
    if (!remainingText.trim()) {
      setIsPlaying(false);
      onEnd?.();
      return;
    }

    waitingForStartRef.current = true;
    setIsPlaying(true);
    isPausedRef.current = false;

    SpeechService.speak(
      remainingText,
      'en-US',
      playbackRate,
      () => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = null;
        setIsPlaying(false);
        setCurrentTime(duration);
        pauseOffsetRef.current = duration;
        isPausedRef.current = false;
        waitingForStartRef.current = false;
        onEnd?.();
        onTimeUpdate?.(duration, duration);
      },
      () => {
        waitingForStartRef.current = false;
        startTimer(offset);
        onStart?.();
      },
      () => {
        waitingForStartRef.current = false;
      }
    );
  };

  const pausePlaying = () => {
    if (!isPlaying) return;
    SpeechService.stop();
    if (timerRef.current) clearInterval(timerRef.current);
    const elapsed = startTimeRef.current ? (Date.now() - startTimeRef.current) / 1000 : 0;
    const newOffset = Math.min(pauseOffsetRef.current + elapsed, duration);
    pauseOffsetRef.current = newOffset;
    setCurrentTime(newOffset);
    setIsPlaying(false);
    isPausedRef.current = true;
    waitingForStartRef.current = false;
  };

  const resumePlaying = () => {
    if (isPlaying) return;
    if (pauseOffsetRef.current >= duration - 0.1) {
      pauseOffsetRef.current = 0;
      setCurrentTime(0);
    }
    startPlaying();
  };

  const togglePlay = () => {
    if (isPlaying) pausePlaying();
    else {
      if (pauseOffsetRef.current >= duration - 0.1) {
        pauseOffsetRef.current = 0;
        setCurrentTime(0);
      }
      startPlaying();
    }
  };

  const handleSeek = (value: number[]) => {
    const newTime = value[0];
    if (newTime < 0 || newTime > duration) return;
    const wasPlaying = isPlaying;
    if (wasPlaying) {
      SpeechService.stop();
      if (timerRef.current) clearInterval(timerRef.current);
    }
    pauseOffsetRef.current = newTime;
    setCurrentTime(newTime);
    if (wasPlaying) startPlaying();
  };

  const handleSpeedChange = (speed: number) => {
    if (speed === playbackRate) return;
    const wasPlaying = isPlaying;
    if (wasPlaying) pausePlaying();
    setPlaybackRate(speed);
    const newDuration = customDuration ?? estimateDuration(text, speed);
    setDuration(newDuration);
    const ratio = pauseOffsetRef.current / duration;
    const newOffset = ratio * newDuration;
    pauseOffsetRef.current = Math.min(newOffset, newDuration);
    setCurrentTime(pauseOffsetRef.current);
    if (wasPlaying) startPlaying();
    setShowSpeedMenu(false);
  };

  const handleVolumeChange = (val: number[]) => {
    const newVol = val[0];
    setVolume(newVol);
    if (newVol === 0) setIsMuted(true);
    else {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
    } else {
      setIsMuted(true);
    }
  };

  const formatTime = (sec: number) => {
    if (isNaN(sec)) return '0:00';
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const actualVolume = isMuted ? 0 : volume;

return (
  <div className={cn('w-full bg-white dark:bg-gray-800 rounded-lg shadow p-3', className)}>
    {/* Hàng 1: Play, Slider, Volume+Speed */}
    <div className="flex flex-wrap items-center gap-2">
      {/* Nút Play/Pause */}
      <button
        onClick={togglePlay}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition shrink-0"
      >
        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
      </button>

      {/* Thanh trượt - co giãn */}
      <div className="flex-1 min-w-[120px]">
        <Slider
          value={[currentTime]}
          max={duration}
          step={0.1}
          onValueChange={handleSeek}
          className="cursor-pointer"
        />
      </div>

      {/* Nhóm Volume + Speed (căn phải, xuống dòng khi mobile) */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Dropdown âm lượng */}
        <div className="relative" ref={volumeMenuRef}>
          <button
            onClick={() => setShowVolumeMenu(!showVolumeMenu)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {actualVolume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
          {showVolumeMenu && (
            <div className="absolute top-full mt-1 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-md shadow-lg border border-gray-200 dark:border-gray-700 p-3 z-10 w-32">
              <Slider
                value={[actualVolume]}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
                className="cursor-pointer"
              />
              <button
                onClick={toggleMute}
                className="mt-2 text-xs text-gray-600 hover:text-gray-800 dark:text-gray-300 w-full text-center"
              >
                {isMuted ? 'Bật tiếng' : 'Tắt tiếng'}
              </button>
            </div>
          )}
        </div>

        {/* Dropdown tốc độ */}
        <div className="relative" ref={speedMenuRef}>
          <button
            onClick={() => setShowSpeedMenu(!showSpeedMenu)}
            className="flex items-center gap-1 px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition text-sm"
          >
            {playbackRate}x
            <ChevronDown className="h-3 w-3" />
          </button>
          {showSpeedMenu && (
            <div className="absolute top-full mt-1 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-md shadow-lg border border-gray-200 dark:border-gray-700 p-1 z-10 min-w-[80px]">
              {speedOptions.map((speed) => (
                <button
                  key={speed}
                  onClick={() => handleSpeedChange(speed)}
                  className={`block w-full text-left px-3 py-1 text-sm rounded hover:bg-gray-100/50 dark:hover:bg-gray-700/50 ${
                    playbackRate === speed ? 'bg-blue-100/50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' : ''
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Hàng 2: Thời gian */}
    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
      <span>{formatTime(currentTime)}</span>
      <span>{formatTime(duration)}</span>
    </div>
  </div>
);
}