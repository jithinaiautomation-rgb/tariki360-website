/**
 * The FAQ accordion — a real React island, because it tracks which panel is
 * open. Carried over from the old VFAQ component with accessibility added:
 * each question is now a proper button that controls its answer panel.
 */
import React from 'react';

type Props = {
  items: Array<[question: string, answer: string]>;
};

export default function FAQ({ items }: Props) {
  const [open, setOpen] = React.useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {items.map(([q, a], i) => {
        const isOpen = open === i;
        return (
          <div
            key={q}
            className="vcard"
            style={{
              padding: 0,
              overflow: 'hidden',
              borderRadius: 16,
              borderColor: isOpen ? 'rgba(133,19,29,0.3)' : undefined,
              transition: 'border-color .25s',
            }}
          >
            <h3 style={{ margin: 0 }}>
              <button
                type="button"
                id={`faq-q-${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-a-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16,
                  padding: '20px 24px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'start',
                  fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
                  fontWeight: 600,
                  fontSize: 17,
                  color: 'var(--c-dark)',
                }}
              >
                {q}
                <span
                  className="material-symbols-outlined"
                  aria-hidden="true"
                  style={{
                    color: 'var(--c-lime)',
                    fontSize: 26,
                    flexShrink: 0,
                    transition: 'transform .25s',
                    transform: isOpen ? 'rotate(180deg)' : 'none',
                  }}
                >
                  {isOpen ? 'remove' : 'add'}
                </span>
              </button>
            </h3>

            <div
              id={`faq-a-${i}`}
              role="region"
              aria-labelledby={`faq-q-${i}`}
              hidden={!isOpen}
              className="faq-body"
              style={{
                padding: '0 24px 22px',
                fontSize: 16,
                lineHeight: 1.65,
                color: 'var(--c-muted)',
              }}
            >
              {a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
