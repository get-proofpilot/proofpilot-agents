/**
 * InlineQuoteFormDark
 *
 * Twilight-band split: copy on the left, white form card on the right.
 * Embedded mid-page conversion block, not a footer afterthought.
 *
 * WHEN TO USE:
 * - Quote-driven service businesses where the project scope matters (pool, outdoor living, remodel, roofing).
 * - Page needs a conversion moment between hero and testimonials.
 *
 * WHEN NOT TO USE:
 * - E-commerce or self-serve SaaS — use a pricing card instead.
 * - Brand already has a real booking calendar embed — use that, not this.
 *
 * Wire `onSubmit` to your lead capture endpoint (Formspree, HubSpot, Zapier catch-hook, etc).
 */
import type { FormEventHandler, ReactNode } from 'react';

type Field =
  | { type: 'text' | 'email' | 'tel'; name: string; placeholder: string; colspan?: 1 | 2 }
  | { type: 'select'; name: string; placeholder: string; options: string[]; colspan?: 1 | 2 }
  | { type: 'textarea'; name: string; placeholder: string; colspan?: 1 | 2 };

type Props = {
  eyebrow?: string;
  headlineLead: string;
  headlineAccent: string;
  headlineTrail?: string;
  body?: string;
  fields?: Field[];
  submitLabel?: string;
  disclaimer?: string;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  sideSlot?: ReactNode;
};

const DEFAULT_FIELDS: Field[] = [
  { type: 'text', name: 'firstName', placeholder: 'First name', colspan: 1 },
  { type: 'text', name: 'lastName', placeholder: 'Last name', colspan: 1 },
  { type: 'email', name: 'email', placeholder: 'Email', colspan: 2 },
  { type: 'tel', name: 'phone', placeholder: 'Phone', colspan: 2 },
  {
    type: 'select',
    name: 'project',
    placeholder: 'What do you want built?',
    options: ['New pool build', 'Outdoor living / pavilion', 'Renovation / resurface', 'Not sure yet'],
    colspan: 2,
  },
  { type: 'textarea', name: 'notes', placeholder: 'Tell us about the project...', colspan: 2 },
];

export default function InlineQuoteFormDark({
  eyebrow = 'Book a consult',
  headlineLead,
  headlineAccent,
  headlineTrail = '',
  body,
  fields = DEFAULT_FIELDS,
  submitLabel = 'Send my project to the team',
  disclaimer = 'We reply within one business day. Never share your info.',
  onSubmit,
  sideSlot,
}: Props) {
  const inputStyle: React.CSSProperties = {
    padding: '12px 16px',
    borderRadius: 8,
    border: '1px solid rgba(18,26,30,0.15)',
    fontFamily: "'Work Sans', system-ui, sans-serif",
    fontSize: 15,
    width: '100%',
    background: '#fff',
    color: 'var(--color-navy, #121A1E)',
  };
  return (
    <section
      style={{
        background: 'var(--color-twilight, #0C0C0C)',
        color: '#fff',
        padding: 'clamp(64px, 8vw, 120px) clamp(16px, 4vw, 56px)',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: 40,
          alignItems: 'center',
        }}
        className="iqf-grid"
      >
        <div>
          <p
            style={{
              fontFamily: "'Work Sans', sans-serif",
              textTransform: 'uppercase',
              letterSpacing: 3,
              color: 'var(--color-accent, #4CA8DE)',
              fontSize: 13,
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            {eyebrow}
          </p>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(2rem, 4.5vw, 3.75rem)',
              lineHeight: 1.02,
              color: '#fff',
              textTransform: 'none',
            }}
          >
            {headlineLead}{' '}
            <span style={{ color: 'var(--color-accent, #4CA8DE)' }}>{headlineAccent}</span>
            {headlineTrail ? ' ' + headlineTrail : ''}
          </h2>
          {body && (
            <p
              style={{
                fontFamily: "'Work Sans', sans-serif",
                fontSize: 16,
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.75)',
                marginTop: 20,
                maxWidth: 440,
              }}
            >
              {body}
            </p>
          )}
          {sideSlot && <div style={{ marginTop: 24 }}>{sideSlot}</div>}
        </div>

        <form
          onSubmit={onSubmit}
          style={{
            background: '#fff',
            borderRadius: 12,
            padding: 28,
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'var(--color-navy, #121A1E)',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
            {fields.map((f) => {
              const span = f.colspan === 2 ? 'span 2' : 'span 1';
              if (f.type === 'textarea') {
                return (
                  <textarea
                    key={f.name}
                    name={f.name}
                    placeholder={f.placeholder}
                    style={{ ...inputStyle, gridColumn: span, minHeight: 100, resize: 'vertical' }}
                  />
                );
              }
              if (f.type === 'select') {
                return (
                  <select
                    key={f.name}
                    name={f.name}
                    style={{ ...inputStyle, gridColumn: span }}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      {f.placeholder}
                    </option>
                    {f.options.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                );
              }
              return (
                <input
                  key={f.name}
                  type={f.type}
                  name={f.name}
                  placeholder={f.placeholder}
                  style={{ ...inputStyle, gridColumn: span }}
                />
              );
            })}
          </div>

          <button
            type="submit"
            style={{
              marginTop: 18,
              width: '100%',
              background: 'var(--color-accent, #4CA8DE)',
              color: '#fff',
              border: '1px solid var(--color-navy, #121A1E)',
              borderRadius: 8,
              padding: '14px 24px',
              fontFamily: "'Work Sans', sans-serif",
              fontWeight: 700,
              fontSize: 16,
              boxShadow: '0 5px 0 0 var(--color-navy, #121A1E)',
              cursor: 'pointer',
            }}
          >
            {submitLabel}
          </button>
          <p
            style={{
              fontFamily: "'Work Sans', sans-serif",
              fontSize: 12,
              color: 'rgba(18,26,30,0.6)',
              marginTop: 12,
              textAlign: 'center',
            }}
          >
            {disclaimer}
          </p>
        </form>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .iqf-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
