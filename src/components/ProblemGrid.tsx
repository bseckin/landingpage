const ProblemGrid = () => {
  return (
    <section className="py-24 md:py-32 border-b border-outline-variant bg-surface">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 md:mb-24 gap-8 md:gap-12">
          <div className="max-w-2xl border-l-4 border-error pl-8">
            <h2 className="label-caps text-error mb-4">
              Das ist Ihr Alltag. Jeden Tag.
            </h2>
            <h3 className="text-3xl md:text-5xl font-display font-black leading-none">
              Die besten Aufträge kommen dann, wenn Sie nicht rangehen können.
            </h3>
          </div>
          <div className="text-on-surface-variant max-w-xs text-sm md:text-base leading-relaxed font-medium">
            Handwerker verdienen ihr Geld auf der Baustelle – nicht im Büro.
            Aber genau dort gehen täglich Aufträge verloren.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-outline-variant border border-outline-variant">
          {/* Card 1 */}
          <div className="bg-surface p-8 md:p-12 technical-card hover:z-10">
            <span className="material-symbols-outlined text-error mb-8 text-4xl">
              person_off
            </span>
            <h4 className="text-xl md:text-2xl font-display font-bold mb-4 uppercase">
              Das Telefon klingelt, wenn Sie unterm Kessel liegen.
            </h4>
            <p className="text-on-surface-variant leading-relaxed">
              Sie können nicht rangehen. Der Kunde ruft den nächsten
              Installateur an. Der Auftrag ist weg – ohne dass Sie es je
              erfahren.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-surface p-8 md:p-12 technical-card hover:z-10">
            <span className="material-symbols-outlined text-error mb-8 text-4xl">
              warning
            </span>
            <h4 className="text-xl md:text-2xl font-display font-bold mb-4 uppercase">
              Abends zwei Stunden Büro für halbfertige Anfragen.
            </h4>
            <p className="text-on-surface-variant leading-relaxed">
              Nach 10 Stunden Baustelle sitzen Sie vor E-Mails, bei denen die
              Hälfte der Infos fehlt. Fotos? Fehlanzeige. Adresse? Unklar. Sie
              schreiben zurück. Der Kunde antwortet nicht mehr.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-surface p-8 md:p-12 technical-card hover:z-10">
            <span className="material-symbols-outlined text-error mb-8 text-4xl">
              money_off
            </span>
            <h4 className="text-xl md:text-2xl font-display font-bold mb-4 uppercase">
              Sie wählen Aufträge aus – aber nicht die richtigen.
            </h4>
            <p className="text-on-surface-variant leading-relaxed">
              Sie haben keine Zeit für "Was kostet ungefähr eine Heizung?".
              Aber ohne System landen alle Anfragen gleich in Ihrer Inbox.
              Das System holt die fehlenden Infos automatisch ein – und Sie
              entscheiden, welche Kundenanfrage ein Angebot wert ist.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemGrid;