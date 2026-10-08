import { ArrowLeft, Check, Copy, ExternalLink } from 'lucide-react';
import { useRef, useState } from 'react';
import {
  contactMessage,
  contacts,
  guideFor,
  LINKEDIN_FEED,
  linkedInCompanies,
  linkedInPeople,
  linkedInPost,
  pathTips,
  standOutTips,
  studyLinks,
} from '../logic/guidance';
import type { Answers, Match } from '../logic/route';

type Props = {
  match: Match;
  answers: Answers;
  onBack: () => void;
};

function CopyButton({ source }: { source: React.RefObject<HTMLTextAreaElement | null> }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    const el = source.current;
    if (!el) return;
    navigator.clipboard
      .writeText(el.value)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => el.select());
  };
  return (
    <button type="button" className="button button--quiet button--small" onClick={copy}>
      {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
      {copied ? 'Kopiert' : 'Kopier teksten'}
    </button>
  );
}

function OutLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className="outlink" href={href} target="_blank" rel="noreferrer">
      {children}
      <ExternalLink size={14} aria-hidden="true" />
    </a>
  );
}

/** "Veien videre" for one career: roles, the way in, people, companies and a post. */
export function CareerGuide({ match, answers, onBack }: Props) {
  const { career } = match;
  const guide = guideFor(career);
  const [picked, setPicked] = useState(career.name);
  const [custom, setCustom] = useState('');
  const role = custom.trim() || picked;
  const postRef = useRef<HTMLTextAreaElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const pick = (name: string) => {
    setPicked(name);
    setCustom('');
  };

  return (
    <article className="guide" aria-labelledby="guide-title">
      <button type="button" className="link-button" onClick={onBack}>
        <ArrowLeft size={16} aria-hidden="true" /> Tilbake til forslagene
      </button>

      <header className="guide__head">
        <p className="eyebrow">Veien videre · {Math.round(match.score * 100)} % treff</p>
        <h1 id="guide-title" className="crossroad__title">
          {career.name}
        </h1>
        <p className="guide__lead">{career.summary}</p>
        <p className="muted">
          <span className="label">Vanlig vei inn</span> {career.education}
        </p>
      </header>

      {guide && (
        <section className="guide__section" aria-labelledby="roles-title">
          <h2 id="roles-title" className="guide__title">
            Roller du kan sikte mot
          </h2>
          <p className="muted">
            «{career.name}» er et bredt yrke. Velg en konkret rolle, så bruker vi den i tekstene lenger ned.
          </p>
          <div className="roles">
            {guide.roles.map((r) => (
              <button
                key={r.name}
                type="button"
                className={`role${role === r.name ? ' role--chosen' : ''}`}
                aria-pressed={role === r.name}
                onClick={() => pick(r.name)}
              >
                <span className="role__name">{r.name}</span>
                <span className="role__text">{r.text}</span>
              </button>
            ))}
          </div>

          <h3 className="guide__subtitle">Eller lag din egen rolle</h3>
          <p className="muted">Mange av de mest spennende jobbene er en blanding av to fag. Noen eksempler:</p>
          <div className="roles">
            {guide.blends.map((r) => (
              <button
                key={r.name}
                type="button"
                className={`role role--blend${role === r.name ? ' role--chosen' : ''}`}
                aria-pressed={role === r.name}
                onClick={() => pick(r.name)}
              >
                <span className="role__name">{r.name}</span>
                <span className="role__text">{r.text}</span>
              </button>
            ))}
          </div>
          <label className="field" htmlFor="custom-role">
            <span className="label">Din egen rolle</span>
            <input
              id="custom-role"
              className="input"
              type="text"
              placeholder="F.eks. sykepleier som lager helseapper"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
            />
          </label>
        </section>
      )}

      <section className="guide__section" aria-labelledby="path-title">
        <h2 id="path-title" className="guide__title">
          Slik kommer du dit
        </h2>
        <div className="columns">
          {pathTips(career, answers).map((p) => (
            <div key={p.label} className="column">
              <h3 className="guide__subtitle">{p.label}</h3>
              <ul className="tips">
                {p.tips.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <h3 className="guide__subtitle">Studier og fagbrev</h3>
        <ul className="links">
          {studyLinks(career).map((l) => (
            <li key={l.href}>
              <OutLink href={l.href}>{l.label}</OutLink>
              <span className="muted"> {l.hint}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="guide__section" aria-labelledby="standout-title">
        <h2 id="standout-title" className="guide__title">
          Slik skiller du deg ut
        </h2>
        <ul className="tips">
          {standOutTips(career).map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>

      <section className="guide__section" aria-labelledby="people-title">
        <h2 id="people-title" className="guide__title">
          Hvem du bør snakke med
        </h2>
        <p className="muted">
          Folk svarer oftere enn du tror, særlig på en kort og konkret melding. Søkene åpner LinkedIn i en ny fane.
        </p>
        <ul className="contacts">
          {contacts(career, role).map((c) => (
            <li key={c.title} className="contact">
              <span className="contact__title">{c.title}</span>
              <span className="contact__why">{c.why}</span>
              <OutLink href={linkedInPeople(c.search)}>Finn på LinkedIn</OutLink>
            </li>
          ))}
        </ul>
        <h3 className="guide__subtitle">Meldingsmal</h3>
        <textarea
          key={`message-${role}`}
          ref={messageRef}
          id="message-text"
          className="textarea"
          rows={9}
          defaultValue={contactMessage(role)}
          aria-label="Meldingsmal"
        />
        <div className="actions">
          <CopyButton source={messageRef} />
        </div>
      </section>

      {guide && (
        <section className="guide__section" aria-labelledby="companies-title">
          <h2 id="companies-title" className="guide__title">
            Bedrifter å følge
          </h2>
          <p className="muted">Eksempler på arbeidsgivere. Følg dem på LinkedIn for å se stillinger og sommerjobber.</p>
          <ul className="chips chips--links">
            {guide.employers.map((e) => (
              <li key={e}>
                <OutLink href={linkedInCompanies(e)}>{e}</OutLink>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="guide__section" aria-labelledby="post-title">
        <h2 id="post-title" className="guide__title">
          Forslag til LinkedIn-innlegg
        </h2>
        <p className="muted">
          Fortell nettverket at du er på vei og åpen for muligheter. Rediger teksten, kopier den og lim den inn på
          LinkedIn selv. Ingenting sendes herfra.
        </p>
        <textarea
          key={`post-${role}`}
          ref={postRef}
          id="post-text"
          className="textarea"
          rows={9}
          defaultValue={linkedInPost(career, role, answers)}
          aria-label="Forslag til LinkedIn-innlegg"
        />
        <div className="actions">
          <CopyButton source={postRef} />
          <a className="button" href={LINKEDIN_FEED} target="_blank" rel="noreferrer">
            Gå til LinkedIn <ExternalLink size={16} aria-hidden="true" />
          </a>
        </div>
      </section>
    </article>
  );
}
