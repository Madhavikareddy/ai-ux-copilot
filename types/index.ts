// ============================================
// AI UX Co-Pilot — Core Type Definitions
// ============================================

// --- Form Input Types ---

export interface AnalysisFormData {
  startupName: string;
  problemStatement: string;
  targetAudience: string;
  industry: string;
  pricingModel: string;
  tone: string;
}

export const INDUSTRIES = [
  "SaaS / Software",
  "E-Commerce",
  "FinTech",
  "HealthTech",
  "EdTech",
  "MarketPlace",
  "AI / ML",
  "Developer Tools",
  "Productivity",
  "Social / Community",
  "Media / Content",
  "Other",
] as const;

export const PRICING_MODELS = [
  "Freemium",
  "Free Trial → Paid",
  "Usage-Based",
  "Flat Rate",
  "Tiered",
  "Per Seat",
  "Enterprise / Custom",
] as const;

export const TONES = [
  "Professional",
  "Friendly & Approachable",
  "Bold & Disruptive",
  "Minimalist & Clean",
  "Playful & Creative",
  "Technical & Precise",
  "Luxurious & Premium",
] as const;

// --- AI Output Types ---

export interface LandingPageSection {
  id: string;
  name: string;
  purpose: string;
  suggestedContent: string;
  orderIndex: number;
}

export interface CopySuggestion {
  sectionId: string;
  headline: string;
  subheadline: string;
  bodyText: string;
  ctaText: string;
}

export interface CTAStrategy {
  primaryCTA: string;
  secondaryCTA: string;
  placement: string[];
  urgencyTactic: string;
  valueProposition: string;
}

export interface OnboardingStep {
  stepNumber: number;
  title: string;
  description: string;
  uiElement: string;
  goal: string;
}

export interface DashboardWidget {
  name: string;
  type: string;
  purpose: string;
  placement: string;
  priority: "high" | "medium" | "low";
}

export interface DesignSystemSuggestion {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontHeading: string;
  fontBody: string;
  borderRadius: string;
  spacing: string;
  reasoning: string;
}

export interface AccessibilityNote {
  area: string;
  issue: string;
  recommendation: string;
  wcagLevel: string;
}

export interface UXBlueprint {
  landingPageSections: LandingPageSection[];
  copySuggestions: Record<string, CopySuggestion>;
  ctaStrategy: CTAStrategy;
  onboardingFlow: OnboardingStep[];
  dashboardLayout: DashboardWidget[];
  designSystemSuggestion: DesignSystemSuggestion;
  accessibilityNotes: AccessibilityNote[];
}

// --- Report Types ---

export interface Report {
  id: string;
  formData: AnalysisFormData;
  blueprint: UXBlueprint;
  createdAt: string;
  updatedAt: string;
}

// --- Auth Types ---

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface Session {
  userId: string;
  email: string;
  name: string;
}

// --- API Types ---

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export type GenerationStatus = "idle" | "generating" | "complete" | "error";
