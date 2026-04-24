/**
 * DroneAerialAboutFounder
 *
 * Navy-band 60/40 split: founder portrait on the left (with an offset stat
 * badge), color-painted headline + story + two stat callouts on the right.
 *
 * WHEN TO USE:
 * - Founder-led brand whose trust story is "I run the crew that shows up".
 * - You have a real founder portrait or an in-the-field shot.
 * - Years-in-business and project-count numbers are compelling.
 *
 * WHEN NOT TO USE:
 * - Team-first brands with no single face — use a team grid instead.
 * - Numbers are weak (under 5 years, under ~100 projects) — skip the stat badge.
 */
import type { ReactNode } from 'react';

type Stat = { value: string; label: string };

type Props = {
  eyebrow?: string;
  headlineLead: string;
  headlineAccent: string;
  headlineTrail?: string;
  body: string;
  portraitUrl?: string;
  portraitAlt?: string;
  badge?: Stat;
  stats?: Stat[];
  /** Optional trailing CTA slot. */
  ctaSlot?: ReactNode;
};

export default function DroneAerialAboutFounder({
  eyebrow = 'Meet the founder',
  headlineLead,
  headlineAccent,
  headlineTrail = '',
  body,
  portraitUrl,
  portraitAlt = 'Founder portrait',
  badge,
  stats = [],
  ctaSlot,
}: Props) {
  return (
    <section
      style={{
        background: 'var(--color-navy, #121A1E)',
        color: '#fff',
        padding: 'clamp(64px, 8vw, 120px) clamp(16px, 4vw, 56px)',
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 48,
          alignItems: 'center',
        }}
      >
        <div style={{ gridColumn: 'span 5', position: 'relative' }} className="col-span-full lg:col-span-5">
          <div
            style={{
              aspectRatio: '4 / 5',
              borderRadius: 12,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 18px 40px rgba(0,0,0,0.35)',
            }}
          >
            {portraitUrl ? (
              <img
                src={portraitUrl}
                alt={portraitAlt}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background:
                    'linear-gradient(135deg, #0C0C0C, #121A1E, #2F85B7)',
                  display: 'grid',
                  placeItems: 'center',
                  color: 'rgba(255,255,255,0.35)',
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 36,
                }}
              >
                [FOUNDER PORTRAIT]
              </div>
            )}
          </div>
          {badge && (
            <div
              style={{
                position: 'absolute',
                bottom: -24,
                right: -24,
                background: 'var(--color-accent, #4CA8DE)',
                color: '#fff',
                borderRadius: 12,
                padding: '16px 20px',
                boxShadow: '0 5px 0 0 var(--color-navy, #121A1E)',
                border: '1px solid var(--color-navy, #121A1E)',
              }}
            >
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 30, lineHeight: 1 }}>
                {badge.value}
              </div>
              <div
                style={{
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: 12,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  marginTop: 4,
                }}
              >
                {badge.label}
              </div>
            </div>
          )}
        </div>

        <div style={{ gridColumn: 'span 7' }} className="col-span-full lg:col-span-7">
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
          <p
            style={{
              fontFamily: "'Work Sans', sans-serif",
              fontSize: 17,
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.8)',
              marginTop: 24,
              maxWidth: 640,
            }}
          >
            {body}
          </p>

          {stats.length > 0 && (
            <div
              style={{
                marginTop: 32,
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: 24,
                maxWidth: 560,
              }}
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <div
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 56,
                      lineHeight: 1,
                      color: 'var(--color-accent, #4CA8DE)',
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Work Sans', sans-serif",
                      fontSize: 13,
                      textTransform: 'uppercase',
                      letterSpacing: 3,
                      color: 'rgba(255,255,255,0.7)',
                      marginTop: 8,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {ctaSlot && <div style={{ marginTop: 32 }}>{ctaSlot}</div>}
        </div>
      </div>
    </section>
  );
}
