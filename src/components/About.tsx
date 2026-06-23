const BULLETS = [
  { n: '01', text: 'Live-Demo auf Ihrem eigenen Smartphone' },
  { n: '02', text: 'Wo genau Aufträge bei Ihnen verloren gehen' },
  { n: '03', text: 'Bauplan: was sich für Ihren Betrieb konkret lohnt' },
];

const About = () => {
  return (
    <section
      className="py-24 md:py-32 bg-background relative overflow-hidden"
      id="cta"
    >
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 md:gap-20 items-center">
          {/* Left Column: Image + Badges */}
          <div className="space-y-8 relative">
            <div className="rounded-xl overflow-hidden border border-outline-variant shadow-soft bg-surface">
              <img
                className="w-full"
                src="/portrait.jpg"
                alt="Berkay Seckin"
                onError={(e) => {
                  const img = e.currentTarget;
                  img.style.display = 'none';
                  const fb = img.nextElementSibling as HTMLElement | null;
                  if (fb) fb.style.display = 'flex';
                }}
              />
              <div
                aria-hidden
                style={{
                  display: 'none',
                  width: '100%',
                  minHeight: '320px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '6rem',
                  fontWeight: 700,
                  color: '#5A554C',
                  background: 'linear-gradient(135deg,#efe9df,#f7f4ee)',
                }}
              >
                BS
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              {[
                'ORF Werbetechnologie',
                'BRZ Requirement Engineer',
                'Studium Wirtschaftsinformatik',
              ].map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-outline-variant bg-surface px-4 py-2 text-[13px] font-medium text-on-surface-variant"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: About Text + CTA */}
          <div className="space-y-8">
            <h3 className="text-3xl md:text-5xl font-display font-semibold leading-[1.08] tracking-tight">
              Was ich bei ORF und BRZ gelernt habe — und warum es für Ihren
              Betrieb genauso gilt.
            </h3>
            <p className="text-base md:text-lg text-on-surface-variant leading-relaxed">
              Bei ORF Werbetechnologie läuft das Buchungssystem rund um die
              Uhr — eine Stunde Ausfall kostet fünfstellige Werbeeinnahmen.
              Beim Bundesrechenzentrum laufen kritische Staatssysteme: Kein
              Spielraum, keine Ausreden.
            </p>
            <p className="text-base md:text-lg text-on-surface-variant leading-relaxed">
              Bei Ihrem Betrieb ist der Einsatz ein anderer, aber das Prinzip
              dasselbe: Eine Stunde ohne Antwort, und der Kunde hat den nächsten
              Installateur angerufen. Ich baue Systeme, die das verhindern —
              ohne monatliche Kosten, ohne Abhängigkeit von einer Software-Firma.
            </p>

            {/* CTA Card */}
            <div className="rounded-xl border border-outline-variant bg-surface p-8 md:p-10 space-y-6 shadow-soft">
              <h4 className="text-2xl md:text-3xl font-display font-semibold leading-snug">
                Sehen Sie, wie das System auf Ihrem Handy aussieht.
              </h4>
              <p className="text-on-surface-variant leading-relaxed">
                Der kostenlose Systemcheck dauert 30 Minuten. Ich schaue mir an,
                wie Anfragen aktuell bei Ihnen eingehen, finde die größten
                Verlustquellen und zeige Ihnen live auf Ihrem eigenen Smartphone,
                wie das System arbeitet.
              </p>
              <div className="space-y-3">
                {BULLETS.map((b) => (
                  <div key={b.n} className="flex items-baseline gap-4">
                    <span className="text-[11px] font-bold tabular-nums text-primary shrink-0 w-5">
                      {b.n}
                    </span>
                    <span className="text-sm text-on-surface font-medium leading-relaxed">
                      {b.text}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-start gap-3 pt-1">
                <button
                  className="px-8 py-4 rounded-lg bg-primary text-white font-display font-semibold text-lg shadow-cta hover:shadow-cta-hover hover:-translate-y-0.5 transition-all w-full md:w-auto text-center"
                  onClick={() =>
                    document
                      .getElementById('diagnosis-form')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                >
                  Kostenlosen Systemcheck buchen
                </button>
                <p className="text-xs text-on-surface-variant">
                  Kein Pitch. Kein Verkaufsdruck. Wenn wir keine Verbesserung
                  finden, hat es Sie 30 Minuten gekostet – mehr nicht.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
