import { describe, expect, it } from 'vitest';
import { CAREERS } from '../data/careers';
import { CHECKS, COMPLAINTS, CHECK_BY_ID } from '../data/checks';
import { FIELDS, QUESTIONS, QUESTION_BY_ID } from '../data/questions';
import { applyChecks } from './check';
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

  it('gives every field direction at least two careers', () => {
    for (const field of FIELDS) {
      for (const d of field.directions) {
        const count = CAREERS.filter((c) => c.fits.felt?.includes(field.id) && c.fits[field.id]?.includes(d.id)).length;
        expect(count, `${field.id}=${d.id}`).toBeGreaterThanOrEqual(2);
      }
    }
  });

  it('lists a direction for every field a career belongs to', () => {
    for (const c of CAREERS) {
      for (const f of c.fits.felt ?? []) expect(c.fits[f], `${c.id}: ${f}`).toBeDefined();
    }
  });
});

describe('route', () => {
  it('starts with the field, then a direction inside it', () => {
    expect(nextQuestion({})?.id).toBe('felt');
    expect(nextQuestion({ felt: 'natur' })?.id).toBe('natur');
    expect(nextQuestion({ felt: 'natur', natur: 'dyr' })?.id).toBe('arbeidsform');
  });

  it('skips the direction when the field is unknown', () => {
    expect(nextQuestion({ felt: 'vetikke' })?.id).toBe('arbeidsform');
  });

  it('ends when every fork on the route is answered', () => {
    const answers: Record<string, string> = {};
    for (let q = nextQuestion(answers); q; q = nextQuestion(answers)) answers[q.id] = q.options[0]!.id;
    expect(Object.keys(answers)).toHaveLength(routeQuestions(answers).length);
  });

  it('forgets an abandoned direction', () => {
    expect(activeAnswers({ felt: 'it', bygg: 'hus', it: 'data' })).toEqual({ felt: 'it', it: 'data' });
  });
});

describe('ranking', () => {
  it('puts a matching career on top', () => {
    const top = rankCareers({
      felt: 'helse', helse: 'pleie', arbeidsform: 'team', storrelse: 'stor', sted: 'inne',
      hverdag: 'variasjon', rolle: 'fag', utdanning: 'bachelor', drivkraft: 'hjelpe',
    })[0]!;
    expect(top.career.id).toBe('sykepleier');
    expect(top.score).toBe(1);
  });

  it('follows the direction', () => {
    const top = rankCareers({ felt: 'bygg', bygg: 'hus', utdanning: 'kort', sted: 'ute' }).slice(0, 3);
    expect(top.map((m) => m.career.id)).toContain('tomrer');
  });

  it('ignores neutral answers', () => {
    const career = CAREERS[0]!;
    expect(scoreCareer(career, { arbeidsform: 'begge' }).score).toBe(0);
    expect(scoreCareer(career, { arbeidsform: 'begge', felt: 'helse' }).score).toBe(1);
  });

  it('counts a fork the career does not list as a miss', () => {
    const tomrer = CAREERS.find((c) => c.id === 'tomrer')!;
    expect(scoreCareer(tomrer, { felt: 'kreativ', kreativ: 'design' }).score).toBe(0);
  });
});

describe('checks', () => {
  it('map back to options on the route', () => {
    for (const check of CHECKS) {
      const q = QUESTION_BY_ID.get(check.target);
      expect(q, check.id).toBeDefined();
      for (const o of check.options) expect(q!.options.some((x) => x.id === o.value), `${check.id}: ${o.value}`).toBe(true);
    }
    for (const c of COMPLAINTS) for (const id of c.checks) expect(CHECK_BY_ID.has(id), id).toBe(true);
  });

  it('offer every field in the field check', () => {
    const values = CHECK_BY_ID.get('felt-dag')!.options.map((o) => o.value);
    expect(values.sort()).toEqual(FIELDS.map((f) => f.id).sort());
  });

  it('keep agreeing answers and report the detours', () => {
    const { answers, detours } = applyChecks(
      { felt: 'helse', helse: 'pleie', arbeidsform: 'team', sted: 'inne' },
      { 'arbeidsform-prosjekt': 'team', 'sted-november': 'ute' },
    );
    expect(answers.arbeidsform).toBe('team');
    expect(answers.sted).toBe('ute');
    expect(detours).toEqual([{ question: 'sted', before: 'inne', after: 'ute' }]);
  });

  it('send the route back to a new direction when the field changes', () => {
    const { answers } = applyChecks({ felt: 'helse', helse: 'pleie' }, { 'felt-dag': 'it' });
    expect(nextQuestion(answers)?.id).toBe('it');
  });
});
