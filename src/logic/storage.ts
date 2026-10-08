import { QUESTION_BY_ID } from '../data/questions';
import type { Answers } from './route';

const KEY = 'veikartet.answers.v1';

/** Saved answers, keeping only questions and options that still exist. */
export function parseAnswers(raw: unknown): Answers {
  const answers: Answers = {};
  if (typeof raw !== 'object' || raw === null) return answers;
  for (const [q, o] of Object.entries(raw)) {
    if (typeof o === 'string' && QUESTION_BY_ID.get(q)?.options.some((opt) => opt.id === o)) answers[q] = o;
  }
  return answers;
}

export function loadAnswers(): Answers {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? parseAnswers(JSON.parse(raw)) : {};
  } catch {
    return {};
  }
}

export function saveAnswers(answers: Answers): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(answers));
  } catch {
    // Storage blocked (private mode): the route just isn't remembered.
  }
}
