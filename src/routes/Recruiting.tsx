import { useEffect, type CSSProperties } from 'react';
import SectionWaveCanvas from '../components/SectionWaveCanvas';
import DiagnosisForm from '../components/DiagnosisForm';
import recruitingCase from '../content/case-studies/recruiting-speed-to-lead.json';

const badgeStyle: CSSProperties = {
  display: 'inline-block',
  fontSize: '0.7rem',
  fontWeight: 700,
  letterSpacing: '0.04em',
  padding: '0.2rem 0.6rem',
  borderRadius: '999px',
  marginBottom: '0.5rem',
  background: 'rgba(100,116,139,0.12)',
  color: '#475569',
};

const faqs = [
  {
    q: 'Wir haben doch schon ein ATS (Bullhorn, Personio, Zoho …).',
    a: 'Gut so. Das System ersetzt es nicht — es füttert es. Der Datensatz landet automatisch dort, die 60-Sekunden-Benachrichtigung kommt obendrauf.',
  },
  {
    q: 'Ist das DSGVO-konform?',
    a: 'Ja. Verarbeitung auf eigener Server-Instanz, keine US-Cloud-Pflicht, durchgängiger Audit-Trail — gebaut nach den Standards, die ich bei ORF und Bundesrechenzentrum verantwortet habe.',
  },
  {
    q: 'Was, wenn eine Schnittstelle ausfällt?',
    a: 'Der Prozess bricht nicht ab. Datensätze werden zwischengespeichert, du wirst aktiv alarmiert — kein stiller Verlust einer Bewerbung.',
  },
  {
    q: 'Wie lange bis es läuft?',
    a: 'Tage, nicht Monate. Fester Umfang nach der kostenlosen Diagnose, Festpreis, schlüsselfertige Übergabe.',
  },
];

