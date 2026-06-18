const ProblemGrid = () => {
  return (
    <section className="py-24 md:py-32 border-b border-outline-variant bg-surface">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 md:mb-24 gap-8 md:gap-12">
          <div className="max-w-2xl border-l-4 border-error pl-8">
            <h2 className="label-caps text-error mb-4">
              Die Realität im Tagesgeschäft
            </h2>
            <h3 className="text-3xl md:text-5xl font-display font-black leading-none">
              Es funktioniert. Aber nur, solange Sie zusehen.
            </h3>
          </div>
          <div className="text-on-surface-variant max-w-xs text-sm md:text-base leading-relaxed font-medium">
            Ihr Geschäft läuft, aber es hängt zu sehr von Ihrer persönlichen
            Anwesenheit ab. Wachstum fühlt sich deshalb stressig an.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-outline-variant border border-outline-variant">
          {/* Card 1 */}
          <div className="bg-surface p-8 md:p-12 technical-card hover:z-10">
            <span className="material-symbols-outlined text-error mb-8 text-4xl">
              person_off
            </span>
            <h4 className="text-xl md:text-2xl font-display font-bold mb-4 uppercase">
              Gefangen im Tagesgeschäft
            </h4>
            <p className="text-on-surface-variant leading-relaxed">
              Sie arbeiten im System statt am System. Jede eingehende Anfrage
              müssen Sie manuell prüfen, weiterleiten und im Kopf behalten. Das
              kostet Zeit – und kostet Sie am Ende Aufträge.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-surface p-8 md:p-12 technical-card hover:z-10">
            <span className="material-symbols-outlined text-error mb-8 text-4xl">
              warning
            </span>
            <h4 className="text-xl md:text-2xl font-display font-bold mb-4 uppercase">
              Eine vergessene Anfrage reicht
            </h4>
            <p className="text-on-surface-variant leading-relaxed">
              Eine Anfrage übersehen, eine Rückmeldung vergessen, eine E-Mail
              im Spam-Ordner. Jeder manuelle Schritt ist eine Fehlerquelle, die
              Ihren Ruf gefährdet. Sie merken es erst, wenn der Kunde längst
              weg ist.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-surface p-8 md:p-12 technical-card hover:z-10">
            <span className="material-symbols-outlined text-error mb-8 text-4xl">
              money_off
            </span>
            <h4 className="text-xl md:text-2xl font-display font-bold mb-4 uppercase">
              Die unsichtbare Lücke im Cashflow
            </h4>
            <p className="text-on-surface-variant leading-relaxed">
              Mehr Marketing-Budget oder neue Mitarbeiter bringen aktuell
              nichts, weil wertvolle Anfragen schon jetzt im Tageschaos
              ungelesen liegen bleiben. Jede Anfrage, die nicht in Minuten
              beantwortet wird, ist ein verlorener Umsatz. Was Sie nicht sehen,
              können Sie nicht retten.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemGrid;