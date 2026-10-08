import { CHECK_BY_ID } from '../data/checks';
import type { Answers } from './route';

/** A fork where the check answer disagreed with the route. */
export type Detour = { question: string; before: string | undefined; after: string };

/**
 * Applies the check answers (check id → option value) on top of the route.
 * Where a check disagrees with the original answer, the check wins: it was the
 * more concrete question. Returns the new answers and where they changed.
 */
export function applyChecks(answers: Answers, checkAnswers: Record<string, string>): { answers: Answers; detours: Detour[] } {
  const next: Answers = { ...answers };
  const detours: Detour[] = [];
  for (const [checkId, value] of Object.entries(checkAnswers)) {
    const check = CHECK_BY_ID.get(checkId);
    if (!check) continue;
    const before = answers[check.target];
    if (before === value) continue;
    next[check.target] = value;
    detours.push({ question: check.target, before, after: value });
  }
  return { answers: next, detours };
}
