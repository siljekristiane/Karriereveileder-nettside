import { ArrowRight, Compass, Route, Signpost } from 'lucide-react';

type Props = {
  hasProgress: boolean;
  onStart: () => void;
  onRestart: () => void;
};

const STEPS = [
  { icon: Compass, title: 'Velg fagfelt', text: 'Start bredt, og velg en retning.' },
  { icon: Signpost, title: 'Gå veien', text: 'Ett enkelt valg om gangen.' },
  { icon: Route, title: 'Få veien videre', text: 'Yrker, roller og neste steg.' },
];

const YOU_GET = ['Yrker og roller', 'Råd om jobb og studier', 'Folk å snakke med', 'Forslag til LinkedIn-innlegg'];

export function Landing({ hasProgress, onStart, onRestart }: Props) {
  return (
    <main className="landing">
      <section className="hero" aria-labelledby="hero-title">
        <p className="eyebrow">Gratis karriereveileder</p>
        <h1 id="hero-title" className="hero__title">
          Finn veien til en jobb som passer deg
        </h1>
        <p className="hero__lead">Svar på noen enkle valg, og få forslag til yrker og en plan for veien dit.</p>
        <div className="actions">
          <button type="button" className="button button--big" onClick={onStart}>
            {hasProgress ? 'Fortsett der du slapp' : 'Trykk her for å starte'}{' '}
            <ArrowRight size={20} aria-hidden="true" />
          </button>
          {hasProgress && (
            <button type="button" className="button button--quiet button--big" onClick={onRestart}>
              Start på nytt
            </button>
          )}
        </div>
        <p className="muted">Ca. tre minutter · gratis · ingen innlogging</p>
      </section>

      <section className="how" aria-labelledby="how-title">
        <h2 id="how-title" className="guide__title">
          Slik fungerer det
        </h2>
        <ol className="how__steps">
          {STEPS.map(({ icon: Icon, title, text }) => (
            <li key={title} className="how__step">
              <span className="how__icon" aria-hidden="true">
                <Icon size={22} />
              </span>
              <h3 className="how__title">{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="get" aria-labelledby="get-title">
        <h2 id="get-title" className="guide__title">
          Dette får du til slutt
        </h2>
        <ul className="get__list">
          {YOU_GET.map((t) => (
            <li key={t} className="get__item">
              {t}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
