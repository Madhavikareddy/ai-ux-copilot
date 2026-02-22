"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { UXBlueprint, AnalysisFormData } from "@/types";
import {
  Layout,
  Type,
  MousePointerClick,
  BarChart3,
  Palette,
  Accessibility,
  ChevronDown,
  ChevronUp,
  Pencil,
  Check,
  LayoutDashboard,
  RefreshCw,
  FileDown,
  Clock,
} from "lucide-react";

interface ReportViewProps {
  blueprint: UXBlueprint;
  formData: AnalysisFormData;
  generatedAt?: Date;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
}

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

function EditableText({
  value,
  onSave,
  multiline = false,
}: {
  value: string;
  onSave: (val: string) => void;
  multiline?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value);

  if (editing) {
    return (
      <div className="flex items-start gap-2">
        {multiline ? (
          <textarea
            className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm resize-none min-h-[60px]"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        ) : (
          <input
            className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        )}
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 shrink-0"
          onClick={() => {
            onSave(text);
            setEditing(false);
          }}
        >
          <Check className="h-3.5 w-3.5" />
        </Button>
      </div>
    );
  }

  return (
    <div className="group flex items-start gap-2">
      <span className="flex-1">{value}</span>
      <button
        onClick={() => setEditing(true)}
        className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
      >
        <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
      </button>
    </div>
  );
}

