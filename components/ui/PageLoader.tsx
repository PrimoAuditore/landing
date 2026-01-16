"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const PageLoader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for fonts and assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          className="fixed inset-0 z-[10000] bg-background flex items-center justify-center"
        >
          <div className="relative">
            {/* Animated logo text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="display-text text-3xl md:text-4xl tracking-tight"
            >
              <motion.span
                className="inline-block"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Grupo del Este
              </motion.span>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="absolute -bottom-4 left-0 h-[2px] bg-accent"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.8, ease: [0.25, 0.4, 0.25, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
