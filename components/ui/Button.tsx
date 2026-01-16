"use client";

import { motion } from "framer-motion";
import { MagneticWrapper } from "./MagneticWrapper";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  magnetic?: boolean;
  ariaLabel?: string;
};

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  magnetic = true,
  ariaLabel,
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  const variants = {
    primary:
      "bg-foreground text-background hover:bg-foreground/90 active:scale-[0.98]",
    secondary:
      "bg-transparent text-foreground border border-foreground hover:bg-foreground hover:text-background active:scale-[0.98]",
    ghost:
      "bg-transparent text-foreground hover:bg-foreground/5 active:scale-[0.98]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <motion.span
      className="relative overflow-hidden"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.span>
  );

  const ButtonElement = href ? (
    <a
      href={href}
      className={combinedStyles}
      aria-label={ariaLabel}
      tabIndex={0}
    >
      {content}
    </a>
  ) : (
    <button
      onClick={onClick}
      className={combinedStyles}
      aria-label={ariaLabel}
      tabIndex={0}
    >
      {content}
    </button>
  );

  if (magnetic) {
    return <MagneticWrapper>{ButtonElement}</MagneticWrapper>;
  }

  return ButtonElement;
};
