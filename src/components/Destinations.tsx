import type { Match } from '../logic/route';

type Props = {
  matches: Match[];
  /** Compact list beside the questions, or the full result at the end of the route. */
  variant: 'preview' | 'result';
};

function percent(score: number): string {
  return `${Math.round(score * 100)} %`;
}

export function Destinations({ matches, variant }: Props) {
  if (variant === 'preview') {
    return (
      <aside className="preview" aria-label="Nærmeste reisemål så langt">
        <h2 className="preview__title">Nærmeste reisemål</h2>
        {matches.length === 0 ? (
          <p className="muted">Velg din første vei, så dukker yrkene opp her.</p>
        ) : (
          <ol className="preview__list">
            {matches.map((m) => (
              <li key={m.career.id} className="preview__item">
                <span className="preview__row">
                  <span className="preview__name">{m.career.name}</span>
                  <span className="preview__score">{percent(m.score)}</span>
                </span>
                <span className="meter" aria-hidden="true">
                  <span className="meter__fill" style={{ width: `${m.score * 100}%` }} />
                </span>
              </li>
            ))}
          </ol>
        )}
      </aside>
    );
  }

  return (
    <ol className="results">
      {matches.map((m, i) => (
        <li key={m.career.id} className={`result${i === 0 ? ' result--top' : ''}`}>
          <div className="result__head">
            <h3 className="result__name">{m.career.name}</h3>
            <span className="result__score">{percent(m.score)}</span>
          </div>
          <p className="result__summary">{m.career.summary}</p>
          <p className="result__edu">
            <span className="label">Utdanning</span> {m.career.education}
          </p>
          {m.reasons.length > 0 && (
            <ul className="chips" aria-label="Valg som passer">
              {m.reasons.map((r) => (
                <li key={r} className="chip">{r}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}
