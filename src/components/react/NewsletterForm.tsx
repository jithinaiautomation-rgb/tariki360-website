/**
 * Newsletter sign-up. A React island because it swaps to a thank-you state
 * after submitting.
 *
 * Like the contact form, this doesn't post anywhere yet — that matches the
 * original site. Replace the body of `submit()` to connect it to Mailchimp,
 * ConvertKit, or whatever list you use.
 */
import React from 'react';

type Props = {
  placeholder: string;
  submitLabel: string;
  thanksLabel: string;
  /** 'dark' for the dark-background variant used on the blog page. */
  theme?: 'light' | 'dark';
};

export default function NewsletterForm({
  placeholder,
  submitLabel,
  thanksLabel,
  theme = 'light',
}: Props) {
  const [email, setEmail] = React.useState('');
  const [done, setDone] = React.useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: send `email` to your mailing-list provider.
    setDone(true);
  }

  if (done) {
    return (
      <div
        role="status"
        aria-live="polite"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          color: 'var(--c-lime)',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          fontWeight: 700,
          fontSize: 16,
        }}
      >
        <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: 22 }}>
          check_circle
        </span>
        {thanksLabel}
      </div>
    );
  }

  const dark = theme === 'dark';

  return (
    <form
      onSubmit={submit}
      style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}
    >
      <div style={{ flex: '1 1 280px', maxWidth: 360 }}>
        <div className="vfield">
          <label htmlFor="newsletter-email" className="sr-only" style={srOnly}>
            {placeholder}
          </label>
          <div
            className="vfield-row"
            style={
              dark
                ? { background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)' }
                : undefined
            }
          >
            <span
              className="material-symbols-outlined"
              aria-hidden="true"
              style={{ fontSize: 19, color: dark ? 'rgba(255,255,255,0.45)' : 'var(--c-muted)' }}
            >
              mail
            </span>
            <input
              id="newsletter-email"
              type="email"
              required
              autoComplete="email"
              placeholder={placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={dark ? { color: '#fff' } : undefined}
            />
          </div>
        </div>
      </div>

      <button type="submit" className="vbtn vbtn-md vbtn-lime" style={{ flexShrink: 0 }}>
        {submitLabel}
        <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: 18 }}>
          arrow_forward
        </span>
      </button>
    </form>
  );
}

/** Visually hidden, still read by screen readers. */
const srOnly: React.CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0,0,0,0)',
  whiteSpace: 'nowrap',
  border: 0,
};
