"use client";

import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Describe Your Product",
    description:
      "Enter your startup name, problem statement, target audience, industry, pricing model, and brand tone.",
  },
  {
    step: "02",
    title: "AI Analyzes & Generates",
    description:
      "Our AI engine processes your inputs through a product-thinking framework to generate a tailored UX blueprint.",
  },
  {
    step: "03",
    title: "Review & Implement",
    description:
      "Get structured, editable recommendations for landing pages, onboarding, dashboards, copy, and design systems.",
  },
];

export function HowItWorks() {
  return (
    <section className="px-6 py-24 lg:px-8 bg-muted/30">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Three steps from idea to actionable UX blueprint
          </p>
        </div>

        <div className="space-y-12">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              className="flex items-start gap-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
            >
              <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                {item.step}
              </div>
              <div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
