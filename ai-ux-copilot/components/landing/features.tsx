"use client";

import { motion } from "framer-motion";
import {
  Layout,
  Type,
  MousePointerClick,
  Palette,
  Accessibility,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: Layout,
    title: "Landing Page Blueprint",
    description:
      "Get a complete section-by-section breakdown optimized for your specific audience and industry.",
  },
  {
    icon: Type,
    title: "Conversion Copy",
    description:
      "AI-generated headlines, subheadlines, and body text engineered to drive signups and engagement.",
  },
  {
    icon: MousePointerClick,
    title: "CTA Strategy",
    description:
      "Strategic call-to-action placement, wording, and urgency tactics tailored to your pricing model.",
  },
  {
    icon: BarChart3,
    title: "Onboarding Flow",
    description:
      "Step-by-step onboarding design using progressive disclosure to maximize user activation.",
  },
  {
    icon: Palette,
    title: "Design System",
    description:
      "Color palette, typography, and spacing recommendations grounded in psychology and brand tone.",
  },
  {
    icon: Accessibility,
    title: "Accessibility Audit",
    description:
      "WCAG-referenced accessibility notes to ensure your product is inclusive from day one.",
  },
];

export function Features() {
  return (
    <section className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to ship a great UX
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            One prompt. Six dimensions of UX intelligence. Actionable output you
            can implement today.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group relative rounded-xl border border-border bg-card p-8 transition-all hover:shadow-lg hover:border-primary/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
