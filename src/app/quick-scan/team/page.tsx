"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { maturityLevels } from "@/data/questionnaire";
import { getSession, type SessionDetail, type CompositeDimension } from "@/lib/api";

function getMaturityLevel(score: number) {
  return maturityLevels.find((l) => score >= l.min && score <= l.max) ?? maturityLevels[0];
}

function getBarColor(score: number) {
  if (score >= 4.3) return "bg-[var(--color-plum)]";
  if (score >= 3.5) return "bg-[var(--color-periwinkle)]";
  if (score >= 2.7) return "bg-yellow-500";
  if (score >= 1.9) return "bg-orange-500";
  return "bg-red-500";
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr + "Z").getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function TeamDashboardInner() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") || "";

  const [data, setData] = useState<SessionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!code) {
      setError("No team code provided");
      setLoading(false);
      return;
    }
    loadData();
  }, [code]);

  async function loadData() {
    setLoading(true);
    setError("");
    try {
      const result = await getSession(code);
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load team data");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col light-page">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-[var(--color-muted-foreground)]">Loading team results...</div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-background flex flex-col light-page">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center">
          <Card className="max-w-md mx-auto border-red-200">
            <CardContent className="pt-6 text-center">
              <p className="text-red-600 mb-4">{error || "Team scan not found"}</p>
              <Link href="/quick-scan">
                <Button className="bg-[var(--color-plum)] hover:bg-[var(--color-plum-light)] text-white">
                  Back to Quick Scan
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const { session, responses, composite } = data;

  // Build Express Interest URL with composite data
  const expressInterestUrl = composite
    ? `/express-interest?score=${composite.overall}&level=${encodeURIComponent(getMaturityLevel(composite.overall).label)}&dims=${encodeURIComponent(composite.dimensions.map(d => `${d.name}:${d.score}`).join(','))}&team=${session.invite_code}&responses=${responses.length}`
    : "/express-interest";

  return (
    <div className="min-h-screen bg-background flex flex-col light-page">
      <SiteHeader />

      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-plum)]">
                {session.org_name}
              </h1>
              <p className="text-sm text-[var(--color-muted-foreground)] mt-1">
                Team Quick Scan — {responses.length} response{responses.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-[var(--color-muted)] rounded-lg px-3 py-1.5 flex items-center gap-2">
                <span className="text-xs text-[var(--color-muted-foreground)]">Code:</span>
                <span className="font-mono font-bold text-[var(--color-plum)] tracking-wider">{session.invite_code}</span>
                <button
                  className="text-[var(--color-periwinkle)] hover:text-[var(--color-plum)] transition-colors"
                  onClick={() => navigator.clipboard.writeText(`https://fra-cto.com/quick-scan?team=${session.invite_code}`)}
                  title="Copy invite link"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-[var(--color-periwinkle)] hover:bg-[var(--color-periwinkle-lighter)]"
                onClick={loadData}
              >
                Refresh
              </Button>
            </div>
          </div>

          {/* Composite Score */}
          {composite ? (
            <>
              <Card className="border-[var(--color-plum)] mb-8">
                <CardContent className="pt-8 pb-8 text-center">
                  <p className="text-xs font-medium text-[var(--color-periwinkle)] uppercase tracking-wide mb-2">
                    Composite Score ({composite.responseCount} respondent{composite.responseCount !== 1 ? "s" : ""})
                  </p>
                  <div className="text-6xl font-bold text-[var(--color-plum)] mb-2">
                    {composite.overall}
                    <span className="text-2xl text-[var(--color-muted-foreground)] font-normal"> / 5.0</span>
                  </div>
                  <div
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold text-white mt-3"
                    style={{ backgroundColor: getMaturityLevel(composite.overall).color }}
                  >
                    {getMaturityLevel(composite.overall).label}
                  </div>
                </CardContent>
              </Card>

              {/* Dimension Scores with Variance */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-[var(--color-plum)]">Score by Dimension</h2>
                <div className="flex items-center gap-1 text-xs text-[var(--color-muted-foreground)]">
                  <svg className="w-3.5 h-3.5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  = high variance (spread &gt; 1.0)
                </div>
              </div>
              <div className="space-y-3 mb-10">
                {composite.dimensions.map((dim: CompositeDimension) => (
                  <div key={dim.name} className="bg-white rounded-xl border border-border/50 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-[var(--color-plum)]">{dim.name}</span>
                        {dim.spread > 1.0 && (
                          <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-[var(--color-muted-foreground)]">
                          {dim.min}–{dim.max} (spread {dim.spread})
                        </span>
                        <span className="text-sm font-bold text-[var(--color-plum)]">{dim.score}</span>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full text-white font-medium"
                          style={{ backgroundColor: getMaturityLevel(dim.score).color }}
                        >
                          {getMaturityLevel(dim.score).label}
                        </span>
                      </div>
                    </div>
                    {/* Score bar with min-max range indicator */}
                    <div className="relative h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${getBarColor(dim.score)}`}
                        style={{ width: `${(dim.score / 5) * 100}%` }}
                      />
                    </div>
                    {composite.responseCount > 1 && dim.spread > 0 && (
                      <div className="relative h-1 mt-1">
                        <div
                          className="absolute h-1 bg-orange-200 rounded-full"
                          style={{
                            left: `${(dim.min / 5) * 100}%`,
                            width: `${((dim.max - dim.min) / 5) * 100}%`,
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <Card className="border-border/50 mb-8">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-14 h-14 rounded-full bg-[var(--color-muted)] flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-[var(--color-muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[var(--color-plum)] mb-2">Waiting for responses</h3>
                <p className="text-sm text-[var(--color-muted-foreground)]">
                  Share the invite code with your team to get started.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Individual Responses Table */}
          <h2 className="text-xl font-bold text-[var(--color-plum)] mb-4">Individual Responses</h2>
          {responses.length > 0 ? (
            <Card className="border-border/50 mb-10">
              <CardContent className="pt-4 pb-2">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="py-3 px-3 text-left text-[var(--color-muted-foreground)] font-medium">Name</th>
                        <th className="py-3 px-3 text-left text-[var(--color-muted-foreground)] font-medium">Role</th>
                        <th className="py-3 px-3 text-right text-[var(--color-muted-foreground)] font-medium">Score</th>
                        <th className="py-3 px-3 text-right text-[var(--color-muted-foreground)] font-medium">Submitted</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      {responses.map((r) => (
                        <tr key={r.id}>
                          <td className="py-3 px-3 font-medium text-[var(--color-plum)]">{r.respondent_name}</td>
                          <td className="py-3 px-3 text-[var(--color-muted-foreground)]">{r.respondent_role}</td>
                          <td className="py-3 px-3 text-right">
                            <span className="font-bold text-[var(--color-plum)]">{r.overall}</span>
                            <span className="text-[var(--color-muted-foreground)]">/5.0</span>
                          </td>
                          <td className="py-3 px-3 text-right text-[var(--color-muted-foreground)]">
                            {timeAgo(r.submitted_at)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-border/50 mb-10">
              <CardContent className="pt-6 pb-6 text-center text-[var(--color-muted-foreground)] text-sm">
                No responses yet. Share the invite code with your team.
              </CardContent>
            </Card>
          )}

          {/* CTA */}
          {composite && (
            <Card className="bg-[var(--color-plum)] text-white border-none">
              <CardContent className="pt-8 pb-8 text-center">
                <h3 className="text-xl font-bold mb-3">Want to go deeper?</h3>
                <p className="text-white/80 text-sm mb-6 max-w-md mx-auto">
                  Your team&apos;s composite score and variance data will be included in your inquiry.
                  {composite.dimensions.some((d: CompositeDimension) => d.spread > 1.0) && (
                    <> We noticed significant disagreement on some dimensions — that&apos;s exactly what a diagnostic uncovers.</>
                  )}
                </p>
                <Link href={expressInterestUrl}>
                  <Button size="lg" className="bg-white text-[var(--color-plum)] hover:bg-white/90 px-8">
                    Express Interest
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

export default function TeamDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-[var(--color-muted-foreground)]">Loading team dashboard...</div>
        </div>
      }
    >
      <TeamDashboardInner />
    </Suspense>
  );
}
