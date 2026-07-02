import { useEffect, useState } from 'react';

/* ─── 60-Sekunden Countdown Timer ─────────────────────────────── */
function useCountdown(initialSeconds: number) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        return next < 0 ? initialSeconds : next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [initialSeconds]);

  return `0:${String(timeLeft).padStart(2, '0')}`;
}

const STEPS = [
  {
    n: 'Schritt 1',
    title: 'Automatische Erfassung aller Kanäle',
    body: 'Egal ob Website-Formular, WhatsApp oder E-Mail – das System erfasst jede Anfrage sofort. Fehlende Angaben fragt es automatisch nach. Nur vollständige Anfragen landen bei Ihnen.',
    accent: false,
  },
  {
    n: 'Schritt 2',
    title: 'Sekundenschnelle Analyse und Weiterleitung',
    body: 'Das System prüft Absender, Anliegen und Dringlichkeit. Eine fertig aufbereitete Nachricht mit allen Infos landet als WhatsApp auf Ihrem Handy – nicht im E-Mail-Chaos.',
    accent: true,
  },
  {
    n: 'Schritt 3',
    title: 'Das Angebot steht in Minuten, kein Auftrag verschwindet',
    body: 'Der Kunde erhält sofort eine Eingangsbestätigung. Im Hintergrund erstellt das System aus den Formulardaten einen Angebotsentwurf – aus Ihren hinterlegten Preisen. Sie prüfen am Handy und senden ab. 4 Minuten statt 45.',
    accent: false,
  },
];

const PROOF = [
  {
    label: 'Ausfallsicher',
    title: 'Auch wenn Ihre Website ausfällt',
    body: 'Das System puffert Anfragen bei Ausfällen und wiederholt Zustellungen automatisch. Keine Anfrage geht verloren – selbst wenn Ihre Website mal down ist.',
  },
  {
    label: 'Nachvollziehbar',
    title: 'Lückenlose Dokumentation',
    body: 'Jeder Schritt wird protokolliert. Sie sehen genau, welche Anfrage wann kam und wie sie behandelt wurde – vom ersten Kontakt bis zum unterschriebenen Auftrag.',
  },
  {
    label: 'Ihr Eigentum',
    title: 'Das System gehört Ihnen. Keine monatlichen Kosten.',
    body: 'Es läuft auf österreichischen Servern und gehört Ihnen. Sie zahlen einmal — bei Bedarf stehe ich für Wartung zur Verfügung. Kein Abo, das jeden Monat Geld frisst.',
  },
];

const Process = () => {
  const display = useCountdown(60);

  return (
    <section
      className="py-24 md:py-32 bg-background border-b border-outline-variant"
      id="process"
    >
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-16 max-w-3xl mx-auto">
          <span className="label-caps text-primary mb-4 block">Der Workflow</span>
          <h3 className="text-3xl md:text-5xl font-display font-semibold leading-[1.08] tracking-tight">
            Eine Anfrage kommt rein. Das passiert in den nächsten 60 Sekunden.
          </h3>
        </div>

        {/* WhatsApp Produktbeweis */}
        <div className="max-w-md mx-auto mb-20">
          <div className="rounded-xl border border-outline-variant bg-surface shadow-soft overflow-hidden">
            {/* WA Header */}
            <div className="flex items-center gap-3 px-4 py-3" style={{ background: '#075E54' }}>
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold text-white"
                style={{ background: '#34c97b' }}
              >
                B·S
              </div>
              <div className="flex-1">
                <div className="text-white font-semibold text-sm font-body">
                  Anfrage-Assistent
                </div>
                <div className="text-[11px]" style={{ color: '#bfe6d8' }}>
                  online
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-white/90">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                {display}
              </div>
            </div>
            {/* Chat */}
            <div className="p-4 flex flex-col gap-2.5 bg-[#ECE5DD]">
              <div className="self-start max-w-[82%] bg-white rounded-xl rounded-tl-sm px-3 py-2 text-[13px] text-on-surface shadow-sm">
                Hallo, unsere Heizung ist ausgefallen. Können Sie kommen?
              </div>
              <div
                className="self-end max-w-[82%] rounded-xl rounded-tr-sm px-3 py-2 text-[13px] shadow-sm"
                style={{ background: '#DCF8C6', color: '#1C1A16' }}
              >
                Gerne! Damit der Chef gleich alles hat: Welcher Heizungstyp &amp; PLZ?
              </div>
              <div className="self-start max-w-[82%] bg-white rounded-xl rounded-tl-sm px-3 py-2 text-[13px] text-on-surface shadow-sm">
                Gastherme Vaillant, 1100 Wien, brennt nicht mehr.
              </div>
            </div>
            {/* Result */}
            <div className="flex items-center gap-3 px-4 py-4 border-t border-outline-variant">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-white text-lg shrink-0">
                ✓
              </span>
              <div>
                <div className="font-display font-semibold text-sm text-on-surface">
                  Qualifizierter Auftrag → Ihr Handy
                </div>
                <div className="text-[12px] text-on-surface-variant mt-0.5">
                  Gastherme · 1100 Wien · Notfall · vollständig erfasst
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className={`space-y-3 border-l-2 pl-6 ${
                s.accent ? 'border-primary' : 'border-outline-variant'
              }`}
            >
              <span className="label-caps text-on-surface-variant text-[10px]">
                {s.n}
              </span>
              <h4 className="text-lg font-display font-semibold text-on-surface leading-snug">
                {s.title}
              </h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {s.body}
              </p>
            </div>
          ))}
        </div>

        {/* Proof Headline */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <span className="label-caps text-primary mb-3 block">Stabilität</span>
          <h3 className="text-3xl md:text-4xl font-display font-semibold leading-tight">
            Gebaut für Dauerbetrieb. Auch wenn Sie Feierabend haben.
          </h3>
        </div>

        {/* Proof Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {PROOF.map((c) => (
            <div key={c.label} className="bg-surface p-8 md:p-10 technical-card">
              <span className="label-caps text-primary block mb-4">{c.label}</span>
              <h5 className="text-lg font-display font-semibold mb-3 leading-snug text-on-surface">
                {c.title}
              </h5>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {c.body}
              </p>
            </div>
          ))}
        </div>

        {/* Einwand-Handler: Kunden die anrufen */}
        <div className="max-w-2xl mx-auto rounded-xl border border-outline-variant bg-surface p-8 flex items-start gap-5">
          <div className="w-10 h-10 rounded-xl bg-primary-soft flex items-center justify-center shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-primary text-xl">phone_in_talk</span>
          </div>
          <div>
            <p className="font-display font-semibold text-on-surface mb-2 leading-snug">
              &bdquo;Was ist mit Kunden, die lieber anrufen?&ldquo;
            </p>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Kunden, die anrufen, erreichen Sie wie bisher direkt. Das System
              ergänzt alle anderen Kanäle — WhatsApp, Formular, E-Mail — lückenlos.
              Genau dort gehen heute die meisten Aufträge verloren, ohne dass
              Sie es merken.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
