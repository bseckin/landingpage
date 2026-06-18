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
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXaDQEBloa_U3kCBM8V0iTrMelNiaGvscrO2lqtaXYSAMsjPBi-_rWkFdZU-tzANd0_Oq2kkC3oyXIwljduFAzEqCEJ9YrisgY_b1ZJWCTTgktbkxXEgixrQZJmZG4N0Rty0Z1ycMWd0zu6BiJW3JiNn-HV1F-0KFjrJ2OLryJDaYkzE-VP7NsnR3SNpUM7kweoliDwJWI4vvNaFtDfpTs2XMngtAic8Q8oph8tpj2C8Xgbl-dxEzZjTeVN84_bSmIHoQjjAuzSKs"
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
              Sicherheitsgarantie aus der System-Architektur
            </h3>
            <p className="text-base md:text-lg text-on-surface-variant font-medium leading-relaxed">
              Ich habe Systeme gebaut, die für den Staat kritisch waren (ORF
              Werbetechnologie, Bundesrechenzentrum). Dieselbe kompromisslose
              Stabilität, Ausfallsicherheit und der harte österreichische
              Datenschutz (lokales Hosting) kommen jetzt in Ihren Betrieb. Kein
              Overhead. Sie arbeiten direkt mit demjenigen, der Ihr System
              baut. Das System basiert auf Open Source (n8n). Kein Vendor
              Lock-in. Sie besitzen es. Ich warte es, solange Sie wollen.
            </p>

            {/* CTA Card */}
            <div className="border border-outline-variant bg-background p-8 md:p-10 space-y-6">
              <h4 className="text-2xl md:text-3xl font-display font-black uppercase">
                Sind Sie bereit, Ihre erste Leck-Stelle zu finden?
              </h4>
              <p className="text-on-surface-variant leading-relaxed">
                Der kostenlose Systemcheck dauert 30 Minuten. Ich schaue mir
                Ihre aktuelle Anfrage-Verarbeitung an, identifiziere die
                kritischsten Lecks und zeige Ihnen live, wie das System auf
                Ihrem eigenen Smartphone funktioniert.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-lg mt-0.5">
                    arrow_forward
                  </span>
                  <span className="text-sm text-on-surface font-medium">
                    Live-Demo auf Ihr Handy
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-lg mt-0.5">
                    arrow_forward
                  </span>
                  <span className="text-sm text-on-surface font-medium">
                    Schwachstellen im Eingang aufdecken
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-lg mt-0.5">
                    arrow_forward
                  </span>
                  <span className="text-sm text-on-surface font-medium">
                    Bauplan für Ihr Unternehmen sehen
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
                  Kein Pitch. Kein Verkaufsdruck. Finden wir keinen Hebel, hat
                  es Sie nur 30 Minuten Zeit gekostet.
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