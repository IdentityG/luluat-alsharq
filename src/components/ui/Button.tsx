"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type NativeButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd"
>;

interface ButtonProps extends NativeButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant   = "primary",
      size      = "md",
      loading   = false,
      icon,
      iconPosition = "right",
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const base = `
      inline-flex items-center justify-center gap-2
      font-semibold rounded-xl transition-all duration-300
      disabled:opacity-50 disabled:cursor-not-allowed
      focus-visible:outline-none focus-visible:ring-2
      focus-visible:ring-brand focus-visible:ring-offset-2
      focus-visible:ring-offset-dark-900
    `;

    const variants = {
      primary:
        "bg-gradient-brand text-dark-900 shadow-brand hover:shadow-brand-lg hover:scale-[1.02] active:scale-[0.98]",
      secondary:
        "bg-dark-700 text-white border border-white/10 hover:border-brand/40 hover:bg-dark-600",
      outline:
        "border border-brand text-brand hover:bg-brand/10 hover:shadow-brand-sm",
      ghost:
        "text-white/70 hover:text-white hover:bg-white/5",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: variant === "primary" ? 1.03 : 1.01 }}
        whileTap={{ scale: 0.97 }}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12" cy="12" r="10"
              stroke="currentColor" strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        )}
        {icon && iconPosition === "left" && icon}
        {children}
        {icon && iconPosition === "right" && icon}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
export default Button;
