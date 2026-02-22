// MOCK MODE ENABLED — Replace with real OpenAI integration later
import { NextResponse } from "next/server";
import type { UXBlueprint } from "@/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Simulate AI generation delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const mockUXBlueprint: UXBlueprint = {
      landingPageSections: [
        {
          id: "hero",
          name: "Hero Section",
          purpose: `Position ${body.startupName} as the best solution for ${body.targetAudience}.`,
          suggestedContent: `A bold headline introducing ${body.startupName}, a clear subheadline addressing the core pain point, and a prominent CTA button.`,
          orderIndex: 1,
        },
        {
          id: "problem",
          name: "Problem Section",
          purpose: body.problemStatement,
          suggestedContent: "Use relatable language to describe the frustrations your audience faces daily. Include statistics or a short story.",
          orderIndex: 2,
        },
        {
          id: "solution",
          name: "Solution Section",
          purpose: "Explain how your product uniquely solves the problem with measurable outcomes.",
          suggestedContent: `Show how ${body.startupName} turns the pain into a streamlined, delightful experience. Highlight 3 key differentiators.`,
          orderIndex: 3,
        },
        {
          id: "features",
          name: "Features Grid",
          purpose: "Showcase the core features that deliver value to users.",
          suggestedContent: "Display 4-6 features in a clean grid with icons, short titles, and one-liner descriptions.",
          orderIndex: 4,
        },
        {
          id: "social-proof",
          name: "Social Proof",
          purpose: "Add testimonials, metrics, and trust signals.",
          suggestedContent: "Include 2-3 customer quotes, logos of notable users, and key metrics like '10k+ users' or '4.9★ rating'.",
          orderIndex: 5,
        },
        {
          id: "final-cta",
          name: "Final CTA",
          purpose: "Encourage users to start a free trial.",
          suggestedContent: `Ready to transform your workflow? Start your free ${body.startupName} trial today — no credit card required.`,
          orderIndex: 6,
        },
      ],

      copySuggestions: {
        hero: {
          sectionId: "hero",
          headline: `${body.startupName} — Built for ${body.targetAudience}`,
          subheadline: body.problemStatement,
          bodyText: `${body.startupName} helps ${body.targetAudience} achieve more with less effort. Designed for the ${body.industry} space.`,
          ctaText: "Start Free Trial",
        },
        features: {
          sectionId: "features",
          headline: "Everything You Need, Nothing You Don't",
          subheadline: "Powerful features designed around real workflows.",
          bodyText: "From automated insights to seamless collaboration, every feature is built to save you time and drive results.",
          ctaText: "See All Features",
        },
        finalCta: {
          sectionId: "final-cta",
          headline: "Ready to Get Started?",
          subheadline: "Join thousands of teams already using " + body.startupName + ".",
          bodyText: "Start your free trial today. No credit card required. Cancel anytime.",
          ctaText: "Get Started Free",
        },
      },

      ctaStrategy: {
        primaryCTA: "Start Free Trial",
        secondaryCTA: "Book a Demo",
        placement: ["Hero section", "After features grid", "Final section", "Sticky header on scroll"],
        urgencyTactic: "Limited-time extended trial for early adopters (21 days instead of 14).",
        valueProposition: `${body.startupName} saves ${body.targetAudience} an average of 10+ hours per week.`,
      },

      onboardingFlow: [
        {
          stepNumber: 1,
          title: "Create Account",
          description: "Quick sign-up with email or SSO. Minimal friction.",
          uiElement: "Sign-up form",
          goal: "Get user registered",
        },
        {
          stepNumber: 2,
          title: "Onboarding Questionnaire",
          description: "3-4 quick questions to personalize the experience.",
          uiElement: "Multi-step form",
          goal: "Understand user needs",
        },
        {
          stepNumber: 3,
          title: "Interactive Walkthrough",
          description: "Guided tour of key features with tooltips and highlights.",
          uiElement: "Product tour overlay",
          goal: "Feature discovery",
        },
        {
          stepNumber: 4,
          title: "First Value Moment",
          description: "Help user complete their first meaningful action within 5 minutes.",
          uiElement: "Action prompt card",
          goal: "Deliver immediate value",
        },
        {
          stepNumber: 5,
          title: "Invite Team",
          description: "Prompt user to invite colleagues for collaboration.",
          uiElement: "Invite modal",
          goal: "Drive viral adoption",
        },
      ],

      dashboardLayout: [
        {
          name: "Sidebar Navigation",
          type: "navigation",
          purpose: "Primary navigation with collapsible sections.",
          placement: "left",
          priority: "high",
        },
        {
          name: "Analytics Overview",
          type: "chart",
          purpose: "Key metrics at a glance — usage, growth, engagement.",
          placement: "top-center",
          priority: "high",
        },
        {
          name: "Quick Actions",
          type: "action-panel",
          purpose: "Shortcuts to most common tasks.",
          placement: "top-right",
          priority: "high",
        },
        {
          name: "Recent Activity Feed",
          type: "feed",
          purpose: "Timeline of recent actions and notifications.",
          placement: "center",
          priority: "medium",
        },
        {
          name: "Getting Started Checklist",
          type: "checklist",
          purpose: "Guide new users through setup steps.",
          placement: "right-sidebar",
          priority: "medium",
        },
        {
          name: "Help & Resources",
          type: "widget",
          purpose: "Quick access to docs, support, and tutorials.",
          placement: "bottom-right",
          priority: "low",
        },
      ],

      designSystemSuggestion: {
        primaryColor: "#2563EB (Blue 600)",
        secondaryColor: "#1E293B (Slate 800)",
        accentColor: "#8B5CF6 (Violet 500)",
        fontHeading: "Inter — modern, clean, highly legible",
        fontBody: "Inter — consistent with heading for cohesion",
        borderRadius: "8px — friendly yet professional",
        spacing: "8pt grid system for consistent rhythm",
        reasoning: `A neutral palette with blue accents conveys trust and professionalism, ideal for ${body.industry}. Inter provides excellent readability across all sizes.`,
      },

      accessibilityNotes: [
        {
          area: "Color Contrast",
          issue: "Ensure text-to-background contrast meets minimum ratio.",
          recommendation: "Maintain at least 4.5:1 contrast ratio for body text and 3:1 for large text.",
          wcagLevel: "AA",
        },
        {
          area: "Interactive Elements",
          issue: "Buttons and links must have clear, descriptive labels.",
          recommendation: "Avoid generic labels like 'Click here'. Use action-oriented text like 'Start Free Trial'.",
          wcagLevel: "A",
        },
        {
          area: "Keyboard Navigation",
          issue: "All interactive elements must be reachable via keyboard.",
          recommendation: "Implement visible focus indicators and logical tab order throughout the application.",
          wcagLevel: "AA",
        },
        {
          area: "Typography",
          issue: "Font sizes must be readable without zooming.",
          recommendation: "Use minimum 16px for body text, 14px for secondary text. Support browser zoom up to 200%.",
          wcagLevel: "AA",
        },
      ],
    };

    return NextResponse.json({
      success: true,
      data: mockUXBlueprint,
    });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate blueprint. Please try again." },
      { status: 500 }
    );
  }
}
