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

  const seconds = String(timeLeft).padStart(2, '0');
  return `00:00:${seconds}`;
}

/* ─── Process Component ───────────────────────────────────────── */
const Process = () => {
  const display = useCountdown(60);

  return (
    <section
      className="py-24 md:py-32 bg-background border-b border-outline-variant"
      id="process"
    >
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="label-caps text-on-surface-variant mb-4 block">
            Der Workflow
          </span>
          <h3 className="text-3xl md:text-5xl font-display font-black uppercase leading-tight max-w-3xl mx-auto">
            Eine Anfrage kommt rein. Das passiert in den nächsten 60 Sekunden.
          </h3>
        </div>

        {/* Countdown Timer + Reaktor Visual */}
        <div className="relative max-w-5xl mx-auto mb-20 border border-outline-variant bg-surface p-6 md:p-8 blueprint-grid overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-outline-variant pb-6">
            <div className="flex gap-4 items-center">
              <div className="w-3 h-3 bg-primary animate-pulse" />
              <span className="label-caps text-on-surface-variant">
                System Live // Anfragen-Rettung v4.2
              </span>
            </div>
            <div className="text-right">
              <div className="text-4xl md:text-5xl font-display font-black text-on-surface tabular-nums">
                {display}
              </div>
              <span className="label-caps text-[9px] text-on-surface-variant opacity-60">
                Sekunden bis zur Alarmierung
              </span>
            </div>
          </div>

          <div className="relative h-64 md:h-80 flex items-center justify-between px-2 md:px-4">
            {/* Data Pipeline SVG */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="none"
              viewBox="0 0 800 200"
            >
              <path
                d="M40,100 L760,100"
                fill="none"
                stroke="#E2E8F4"
                strokeWidth="1.5"
              />
              <path
                className="data-pulse"
                d="M40,100 L760,100"
                fill="none"
                stroke="#00F2FE"
                strokeWidth="3"
              />
            </svg>

            {/* Node 1: Multi-Channel Capture */}
            <div className="relative z-10 flex flex-col items-center gap-3 bg-surface border border-outline-variant p-3 md:p-4 w-28 md:w-32 shadow-sm">
              <div className="grid grid-cols-2 gap-1.5 md:gap-2 mb-1">
                <span className="material-symbols-outlined text-on-surface-variant text-sm md:text-base">
                  mail
                </span>
                <span className="material-symbols-outlined text-on-surface-variant text-sm md:text-base">
                  description
                </span>
                <span className="material-symbols-outlined text-on-surface-variant text-sm md:text-base">
                  forum
                </span>
                <span className="material-symbols-outlined text-on-surface-variant text-sm md:text-base">
                  share
                </span>
              </div>
              <span className="label-caps text-[8px] md:text-[9px]">
                Multi-Channel
              </span>
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-primary" />
                <div className="w-1 h-1 bg-primary opacity-30" />
                <div className="w-1 h-1 bg-primary opacity-10" />
              </div>
            </div>

            {/* Node 2: Validation */}
            <div className="relative z-10 flex flex-col items-center gap-3 bg-surface border border-outline-variant p-3 md:p-4 w-28 md:w-32 shadow-sm">
              <div className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border border-outline-variant">
                <div className="scan-line" />
                <span className="material-symbols-outlined text-on-surface-variant text-xl md:text-2xl">
                  grid_view
                </span>
              </div>
              <span className="label-caps text-[8px] md:text-[9px]">
                Validation
              </span>
            </div>

            {/* Node 3: Reaktor (CORE) */}
            <div className="relative z-10 flex flex-col items-center justify-center bg-surface border-2 border-primary w-32 h-32 md:w-40 md:h-40 reaktor-glow shadow-md">
              <div className="absolute inset-0 border border-primary/10 scale-110 animate-ping duration-1000" />
              <div className="relative">
                <svg
                  className="w-12 h-12 md:w-16 md:h-16 animate-spin duration-[4s]"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    fill="none"
                    r="45"
                    stroke="#00F2FE"
                    strokeDasharray="20 10"
                    strokeWidth="2"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    fill="none"
                    r="30"
                    stroke="#00F2FE"
                    strokeDasharray="5 5"
                    strokeWidth="1"
                  />
                </svg>
                <span className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-on-surface text-2xl md:text-3xl">
                  hub
                </span>
              </div>
              <span className="label-caps text-[9px] md:text-[10px] text-on-surface mt-3 md:mt-4">
                AUTOMATISIERUNG
              </span>
              <span className="text-[7px] uppercase text-on-surface-variant font-black tracking-widest">
                Aktiv
              </span>
            </div>

            {/* Node 4: Logging */}
            <div className="relative z-10 flex flex-col items-center gap-3 bg-surface border border-outline-variant p-3 md:p-4 w-28 md:w-32 shadow-sm">
              <div className="flex flex-col gap-0.5">
                <div className="w-6 h-1.5 md:w-8 md:h-2 border border-outline-variant" />
                <div className="w-6 h-1.5 md:w-8 md:h-2 border border-outline-variant bg-on-surface-variant/5" />
                <div className="w-6 h-1.5 md:w-8 md:h-2 border border-outline-variant" />
              </div>
              <span className="label-caps text-[8px] md:text-[9px]">
                Dokumentation
              </span>
            </div>

            {/* Node 5: WhatsApp Delivery */}
            <div className="relative z-10 flex flex-col items-center gap-3 bg-surface border border-outline-variant p-3 md:p-4 w-28 md:w-32 shadow-sm">
              <div className="relative">
                <span className="material-symbols-outlined text-on-surface-variant text-2xl md:text-3xl">
                  smartphone
                </span>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse border-2 border-surface" />
              </div>
              <span className="label-caps text-[8px] md:text-[9px]">
                WhatsApp Alarm
              </span>
            </div>
          </div>
        </div>

        {/* 3 Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Step 1 */}
          <div className="space-y-4 border-l border-outline-variant pl-6">
            <span className="label-caps text-on-surface-variant text-[10px]">
              Schritt 1
            </span>
            <h4 className="text-lg font-display font-bold uppercase text-on-surface">
              Automatische Erfassung aller Kanäle
            </h4>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Egal ob Website-Formular, WhatsApp oder E-Mail – das System
              erfasst jede Kundenanfrage sofort. Fehlende Angaben fragt es
              automatisch nach. Nur vollständige Anfragen landen bei Ihnen.
            </p>
          </div>

          {/* Step 2 */}
          <div className="space-y-4 border-l border-primary pl-6">
            <span className="label-caps text-on-surface text-[10px]">
              Schritt 2
            </span>
            <h4 className="text-lg font-display font-bold uppercase text-on-surface">
              Sekundenschnelle Analyse und Weiterleitung
            </h4>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Das System prüft Absender, Anliegen und Dringlichkeit. Eine
              fertig aufbereitete Nachricht mit allen Infos landet als
              WhatsApp auf Ihrem Handy – nicht im E-Mail-Chaos.
            </p>
          </div>

          {/* Step 3 */}
          <div className="space-y-4 border-l border-outline-variant pl-6">
            <span className="label-caps text-on-surface-variant text-[10px]">
              Schritt 3
            </span>
            <h4 className="text-lg font-display font-bold uppercase text-on-surface">
              Kein Auftrag verschwindet, das Angebot steht in Minuten
            </h4>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Der Kunde erhält sofort eine Eingangsbestätigung. Im Hintergrund
              erstellt das System aus den Formulardaten einen Angebotsentwurf –
              aus Ihren hinterlegten Preisen. Sie prüfen am Handy und drücken
              auf Senden. 4 Minuten statt 45.
            </p>
          </div>
        </div>

        {/* Tech-Proof Headline */}
        <div className="text-center mb-12">
          <span className="label-caps text-on-surface-variant mb-3 block">
            Stabilität
          </span>
          <h3 className="text-3xl md:text-4xl font-display font-black uppercase">
            Gebaut für Dauerbetrieb. Auch wenn Sie Feierabend haben.
          </h3>
        </div>

        {/* Tech-Proof Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-outline-variant border border-outline-variant">
          <div className="bg-surface p-8 md:p-10 technical-card">
            <span className="label-caps text-on-surface block mb-4">
              Safety
            </span>
            <h5 className="text-lg font-bold mb-3 uppercase">
              Auch wenn Ihre Website ausfällt
            </h5>
            <p className="text-sm text-on-surface-variant">
              Das System puffert Anfragen bei Ausfällen und wiederholt
              Zustellungen automatisch. Keine Kundenanfrage geht verloren –
              selbst wenn Ihre Website mal down ist.
            </p>
          </div>
          <div className="bg-surface p-8 md:p-10 technical-card">
            <span className="label-caps text-on-surface block mb-4">
              Metrics
            </span>
            <h5 className="text-lg font-bold mb-3 uppercase">
              Lückenlose Dokumentation
            </h5>
            <p className="text-sm text-on-surface-variant">
              Jeder Schritt wird protokolliert. Sie sehen genau, welche
              Kundenanfrage wann kam und wer sie bearbeitet hat – vom ersten
              Kontakt bis zum unterschriebenen Auftrag.
            </p>
          </div>
          <div className="bg-surface p-8 md:p-10 technical-card">
            <span className="label-caps text-on-surface block mb-4">
              Ownership
            </span>
            <h5 className="text-lg font-bold mb-3 uppercase">
              Das System gehört Ihnen. Keine monatlichen Kosten.
            </h5>
            <p className="text-sm text-on-surface-variant">
              Das System basiert auf bewährter Open-Source-Technologie (n8n),
              läuft auf österreichischen Servern und gehört Ihnen. Sie zahlen
              einmal – ich warte es, solange Sie wollen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;