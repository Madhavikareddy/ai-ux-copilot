"use client";

import { useState } from "react";
import { AnalysisForm } from "@/components/dashboard/analysis-form";
import { ReportView } from "@/components/report/report-view";
import type { AnalysisFormData, UXBlueprint } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// User Flow: Dashboard → Fill Form → Generate → View Report → Edit
export default function DashboardPage() {
  const [result, setResult] = useState<{
    formData: AnalysisFormData;
    blueprint: UXBlueprint;
    generatedAt: Date;
  } | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);

  async function handleRegenerate() {
    if (!result) return;
    setIsRegenerating(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.formData),
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setResult({
          formData: result.formData,
          blueprint: data.data,
          generatedAt: new Date(),
        });
      }
    } catch {
      // silently fail — user can retry
    } finally {
      setIsRegenerating(false);
    }
  }

  if (result) {
    return (
      <div className="space-y-6">
        <Button
          variant="ghost"
          className="gap-2"
          onClick={() => setResult(null)}
        >
          <ArrowLeft className="h-4 w-4" />
          New Analysis
        </Button>
        <ReportView
          blueprint={result.blueprint}
          formData={result.formData}
          generatedAt={result.generatedAt}
          onRegenerate={handleRegenerate}
          isRegenerating={isRegenerating}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">New Analysis</h1>
        <p className="text-muted-foreground mt-1">
          Describe your product and generate a complete UX blueprint.
        </p>
      </div>
      <AnalysisForm
        onGenerated={(formData, blueprint) =>
          setResult({ formData, blueprint, generatedAt: new Date() })
        }
      />
    </div>
  );
}
