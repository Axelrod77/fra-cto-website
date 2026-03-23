// Thin API client for team scan Pages Functions

const BASE = "/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error((data as { error?: string }).error || "Request failed");
  return data as T;
}

// Types
export interface SessionResponse {
  id: string;
  invite_code: string;
}

export interface JoinResponse {
  org_name: string;
  created_by: string;
  response_count: number;
}

export interface TeamResponseEntry {
  id: string;
  respondent_name: string;
  respondent_role: string;
  overall: number;
  submitted_at: string;
}

export interface CompositeDimension {
  name: string;
  score: number;
  spread: number;
  min: number;
  max: number;
}

export interface CompositeResult {
  overall: number;
  dimensions: CompositeDimension[];
  responseCount: number;
}

export interface SessionDetail {
  session: {
    id: string;
    invite_code: string;
    org_name: string;
    created_by_name: string;
    status: string;
    created_at: string;
  };
  responses: TeamResponseEntry[];
  composite: CompositeResult | null;
}

// API calls
export function createSession(org_name: string, created_by_name: string, created_by_role: string) {
  return request<SessionResponse>("/sessions", {
    method: "POST",
    body: JSON.stringify({ org_name, created_by_name, created_by_role }),
  });
}

export function joinSession(code: string, name: string, role: string) {
  return request<JoinResponse>(`/sessions/${code}/join`, {
    method: "POST",
    body: JSON.stringify({ name, role }),
  });
}

export function submitResponse(
  code: string,
  respondent_name: string,
  respondent_role: string,
  answers: Record<string, string>,
  scores: { overall: number; dimensions: { name: string; score: number }[] }
) {
  return request<{ id: string }>(`/sessions/${code}/respond`, {
    method: "POST",
    body: JSON.stringify({ respondent_name, respondent_role, answers, scores }),
  });
}

export function getSession(code: string) {
  return request<SessionDetail>(`/sessions/${code}`);
}
