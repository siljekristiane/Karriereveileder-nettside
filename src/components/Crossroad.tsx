import type { Question } from '../data/questions';
import { FIELD_ICONS } from './icons';

type Props = {
  question: Question;
  step: number;
  total: number;
  chosen: string | undefined;
  onChoose: (optionId: string) => void;
  onBack: (() => void) | undefined;
};

export function Crossroad({ question, step, total, chosen, onChoose, onBack }: Props) {
  return (
    <section className="crossroad" aria-labelledby="crossroad-title">
      <p className="eyebrow">
        Veiskille {step} av {total}
        {question.showIf && <span className="tag">Konkret retning</span>}
      </p>
      <h1 id="crossroad-title" className="crossroad__title">
        {question.text}
      </h1>
      <div className="paths">
        {question.options.map((o) => {
          const Icon = question.id === 'felt' ? FIELD_ICONS[o.id] : undefined;
          return (
            <button
              key={o.id}
              type="button"
              className={`path${o.neutral ? ' path--neutral' : ''}${chosen === o.id ? ' path--chosen' : ''}`}
              onClick={() => onChoose(o.id)}
              aria-pressed={chosen === o.id}
            >
              <span className="path__label">
                {Icon && <Icon className="path__icon" size={22} aria-hidden="true" />}
                {o.label}
              </span>
              <span className="path__hint">{o.hint}</span>
            </button>
          );
        })}
      </div>
      {onBack && (
        <button type="button" className="link-button" onClick={onBack}>
          ← Forrige veiskille
        </button>
      )}
    </section>
  );
}
