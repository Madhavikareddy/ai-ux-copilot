"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { INDUSTRIES, PRICING_MODELS, TONES } from "@/types";
import type { AnalysisFormData, UXBlueprint } from "@/types";
import { Loader2, Sparkles } from "lucide-react";

interface AnalysisFormProps {
  onGenerated: (formData: AnalysisFormData, blueprint: UXBlueprint) => void;
}

export function AnalysisForm({ onGenerated }: AnalysisFormProps) {
  const [formData, setFormData] = useState<AnalysisFormData>({
    startupName: "",
    problemStatement: "",
    targetAudience: "",
    industry: "",
    pricingModel: "",
    tone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateField(field: keyof AnalysisFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Generation failed");
        return;
      }

      onGenerated(formData, data.data);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Generate UX Blueprint
        </CardTitle>
        <CardDescription>
          Describe your product and our AI will generate a complete UX strategy.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Startup Name"
            placeholder="e.g. Acme Analytics"
            value={formData.startupName}
            onChange={(e) => updateField("startupName", e.target.value)}
            required
          />

          <Textarea
            label="Problem Statement"
            placeholder="What problem does your product solve? Who has this problem and how painful is it?"
            value={formData.problemStatement}
            onChange={(e) => updateField("problemStatement", e.target.value)}
            required
          />

          <Input
            label="Target Audience"
            placeholder="e.g. Small business owners who struggle with financial reporting"
            value={formData.targetAudience}
            onChange={(e) => updateField("targetAudience", e.target.value)}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              label="Industry"
              options={INDUSTRIES}
              value={formData.industry}
              onChange={(e) => updateField("industry", e.target.value)}
              placeholder="Select industry"
              required
            />

            <Select
              label="Pricing Model"
              options={PRICING_MODELS}
              value={formData.pricingModel}
              onChange={(e) => updateField("pricingModel", e.target.value)}
              placeholder="Select model"
              required
            />

            <Select
              label="Tone"
              options={TONES}
              value={formData.tone}
              onChange={(e) => updateField("tone", e.target.value)}
              placeholder="Select tone"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating Blueprint... (30-60s)
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate UX Blueprint
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
