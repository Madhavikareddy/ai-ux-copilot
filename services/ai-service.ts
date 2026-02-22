import { openai } from "@/lib/openai";
import { buildSystemPrompt, buildUserPrompt } from "./prompt-templates";
import { AnalysisFormData, UXBlueprint } from "@/types";
import { z } from "zod";

// --- Zod validation schema for AI output ---
const LandingPageSectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  purpose: z.string(),
  suggestedContent: z.string(),
  orderIndex: z.number(),
});

const CopySuggestionSchema = z.object({
  sectionId: z.string(),
  headline: z.string(),
  subheadline: z.string(),
  bodyText: z.string(),
  ctaText: z.string(),
});

const CTAStrategySchema = z.object({
  primaryCTA: z.string(),
  secondaryCTA: z.string(),
  placement: z.array(z.string()),
  urgencyTactic: z.string(),
  valueProposition: z.string(),
});

const OnboardingStepSchema = z.object({
  stepNumber: z.number(),
  title: z.string(),
  description: z.string(),
  uiElement: z.string(),
  goal: z.string(),
});

const DashboardWidgetSchema = z.object({
  name: z.string(),
  type: z.string(),
  purpose: z.string(),
  placement: z.string(),
  priority: z.enum(["high", "medium", "low"]),
});

const DesignSystemSchema = z.object({
  primaryColor: z.string(),
  secondaryColor: z.string(),
  accentColor: z.string(),
  fontHeading: z.string(),
  fontBody: z.string(),
  borderRadius: z.string(),
  spacing: z.string(),
  reasoning: z.string(),
});

const AccessibilityNoteSchema = z.object({
  area: z.string(),
  issue: z.string(),
  recommendation: z.string(),
  wcagLevel: z.string(),
});

const UXBlueprintSchema = z.object({
  landingPageSections: z.array(LandingPageSectionSchema),
  copySuggestions: z.record(z.string(), CopySuggestionSchema),
  ctaStrategy: CTAStrategySchema,
  onboardingFlow: z.array(OnboardingStepSchema),
  dashboardLayout: z.array(DashboardWidgetSchema),
  designSystemSuggestion: DesignSystemSchema,
  accessibilityNotes: z.array(AccessibilityNoteSchema),
});

// --- Rate limiter (simple in-memory) ---
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(userId: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(userId);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(userId, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT) {
    return false;
  }

  entry.count++;
  return true;
}

// --- Main generation function ---
export async function generateUXBlueprint(
  formData: AnalysisFormData,
  userId: string
): Promise<{ success: true; data: UXBlueprint } | { success: false; error: string }> {
  // Rate limit check
  if (!checkRateLimit(userId)) {
    return {
      success: false,
      error: "Rate limit exceeded. You can generate up to 5 blueprints per hour.",
    };
  }

  // Input validation
  const requiredFields: (keyof AnalysisFormData)[] = [
    "startupName",
    "problemStatement",
    "targetAudience",
    "industry",
    "pricingModel",
    "tone",
  ];

  for (const field of requiredFields) {
    if (!formData[field] || formData[field].trim().length === 0) {
      return { success: false, error: `Missing required field: ${field}` };
    }
  }

  if (formData.problemStatement.length > 1000) {
    return { success: false, error: "Problem statement must be under 1000 characters." };
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.7,
      max_tokens: 4000,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: buildSystemPrompt() },
        { role: "user", content: buildUserPrompt(formData) },
      ],
    });

    const content = response.choices[0]?.message?.content;

    if (!content) {
      return { success: false, error: "AI returned empty response. Please try again." };
    }

    // Parse JSON safely
    let parsed: unknown;
    try {
      parsed = JSON.parse(content);
    } catch {
      return { success: false, error: "AI returned malformed JSON. Please try again." };
    }

    // Validate with Zod
    const result = UXBlueprintSchema.safeParse(parsed);

    if (!result.success) {
      console.error("Zod validation errors:", result.error.flatten());
      return {
        success: false,
        error: "AI output did not match expected format. Please try again.",
      };
    }

    return { success: true, data: result.data };
  } catch (error: unknown) {
    console.error("OpenAI API error:", error);

    if (error instanceof Error && error.message.includes("401")) {
      return { success: false, error: "Invalid API key. Please check your configuration." };
    }

    if (error instanceof Error && error.message.includes("429")) {
      return { success: false, error: "API rate limit reached. Please try again later." };
    }

    return { success: false, error: "Failed to generate blueprint. Please try again." };
  }
}
