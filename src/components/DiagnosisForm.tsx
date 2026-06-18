import { useState, type FormEvent } from 'react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function DiagnosisForm({ source }: { source?: string }) {
  const [status, setStatus] = useState<FormStatus>('idle');

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
    'w-full px-4 py-3 bg-background border border-outline-variant focus:border-on-surface text-on-surface placeholder:text-on-surface-variant/50 outline-none transition-colors font-body text-sm';

  if (status === 'success') {
    return (
      <div className="max-w-[440px] mx-auto p-6 border border-primary/40 bg-primary/10 text-on-surface font-bold font-display text-lg">
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
        type="email"
        name="email"
        required
        placeholder="E-Mail"
        aria-label="E-Mail"
      />
      <input
        className={inputClass}
        type="text"
        name="message"
        required
        placeholder="Worum geht's grob?"
        aria-label="Worum geht's grob?"
      />
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="px-10 py-5 bg-primary text-on-surface font-display font-black text-lg hover:translate-x-1 hover:-translate-y-1 transition-transform shadow-cta disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {status === 'submitting'
          ? 'Wird gesendet…'
          : 'Kostenlosen Systemcheck buchen'}
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