import type { Match } from '../logic/route';

type Props = {
  matches: Match[];
};

function percent(score: number): string {
  return `${Math.round(score * 100)} %`;
}

export function Destinations({ matches }: Props) {
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
