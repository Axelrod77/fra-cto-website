// GET /api/sessions/:code — Get session + all responses + composite
import { type Env, json, error } from "../_helpers";

interface DimensionScore {
  name: string;
  score: number;
}

interface ScoreResult {
  overall: number;
  dimensions: DimensionScore[];
}

export const onRequestGet: PagesFunction<Env> = async ({ params, env }) => {
  const code = (params.code as string).toUpperCase();

  const session = await env.DB.prepare(
    "SELECT * FROM team_sessions WHERE invite_code = ?"
  ).bind(code).first();

  if (!session) return error("Session not found", 404);

  const { results: responses } = await env.DB.prepare(
    "SELECT id, respondent_name, respondent_role, scores, submitted_at FROM team_responses WHERE session_id = ? ORDER BY submitted_at ASC"
  ).bind(session.id).all();

  // Compute composite from all responses
  let composite = null;
  if (responses.length > 0) {
    const allScores: ScoreResult[] = responses.map((r) => JSON.parse(r.scores as string));

    // Average each dimension across respondents
    const dimNames = allScores[0].dimensions.map((d) => d.name);
    const compositeDimensions = dimNames.map((name) => {
      const values = allScores.map((s) => {
        const dim = s.dimensions.find((d) => d.name === name);
        return dim ? dim.score : 0;
      });
      const avg = values.reduce((a, b) => a + b, 0) / values.length;
      const spread = Math.round((Math.max(...values) - Math.min(...values)) * 10) / 10;
      return { name, score: Math.round(avg * 10) / 10, spread, min: Math.min(...values), max: Math.max(...values) };
    });

    const overallAvg = compositeDimensions.reduce((a, d) => a + d.score, 0) / compositeDimensions.length;

    composite = {
      overall: Math.round(overallAvg * 10) / 10,
      dimensions: compositeDimensions,
      responseCount: responses.length,
    };
  }

  return json({
    session: {
      id: session.id,
      invite_code: session.invite_code,
      org_name: session.org_name,
      created_by_name: session.created_by_name,
      status: session.status,
      created_at: session.created_at,
    },
    responses: responses.map((r) => ({
      id: r.id,
      respondent_name: r.respondent_name,
      respondent_role: r.respondent_role,
      overall: JSON.parse(r.scores as string).overall,
      submitted_at: r.submitted_at,
    })),
    composite,
  });
};
