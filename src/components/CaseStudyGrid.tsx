const CASES = [
  {
    num: '01',
    tag: 'Photovoltaik',
    title: '40 Anfragen. 3 Mann. Kein Chaos.',
    body: 'Ein 3-Mann-PV-Betrieb bekommt wöchentlich 40 Anfragen. Das System fragt automatisch Dachgröße, Ausrichtung und Fotos ab. Der Inhaber fährt nur noch zu qualifizierten Terminen.',
    proofLabel: 'Auto-Qualifizierung',
    proof: 'Nur ernsthafte Anfragen aufs Handy',
    wa: false,
  },
  {
    num: '02',
    tag: 'Heizungsbau',
    title: 'Angebote in 4 Minuten statt 45.',
    body: 'Ein Heizungsbauer braucht oft 45 Minuten pro Angebot. Mit dem System entsteht automatisch ein Entwurf aus den Formulardaten und den hinterlegten Preisen. Der Inhaber prüft am Handy und sendet ab.',
    proofLabel: 'Auto-Generierung',
    proof: '4 Min. pro Angebot',
    wa: false,
  },
  {
    num: '03',
    tag: 'SHK-Installation',
    title: 'Keine verpasste Anfrage mehr.',
    body: 'Ein 5-Mann-Installationsbetrieb verliert sonst Aufträge, weil WhatsApp- und Online-Anfragen stundenlang unbeantwortet bleiben. Mit dem System wird jede digitale Anfrage sofort erfasst und in unter 60 Sekunden per WhatsApp gemeldet.',
    proofLabel: 'WhatsApp-Alarm',
    proof: '< 60 Sek. bis zur Alarmierung',
    wa: true,
  },
];

const CaseStudyGrid = () => {
  return (
    <section className="border-b border-outline-variant bg-surface" id="cases">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-24 md:pt-32 pb-14 md:pb-16">
        <div className="max-w-2xl">
          <span className="label-caps text-primary mb-4 block">Szenarien</span>
          <h3 className="text-3xl md:text-5xl font-display font-semibold leading-[1.08] tracking-tight">
            Typische Einsatzszenarien im Handwerksalltag.
          </h3>
          <p className="text-on-surface-variant text-base md:text-lg mt-4">
            Drei Betriebstypen, drei Probleme — dasselbe System, angepasst auf
            den jeweiligen Arbeitsalltag.
          </p>
          <p className="label-caps text-on-surface-variant/50 mt-3">
            Illustrative Szenarien — keine abgerechneten Kundenprojekte.
          </p>
        </div>
      </div>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-24 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {CASES.map((c) => (
            <div
              key={c.tag}
              className="relative group technical-card p-8 md:p-10 flex flex-col justify-between overflow-hidden"
              style={{ minHeight: '380px' }}
            >
              {/* Background number */}
              <div
                className="absolute -bottom-4 -right-1 font-display font-bold leading-none select-none pointer-events-none"
                style={{ fontSize: '8rem', color: '#E3DDD1', opacity: 0.5 }}
                aria-hidden
              >
                {c.num}
              </div>

              {/* Content */}
              <div className="relative">
                <span className="label-caps inline-block rounded-full border border-outline-variant px-3 py-1.5 text-on-surface-variant mb-6">
                  {c.tag}
                </span>
                <h4 className="text-2xl md:text-3xl font-display font-semibold mb-4 leading-tight tracking-tight text-on-surface">
                  {c.title}
                </h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {c.body}
                </p>
              </div>

              {/* Proof metric */}
              <div className="relative mt-8 bg-background rounded-lg px-5 py-4 group-hover:-translate-y-0.5 transition-transform">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: c.wa ? '#25D366' : '#15604A' }}
                  />
                  <span
                    className="label-caps text-[10px]"
                    style={{ color: c.wa ? '#1f9e52' : '#15604A' }}
                  >
                    {c.proofLabel}
                  </span>
                </div>
                <p className="text-sm font-display font-semibold text-on-surface">
                  {c.proof}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudyGrid;
