import { useEffect, useRef, useState } from "react";

export function useAnimatedNumber(
  target: number,
  duration: number = 800
): number {
  const [value, setValue] = useState<number>(target);
  const startValueRef = useRef<number>(target);

  useEffect(() => {
    let startTime: number | null = null;
    const startValue = startValueRef.current;

    function animate(timestamp: number) {
      if (!startTime) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current = startValue + (target - startValue) * progress;

      setValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        startValueRef.current = target;
      }
    }

    requestAnimationFrame(animate);
  }, [target, duration]);

  return value;
}