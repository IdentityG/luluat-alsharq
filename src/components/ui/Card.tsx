"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  className = "",
  hover     = true,
  glow      = false,
  onClick,
}: CardProps) {
  return (
    <motion.div
      whileHover={
        hover
          ? { y: -6, boxShadow: "0 8px 40px rgba(107,255,60,0.15)" }
          : {}
      }
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={cn(
        "rounded-2xl border transition-colors duration-300",
        "bg-dark-800/60 border-white/8 backdrop-blur-sm",
        hover && "cursor-pointer hover:border-brand/30",
        glow  && "shadow-brand-sm",
        className
      )}
    >
      {children}
    </motion.div>
  );
}