function CollapsibleSection({
  title,
  icon: Icon,
  children,
  defaultOpen = true,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader
          className="cursor-pointer select-none"
          onClick={() => setOpen(!open)}
        >
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-base">
              <Icon className="h-4 w-4" />
              {title}
            </span>
            {open ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </CardTitle>
        </CardHeader>
        {open && <CardContent>{children}</CardContent>}
      </Card>
    </motion.div>
  );
}

export function ReportView({
  blueprint,
  formData,
  generatedAt,
  onRegenerate,
  isRegenerating,
}: ReportViewProps) {
  const [bp, setBp] = useState(blueprint);
  const [timestamp] = useState(() => generatedAt ?? new Date());
  const [isExporting, setIsExporting] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = useCallback(async () => {
    if (!reportRef.current) return;
    setIsExporting(true);
    try {
      const html2canvas = (await import("html2canvas-pro")).default;
      const { jsPDF } = await import("jspdf");
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`${formData.startupName.replace(/\s+/g, "-").toLowerCase()}-ux-blueprint.pdf`);
    } catch (err) {
      console.error("PDF export failed:", err);
    } finally {
      setIsExporting(false);
    }
  }, [formData.startupName]);

  return (
    <div ref={reportRef} className="space-y-6">
      {/* Premium Report Hero */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-xl border border-border bg-card p-6 space-y-4"
      >
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">
            {formData.startupName}
          </h1>
          <p className="text-lg text-muted-foreground">
            UX Blueprint Report
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span>Generated {timeAgo(timestamp)}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{formData.industry}</Badge>
          <Badge variant="secondary">{formData.pricingModel}</Badge>
          <Badge variant="secondary">{formData.tone}</Badge>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          {onRegenerate && (
            <Button
              onClick={onRegenerate}
              disabled={isRegenerating}
              className="gap-2"
            >
              <RefreshCw
                className={`h-4 w-4 ${isRegenerating ? "animate-spin" : ""}`}
              />
              {isRegenerating ? "Regenerating…" : "Regenerate"}
            </Button>
          )}
          <Button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="gap-2"
          >
            <FileDown className={`h-4 w-4 ${isExporting ? "animate-bounce" : ""}`} />
            {isExporting ? "Exporting…" : "Export PDF"}
          </Button>
        </div>
      </motion.div>

      {/* Landing Page Sections */}
      <CollapsibleSection title="Landing Page Sections" icon={Layout}>
        <div className="space-y-4">
          {bp.landingPageSections
            .sort((a, b) => a.orderIndex - b.orderIndex)
            .map((section, i) => (
              <div
                key={section.id}
                className="rounded-lg border border-border p-4 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="font-semibold text-sm">{section.name}</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  <EditableText
                    value={section.purpose}
                    onSave={(val) => {
                      const updated = { ...bp };
                      updated.landingPageSections[i].purpose = val;
                      setBp(updated);
                    }}
                    multiline
                  />
                </p>
                <p className="text-sm">
                  <EditableText
                    value={section.suggestedContent}
                    onSave={(val) => {
                      const updated = { ...bp };
                      updated.landingPageSections[i].suggestedContent = val;
                      setBp(updated);
                    }}
                    multiline
                  />
                </p>
              </div>
            ))}
        </div>
      </CollapsibleSection>

      {/* Copy Suggestions */}
      <CollapsibleSection title="Copy Suggestions" icon={Type}>
        <div className="space-y-4">
          {Object.entries(bp.copySuggestions).map(([key, copy]) => (
            <div
              key={key}
              className="rounded-lg border border-border p-4 space-y-3"
            >
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  Headline
                </span>
                <p className="font-semibold mt-1">
                  <EditableText
                    value={copy.headline}
                    onSave={(val) => {
                      const updated = { ...bp };
                      updated.copySuggestions[key].headline = val;
                      setBp(updated);
                    }}
                  />
                </p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  Subheadline
                </span>
                <p className="text-sm mt-1">
                  <EditableText
                    value={copy.subheadline}
                    onSave={(val) => {
                      const updated = { ...bp };
                      updated.copySuggestions[key].subheadline = val;
                      setBp(updated);
                    }}
                  />
                </p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  Body
                </span>
                <p className="text-sm mt-1 text-muted-foreground">
                  <EditableText
                    value={copy.bodyText}
                    onSave={(val) => {
                      const updated = { ...bp };
                      updated.copySuggestions[key].bodyText = val;
                      setBp(updated);
                    }}
                    multiline
                  />
                </p>
              </div>
              {copy.ctaText && (
                <Badge variant="outline">CTA: {copy.ctaText}</Badge>
              )}
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* CTA Strategy */}
      <CollapsibleSection title="CTA Strategy" icon={MousePointerClick}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-lg border border-border p-4">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                Primary CTA
              </span>
              <p className="font-semibold mt-1">{bp.ctaStrategy.primaryCTA}</p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                Secondary CTA
              </span>
              <p className="font-semibold mt-1">
                {bp.ctaStrategy.secondaryCTA}
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-border p-4 space-y-2">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              Placement
            </span>
            <div className="flex flex-wrap gap-2">
              {bp.ctaStrategy.placement.map((p) => (
                <Badge key={p} variant="secondary">
                  {p}
                </Badge>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-border p-4">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              Urgency Tactic
            </span>
            <p className="text-sm mt-1">{bp.ctaStrategy.urgencyTactic}</p>
          </div>
          <div className="rounded-lg border border-border p-4">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              Value Proposition
            </span>
            <p className="text-sm mt-1">{bp.ctaStrategy.valueProposition}</p>
          </div>
        </div>
      </CollapsibleSection>

      {/* Onboarding Flow */}
      <CollapsibleSection title="Onboarding Flow" icon={BarChart3}>
        <div className="space-y-3">
          {bp.onboardingFlow
            .sort((a, b) => a.stepNumber - b.stepNumber)
            .map((step) => (
              <div
                key={step.stepNumber}
                className="flex gap-4 rounded-lg border border-border p-4"
              >
                <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary text-sm font-bold">
                  {step.stepNumber}
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-sm">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline">{step.uiElement}</Badge>
                    <Badge variant="success">{step.goal}</Badge>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </CollapsibleSection>

      {/* Dashboard Layout */}
      <CollapsibleSection title="Dashboard Layout" icon={LayoutDashboard}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {bp.dashboardLayout.map((widget) => (
            <div
              key={widget.name}
              className="rounded-lg border border-border p-4 space-y-2"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm">{widget.name}</h4>
                <Badge
                  variant={
                    widget.priority === "high"
                      ? "default"
                      : widget.priority === "medium"
                      ? "warning"
                      : "secondary"
                  }
                >
                  {widget.priority}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{widget.purpose}</p>
              <div className="flex gap-2">
                <Badge variant="outline">{widget.type}</Badge>
                <Badge variant="outline">{widget.placement}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Design System */}
      <CollapsibleSection title="Design System" icon={Palette}>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                label: "Primary",
                value: bp.designSystemSuggestion.primaryColor,
              },
              {
                label: "Secondary",
                value: bp.designSystemSuggestion.secondaryColor,
              },
              {
                label: "Accent",
                value: bp.designSystemSuggestion.accentColor,
              },
            ].map((color) => (
              <div
                key={color.label}
                className="rounded-lg border border-border p-3 text-center"
              >
                <div
                  className="h-10 rounded-md mb-2 border border-border"
                  style={{
                    backgroundColor: color.value.match(/#[0-9a-fA-F]{3,8}/)?.[0] || "#888",
                  }}
                />
                <span className="text-xs text-muted-foreground">
                  {color.label}
                </span>
                <p className="text-xs font-mono mt-0.5">{color.value}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-lg border border-border p-4">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                Heading Font
              </span>
              <p className="text-sm mt-1">
                {bp.designSystemSuggestion.fontHeading}
              </p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                Body Font
              </span>
              <p className="text-sm mt-1">
                {bp.designSystemSuggestion.fontBody}
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-border p-4">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              Design Reasoning
            </span>
            <p className="text-sm mt-1 text-muted-foreground">
              {bp.designSystemSuggestion.reasoning}
            </p>
          </div>
        </div>
      </CollapsibleSection>

      {/* Accessibility Notes */}
      <CollapsibleSection title="Accessibility Notes" icon={Accessibility}>
        <div className="space-y-3">
          {bp.accessibilityNotes.map((note, i) => (
            <div
              key={i}
              className="rounded-lg border border-border p-4 space-y-2"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm">{note.area}</h4>
                <Badge variant="outline">WCAG {note.wcagLevel}</Badge>
              </div>
              <p className="text-sm text-destructive">{note.issue}</p>
              <p className="text-sm text-muted-foreground">
                {note.recommendation}
              </p>
            </div>
          ))}
        </div>
      </CollapsibleSection>
    </div>
  );
}
