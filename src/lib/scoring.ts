import { type Module } from "@/data/questionnaire";

export interface DimensionScore {
  name: string;
  score: number;
}

export interface ScoreResult {
  overall: number;
  dimensions: DimensionScore[];
}

export function computeScores(
  answers: Record<string, string>,
  modules: Module[]
): ScoreResult {
  const dimensionScores: Record<string, number[]> = {};

  for (const mod of modules) {
    const dims = mod.feedsInto;
    for (const section of mod.sections) {
      for (const question of section.questions) {
        const answer = answers[question.id];
        if (!answer) continue;

        const selected = question.options.find((opt) => opt.label === answer);
        const score = selected?.score ?? null;

        if (score !== null) {
          for (const dim of dims) {
            if (!dimensionScores[dim]) dimensionScores[dim] = [];
            dimensionScores[dim].push(score);
          }
        }
      }
    }
  }

  const dimensions: DimensionScore[] = [];
  for (const [name, scores] of Object.entries(dimensionScores)) {
    const avg =
      scores.length > 0
        ? scores.reduce((sum, s) => sum + s, 0) / scores.length
        : 0;
    dimensions.push({ name, score: Math.round(avg * 10) / 10 });
  }

  const overall =
    dimensions.length > 0
      ? dimensions.reduce((sum, d) => sum + d.score, 0) / dimensions.length
      : 0;

  return {
    overall: Math.round(overall * 10) / 10,
    dimensions,
  };
}
