/* Echte Kundenzitate hier einfügen — Struktur ist fertig.
   Felder: quote (Text), name, betrieb, ort */
const TESTIMONIALS: { quote: string; name: string; betrieb: string; ort: string }[] = [
  // { quote: '...', name: 'Max Muster', betrieb: 'Muster GmbH', ort: 'Wien' },
];

const PLACEHOLDERS = [
  { betrieb: 'SHK-Betrieb', ort: 'Wien' },
  { betrieb: 'Heizungsbauer', ort: 'Niederösterreich' },
  { betrieb: 'PV-Installateur', ort: 'Steiermark' },
];

const items = TESTIMONIALS.length > 0 ? TESTIMONIALS : null;

const SkeletonCard = ({ betrieb, ort }: { betrieb: string; ort: string }) => (
  <div className="technical-card p-8 flex flex-col gap-6">
    <div className="space-y-2.5">
      <div className="h-2.5 rounded-full bg-outline-variant w-full" />
      <div className="h-2.5 rounded-full bg-outline-variant w-11/12" />
      <div className="h-2.5 rounded-full bg-outline-variant w-4/5" />
      <div className="h-2.5 rounded-full bg-outline-variant w-3/4" />
    </div>
    <div className="flex items-center gap-3 border-t border-outline-variant pt-5">
      <div className="w-10 h-10 rounded-full bg-primary-soft flex items-center justify-center shrink-0">
        <span className="label-caps text-primary text-[10px]">?</span>
      </div>
      <div>
        <div className="h-2.5 rounded-full bg-outline-variant w-20 mb-2" />
        <div className="text-[12px] text-on-surface-variant">
          {betrieb} · {ort}
        </div>
      </div>
    </div>
  </div>
);

const RealCard = ({
  quote,
  name,
  betrieb,
  ort,
}: {
  quote: string;
  name: string;
  betrieb: string;
  ort: string;
}) => (
  <div className="technical-card p-8 flex flex-col gap-6">
    <p className="text-on-surface leading-relaxed text-sm">&bdquo;{quote}&ldquo;</p>
    <div className="flex items-center gap-3 border-t border-outline-variant pt-5">
      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
        <span className="label-caps text-white text-[11px]">
          {name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
        </span>
      </div>
      <div>
        <div className="text-sm font-display font-semibold text-on-surface">{name}</div>
        <div className="text-[12px] text-on-surface-variant">
          {betrieb} · {ort}
        </div>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  return (
    <section className="py-24 md:py-32 bg-background border-b border-outline-variant">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="mb-12">
          <span className="label-caps text-primary mb-4 block">Stimmen aus der Praxis</span>
          <h3 className="text-3xl md:text-5xl font-display font-semibold leading-[1.08] tracking-tight max-w-2xl">
            Was Betriebe nach dem ersten Monat sagen.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items
            ? items.map((t) => <RealCard key={t.name} {...t} />)
            : PLACEHOLDERS.map((p) => (
                <SkeletonCard key={p.betrieb} betrieb={p.betrieb} ort={p.ort} />
              ))}
        </div>

        {!items && (
          <p className="label-caps text-on-surface-variant/40 text-center mt-8">
            Kundenstimmen werden nach den ersten Projekten ergänzt
          </p>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
