"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { MagneticWrapper } from "@/components/ui/MagneticWrapper";

export const Footer = () => {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 md:py-16 border-t border-border">
      <div className="container-padding mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo and copyright */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <span className="display-text text-lg">Grupo del Este</span>
            <span className="text-sm text-muted">
              © {currentYear} {t("rights")}
            </span>
          </div>

          {/* Back to top */}
          <MagneticWrapper strength={0.3}>
            <button
              onClick={handleScrollToTop}
              className="group flex items-center gap-3 text-sm text-muted hover:text-foreground transition-colors duration-300"
              aria-label={t("backToTop")}
              tabIndex={0}
            >
              <span>{t("backToTop")}</span>
              <motion.span
                className="inline-block"
                animate={{ y: [0, -4, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <svg
                  className="w-4 h-4 rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </motion.span>
            </button>
          </MagneticWrapper>
        </div>
      </div>
    </footer>
  );
};
