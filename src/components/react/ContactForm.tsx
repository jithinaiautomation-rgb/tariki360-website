/**
 * The contact form — a React island, because it's a controlled form with
 * eight fields and a submit confirmation.
 *
 * Note on submitting: the original React site never sent this anywhere — it
 * just showed a toast. That behaviour is preserved exactly, so nothing
 * silently breaks. To make it live, replace the body of `submit()` with a
 * POST to your form endpoint (Formspree, an API Gateway URL, etc.).
 */
import React from 'react';
import type { Lang } from '~/lib/i18n';
import type { ContactCopy } from '~/content/contact';

/**
 * `copy` is passed in rather than imported so the form shows the wording from
 * Sanity. The page resolves it once and hands it down; importing the
 * dictionary here directly would silently ignore any CMS edits.
 */
type Props = { lang: Lang; copy: ContactCopy };

export default function ContactForm({ lang, copy }: Props) {
  const t = copy;

  const [form, setForm] = React.useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    org: '',
    country: t.countries[0],
    prefLang: lang,
    msg: '',
  });
  const [toast, setToast] = React.useState<string | null>(null);
  const timer = React.useRef<number | undefined>(undefined);

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  const set =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire up to a real form endpoint. See the note at the top.
    setToast(t.toast);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(null), 3400);
  }

  const selectStyle: React.CSSProperties = {
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontFamily: 'inherit',
    fontSize: 15,
    color: 'var(--c-dark)',
    width: '100%',
  };

  return (
    <>
      <form className="vcard" style={{ padding: 40, borderRadius: 24 }} onSubmit={submit}>
        <h2
          style={{
            fontFamily: 'Plus Jakarta Sans,sans-serif',
            fontWeight: 700,
            fontSize: 26,
            margin: '0 0 6px',
            color: 'var(--c-green)',
          }}
        >
          {t.formTitle}
        </h2>
        <p style={{ color: 'var(--c-muted)', margin: '0 0 28px', fontSize: 15 }}>
          {t.formSubtitle}
        </p>

        <div className="g2-sm" style={{ gap: 14, marginBottom: 14 }}>
          <Field
            id="cf-name"
            label={t.fullName}
            icon="person"
            placeholder={t.fullNamePh}
            value={form.name}
            onChange={set('name')}
            autoComplete="name"
            required
          />
          <Field
            id="cf-email"
            label={t.email}
            icon="mail"
            type="email"
            placeholder={t.emailPh}
            value={form.email}
            onChange={set('email')}
            autoComplete="email"
            required
          />
        </div>

        <div className="g2-sm" style={{ gap: 14, marginBottom: 14 }}>
          <Field
            id="cf-phone"
            label={t.phone}
            icon="call"
            type="tel"
            placeholder={t.phonePh}
            value={form.phone}
            onChange={set('phone')}
            autoComplete="tel"
          />
          <div className="vfield">
            <label htmlFor="cf-role">{t.iAmA}</label>
            <div className="vfield-row">
              <Sym name="badge" />
              <select id="cf-role" value={form.role} onChange={set('role')} style={selectStyle}>
                <option value="">{t.selectRole}</option>
                {t.roles.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="g2-sm" style={{ gap: 14, marginBottom: 14 }}>
          <Field
            id="cf-org"
            label={t.org}
            icon="account_balance"
            placeholder={t.orgPh}
            value={form.org}
            onChange={set('org')}
            autoComplete="organization"
          />
          <div className="vfield">
            <label htmlFor="cf-country">{t.country}</label>
            <div className="vfield-row">
              <Sym name="public" />
              <select
                id="cf-country"
                value={form.country}
                onChange={set('country')}
                style={selectStyle}
              >
                {t.countries.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <fieldset style={{ marginBottom: 16, border: 'none', padding: 0 }}>
          <legend className="vlbl" style={{ color: 'var(--c-dark)', marginBottom: 10 }}>
            {t.prefLang}
          </legend>
          <div style={{ display: 'flex', gap: 20 }}>
            {t.langs.map(([value, label]) => (
              <label
                key={value}
                style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 15 }}
              >
                <input
                  type="radio"
                  name="prefLang"
                  value={value}
                  checked={form.prefLang === value}
                  onChange={set('prefLang')}
                  style={{ accentColor: 'var(--c-lime)', width: 16, height: 16 }}
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="vfield" style={{ marginBottom: 22 }}>
          <label htmlFor="cf-msg">{t.message}</label>
          <textarea
            id="cf-msg"
            value={form.msg}
            onChange={set('msg')}
            rows={4}
            placeholder={t.messagePh}
            style={{
              border: '1.5px solid var(--c-border)',
              borderRadius: 12,
              padding: '13px 16px',
              fontFamily: 'inherit',
              fontSize: 15,
              color: 'var(--c-dark)',
              width: '100%',
              resize: 'vertical',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <button type="submit" className="vbtn vbtn-md vbtn-lime" style={{ width: '100%' }}>
          {t.submit}
          <Sym name="send" size={18} />
        </button>
      </form>

      {toast && (
        <div className="vtoast" role="status" aria-live="polite">
          <Sym name="check_circle" color="var(--c-lime)" />
          {toast}
        </div>
      )}
    </>
  );
}

/* ---- small local helpers ------------------------------------------------ */

function Sym({
  name,
  size = 19,
  color = 'var(--c-muted)',
}: {
  name: string;
  size?: number;
  color?: string;
}) {
  return (
    <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: size, color }}>
      {name}
    </span>
  );
}

function Field({
  id,
  label,
  icon,
  type = 'text',
  placeholder,
  value,
  onChange,
  autoComplete,
  required,
}: {
  id: string;
  label: string;
  icon: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div className="vfield">
      <label htmlFor={id}>{label}</label>
      <div className="vfield-row">
        <Sym name={icon} />
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required={required}
        />
      </div>
    </div>
  );
}
