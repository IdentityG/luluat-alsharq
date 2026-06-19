"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SlideInProps {
  children: React.ReactNode;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  className?: string;
}

export default function SlideIn({
  children,
  direction = "left",
  delay = 0,
  className = "",
}: SlideInProps) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const dirMap = {
    left:  { x: "-100%", y: 0 },
    right: { x: "100%",  y: 0 },
    up:    { x: 0, y: "100%"  },
    down:  { x: 0, y: "-100%" },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ ...dirMap[direction], opacity: 0 }}
      animate={inView
        ? { x: 0, y: 0, opacity: 1 }
        : { ...dirMap[direction], opacity: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}