export default function Recruiting() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('revealed');
        });
      },
      { threshold: 0.08, rootMargin: '-32px' }
    );
    const nodes = document.querySelectorAll('.reveal');
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="site-shell">
      <header className="site-nav">
        <div className="site-container nav-inner">
          <a href="#hero" className="brand">
            Berkay <span>Seckin</span>
          </a>
          <nav className="nav-links">
            <a href="#ablauf">So funktioniert's</a>
            <a href="#angebot">Angebot</a>
            <a href="#beispiel">Beispiel</a>
          </nav>
          <a href="#kontakt" className="btn nav-cta">
            Kostenlose Diagnose
          </a>
        </div>
      </header>

      <main>
        <section id="hero" className="hero-section">
          <div className="hero-wave-layer" aria-hidden>
            <SectionWaveCanvas preset="hero" />
          </div>
          <div className="site-container hero-content">
            <p className="hero-badge">
              <span /> Für Personalberatungen &amp; Recruiting-Boutiquen · DACH
            </p>
            <h1>
              Nie wieder einen Top-Kandidaten
              <span>an die schnellere Konkurrenz verlieren.</span>
            </h1>
            <p className="hero-accent">Jede Bewerbung in unter 60 Sekunden beim richtigen Recruiter.</p>
            <p className="hero-subtext">
              Formular, LinkedIn, E-Mail — egal wann sie reinkommt. Automatisch erfasst, sofort aufs Handy,
              DSGVO-konform. Ein konkretes System für ein konkretes Problem, schlüsselfertig.
            </p>
            <div className="hero-actions">
              <a href="#kontakt" className="btn btn-primary">
                Kostenlose Prozess-Diagnose
              </a>
              <a href="#ablauf" className="btn btn-secondary">
                So funktioniert's
              </a>
            </div>
            <div className="hero-tags">
              {['Live in Tagen, nicht Monaten', 'Festpreis', 'Kein Vendor Lock-in', 'DSGVO-konform'].map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-muted">
          <div className="site-container differentiator-wrap">
            <p className="section-label reveal">Was es wirklich kostet</p>
            <p className="differentiator-text reveal">
              Bewerbung kommt Sonntag 20 Uhr.
              <br />
              Der Recruiter sieht sie Montag um 10.
            </p>
            <p className="differentiator-text reveal reveal-d1">
              In diesen 14 Stunden hat ein schnellerer
              <br className="hide-sm" />
              Mitbewerber den Kandidaten längst angerufen.
            </p>
            <p className="differentiator-highlight reveal reveal-d2">
              Eine verlorene Vermittlung kostet branchenüblich 10.000–30.000 € Provision. Pro Fall.
            </p>
          </div>
        </section>

        <section id="ablauf" className="section section-light">
          <div className="site-container">
            <p className="section-label reveal">So funktioniert's</p>
            <h2 className="section-title reveal">
              Vom Eingang<span>aufs Handy. In 60 Sekunden.</span>
            </h2>
            <p className="section-subtext reveal">
              Kein neues Tool, das dein Team lernen muss. Es läuft im Hintergrund auf dem Stack, den du schon hast.
            </p>
            <div className="pricing-grid">
              <article className="pricing-card reveal">
                <p className="kicker">Schritt 01</p>
                <h3>Eingang</h3>
                <p className="price-note">Formular, LinkedIn Lead Gen, E-Mail</p>
                <ul>
                  <li>Bewerbung wird normalisiert</li>
                  <li>Pflichtfelder validiert</li>
                  <li>Doppelte erkannt</li>
                </ul>
              </article>
              <article className="pricing-card featured reveal reveal-d1">
                <p className="featured-badge">Der Hebel</p>
                <p className="kicker">Schritt 02</p>
                <h3>60-Sekunden-Reaktor</h3>
                <p className="price-note">Automatisch, rund um die Uhr</p>
                <ul>
                  <li>WhatsApp an den zuständigen Recruiter</li>
                  <li>Kandidatenprofil + Lebenslauf-Link</li>
                  <li>Auto-Eingangsbestätigung an den Kandidaten</li>
                </ul>
              </article>
              <article className="pricing-card reveal reveal-d2">
                <p className="kicker">Schritt 03</p>
                <h3>Nachverfolgung</h3>
                <p className="price-note">Nichts fällt durch</p>
                <ul>
                  <li>Datensatz ins ATS (Bullhorn/Personio/Zoho)</li>
                  <li>48-h-Reminder bei offenem Kontakt</li>
                  <li>Error-Handling &amp; Audit-Log</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section id="angebot" className="section section-dark">
          <div className="site-container">
            <p className="section-label reveal">Das Angebot</p>
            <h2 className="section-title reveal dark-title">
              Was du bekommst.<span>Und was es kostet.</span>
            </h2>
            <p className="section-subtext reveal">
              Kein Scope-Creep: erst kostenlose Diagnose, dann Festpreis — du weißt vorher exakt, was gebaut wird.
            </p>
            <div className="pricing-grid">
              <article className="pricing-card featured reveal" style={{ gridColumn: '1 / -1', maxWidth: '640px', margin: '0 auto' }}>
                <p className="featured-badge">Schlüsselfertiges System</p>
                <h3>Der Kandidaten-Reaktor</h3>
                <ul>
                  <li>60-Sekunden-Reaktor von Eingang bis Recruiter-Handy</li>
                  <li>Anbindung an dein bestehendes ATS</li>
                  <li>Automatische Eingangsbestätigung an Kandidaten</li>
                  <li>48-Stunden-Follow-up-Reminder</li>
                  <li>Error-Handling, aktives Alerting &amp; Audit-Log</li>
                  <li>Vollständige Dokumentation, kein Vendor Lock-in</li>
                </ul>
                <p className="price-note" style={{ marginTop: '1rem' }}>
                  Eine einzige Vermittlung, die du sonst an die schnellere Konkurrenz verlierst, liegt
                  branchenüblich bei 10.000–30.000 € Provision. Das System kostet einen Bruchteil davon — einmalig.
                </p>
                <p className="price">Investition ab 2.000 €</p>
                <p className="price-note">Festpreis — exakt nach der kostenlosen Diagnose</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section section-muted">
          <div className="site-container differentiator-wrap">
            <p className="section-label reveal">Dein Risiko</p>
            <p className="differentiator-highlight reveal">
              Die Diagnose ist kostenlos, kein Pitch, null Verpflichtung. Finden wir keinen konkreten Hebel in
              deinem Bewerbungs-Eingang, hat es dich 30 Minuten gekostet — nicht mein Honorar.
            </p>
          </div>
        </section>

        <section id="beispiel" className="section section-light">
          <div className="site-container">
            <p className="section-label reveal">Beispiel-Szenario</p>
            <h2 className="section-title reveal">Wie ein Durchlauf aussieht.</h2>
            <article className="case-card reveal" style={{ maxWidth: '560px', margin: '2rem auto 0' }}>
              <p className="kicker">{recruitingCase.kicker}</p>
              <span style={badgeStyle}>Demo-Szenario</span>
              <h3>{recruitingCase.title}</h3>
              <div className="case-placeholder" />
              <p>{recruitingCase.summary}</p>
              <div className="metrics">
                {recruitingCase.metrics.map((m) => (
                  <div key={m.label}>
                    <strong>{m.value}</strong>
                    <span>{m.label}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '0.8rem', fontStyle: 'italic', opacity: 0.7, marginTop: '0.75rem' }}>
                Illustratives Demo-Szenario zur Veranschaulichung des Lösungswegs — kein benanntes, abgerechnetes
                Kundenprojekt.
              </p>
              <a
                href="/case-study/recruiting-speed-to-lead"
                className="btn btn-secondary"
                style={{ marginTop: '1rem' }}
              >
                Ablauf im Detail
              </a>
            </article>
            <div className="credentials reveal reveal-d2" style={{ marginTop: '2.5rem' }}>
              <p>
                <span>ORF</span> Werbetechnologie
              </p>
              <p>
                <span>BRZ</span> Requirement Engineer
              </p>
              <p>
                <span>Studium</span> Wirtschaftsinformatik
              </p>
            </div>
            <p className="section-subtext reveal reveal-d3" style={{ marginTop: '1rem' }}>
              Gebaut nach den Architektur- und Sicherheitsstandards von ORF und Bundesrechenzentrum — kein
              zusammengeschustertes Bastel-Skript.
            </p>
          </div>
        </section>

        <section className="section section-dark">
          <div className="site-container">
            <p className="section-label reveal">Häufige Einwände</p>
            <h2 className="section-title reveal dark-title">
              Bevor du fragst.<span>Vier ehrliche Antworten.</span>
            </h2>
            <div className="pricing-grid">
              {faqs.map((f, i) => (
                <article key={f.q} className={`pricing-card reveal${i === 1 ? ' reveal-d1' : i === 2 ? ' reveal-d2' : i === 3 ? ' reveal-d3' : ''}`}>
                  <p className="kicker">{f.q}</p>
                  <p>{f.a}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="kontakt" className="section cta-section">
          <div className="site-container cta-content">
            <h2>
              Welche Bewerbung ging dir
              <span>zuletzt durch?</span>
            </h2>
            <p>30 Minuten. Kostenlos. Du hörst ein konkretes System, kein Angebot.</p>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 auto 1.75rem',
                maxWidth: '440px',
                textAlign: 'left',
                display: 'grid',
                gap: '0.4rem',
                fontSize: '0.95rem',
              }}
            >
              <li>→ Wo genau im Bewerbungs-Eingang Kandidaten/Provision verloren gehen</li>
              <li>→ Ein konkreter Lösungsweg für deinen ATS-Stack</li>
              <li>→ Ehrliche Einschätzung, kein Pitch</li>
              <li>→ Grobe Investitions-Range</li>
            </ul>
            <DiagnosisForm source="recruiting" />
            <p
              style={{
                maxWidth: '440px',
                margin: '1.25rem auto 0',
                fontSize: '0.85rem',
                opacity: 0.75,
                lineHeight: 1.5,
              }}
            >
              Kostenlos, unverbindlich, kein Pitch. Finden wir keinen konkreten Hebel, hat es dich nur die Zeit
              gekostet, nicht mein Honorar.
            </p>
            <small>Oder direkt: hallo@berkayseckin.at</small>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-container footer-inner">
          <p className="brand">
            Berkay <span>Seckin</span>
          </p>
          <div className="footer-links">
            <a href="/datenschutz">Datenschutzerklärung</a>
            <a href="/impressum">Impressum</a>
          </div>
          <p className="copyright">© 2025 Berkay Seckin - Wien</p>
        </div>
      </footer>
    </div>
  );
}
