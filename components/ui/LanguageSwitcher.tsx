"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { motion } from "framer-motion";
import type { Locale } from "@/i18n/routing";

export const LanguageSwitcher = () => {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleSwitch = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div
      className="flex items-center gap-1 text-sm"
      role="group"
      aria-label="Language switcher"
    >
      <button
        onClick={() => handleSwitch("en")}
        className={`relative px-2 py-1 transition-colors duration-300 ${
          locale === "en" ? "text-foreground" : "text-muted hover:text-foreground"
        }`}
        aria-label="Switch to English"
        aria-pressed={locale === "en"}
        tabIndex={0}
      >
        EN
        {locale === "en" && (
          <motion.span
            layoutId="activeLocale"
            className="absolute inset-0 -z-10 rounded bg-foreground/5"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </button>
      <span className="text-muted">/</span>
      <button
        onClick={() => handleSwitch("es")}
        className={`relative px-2 py-1 transition-colors duration-300 ${
          locale === "es" ? "text-foreground" : "text-muted hover:text-foreground"
        }`}
        aria-label="Cambiar a Español"
        aria-pressed={locale === "es"}
        tabIndex={0}
      >
        ES
        {locale === "es" && (
          <motion.span
            layoutId="activeLocale"
            className="absolute inset-0 -z-10 rounded bg-foreground/5"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </button>
    </div>
  );
};
