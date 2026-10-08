import { optionLabel, type Answers } from '../logic/route';
import type { Question } from '../data/questions';

type Props = {
  route: Question[];
  answers: Answers;
  currentId: string | undefined;
  onSelect: (questionId: string) => void;
};

// The walked route as a winding trail. Each fork is a cairn with the T that
// marks hiking trails in Norway; the trail ahead is dotted until it is walked.
const STEP = 84;
const TOP = 34;

function xAt(i: number): number {
  return i % 2 === 0 ? 10 : 26;
}

export function RouteMap({ route, answers, currentId, onSelect }: Props) {
  const height = TOP + (route.length - 1) * STEP + 60;
  const points = route.map((_, i) => ({ x: xAt(i), y: TOP + i * STEP }));
  const walked = route.findIndex((q) => q.id === currentId);
  const lastWalked = walked === -1 ? route.length - 1 : walked;

  const path = (from: number, to: number) => {
    let d = '';
    for (let i = from; i <= to; i++) {
      const p = points[i]!;
      if (i === from) {
        d += `M ${p.x} ${p.y}`;
      } else {
        const prev = points[i - 1]!;
        const midY = (prev.y + p.y) / 2;
        d += ` C ${prev.x} ${midY}, ${p.x} ${midY}, ${p.x} ${p.y}`;
      }
    }
    return d;
  };

  return (
    <nav className="map" aria-label="Veikartet ditt">
      <div className="map__canvas" style={{ height }}>
        <svg className="map__trail" viewBox={`0 0 100 ${height}`} preserveAspectRatio="none" aria-hidden="true">
          {route.length > 1 && <path d={path(0, route.length - 1)} className="map__ahead" vectorEffect="non-scaling-stroke" />}
          {lastWalked > 0 && <path d={path(0, lastWalked)} className="map__walked" vectorEffect="non-scaling-stroke" />}
        </svg>
        <ol className="map__stops">
          {route.map((q, i) => {
            const answer = answers[q.id];
            const isCurrent = q.id === currentId;
            const state = isCurrent ? 'current' : answer !== undefined ? 'done' : 'ahead';
            const p = points[i]!;
            return (
              <li
                key={q.id}
                className={`stop stop--${state}`}
                style={{ top: p.y, left: `${p.x}%`, maxWidth: `calc(${100 - p.x}% + 18px)` }}
              >
                <button
                  type="button"
                  className="stop__button"
                  onClick={() => onSelect(q.id)}
                  disabled={state === 'ahead'}
                  aria-current={isCurrent ? 'step' : undefined}
                  aria-label={`${q.waypoint}${answer ? `: ${optionLabel(q.id, answer)}` : ''}${state === 'done' ? '. Gå tilbake hit' : ''}`}
                >
                  <span className="stop__marker" aria-hidden="true">T</span>
                  <span className="stop__text">
                    <span className="stop__name">{q.waypoint}</span>
                    {answer !== undefined && <span className="stop__answer">{optionLabel(q.id, answer)}</span>}
                    
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
