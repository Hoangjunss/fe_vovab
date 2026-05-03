import { useState, useEffect, useRef } from 'react';

export function useMinimumLoading(loading: boolean, minDelayMs = 50) {
  const [showSkeleton, setShowSkeleton] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (loading) {
      // Bắt đầu loading: hiện skeleton ngay lập tức
      console.log('🟢 [Skeleton] loading started → showSkeleton = true');
      setShowSkeleton(true);
      startTimeRef.current = Date.now();
      // Clear bất kỳ timeout cũ nếu có
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    } else {
      // Kết thúc loading
      const elapsed = startTimeRef.current ? Date.now() - startTimeRef.current : 0;
      const remaining = Math.max(0, minDelayMs - elapsed);
      console.log(`🔵 [Skeleton] loading finished, elapsed=${elapsed}ms, remaining=${remaining}ms`);
      if (remaining === 0) {
        console.log('❌ [Skeleton] remaining=0 → hide skeleton immediately');
        setShowSkeleton(false);
        startTimeRef.current = null;
      } else {
        console.log(`⏳ [Skeleton] will hide skeleton after ${remaining}ms`);
        timeoutRef.current = setTimeout(() => {
          console.log('❌ [Skeleton] timeout finished → hide skeleton');
          setShowSkeleton(false);
          startTimeRef.current = null;
          timeoutRef.current = null;
        }, remaining);
      }
    }
  }, [loading, minDelayMs]);

  return showSkeleton;
}