"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeInUp, fadeInLeft, fadeInRight } from "@/lib/animations";

interface FadeInProps {
  children: React.ReactNode;
  direction?: "up" | "left" | "right" | "down";
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export default function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  className = "",
  once = true,
}: FadeInProps) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once, margin: "-80px" });

  const variants = {
    up:    fadeInUp,
    left:  fadeInLeft,
    right: fadeInRight,
    down: {
      hidden:  { opacity: 0, y: -60 },
      visible: { opacity: 1, y: 0 },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants[direction]}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}