"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="px-6 py-24 lg:px-8">
      <motion.div
        className="mx-auto max-w-3xl text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Stop guessing. Start designing with data.
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
          Join founders who use AI to build UX that converts. Your first
          blueprint is free.
        </p>
        <div className="mt-8">
          <Link href="/signup">
            <Button size="lg" className="gap-2">
              Generate Your Blueprint
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
