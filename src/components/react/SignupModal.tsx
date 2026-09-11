/**
 * The sign-up modal and its confirmation toast.
 *
 * This is a genuine React island: it holds form state, opens and closes, and
 * traps focus. It's mounted once per page in the base layout and stays idle
 * until someone clicks a button.
 *
 * How the Astro buttons open it: any element in the page marked
 * `data-open-signup` (see Btn.astro's `opensSignup` prop) triggers it. The
 * island listens on the document rather than being wired to each button, so
 * static Astro markup and this React component never need to know about each
 * other directly.
 */
import React from 'react';
import type { Lang } from '~/lib/i18n';
import { MODAL } from '~/content/site';

/**
 * `copy` carries the wording from Sanity's globalSettings document.
 *
 * Only the plain strings are passed across — `toast` is a function, and props
 * are serialised to JSON when an island hydrates, so functions cannot cross
 * that boundary. `toast` and `close` therefore stay in src/content/site.ts.
 */
type ModalStrings = Omit<(typeof MODAL)['en'], 'toast'>;
type Props = { lang: Lang; copy?: ModalStrings };

export default function SignupModal({ lang, copy }: Props) {
  const t = { ...MODAL[lang], ...(copy ?? {}) };

  const [open, setOpen] = React.useState(false);
  const [toast, setToast] = React.useState<string | null>(null);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  const dialogRef = React.useRef<HTMLDivElement>(null);
  /** Remembers what was focused before opening, so we can restore it. */
  const openerRef = React.useRef<HTMLElement | null>(null);
  const toastTimer = React.useRef<number | undefined>(undefined);

  /* Listen for any "open the signup modal" button anywhere on the page. */
  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        '[data-open-signup]',
      );
      if (!target) return;
      e.preventDefault();
      openerRef.current = target;
      setOpen(true);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  /* Close on Escape, and stop the page behind from scrolling while open. */
  React.useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Move focus into the dialog so keyboard users land in the right place.
    dialogRef.current?.querySelector<HTMLInputElement>('input')?.focus();

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  React.useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  function close() {
    setOpen(false);
    openerRef.current?.focus();
  }

  function showToast(message: string) {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 3400);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    close();
    showToast(t.toast(name.trim() || (lang === 'ar' ? 'صديقنا' : 'there')));
    setName('');
    setEmail('');
  }

  return (
    <>
      {open && (
        <div className="vscrim" onClick={close}>
          <div
            className="vmodal"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="signup-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span className="vtag vtag-lime">{t.tag}</span>
              <button
                type="button"
                onClick={close}
                aria-label={t.close}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 26,
                  color: 'var(--c-muted)',
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>

            <h3 id="signup-title">{t.title}</h3>
            <p>{t.desc}</p>

            <form onSubmit={submit}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  marginBottom: 20,
                }}
              >
                <div className="vfield">
                  <label htmlFor="signup-name">{t.nameLabel}</label>
                  <div className="vfield-row">
                    <span
                      className="material-symbols-outlined"
                      aria-hidden="true"
                      style={{ fontSize: 19, color: 'var(--c-muted)' }}
                    >
                      person
                    </span>
                    <input
                      id="signup-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder={t.namePh}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="vfield">
                  <label htmlFor="signup-email">{t.emailLabel}</label>
                  <div className="vfield-row">
                    <span
                      className="material-symbols-outlined"
                      aria-hidden="true"
                      style={{ fontSize: 19, color: 'var(--c-muted)' }}
                    >
                      mail
                    </span>
                    <input
                      id="signup-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder={t.emailPh}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="vbtn vbtn-md vbtn-lime" style={{ width: '100%' }}>
                {t.cta}
                <span
                  className="material-symbols-outlined"
                  aria-hidden="true"
                  style={{ fontSize: 18 }}
                >
                  arrow_forward
                </span>
              </button>
            </form>
          </div>
        </div>
      )}

      {toast && (
        <div className="vtoast" role="status" aria-live="polite">
          <span
            className="material-symbols-outlined"
            aria-hidden="true"
            style={{ color: 'var(--c-lime)' }}
          >
            check_circle
          </span>
          {toast}
        </div>
      )}
    </>
  );
}
