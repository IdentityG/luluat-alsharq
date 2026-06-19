"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "brand" | "dark" | "outline";
  className?: string;
  animate?: boolean;
  dot?: boolean;
}

export default function Badge({
  children,
  variant  = "brand",
  className = "",
  animate  = false,
  dot      = false,
}: BadgeProps) {
  const variants = {
    brand:
      "bg-brand/15 text-brand border border-brand/30",
    dark:
      "bg-dark-700 text-white/70 border border-white/10",
    outline:
      "border border-brand/40 text-brand/80",
  };

  const content = (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-3.5 py-1.5",
        "rounded-full text-xs font-semibold tracking-wide uppercase",
        variants[variant],
        className
      )}
    >
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
      )}
      {children}
    </span>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "backOut" }}
      >
        {content}
      </motion.div>
    );
  }
  return content;
}