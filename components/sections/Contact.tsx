"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { TextReveal } from "@/components/ui/TextReveal";
import { MagneticWrapper } from "@/components/ui/MagneticWrapper";

export const Contact = () => {
  const t = useTranslations("contact");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const email = "hello@grupodeleste.com";

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 md:py-48 overflow-hidden"
      aria-labelledby="contact-title"
    >
      {/* Top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isInView
              ? { opacity: 0.03, scale: 1 }
              : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 1.2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-foreground"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isInView
              ? { opacity: 0.02, scale: 1 }
              : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 1.2, delay: 0.1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-foreground"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isInView
              ? { opacity: 0.01, scale: 1 }
              : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 1.2, delay: 0.2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-foreground"
        />
      </div>

      <div className="container-padding mx-auto max-w-5xl text-center relative z-10">
        {/* Main headline */}
        <h2
          id="contact-title"
          className="display-text text-4xl md:text-6xl lg:text-7xl mb-8"
        >
          <TextReveal delay={0.1}>{t("title")}</TextReveal>
        </h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="body-text text-lg md:text-xl text-muted mb-16 max-w-xl mx-auto"
        >
          {t("subtitle")}
        </motion.p>

        {/* Email CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <MagneticWrapper strength={0.2}>
            <a
              href={`mailto:${email}`}
              className="group inline-flex flex-col items-center"
              aria-label={`${t("emailLabel")}: ${email}`}
              tabIndex={0}
            >
              <span className="text-xs uppercase tracking-[0.3em] text-muted mb-4">
                {t("emailLabel")}
              </span>
              <span className="display-text text-2xl md:text-4xl lg:text-5xl relative">
                <span className="relative inline-block overflow-hidden">
                  <span className="block group-hover:text-accent transition-colors duration-500">
                    {email}
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-foreground transform origin-left scale-x-0 group-hover:scale-x-100 group-hover:bg-accent transition-all duration-500" />
                </span>
              </span>
            </a>
          </MagneticWrapper>
        </motion.div>

        {/* Decorative arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20"
        >
          <motion.svg
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-6 mx-auto text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </motion.svg>
        </motion.div>
      </div>
    </section>
  );
};
