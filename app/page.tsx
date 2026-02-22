import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { CTASection } from "@/components/landing/cta-section";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Link from "next/link";

// User Flow: Landing Page → Auth → Dashboard → Generate → View Report → Save → Edit
export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 glass">
        <nav className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-bold tracking-tight">
            AI UX Co-Pilot
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/login"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <CTASection />
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8">
        <div className="mx-auto max-w-6xl flex items-center justify-between text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AI UX Co-Pilot. All rights reserved.</p>
          <p>Built with AI-powered product thinking.</p>
        </div>
      </footer>
    </div>
  );
}
