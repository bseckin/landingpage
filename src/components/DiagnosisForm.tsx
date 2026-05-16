import { useState, type CSSProperties, type FormEvent } from 'react';

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

  const inputStyle: CSSProperties = {
    width: '100%',
    padding: '0.85rem 1rem',
    borderRadius: '0.6rem',
    border: '1px solid rgba(148,163,184,0.4)',
    background: 'rgba(255,255,255,0.06)',
    color: 'inherit',
    font: 'inherit',
    outline: 'none',
  };

  if (status === 'success') {
    return (
      <div
        style={{
          maxWidth: '440px',
          margin: '0 auto',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          border: '1px solid rgba(20,184,166,0.4)',
          background: 'rgba(20,184,166,0.1)',
          fontWeight: 700,
        }}
      >
        Angefragt — ich melde mich in Kürze.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '440px', margin: '0 auto', textAlign: 'left' }}
    >
      {source && <input type="hidden" name="source" value={source} />}
      <input style={inputStyle} type="text" name="name" required placeholder="Name" aria-label="Name" />
      <input style={inputStyle} type="email" name="email" required placeholder="E-Mail" aria-label="E-Mail" />
      <input
        style={inputStyle}
        type="text"
        name="message"
        required
        placeholder="Worum geht's grob?"
        aria-label="Worum geht's grob?"
      />
      <button type="submit" className="btn btn-primary" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Wird gesendet…' : 'Kostenlose Prozess-Diagnose anfragen'}
      </button>
      {status === 'error' && (
        <p style={{ color: '#f87171', fontSize: '0.85rem', margin: 0 }}>
          Senden fehlgeschlagen. Bitte erneut versuchen oder direkt an hallo@berkayseckin.at.
        </p>
      )}
    </form>
  );
}
