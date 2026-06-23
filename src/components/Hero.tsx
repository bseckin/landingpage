import { useEffect, useRef } from 'react';

const Hero = () => {
  const bootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('boot-sequence');
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative pt-28 md:pt-32 pb-16 md:pb-24 px-margin-mobile md:px-margin-desktop border-b border-outline-variant bg-background">
      <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
        {/* Left: Copy */}
        <div ref={bootRef} className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-primary-soft text-primary mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="label-caps">Für SHK-, PV- und Handwerksbetriebe</span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-semibold text-4xl md:text-6xl leading-[1.04] tracking-tight mb-6">
            Während Sie auf der Baustelle sind,{' '}
            <span className="text-primary italic">
              geht keine Kundenanfrage mehr unter.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-on-surface font-medium leading-relaxed max-w-xl mb-3">
            Der WhatsApp-Assistent, der Anfragen vollständig erfasst und nur
            ernsthafte Aufträge auf Ihr Handy bringt.
          </p>

          {/* Description */}
          <p className="text-base text-on-surface-variant leading-relaxed max-w-xl mb-8">
            Eingerichtet von einem Menschen, nicht von einem SaaS-Abo.
            Sie arbeiten — das System fängt die Aufträge.
          </p>

          {/* CTA */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button
              className="px-8 py-4 rounded-lg bg-primary text-white font-display font-semibold text-lg shadow-cta hover:shadow-cta-hover hover:-translate-y-0.5 transition-all"
              onClick={() =>
                document
                  .getElementById('diagnosis-form')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Kostenlosen Systemcheck buchen
            </button>
            <span className="text-sm text-on-surface-variant">
              30 Min. Telefon · unverbindlich
            </span>
          </div>

          {/* Chips */}
          <div className="flex flex-wrap gap-2.5">
            {[
              'Festpreis ab 2.000 €',
              'Kein Abo, keine Monatskosten',
              'Aus Wien, persönlich erreichbar',
            ].map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center gap-2 rounded-full border border-outline-variant bg-surface px-4 py-2 text-[13px] font-medium text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-primary text-[15px] leading-none">
                  check
                </span>
                {chip}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Trust card */}
        <aside className="rounded-xl border border-outline-variant bg-surface p-2 shadow-soft">
          <div className="rounded-[14px] overflow-hidden aspect-[4/3]">
            <img
              src="/portrait.jpg"
              alt="Berkay Seckin"
              className="w-full h-full object-cover"
              style={{ objectPosition: '50% 22%' }}
            />
          </div>
          <div className="px-4 pt-4 pb-2">
            <div className="font-display font-semibold text-lg text-on-surface">
              Berkay Seckin
            </div>
            <div className="text-[13px] text-on-surface-variant mt-1 leading-relaxed">
              Prozessautomatisierung, Wien · davor ORF &amp; Bundesrechenzentrum
            </div>
          </div>
          <div className="mx-2 mb-2 px-4 py-3 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
            <span className="text-[13px] text-on-surface-variant leading-snug">
              Aktuell Kapazität für 2–3 neue Betriebe in Wien und Umgebung verfügbar.
            </span>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Hero;
