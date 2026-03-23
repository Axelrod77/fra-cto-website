// Shared helpers for Pages Functions

export interface Env {
  DB: D1Database;
}

export function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export function error(message: string, status = 400) {
  return json({ error: message }, status);
}

export function generateInviteCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no I/O/0/1 to avoid confusion
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export function generateId(): string {
  return crypto.randomUUID();
}

// Basic input validation
export function validateString(val: unknown, field: string, maxLen = 200): string | null {
  if (typeof val !== "string" || val.trim().length === 0) return `${field} is required`;
  if (val.trim().length > maxLen) return `${field} must be under ${maxLen} characters`;
  return null;
}
