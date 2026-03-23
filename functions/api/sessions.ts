// POST /api/sessions — Create a team scan session
import { type Env, json, error, generateInviteCode, generateId, validateString } from "./_helpers";

interface CreateBody {
  org_name: string;
  created_by_name: string;
  created_by_role: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: CreateBody;
  try {
    body = await request.json();
  } catch {
    return error("Invalid JSON body");
  }

  const v1 = validateString(body.org_name, "Organization name");
  const v2 = validateString(body.created_by_name, "Your name", 100);
  const v3 = validateString(body.created_by_role, "Your role", 100);
  if (v1) return error(v1);
  if (v2) return error(v2);
  if (v3) return error(v3);

  const id = generateId();

  // Retry invite code generation on collision (unlikely but safe)
  let invite_code = "";
  for (let attempt = 0; attempt < 5; attempt++) {
    invite_code = generateInviteCode();
    const existing = await env.DB.prepare(
      "SELECT id FROM team_sessions WHERE invite_code = ?"
    ).bind(invite_code).first();
    if (!existing) break;
  }

  await env.DB.prepare(
    "INSERT INTO team_sessions (id, invite_code, org_name, created_by_name, created_by_role) VALUES (?, ?, ?, ?, ?)"
  ).bind(id, invite_code, body.org_name.trim(), body.created_by_name.trim(), body.created_by_role.trim()).run();

  return json({ id, invite_code }, 201);
};
