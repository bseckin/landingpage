import { useState, type FormEvent } from 'react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function DiagnosisForm({
  source,
  ctaLabel = 'Kostenlosen Systemcheck buchen',
}: {
  source?: string;
  ctaLabel?: string;
}) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const isRecruiting = source === 'recruiting';

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('success');
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const inputClass =
    'w-full px-4 py-3.5 rounded-lg bg-background border border-outline-variant focus:border-primary text-on-surface placeholder:text-on-surface-variant/50 outline-none transition-colors font-body text-sm';

  const selectClass =
    'w-full px-4 py-3.5 rounded-lg bg-background border border-outline-variant focus:border-primary text-on-surface outline-none transition-colors font-body text-sm appearance-none cursor-pointer';

  if (status === 'success') {
    return (
      <div className="max-w-[440px] mx-auto p-6 rounded-xl border border-primary/30 bg-primary-soft text-on-surface font-semibold font-display text-lg">
        Angefragt — ich melde mich in Kürze.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 max-w-[440px] mx-auto text-left"
    >
      {source && <input type="hidden" name="source" value={source} />}

      <input
        className={inputClass}
        type="text"
        name="name"
        required
        placeholder="Name"
        aria-label="Name"
      />

      <input
        className={inputClass}
        type="tel"
        name="telefon"
        required
        placeholder="Telefonnummer"
        aria-label="Telefonnummer"
      />

      <input
        className={inputClass}
        type="email"
        name="email"
        placeholder="E-Mail (optional)"
        aria-label="E-Mail"
      />

      <div className="grid grid-cols-2 gap-3">
        <div className="relative">
          <select
            className={selectClass}
            name="anfragen_pro_woche"
            aria-label={isRecruiting ? 'Bewerbungen pro Woche' : 'Anfragen pro Woche'}
            defaultValue=""
          >
            <option value="" disabled>
              {isRecruiting ? 'Bewerbungen/Woche' : 'Anfragen/Woche'}
            </option>
            <option value="bis-5">bis 5</option>
            <option value="5-15">5 bis 15</option>
            <option value="15-40">15 bis 40</option>
            <option value="40+">mehr als 40</option>
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-base">
            expand_more
          </span>
        </div>

        <div className="relative">
          <select
            className={selectClass}
            name="hauptkanal"
            aria-label={isRecruiting ? 'Hauptkanal für Bewerbungen' : 'Hauptkanal für Anfragen'}
            defaultValue=""
          >
            <option value="" disabled>
              {isRecruiting ? 'Bewerbungen kommen per' : 'Anfragen kommen per'}
            </option>
            {isRecruiting ? (
              <>
                <option value="formular">Meist Formular</option>
                <option value="linkedin">Meist LinkedIn</option>
                <option value="email">Meist E-Mail</option>
                <option value="telefon">Meist Telefon</option>
                <option value="gemischt">Alles gemischt</option>
              </>
            ) : (
              <>
                <option value="telefon">Meist Telefon</option>
                <option value="whatsapp">Meist WhatsApp</option>
                <option value="formular">Meist Formular</option>
                <option value="email">Meist E-Mail</option>
                <option value="gemischt">Alles gemischt</option>
              </>
            )}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-base">
            expand_more
          </span>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="px-8 py-4 rounded-lg bg-primary text-white font-display font-semibold text-lg shadow-cta hover:shadow-cta-hover hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {status === 'submitting' ? 'Wird gesendet…' : ctaLabel}
      </button>

      {status === 'error' && (
        <p className="text-error text-sm font-medium mt-1">
          Senden fehlgeschlagen. Bitte erneut versuchen oder direkt an
          hallo@berkayseckin.at.
        </p>
      )}
    </form>
  );
}
