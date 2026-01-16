"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type TextRevealProps = {
  children: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  splitBy?: "word" | "letter";
};

export const TextReveal = ({
  children,
  className = "",
  delay = 0,
  as: Component = "span",
  splitBy = "word",
}: TextRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const items = splitBy === "word" ? children.split(" ") : children.split("");

  return (
    <span ref={ref} className={className}>
      <Component>
        <span className="sr-only">{children}</span>
        <span aria-hidden="true" className="inline">
          {items.map((item, index) => (
            <span
              key={index}
              className="inline-block overflow-hidden align-bottom"
              style={{ marginRight: splitBy === "word" ? "0.25em" : 0 }}
            >
              <motion.span
                className="inline-block will-change-transform"
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : { y: "100%" }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.4, 0.25, 1],
                  delay: delay + index * (splitBy === "word" ? 0.05 : 0.02),
                }}
              >
                {item === " " ? "\u00A0" : item}
              </motion.span>
            </span>
          ))}
        </span>
      </Component>
    </span>
  );
};

type AnimatedTextProps = {
  children: string;
  className?: string;
  delay?: number;
};

export const AnimatedParagraph = ({
  children,
  className = "",
  delay = 0,
}: AnimatedTextProps) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.p
      ref={ref}
      className={`${className} will-change-transform`}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1],
        delay,
      }}
    >
      {children}
    </motion.p>
  );
};
