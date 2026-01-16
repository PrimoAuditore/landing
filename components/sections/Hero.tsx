"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { TextReveal, AnimatedParagraph } from "@/components/ui/TextReveal";
import { Button } from "@/components/ui/Button";

export const Hero = () => {
  const t = useTranslations("hero");
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleScrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden noise-bg"
      aria-labelledby="hero-title"
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--foreground) 1px, transparent 1px),
              linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)
            `,
            backgroundSize: "clamp(40px, 8vw, 80px) clamp(40px, 8vw, 80px)",
          }}
        />
      </div>

      {/* Decorative elements */}
      <motion.div
        style={{ y }}
        className="absolute top-1/4 left-[10%] w-32 h-32 rounded-full border border-foreground/10"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
        className="absolute bottom-1/4 right-[15%] w-48 h-48 rounded-full border border-foreground/5"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 150]) }}
        className="absolute top-1/3 right-[10%] w-2 h-2 rounded-full bg-accent"
      />

      {/* Main content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 container-padding mx-auto max-w-6xl text-center"
      >
        {/* Small tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <span className="inline-block px-4 py-2 text-xs uppercase tracking-[0.3em] text-muted border border-border rounded-full">
            {t("tagline")}
          </span>
        </motion.div>

        {/* Main headline */}
        <h1 id="hero-title" className="display-text mb-8">
          <span className="block text-[clamp(3rem,12vw,10rem)] leading-[0.9] tracking-tight">
            <TextReveal delay={0.3}>Grupo</TextReveal>
          </span>
          <span className="block text-[clamp(3rem,12vw,10rem)] leading-[0.9] tracking-tight">
            <TextReveal delay={0.5}>del Este</TextReveal>
          </span>
        </h1>

        {/* Subtitle */}
        <AnimatedParagraph
          delay={0.8}
          className="max-w-xl mx-auto text-lg md:text-xl text-muted mb-12 body-text"
        >
          {t("subtitle")}
        </AnimatedParagraph>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <Button
            onClick={handleScrollToContact}
            variant="primary"
            size="lg"
            className="rounded-full"
            ariaLabel={t("cta")}
          >
            {t("cta")}
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-muted">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-foreground/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};
