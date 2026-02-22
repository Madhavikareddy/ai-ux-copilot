"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import Link from "next/link";

// MVP: Reports are stored in-memory / localStorage
// Future: Persist to database
export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Previous Reports</h1>
        <p className="text-muted-foreground mt-1">
          View and manage your generated UX blueprints.
        </p>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <FileText className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">No reports yet</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm">
            Generate your first UX blueprint to see it here. Reports will be
            saved automatically after generation.
          </p>
          <Link
            href="/dashboard"
            className="mt-4 inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Create New Analysis
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
