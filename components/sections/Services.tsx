"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { TextReveal } from "@/components/ui/TextReveal";

type ServiceCardProps = {
  number: string;
  title: string;
  description: string;
  items: string[];
  index: number;
};

const ServiceCard = ({
  number,
  title,
  description,
  items,
  index,
}: ServiceCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1],
        delay: index * 0.15,
      }}
      className="group relative"
    >
      <div className="relative p-8 md:p-10 h-full border border-border rounded-2xl overflow-hidden transition-all duration-500 hover:border-foreground/30 hover:bg-foreground/[0.02]">
        {/* Background gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Number */}
        <span className="relative block text-xs text-muted tracking-widest mb-8 font-mono">
          {number}
        </span>

        {/* Title */}
        <h3 className="relative display-text text-3xl md:text-4xl mb-6 group-hover:text-accent transition-colors duration-500">
          {title}
        </h3>

        {/* Description */}
        <p className="relative body-text text-muted mb-8 leading-relaxed">
          {description}
        </p>

        {/* Service items */}
        <ul className="relative space-y-3">
          {items.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{
                duration: 0.4,
                delay: index * 0.15 + 0.4 + i * 0.1,
              }}
              className="flex items-center gap-3 text-sm text-foreground/80"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
              {item}
            </motion.li>
          ))}
        </ul>

        {/* Decorative corner */}
        <div className="absolute bottom-0 right-0 w-24 h-24 overflow-hidden">
          <div className="absolute bottom-0 right-0 w-48 h-48 transform translate-x-1/2 translate-y-1/2">
            <div className="w-full h-full rounded-full border border-foreground/5 group-hover:border-accent/20 transition-colors duration-500" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Services = () => {
  const t = useTranslations("services");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const services = [
    {
      number: t("development.number"),
      title: t("development.title"),
      description: t("development.description"),
      items: t.raw("development.items") as string[],
    },
    {
      number: t("consultancy.number"),
      title: t("consultancy.title"),
      description: t("consultancy.description"),
      items: t.raw("consultancy.items") as string[],
    },
    {
      number: t("products.number"),
      title: t("products.title"),
      description: t("products.description"),
      items: t.raw("products.items") as string[],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-32 md:py-48 overflow-hidden"
      aria-labelledby="services-title"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container-padding mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-20 md:mb-28">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="block text-xs uppercase tracking-[0.3em] text-accent mb-6"
          >
            {t("title")}
          </motion.span>

          <h2
            id="services-title"
            className="display-text text-4xl md:text-5xl lg:text-6xl max-w-3xl"
          >
            <TextReveal delay={0.1}>{t("subtitle")}</TextReveal>
          </h2>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.number}
              number={service.number}
              title={service.title}
              description={service.description}
              items={service.items}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
