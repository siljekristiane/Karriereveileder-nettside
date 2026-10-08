import { describe, expect, it } from 'vitest';
import { CAREERS } from '../data/careers';
import { QUESTIONS, QUESTION_BY_ID } from '../data/questions';
import { activeAnswers, nextQuestion, rankCareers, routeQuestions, scoreCareer } from './route';

describe('catalogue', () => {
  it('only uses questions and options that exist', () => {
    for (const career of CAREERS) {
      for (const [q, options] of Object.entries(career.fits)) {
        const question = QUESTION_BY_ID.get(q);
        expect(question, `${career.id}: ${q}`).toBeDefined();
        for (const o of options) {
          expect(question!.options.some((opt) => opt.id === o), `${career.id}: ${q}=${o}`).toBe(true);
        }
      }
    }
  });

  it('has unique ids', () => {
    expect(new Set(CAREERS.map((c) => c.id)).size).toBe(CAREERS.length);
    expect(new Set(QUESTIONS.map((q) => q.id)).size).toBe(QUESTIONS.length);
  });

  it('gives every side path option at least two careers', () => {
    for (const q of QUESTIONS.filter((x) => x.showIf)) {
      for (const o of q.options) {
        const count = CAREERS.filter((c) => c.fits.fokus?.includes(q.showIf!.option) && c.fits[q.id]?.includes(o.id)).length;
        expect(count, `${q.id}=${o.id}`).toBeGreaterThanOrEqual(2);
      }
    }
  });
});

describe('route', () => {
  it('opens a side path only after its fork', () => {
    expect(routeQuestions({}).some((q) => q.id === 'ting')).toBe(false);
    const ids = routeQuestions({ fokus: 'ting' }).map((q) => q.id);
    expect(ids).toContain('ting');
    expect(ids).not.toContain('mennesker');
  });

  it('asks the side path right after the fork', () => {
    const answers = { arbeidsform: 'team', storrelse: 'stor', sted: 'inne', fokus: 'tall' };
    expect(nextQuestion(answers)?.id).toBe('tall');
  });

  it('ends when every fork on the route is answered', () => {
    const answers: Record<string, string> = {};
    for (let q = nextQuestion(answers); q; q = nextQuestion(answers)) answers[q.id] = q.options[0]!.id;
    expect(Object.keys(answers)).toHaveLength(routeQuestions(answers).length);
  });

  it('forgets an abandoned side path', () => {
    const active = activeAnswers({ fokus: 'ideer', ting: 'bygg', ideer: 'ord' });
    expect(active).toEqual({ fokus: 'ideer', ideer: 'ord' });
  });
});

describe('ranking', () => {
  it('puts a matching career on top', () => {
    const top = rankCareers({
      arbeidsform: 'team', storrelse: 'stor', sted: 'inne', fokus: 'mennesker', mennesker: 'helse',
      hverdag: 'variasjon', rolle: 'fag', utdanning: 'bachelor', drivkraft: 'hjelpe',
    })[0]!;
    expect(top.career.id).toBe('sykepleier');
    expect(top.score).toBe(1);
  });

  it('follows the side path', () => {
    const top = rankCareers({ fokus: 'ting', ting: 'bygg', utdanning: 'kort', sted: 'ute' }).slice(0, 3);
    expect(top.map((m) => m.career.id)).toContain('tomrer');
  });

  it('ignores neutral answers', () => {
    const career = CAREERS[0]!;
    expect(scoreCareer(career, { arbeidsform: 'begge' }).score).toBe(0);
    expect(scoreCareer(career, { arbeidsform: 'begge', fokus: 'mennesker' }).score).toBe(1);
  });

  it('counts a fork the career does not list as a miss', () => {
    const tomrer = CAREERS.find((c) => c.id === 'tomrer')!;
    expect(scoreCareer(tomrer, { fokus: 'ideer', ideer: 'design' }).score).toBe(0);
  });
});
