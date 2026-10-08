import { describe, expect, it } from 'vitest';
import { CAREERS } from '../data/careers';
import { GUIDES } from '../data/guides';
import {
  contactMessage,
  contacts,
  educationPaths,
  linkedInPeople,
  linkedInPost,
  pathTips,
  studyLinks,
} from './guidance';

const sykepleier = CAREERS.find((c) => c.id === 'sykepleier')!;

describe('guides', () => {
  it('exist for every career, with roles, blends and employers', () => {
    for (const c of CAREERS) {
      const g = GUIDES[c.id];
      expect(g, c.id).toBeDefined();
      expect(g!.roles.length, c.id).toBeGreaterThanOrEqual(3);
      expect(g!.blends.length, c.id).toBeGreaterThanOrEqual(2);
      expect(g!.employers.length, c.id).toBeGreaterThanOrEqual(2);
      for (const r of [...g!.roles, ...g!.blends]) expect(r.text, `${c.id}: ${r.name}`).not.toBe('');
    }
  });

  it('have no guide without a career', () => {
    const ids = new Set(CAREERS.map((c) => c.id));
    for (const id of Object.keys(GUIDES)) expect(ids.has(id), id).toBe(true);
  });
});

describe('guidance', () => {
  it('puts the chosen education first', () => {
    const ambulanse = CAREERS.find((c) => c.id === 'ambulansearbeider')!;
    expect(educationPaths(ambulanse, { utdanning: 'bachelor' })).toEqual(['bachelor', 'kort']);
    expect(pathTips(ambulanse, {})).toHaveLength(2);
  });

  it('writes a post about being on the way and open to opportunities', () => {
    const post = linkedInPost(sykepleier, 'Intensivsykepleier', { utdanning: 'bachelor' });
    expect(post).toContain('intensivsykepleier');
    expect(post).toContain('åpen for nye muligheter');
    expect(post).toContain('#sykepleier');
  });

  it('suggests people by position, including someone who hires', () => {
    const list = contacts(sykepleier, 'Sykepleier');
    expect(list.map((c) => c.title)).toContain('Avdelingssykepleier');
    expect(list.every((c) => c.why.length > 0)).toBe(true);
  });

  it('builds LinkedIn search links and a message with placeholders', () => {
    expect(linkedInPeople('Rekrutterer i Helse Bergen')).toBe(
      'https://www.linkedin.com/search/results/people/?keywords=Rekrutterer%20i%20Helse%20Bergen',
    );
    expect(contactMessage('Sykepleier')).toContain('[ditt navn]');
  });

  it('links to the right study portals', () => {
    expect(studyLinks(sykepleier).map((l) => l.label)).toEqual(['utdanning.no', 'Samordna opptak']);
    const tomrer = CAREERS.find((c) => c.id === 'tomrer')!;
    expect(studyLinks(tomrer).map((l) => l.label)).toEqual(['utdanning.no', 'vilbli.no']);
  });
});
