"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CounterProps {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function Counter({
  to,
  suffix = "",
  duration = 2000,
  className = "",
}: CounterProps) {
  const [count, setCount]   = useState(0);
  const ref                 = useRef(null);
  const inView              = useInView(ref, { once: true });
  const startedRef          = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;

    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      /* easeOutExpo */
      const eased    =
        progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}