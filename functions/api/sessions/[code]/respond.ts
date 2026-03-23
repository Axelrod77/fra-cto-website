// POST /api/sessions/:code/respond — Submit a team member's response
import { type Env, json, error, generateId, validateString } from "../../_helpers";

interface RespondBody {
  respondent_name: string;
  respondent_role: string;
  answers: Record<string, string>;
  scores: { overall: number; dimensions: { name: string; score: number }[] };
}

export const onRequestPost: PagesFunction<Env> = async ({ params, request, env }) => {
  const code = (params.code as string).toUpperCase();

  let body: RespondBody;
  try {
    body = await request.json();
  } catch {
    return error("Invalid JSON body");
  }

  const v1 = validateString(body.respondent_name, "Name", 100);
  const v2 = validateString(body.respondent_role, "Role", 100);
  if (v1) return error(v1);
  if (v2) return error(v2);

  if (!body.answers || typeof body.answers !== "object") return error("Answers are required");
  if (!body.scores || typeof body.scores.overall !== "number") return error("Scores are required");

  const session = await env.DB.prepare(
    "SELECT id, status FROM team_sessions WHERE invite_code = ?"
  ).bind(code).first();

  if (!session) return error("Session not found", 404);
  if (session.status !== "open") return error("Session is closed", 403);

  const id = generateId();
  await env.DB.prepare(
    "INSERT INTO team_responses (id, session_id, respondent_name, respondent_role, answers, scores) VALUES (?, ?, ?, ?, ?, ?)"
  ).bind(
    id,
    session.id,
    body.respondent_name.trim(),
    body.respondent_role.trim(),
    JSON.stringify(body.answers),
    JSON.stringify(body.scores)
  ).run();

  return json({ id }, 201);
};
