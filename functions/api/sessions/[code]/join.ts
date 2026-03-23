// POST /api/sessions/:code/join — Validate session exists & is open
import { type Env, json, error, validateString } from "../../_helpers";

interface JoinBody {
  name: string;
  role: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ params, request, env }) => {
  const code = (params.code as string).toUpperCase();

  let body: JoinBody;
  try {
    body = await request.json();
  } catch {
    return error("Invalid JSON body");
  }

  const v1 = validateString(body.name, "Name", 100);
  const v2 = validateString(body.role, "Role", 100);
  if (v1) return error(v1);
  if (v2) return error(v2);

  const session = await env.DB.prepare(
    "SELECT id, org_name, status, created_by_name FROM team_sessions WHERE invite_code = ?"
  ).bind(code).first();

  if (!session) return error("Invalid invite code", 404);
  if (session.status !== "open") return error("This team scan is closed", 403);

  const { results } = await env.DB.prepare(
    "SELECT COUNT(*) as count FROM team_responses WHERE session_id = ?"
  ).bind(session.id).all();

  return json({
    org_name: session.org_name,
    created_by: session.created_by_name,
    response_count: (results[0] as { count: number }).count,
  });
};
