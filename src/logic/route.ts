import { CAREERS, type Career } from '../data/careers';
import { QUESTIONS, QUESTION_BY_ID, type Question } from '../data/questions';

/** Chosen option per question id. May hold answers on side paths no longer taken. */
export type Answers = Record<string, string>;

export type Match = {
  career: Career;
  /** 0–1: share of the weighted, answered forks the career fits. */
  score: number;
  /** Labels of the choices that led here. */
  reasons: string[];
};

/** The forks on the route as it stands: side paths only after their trigger. */
export function routeQuestions(answers: Answers): Question[] {
  return QUESTIONS.filter((q) => !q.showIf || answers[q.showIf.question] === q.showIf.option);
}

/** The next unanswered fork, or undefined when the route is walked to the end. */
export function nextQuestion(answers: Answers): Question | undefined {
  return routeQuestions(answers).find((q) => answers[q.id] === undefined);
}

/** Answers on the current route only (drops abandoned side paths). */
export function activeAnswers(answers: Answers): Answers {
  const active: Answers = {};
  for (const q of routeQuestions(answers)) {
    const a = answers[q.id];
    if (a !== undefined) active[q.id] = a;
  }
  return active;
}

export function optionLabel(questionId: string, optionId: string): string {
  return QUESTION_BY_ID.get(questionId)?.options.find((o) => o.id === optionId)?.label ?? optionId;
}

function isNeutral(questionId: string, optionId: string): boolean {
  return QUESTION_BY_ID.get(questionId)?.options.find((o) => o.id === optionId)?.neutral === true;
}

export function scoreCareer(career: Career, answers: Answers): Match {
  let got = 0;
  let max = 0;
  const reasons: string[] = [];
  for (const [questionId, optionId] of Object.entries(activeAnswers(answers))) {
    if (isNeutral(questionId, optionId)) continue;
    const weight = QUESTION_BY_ID.get(questionId)?.weight ?? 1;
    max += weight;
    // A career that does not list a question does not fit any answer to it.
    if (career.fits[questionId]?.includes(optionId)) {
      got += weight;
      reasons.push(optionLabel(questionId, optionId));
    }
  }
  return { career, score: max === 0 ? 0 : got / max, reasons };
}

/** All careers, best fit first; ties keep catalogue order. */
export function rankCareers(answers: Answers): Match[] {
  return CAREERS.map((c) => scoreCareer(c, answers)).sort((a, b) => b.score - a.score);
}
