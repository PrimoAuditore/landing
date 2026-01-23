"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { TextReveal } from "@/components/ui/TextReveal";

type CounterProps = {
  end: number;
  suffix?: string;
  label: string;
  delay?: number;
};

const Counter = ({ end, suffix = "", label, delay = 0 }: CounterProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      const duration = 2000;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isInView, end, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
      className="text-center"
    >
      <span className="display-text text-5xl md:text-6xl lg:text-7xl block mb-2">
        {count}
        {suffix}
      </span>
      <span className="text-sm uppercase tracking-widest text-muted">
        {label}
      </span>
    </motion.div>
  );
};

export const About = () => {
  const t = useTranslations("about");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 md:py-48 overflow-hidden bg-foreground text-background"
      aria-labelledby="about-title"
    >
      {/* Decorative elements */}
      <motion.div
        style={{ y, rotate }}
        className="absolute top-20 right-[10%] w-64 h-64 border border-background/10 rounded-full"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [50, -150]) }}
        className="absolute bottom-32 left-[5%] w-32 h-32 border border-background/5 rounded-full"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -80]) }}
        className="absolute top-1/2 left-[15%] w-3 h-3 rounded-full bg-accent"
      />

      <div className="container-padding mx-auto max-w-7xl relative z-10">
        {/* Section header */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="block text-xs uppercase tracking-[0.3em] text-accent mb-6"
        >
          {t("title")}
        </motion.span>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 mb-24 md:mb-32">
          {/* Left: Big statement */}
          <div>
            <h2
              id="about-title"
              className="display-text text-3xl md:text-4xl lg:text-5xl leading-tight"
            >
              <TextReveal delay={0.1}>{t("headline")}</TextReveal>
            </h2>
          </div>

          {/* Right: Description */}
          <div className="flex items-end">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="body-text text-lg md:text-xl text-background/70 leading-relaxed"
            >
              {t("description")}
            </motion.p>
          </div>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 pt-16 border-t border-background/10">
          <Counter end={30} suffix="+" label={t("stats.projects")} delay={0} />
          <Counter end={20} suffix="+" label={t("stats.clients")} delay={200} />
          <div className="col-span-2 md:col-span-1">
            <Counter end={7} suffix="+" label={t("stats.years")} delay={400} />
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-background/20 to-transparent" />
    </section>
  );
};
