"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { quickScanModules, maturityLevels } from "@/data/questionnaire";
import { computeScores, type ScoreResult } from "@/lib/scoring";
import { createSession, joinSession, submitResponse } from "@/lib/api";

type Mode = "choose" | "solo" | "team-create" | "team-invite" | "team-join" | "team-questions";

interface TeamContext {
  code: string;
  orgName: string;
  respondentName: string;
  respondentRole: string;
}

function QuickScanInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const teamParam = searchParams.get("team");

  const [mode, setMode] = useState<Mode>(teamParam ? "team-join" : "choose");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<ScoreResult | null>(null);
  const [teamCtx, setTeamCtx] = useState<TeamContext>({
    code: teamParam || "",
    orgName: "",
    respondentName: "",
    respondentRole: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Team create form
  const [createOrg, setCreateOrg] = useState("");
  const [createName, setCreateName] = useState("");
  const [createRole, setCreateRole] = useState("");

  // Team join form
  const [joinCode, setJoinCode] = useState(teamParam || "");
  const [joinName, setJoinName] = useState("");
  const [joinRole, setJoinRole] = useState("");
  const [joinOrgName, setJoinOrgName] = useState("");

  const questions = quickScanModules.flatMap((mod) =>
    mod.sections.flatMap((sec) => sec.questions)
  );

  const answeredCount = Object.keys(answers).length;
  const totalCount = questions.length;
  const allAnswered = answeredCount === totalCount;

  // Auto-validate team code from URL
  useEffect(() => {
    if (teamParam && mode === "team-join") {
      // Pre-fill the code but let user enter their name/role
      setJoinCode(teamParam);
    }
  }, [teamParam, mode]);

  function handleAnswer(questionId: string, value: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

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

  async function handleCreateTeam() {
    setLoading(true);
    setError("");
    try {
      const res = await createSession(createOrg, createName, createRole);
      setTeamCtx({ code: res.invite_code, orgName: createOrg, respondentName: createName, respondentRole: createRole });
      setMode("team-invite");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create team scan");
    } finally {
      setLoading(false);
    }
  }

  async function handleJoinTeam() {
    setLoading(true);
    setError("");
    try {
      const res = await joinSession(joinCode, joinName, joinRole);
      setJoinOrgName(res.org_name);
      setTeamCtx({ code: joinCode.toUpperCase(), orgName: res.org_name, respondentName: joinName, respondentRole: joinRole });
      setMode("team-questions");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid invite code");
    } finally {
      setLoading(false);
    }
  }

  function handleGetScore() {
    const scoreResult = computeScores(answers, quickScanModules);
    setResults(scoreResult);
    setTimeout(() => {
      document.getElementById("quick-scan-results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  async function handleTeamSubmit() {
    const scoreResult = computeScores(answers, quickScanModules);
    setLoading(true);
    setError("");
    try {
      await submitResponse(teamCtx.code, teamCtx.respondentName, teamCtx.respondentRole, answers, scoreResult);
      router.push(`/quick-scan/team?code=${teamCtx.code}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to submit response");
      setLoading(false);
    }
  }

  const isTeamMode = mode === "team-questions" || (mode === "team-invite" && false);
  const showQuestions = mode === "solo" || mode === "team-questions";
  const showResults = mode === "solo" && results;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />

      {/* Intro */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-periwinkle-lighter)] text-[var(--color-plum)] text-sm font-medium mb-6">
            5-Minute Quick Scan
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-plum)] mb-4 leading-tight">
            How digitally mature is your organization?
          </h1>
          <p className="text-[var(--color-muted-foreground)] max-w-xl mx-auto leading-relaxed">
            Answer {totalCount} questions to get an instant maturity score across 12 dimensions.
            No sign-up required. Takes under 5 minutes.
          </p>
        </div>
      </section>

      {/* Mode Selection */}
      {mode === "choose" && (
        <section className="px-6 pb-12">
          <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-6">
            <Card
              className="border-border/50 hover:border-[var(--color-periwinkle)] transition-colors cursor-pointer"
              onClick={() => setMode("solo")}
            >
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-14 h-14 rounded-full bg-[var(--color-periwinkle-lighter)] flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-[var(--color-plum)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-[var(--color-plum)] text-lg mb-2">Solo Scan</h3>
                <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed mb-6">
                  Answer {totalCount} questions yourself and get your score instantly.
                </p>
                <Button className="bg-[var(--color-plum)] hover:bg-[var(--color-plum-light)] text-white px-8">
                  Start
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-[var(--color-periwinkle)] transition-colors">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-14 h-14 rounded-full bg-[var(--color-periwinkle-lighter)] flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-[var(--color-plum)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-[var(--color-plum)] text-lg mb-2">Team Scan</h3>
                <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed mb-6">
                  Invite your team. Everyone fills it independently. See where you agree — and where you don&apos;t.
                </p>
                <div className="flex gap-3 justify-center">
                  <Button
                    className="bg-[var(--color-teal)] hover:bg-[var(--color-teal-dark)] text-white px-6"
                    onClick={() => setMode("team-create")}
                  >
                    Start New
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[var(--color-periwinkle)] text-[var(--color-plum)] hover:bg-[var(--color-periwinkle-lighter)] px-6"
                    onClick={() => setMode("team-join")}
                  >
                    Join Team
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Team Create Form */}
      {mode === "team-create" && (
        <section className="px-6 pb-12">
          <div className="max-w-md mx-auto">
            <Card className="border-border/50">
              <CardContent className="pt-6">
                <h2 className="text-lg font-bold text-[var(--color-plum)] mb-4">Start a Team Scan</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[var(--color-plum)]">Organization *</Label>
                    <Input value={createOrg} onChange={(e) => setCreateOrg(e.target.value)} placeholder="e.g. LSEG India" maxLength={200} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[var(--color-plum)]">Your Name *</Label>
                    <Input value={createName} onChange={(e) => setCreateName(e.target.value)} placeholder="Your name" maxLength={100} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[var(--color-plum)]">Your Role *</Label>
                    <Input value={createRole} onChange={(e) => setCreateRole(e.target.value)} placeholder="e.g. CTO, VP Engineering" maxLength={100} />
                  </div>
                  {error && <p className="text-sm text-red-600">{error}</p>}
                  <div className="flex gap-3">
                    <Button variant="ghost" onClick={() => { setMode("choose"); setError(""); }} className="text-[var(--color-muted-foreground)]">
                      Back
                    </Button>
                    <Button
                      className="flex-1 bg-[var(--color-teal)] hover:bg-[var(--color-teal-dark)] text-white"
                      disabled={!createOrg.trim() || !createName.trim() || !createRole.trim() || loading}
                      onClick={handleCreateTeam}
                    >
                      {loading ? "Creating..." : "Create Team Scan"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Team Invite Screen */}
      {mode === "team-invite" && (
        <section className="px-6 pb-12">
          <div className="max-w-md mx-auto">
            <Card className="border-[var(--color-periwinkle)]">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-14 h-14 rounded-full bg-[var(--color-periwinkle-lighter)] flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-[var(--color-teal)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-[var(--color-plum)] mb-2">Your Team Scan is ready!</h2>
                <p className="text-sm text-[var(--color-muted-foreground)] mb-6">Share this code with your team:</p>

                <div className="bg-[var(--color-muted)] rounded-xl p-6 mb-4">
                  <div className="text-3xl font-mono font-bold text-[var(--color-plum)] tracking-[0.3em] mb-3">
                    {teamCtx.code}
                  </div>
                  <Button
                    variant="ghost"
                    className="text-[var(--color-periwinkle)] hover:bg-[var(--color-periwinkle-lighter)] text-sm"
                    onClick={() => navigator.clipboard.writeText(teamCtx.code)}
                  >
                    Copy Code
                  </Button>
                </div>

                <div className="bg-[var(--color-muted)] rounded-xl p-4 mb-6">
                  <p className="text-xs text-[var(--color-muted-foreground)] mb-2">Or share the link:</p>
                  <div className="flex items-center gap-2 justify-center">
                    <code className="text-xs text-[var(--color-plum)] bg-white px-3 py-1.5 rounded border border-border/50">
                      fra-cto.com/quick-scan?team={teamCtx.code}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[var(--color-periwinkle)] hover:bg-[var(--color-periwinkle-lighter)] text-xs h-8"
                      onClick={() => navigator.clipboard.writeText(`https://fra-cto.com/quick-scan?team=${teamCtx.code}`)}
                    >
                      Copy
                    </Button>
                  </div>
                </div>

                <p className="text-xs text-[var(--color-muted-foreground)] mb-6">
                  Team members can join anytime. You&apos;ll see their results on the dashboard.
                </p>

                <Button
                  size="lg"
                  className="bg-[var(--color-teal)] hover:bg-[var(--color-teal-dark)] text-white px-8"
                  onClick={() => setMode("team-questions")}
                >
                  Start My Quick Scan
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Team Join Form */}
      {mode === "team-join" && (
        <section className="px-6 pb-12">
          <div className="max-w-md mx-auto">
            <Card className="border-border/50">
              <CardContent className="pt-6">
                <h2 className="text-lg font-bold text-[var(--color-plum)] mb-4">Join a Team Scan</h2>
                {joinOrgName && (
                  <div className="bg-[var(--color-periwinkle-lighter)] rounded-lg p-3 mb-4 text-sm text-[var(--color-plum)]">
                    Joining: <strong>{joinOrgName}</strong>
                  </div>
                )}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[var(--color-plum)]">Invite Code *</Label>
                    <Input
                      value={joinCode}
                      onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                      placeholder="e.g. X7K2P9"
                      maxLength={6}
                      className="text-center text-lg font-mono tracking-[0.2em]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[var(--color-plum)]">Your Name *</Label>
                    <Input value={joinName} onChange={(e) => setJoinName(e.target.value)} placeholder="Your name" maxLength={100} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[var(--color-plum)]">Your Role *</Label>
                    <Input value={joinRole} onChange={(e) => setJoinRole(e.target.value)} placeholder="e.g. VP Engineering" maxLength={100} />
                  </div>
                  {error && <p className="text-sm text-red-600">{error}</p>}
                  <div className="flex gap-3">
                    {!teamParam && (
                      <Button variant="ghost" onClick={() => { setMode("choose"); setError(""); }} className="text-[var(--color-muted-foreground)]">
                        Back
                      </Button>
                    )}
                    <Button
                      className="flex-1 bg-[var(--color-teal)] hover:bg-[var(--color-teal-dark)] text-white"
                      disabled={joinCode.trim().length < 6 || !joinName.trim() || !joinRole.trim() || loading}
                      onClick={handleJoinTeam}
                    >
                      {loading ? "Joining..." : "Join & Start"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Progress */}
      {showQuestions && !results && (
        <div className="max-w-3xl mx-auto px-6 mb-6">
          {mode === "team-questions" && (
            <div className="bg-[var(--color-periwinkle-lighter)] rounded-lg p-3 mb-4 flex items-center justify-between">
              <span className="text-sm text-[var(--color-plum)]">
                Team Scan: <strong>{teamCtx.orgName}</strong>
              </span>
              <span className="text-xs font-mono text-[var(--color-periwinkle)]">{teamCtx.code}</span>
            </div>
          )}
          <div className="flex items-center justify-between text-sm text-[var(--color-muted-foreground)] mb-2">
            <span>{answeredCount} of {totalCount} answered</span>
            <span>{Math.round((answeredCount / totalCount) * 100)}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--color-periwinkle)] rounded-full transition-all duration-500"
              style={{ width: `${(answeredCount / totalCount) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Questions */}
      {showQuestions && !results && (
        <section className="px-6 pb-12">
          <div className="max-w-3xl mx-auto space-y-6">
            {questions.map((question, idx) => {
              const mod = quickScanModules.find((m) =>
                m.sections.some((s) => s.questions.some((q) => q.id === question.id))
              );
              const dimension = mod?.feedsInto[0] ?? "";

              return (
                <Card
                  key={question.id}
                  className={`border transition-colors ${
                    answers[question.id]
                      ? "border-[var(--color-periwinkle)]"
                      : "border-border/50"
                  }`}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-[var(--color-periwinkle-lighter)] text-[var(--color-plum)] font-bold flex items-center justify-center text-sm shrink-0">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-medium text-[var(--color-periwinkle)] mb-2 uppercase tracking-wide">
                          {dimension}
                        </div>
                        <p className="text-[var(--color-plum)] font-medium mb-4 leading-relaxed">
                          {question.text}
                        </p>
                        <RadioGroup
                          value={answers[question.id] ?? ""}
                          onValueChange={(val) => handleAnswer(question.id, val)}
                          className="space-y-2"
                        >
                          {question.options?.map((opt) => (
                            <div
                              key={opt.label}
                              className="flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--color-periwinkle-lighter)]/50 transition-colors cursor-pointer"
                            >
                              <RadioGroupItem
                                value={opt.label}
                                id={`${question.id}-${opt.label}`}
                                className="mt-0.5 border-[var(--color-periwinkle)] text-[var(--color-plum)]"
                              />
                              <Label
                                htmlFor={`${question.id}-${opt.label}`}
                                className="text-sm text-[var(--color-plum)] leading-relaxed cursor-pointer flex-1"
                              >
                                {opt.label}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            <div className="pt-4 text-center">
              {mode === "solo" ? (
                <Button
                  size="lg"
                  onClick={handleGetScore}
                  disabled={!allAnswered}
                  className="bg-[var(--color-plum)] hover:bg-[var(--color-plum-light)] text-white px-12 py-6 text-base disabled:opacity-40"
                >
                  {allAnswered
                    ? "Get Your Score"
                    : `Answer all ${totalCount} questions to continue (${totalCount - answeredCount} remaining)`}
                </Button>
              ) : (
                <>
                  {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
                  <Button
                    size="lg"
                    onClick={handleTeamSubmit}
                    disabled={!allAnswered || loading}
                    className="bg-[var(--color-teal)] hover:bg-[var(--color-teal-dark)] text-white px-12 py-6 text-base disabled:opacity-40"
                  >
                    {loading
                      ? "Submitting..."
                      : allAnswered
                        ? "Submit & View Team Results"
                        : `Answer all ${totalCount} questions to continue (${totalCount - answeredCount} remaining)`}
                  </Button>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Solo Results */}
      {showResults && results && (
        <section id="quick-scan-results" className="px-6 pb-20">
          <div className="max-w-3xl mx-auto">
            <Card className="border-[var(--color-plum)] mb-8">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="text-6xl font-bold text-[var(--color-plum)] mb-2">
                  {results.overall}
                  <span className="text-2xl text-[var(--color-muted-foreground)] font-normal"> / 5.0</span>
                </div>
                <div
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold text-white mt-3"
                  style={{ backgroundColor: getMaturityLevel(results.overall).color }}
                >
                  {getMaturityLevel(results.overall).label}
                </div>
                <p className="text-sm text-[var(--color-muted-foreground)] mt-4 max-w-md mx-auto">
                  {getMaturityLevel(results.overall).description}
                </p>
              </CardContent>
            </Card>

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[var(--color-plum)]">Score by Dimension</h2>
              <Button
                variant="ghost"
                className="text-[var(--color-periwinkle)] hover:bg-[var(--color-periwinkle-lighter)] text-sm"
                onClick={() => {
                  const text = `FraCTO Quick Scan Results\nOverall: ${results.overall}/5.0 (${getMaturityLevel(results.overall).label})\n\n${results.dimensions.map(d => `${d.name}: ${d.score}/5.0 (${getMaturityLevel(d.score).label})`).join('\n')}`;
                  navigator.clipboard.writeText(text);
                }}
              >
                Copy Results
              </Button>
            </div>
            <div className="space-y-3 mb-10">
              {results.dimensions.map((dim) => (
                <div key={dim.name} className="bg-white rounded-xl border border-border/50 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[var(--color-plum)]">{dim.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[var(--color-plum)]">{dim.score}</span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full text-white font-medium"
                        style={{ backgroundColor: getMaturityLevel(dim.score).color }}
                      >
                        {getMaturityLevel(dim.score).label}
                      </span>
                    </div>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${getBarColor(dim.score)}`}
                      style={{ width: `${(dim.score / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Card className="bg-[var(--color-plum)] text-white border-none">
              <CardContent className="pt-8 pb-8 text-center">
                <h3 className="text-xl font-bold mb-3">Want to go deeper?</h3>
                <p className="text-white/80 text-sm mb-6 max-w-md mx-auto">
                  This quick scan gives you a high-level view. Our diagnostic engagement goes deeper with
                  expert interviews, architecture review, and a board-ready roadmap — all in 2-3 weeks.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href={`/express-interest?score=${results.overall}&level=${encodeURIComponent(getMaturityLevel(results.overall).label)}&dims=${encodeURIComponent(results.dimensions.map(d => `${d.name}:${d.score}`).join(','))}`}>
                    <Button
                      size="lg"
                      className="bg-white text-[var(--color-plum)] hover:bg-white/90 px-8"
                    >
                      Express Interest
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => {
                      setResults(null);
                      setAnswers({});
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="border-white/30 text-white hover:bg-white/10 bg-transparent px-8"
                  >
                    Retake Quick Scan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  );
}

export default function QuickScanPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-[var(--color-muted-foreground)]">Loading...</div>
        </div>
      }
    >
      <QuickScanInner />
    </Suspense>
  );
}
