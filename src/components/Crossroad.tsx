import { FIELDS, type Question } from '../data/questions';

/** The field whose colour an option carries, if any. */
export function fieldTint(questionId: string, optionId: string): string | undefined {
  if (questionId === 'felt') return FIELDS.some((f) => f.id === optionId) ? optionId : undefined;
  return FIELDS.some((f) => f.id === questionId) ? questionId : undefined;
}

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
      <h1 id="crossroad-title" className="crossroad__title">{question.text}</h1>
      <div className="paths">
        {question.options.map((o) => (
          <button
            key={o.id}
            type="button"
            className={`path${o.neutral ? ' path--neutral' : ''}${chosen === o.id ? ' path--chosen' : ''}`}
            data-tint={fieldTint(question.id, o.id)}
            onClick={() => onChoose(o.id)}
            aria-pressed={chosen === o.id}
          >
            <span className="path__label">{o.label}</span>
            <span className="path__hint">{o.hint}</span>
          </button>
        ))}
      </div>
      {onBack && (
        <button type="button" className="link-button" onClick={onBack}>
          ← Forrige veiskille
        </button>
      )}
    </section>
  );
}
