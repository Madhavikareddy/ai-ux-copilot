import { AnalysisFormData } from "@/types";

export function buildSystemPrompt(): string {
  return `You are an elite UX architect and SaaS product strategist with 15+ years of experience designing high-converting landing pages, onboarding flows, and dashboard layouts for B2B/B2C SaaS products.

Your role is to provide ACTIONABLE, SPECIFIC, and STRATEGIC UX recommendations — never generic advice.

## Output Rules:
1. Return ONLY valid JSON matching the exact schema provided
2. Every suggestion must be specific to the user's product, audience, and industry
3. Use product-thinking language: focus on conversion, retention, activation, and user delight
4. Copy suggestions must be ready-to-use — not placeholder text
5. Color and typography choices must include reasoning tied to the brand's tone and audience psychology
6. Accessibility notes must reference specific WCAG guidelines
7. Onboarding flow must follow progressive disclosure principles
8. Dashboard layout must prioritize the user's core "aha moment"

## Quality Standards:
- No filler phrases like "innovative solution" or "cutting-edge technology"
- Headlines must be benefit-driven, not feature-driven
- CTAs must create urgency or curiosity without being manipulative
- Every section must have a clear conversion purpose
- Design system choices must be justified with psychology or UX research`;
}

export function buildUserPrompt(data: AnalysisFormData): string {
  return `Analyze this SaaS product and generate a complete UX blueprint:

## Product Details:
- **Startup Name:** ${data.startupName}
- **Problem Statement:** ${data.problemStatement}
- **Target Audience:** ${data.targetAudience}
- **Industry:** ${data.industry}
- **Pricing Model:** ${data.pricingModel}
- **Brand Tone:** ${data.tone}

## Required Output (JSON):
{
  "landingPageSections": [
    {
      "id": "unique-id",
      "name": "Section Name",
      "purpose": "Why this section exists and its conversion goal",
      "suggestedContent": "Detailed description of what to include",
      "orderIndex": 0
    }
  ],
  "copySuggestions": {
    "section-id": {
      "sectionId": "matches landing page section id",
      "headline": "Benefit-driven headline",
      "subheadline": "Supporting value proposition",
      "bodyText": "Persuasive body copy",
      "ctaText": "Action-oriented CTA text"
    }
  },
  "ctaStrategy": {
    "primaryCTA": "Main call-to-action text",
    "secondaryCTA": "Alternative/softer CTA text",
    "placement": ["List of optimal placement locations"],
    "urgencyTactic": "Specific urgency/scarcity approach",
    "valueProposition": "Core value prop driving the CTA"
  },
  "onboardingFlow": [
    {
      "stepNumber": 1,
      "title": "Step title",
      "description": "What happens in this step",
      "uiElement": "Specific UI component recommendation",
      "goal": "What user should achieve/feel"
    }
  ],
  "dashboardLayout": [
    {
      "name": "Widget/Section name",
      "type": "chart|metric|list|action|status",
      "purpose": "Why this exists on the dashboard",
      "placement": "top-left|top-right|center|sidebar|bottom",
      "priority": "high|medium|low"
    }
  ],
  "designSystemSuggestion": {
    "primaryColor": "#hex with name",
    "secondaryColor": "#hex with name",
    "accentColor": "#hex with name",
    "fontHeading": "Font name + why",
    "fontBody": "Font name + why",
    "borderRadius": "Value + reasoning",
    "spacing": "System description",
    "reasoning": "Overall design philosophy explanation"
  },
  "accessibilityNotes": [
    {
      "area": "Specific area of the product",
      "issue": "Potential accessibility concern",
      "recommendation": "Specific fix",
      "wcagLevel": "A|AA|AAA"
    }
  ]
}

Generate 6-8 landing page sections, 5-7 onboarding steps, 6-8 dashboard widgets, and 4-6 accessibility notes. Be specific to this exact product — no generic advice.`;
}
