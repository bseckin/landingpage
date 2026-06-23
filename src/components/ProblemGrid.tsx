const PROBLEMS = [
  {
    num: '01',
    title: 'Das Telefon klingelt, wenn Sie unterm Kessel liegen.',
    body: 'Sie können nicht rangehen. Der Kunde ruft den nächsten Installateur an. Der Auftrag ist weg – ohne dass Sie es je erfahren.',
  },
  {
    num: '02',
    title: 'Abends zwei Stunden Büro für halbfertige Anfragen.',
    body: 'Nach 10 Stunden Baustelle sitzen Sie vor E-Mails, bei denen die Hälfte der Infos fehlt. Fotos? Fehlanzeige. Adresse? Unklar. Sie schreiben zurück. Der Kunde antwortet nicht mehr.',
  },
  {
    num: '03',
    title: 'Sie wählen Aufträge aus – aber nicht die richtigen.',
    body: 'Sie haben keine Zeit für „Was kostet ungefähr eine Heizung?". Ohne System landen alle Anfragen gleich in Ihrer Inbox. Das System holt fehlende Infos automatisch ein – und Sie entscheiden, welche Anfrage ein Angebot wert ist.',
  },
];

const ProblemGrid = () => {
  return (
    <section className="py-24 md:py-32 border-b border-outline-variant bg-surface">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col md:flex-row justify-between items-start mb-14 md:mb-20 gap-8 md:gap-12">
          <div className="max-w-2xl border-l-4 border-accent pl-7">
            <h2 className="label-caps text-accent mb-4">
              Das ist Ihr Alltag. Jeden Tag.
            </h2>
            <h3 className="text-3xl md:text-5xl font-display font-semibold leading-[1.05] tracking-tight">
              Die besten Aufträge kommen dann, wenn Sie nicht rangehen können.
            </h3>
          </div>
          <div className="text-on-surface-variant max-w-xs text-sm md:text-base leading-relaxed">
            Handwerker verdienen ihr Geld auf der Baustelle – nicht im Büro.
            Aber genau dort gehen täglich Aufträge verloren.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {PROBLEMS.map((p) => (
            <div key={p.num} className="bg-surface p-8 md:p-10 technical-card relative overflow-hidden">
              <div
                className="absolute -top-3 -right-1 font-display font-bold leading-none select-none pointer-events-none"
                style={{ fontSize: '7rem', color: '#E3DDD1', opacity: 0.6 }}
                aria-hidden
              >
                {p.num}
              </div>
              <h4 className="text-xl md:text-2xl font-display font-semibold mb-4 leading-snug relative">
                {p.title}
              </h4>
              <p className="text-on-surface-variant leading-relaxed relative">
                {p.body}
              </p>
            </div>
          ))}
        </div>
        {/* ROI-Anker */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-xl border border-outline-variant bg-background px-8 py-7">
          <div className="flex-1">
            <p className="text-sm text-on-surface-variant leading-relaxed mb-1">
              Ein österreichischer SHK-Betrieb verliert im Schnitt
            </p>
            <p className="font-display font-semibold text-xl md:text-2xl text-on-surface leading-snug">
              3–5 Aufträge pro Monat — weil niemand rangegangen ist.
            </p>
          </div>
          <div className="shrink-0 md:text-right border-t md:border-t-0 md:border-l border-outline-variant pt-5 md:pt-0 md:pl-8 w-full md:w-auto">
            <span className="label-caps text-accent block mb-1">Monatlicher Verlust</span>
            <p className="font-display font-bold text-3xl text-on-surface">
              1.500–3.000{' '}
              <span className="text-lg font-body font-normal text-on-surface-variant">€</span>
            </p>
            <p className="text-xs text-on-surface-variant mt-1.5">
              Das System: einmalig ab 2.000 € — ohne Abo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemGrid;
