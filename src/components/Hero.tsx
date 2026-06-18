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
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 px-margin-mobile md:px-margin-desktop border-b border-outline-variant bg-background">
      {/* Grid Structure Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="grid-line-v left-margin-desktop" />
        <div className="grid-line-v right-margin-desktop" />
        <div className="grid-line-h top-1/4" />
        <div className="grid-line-h bottom-1/4" />
      </div>

      <div
        ref={bootRef}
        className="relative z-10 text-center max-w-4xl mx-auto space-y-8 md:space-y-10"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-outline-variant bg-surface">
          <span className="w-1.5 h-1.5 bg-primary animate-pulse" />
          <span className="label-caps text-on-surface-variant">
            FÜR SHK-, PV- UND HANDWERKSBETRIEBE
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-7xl font-display font-black leading-[0.95] tracking-tight max-w-3xl mx-auto">
          Während Sie auf der Baustelle sind,{' '}
          <br className="hidden md:block" />
          <span
            className="text-primary"
            style={{ textShadow: '1px 1px 0px #0F172A' }}
          >
            geht keine Kundenanfrage mehr unter.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-on-surface font-display font-bold tracking-tight max-w-2xl mx-auto">
          Der WhatsApp-Assistent, der Anfragen vollständig erfasst und nur
          ernsthafte Aufträge auf Ihr Handy bringt.
        </p>

        {/* Description */}
        <p className="text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto font-medium leading-relaxed">
          Für Handwerksbetriebe, die auf der Baustelle keine Zeit für
          halbfertige E-Mail-Anfragen haben. Ein schlüsselfertiges System:
          Sie arbeiten, das System fängt die Aufträge.
        </p>

        {/* CTA Block */}
        <div className="flex flex-col items-center gap-4 pt-4">
          <button
            className="px-10 md:px-12 py-5 md:py-6 bg-primary text-on-surface font-display font-black text-lg md:text-xl hover:translate-x-1 hover:-translate-y-1 transition-transform shadow-cta"
            onClick={() =>
              document
                .getElementById('cta')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Kostenlosen Systemcheck buchen
          </button>
          <p className="text-xs md:text-sm text-on-surface-variant/70 font-medium">
            Erleben Sie das System live auf Ihrem eigenen Smartphone
          </p>
        </div>

        {/* Badges / Chips */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <div className="border border-outline-variant bg-surface px-4 py-2 label-caps text-on-surface-variant text-[10px]">
            Festpreis ab 2.000 €
          </div>
          <div className="border border-outline-variant bg-surface px-4 py-2 label-caps text-on-surface-variant text-[10px]">
            Schlüsselfertig
          </div>
          <div className="border border-outline-variant bg-surface px-4 py-2 label-caps text-on-surface-variant text-[10px]">
            Open Source (n8n)
          </div>
          <div className="border border-outline-variant bg-surface px-4 py-2 label-caps text-on-surface-variant text-[10px]">
            Enterprise-Stabilität
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;