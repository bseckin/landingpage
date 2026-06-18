const About = () => {
  return (
    <section
      className="py-24 md:py-32 bg-surface relative overflow-hidden"
      id="cta"
    >
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Left Column: Image + Badges */}
          <div className="space-y-12 relative">
            <div className="relative border border-outline-variant p-1 bg-background">
              <img
                className="w-full grayscale filter contrast-110 opacity-90"
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
                  fontWeight: 800,
                  color: '#475569',
                  background: 'linear-gradient(135deg,#e2e8f0,#f1f5f9)',
                }}
              >
                BS
              </div>
              {/* Technical Crosshair Decor */}
              <div className="absolute -top-4 -left-4 w-8 h-8 border-t border-l border-on-surface" />
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b border-r border-on-surface" />
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 md:gap-8">
              <span className="label-caps text-sm md:text-lg font-black text-on-surface">
                ORF WERBETECHNOLOGIE
              </span>
              <span className="text-on-surface-variant opacity-40">|</span>
              <span className="label-caps text-sm md:text-lg font-black text-on-surface">
                BRZ REQUIREMENT ENGINEER
              </span>
              <span className="text-on-surface-variant opacity-40">|</span>
              <span className="label-caps text-[10px] md:text-xs text-on-surface">
                STUDIUM WIRTSCHAFTSINFORMATIK
              </span>
            </div>
          </div>

          {/* Right Column: About Text + CTA */}
          <div className="space-y-8 md:space-y-10">
            <h3 className="text-3xl md:text-5xl font-display font-black leading-none uppercase">
              Gebaut mit Standards aus kritischen Systemen – gemacht für Ihren
              Betrieb.
            </h3>
            <p className="text-base md:text-lg text-on-surface-variant font-medium leading-relaxed">
              Ich habe Systeme für ORF Werbetechnologie und das
              Bundesrechenzentrum gebaut – dort, wo Ausfall keine Option ist.
              Dieselbe Stabilität, abgestimmt auf Handwerksbetriebe, die keine
              Zeit für komplizierte Software haben. Kein Ausfall. Keine
              monatlichen Kosten. Das System gehört Ihnen.
            </p>

            {/* CTA Card */}
            <div className="border border-outline-variant bg-background p-8 md:p-10 space-y-6">
              <h4 className="text-2xl md:text-3xl font-display font-black uppercase">
                Sehen Sie, wie das System auf Ihrem Handy aussieht.
              </h4>
              <p className="text-on-surface-variant leading-relaxed">
                Der kostenlose Systemcheck dauert 30 Minuten. Ich schaue mir
                an, wie Kundenanfragen aktuell bei Ihnen eingehen, finde die
                größten Verlustquellen und zeige Ihnen live auf Ihrem eigenen
                Smartphone, wie das System arbeitet.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-lg mt-0.5">
                    arrow_forward
                  </span>
                  <span className="text-sm text-on-surface font-medium">
                    Live-Demo auf Ihrem eigenen Smartphone
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-lg mt-0.5">
                    arrow_forward
                  </span>
                  <span className="text-sm text-on-surface font-medium">
                    Verlustquellen in Ihrem Anfragen-Eingang aufdecken
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-lg mt-0.5">
                    arrow_forward
                  </span>
                  <span className="text-sm text-on-surface font-medium">
                    Konkreten Bauplan für Ihren Betrieb sehen
                  </span>
                </li>
              </ul>
              <div className="flex flex-col items-start gap-3 pt-2">
                <button
                  className="px-10 md:px-12 py-5 md:py-6 bg-primary text-on-surface font-display font-black text-lg md:text-xl hover:translate-x-1 hover:-translate-y-1 transition-transform shadow-cta w-full md:w-auto text-center"
                  onClick={() =>
                    document
                      .getElementById('diagnosis-form')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                >
                  Kostenlosen Systemcheck buchen
                </button>
                <p className="text-xs text-on-surface-variant/70 font-medium">
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