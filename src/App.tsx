import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SectionWaveCanvas from './components/SectionWaveCanvas';
import DiagnosisForm from './components/DiagnosisForm';
import { LanguageProvider } from './context/LanguageContext';
import LegalPage from './pages/LegalPage';
import CaseStudy from './routes/CaseStudy';
import Recruiting from './routes/Recruiting';
import CV from './routes/CV';

// Admin is a localhost-only CMS that pulls in the heavy rich-text editor (Quill).
// Lazy-load it so its bundle ships as a separate chunk and never burdens the
// public pages that real visitors actually load.
const Admin = lazy(() => import('./routes/Admin'));

function HomePage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
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
            <a href="#problem">Das Problem</a>
            <a href="#funktion">So funktioniert's</a>
            <a href="#referenzen">Fallstudien</a>
            <a href="#ueber-mich">Über mich</a>
          </nav>
          <a href="#kontakt" className="btn nav-cta">
            Kostenlosen Systemcheck buchen
          </a>
        </div>
      </header>

      <main>
        {/* ====== SEKTION 1: HERO ====== */}
        <section id="hero" className="hero-section">
          <div className="hero-wave-layer" aria-hidden>
            <SectionWaveCanvas preset="hero" />
          </div>
          <div className="site-container hero-content">
            <p className="hero-badge">
              <span /> FOKUSSIERT AUF SPEED-TO-LEAD
            </p>
            <h1>
              Wertvolle Kundenanfragen
              <span>versickern nicht mehr.</span>
            </h1>
            <p className="hero-accent">Automatisch erfasst — in Sekunden auf Ihrem Handy.</p>
            <p className="hero-subtext">
              Für Betriebe, bei denen teure Kundenanfragen im Alltagschaos untergehen. 
              Ein schlüsselfertiges System, das jede Anfrage fängt, sofort alarmiert 
              und Umsatz sichert, bevor die Konkurrenz anruft.
            </p>
            <div className="hero-actions">
              <a href="#kontakt" className="btn btn-primary">
                Kostenlosen Systemcheck buchen
              </a>
              <p className="btn-subtext">Erleben Sie das System live auf Ihrem eigenen Smartphone</p>
            </div>
            <div className="hero-tags">
              <span>Festpreis ab 2.000 €</span>
              <span>Schlüsselfertig</span>
              <span>Open Source (n8n)</span>
              <span>Enterprise-Stabilität</span>
            </div>
          </div>
        </section>

        {/* ====== SEKTION 2: PROBLEM ====== */}
        <section id="problem" className="section section-light">
          <div className="site-container">
            <p className="section-label reveal">Das Problem</p>
            <h2 className="section-title reveal">
              Es funktioniert.<span>Aber nur, solange Sie zusehen.</span>
            </h2>
            <p className="section-subtext reveal">
              Ihr Geschäft läuft, aber es hängt zu sehr von Ihrer persönlichen Anwesenheit ab. Wachstum fühlt sich deshalb stressig an.
            </p>
            <div className="problem-grid">
              <article className="problem-card reveal">
                <p className="kicker">DER FLASCHENHALS</p>
                <h3>Gefangen im Tagesgeschäft</h3>
                <p>Sie arbeiten im System statt am System. Jede eingehende Anfrage müssen Sie manuell prüfen, weiterleiten und im Kopf behalten. Das kostet Zeit – und kostet Sie am Ende Aufträge.</p>
              </article>
              <article className="problem-card reveal reveal-d1">
                <p className="kicker">DIE STILLE SELBSTSABOTAGE</p>
                <h3>Eine vergessene Anfrage reicht</h3>
                <p>Eine Anfrage übersehen, eine Rückmeldung vergessen, eine E-Mail im Spam-Ordner. Jeder manuelle Schritt ist eine Fehlerquelle, die Ihren Ruf gefährdet. Sie merken es erst, wenn der Kunde längst weg ist.</p>
              </article>
              <article className="problem-card reveal reveal-d2">
                <p className="kicker">ENTGANGENE UMSÄTZE</p>
                <h3>Die unsichtbare Lücke im Cashflow</h3>
                <p>Jede Anfrage, die Sie nicht innerhalb von Minuten beantworten, ist ein Risiko. Der Kunde vergleicht, der Kunde ruft den nächsten an. Was Sie nicht sehen, können Sie nicht retten.</p>
              </article>
            </div>
          </div>
        </section>

        {/* ====== SEKTION 3: LÖSUNG & PROZESS ====== */}
        <section id="funktion" className="section section-muted">
          <div className="site-container">
            <p className="section-label reveal">So funktioniert's</p>
            <h2 className="section-title reveal">
              Eine Anfrage kommt rein.<span>Das passiert in den nächsten 60 Sekunden.</span>
            </h2>
            <div className="solution-steps">
              <div className="solution-step reveal">
                <span className="solution-step-number">1</span>
                <p className="kicker">ERFASSUNG</p>
                <h3>Automatische Erfassung aller Kanäle</h3>
                <p>Egal ob Website-Formular, WhatsApp oder E-Mail – das System erfasst jede Anfrage sofort. Pflichtfelder werden automatisch geprüft. Unvollständige Anfragen werden zurückgewiesen mit der Bitte um Ergänzung. Keine leeren Leads im System.</p>
              </div>
              <div className="solution-step reveal reveal-d1">
                <span className="solution-step-number">2</span>
                <p className="kicker">QUALIFIZIERUNG & ROUTING</p>
                <h3>Sekundenschnelle Analyse und Weiterleitung</h3>
                <p>Das System analysiert den Absender, das Anliegen und die Dringlichkeit. Eine fertig aufbereitete Nachricht mit allen relevanten Eckdaten landet als WhatsApp auf dem Handy des richtigen Ansprechpartners. Kein E-Mail-Suchen, kein Kopieren, kein Nachfragen.</p>
              </div>
              <div className="solution-step reveal reveal-d2">
                <span className="solution-step-number">3</span>
                <p className="kicker">RÜCKVERSICHERUNG & ESKALATION</p>
                <h3>Kein Lead verschwindet unbemerkt</h3>
                <p>Der Kunde erhält sofort eine Eingangsbestätigung mit Reaktionszeit-Versprechen. Bleibt eine Antwort aus, alarmiert das System automatisch. Nachvollziehbar, protokolliert, DSGVO-konform. Auf Wunsch wird parallel ein erster Angebotsentwurf generiert – basierend auf den eingegangenen Daten.</p>
              </div>
            </div>
          </div>
          <div className="site-container solution-tech-grid">
            <div className="solution-tech-card reveal">
              <p className="kicker">AUSFALLSICHERHEIT</p>
              <h4>Selbst wenn Ihre Website down ist</h4>
              <p>Das System puffert Anfragen bei Ausfällen, wiederholt Verbindungen und alarmiert bei Störungen. Keine Anfrage geht verloren – nicht mal dann, wenn der Empfänger kein Netz hat.</p>
            </div>
            <div className="solution-tech-card reveal reveal-d1">
              <p className="kicker">NACHVOLLZIEHBARKEIT</p>
              <h4>Lückenlose Dokumentation</h4>
              <p>Jeder Schritt wird protokolliert. Sie sehen genau, welche Anfrage wann einging, wer sie bearbeitet hat und ob sie beantwortet wurde. Vollständiger Audit-Trail inklusive.</p>
            </div>
            <div className="solution-tech-card reveal reveal-d2">
              <p className="kicker">DIGITALE UNABHÄNGIGKEIT</p>
              <h4>Open Source. Auf Ihren Servern.</h4>
              <p>Das System basiert auf n8n, läuft auf österreichischen Servern und gehört Ihnen. Kein Vendor Lock-in, keine undurchsichtige Cloud. Sie besitzen das System – ich warte es.</p>
            </div>
          </div>
        </section>

        {/* ====== SEKTION 4: FALLSTUDIEN ====== */}
        <section id="referenzen" className="section section-light">
          <div className="site-container">
            <p className="section-label reveal">Fallstudien</p>
            <h2 className="section-title reveal">Das System in Aktion.</h2>
            <p className="section-subtext reveal">
              Die folgenden Szenarien zeigen den identischen Workflow – angewendet auf unterschiedliche Branchen.
            </p>
          </div>
          <div className="site-container usecase-grid">
            <article className="usecase-card reveal">
              <p className="kicker">Szenario 1: High-Ticket-Anfrage am Wochenende</p>
              <h3>Vertrieb – Speed to Lead</h3>
              <p>
                Ein Interessent für Ihre Premium-Dienstleistung (z. B. Dachsanierung, 
                Immobilie, High-End-Handwerk) schickt Samstagnachmittag eine Anfrage über 
                Ihre Website. In unter 60 Sekunden haben Sie die vollständige Anfrage 
                als WhatsApp-Benachrichtigung auf dem Handy – noch bevor der Kunde bei 
                der Konkurrenz anruft. Ergebnis: Sie sind der Erste. Im Zweifel der Einzige.
              </p>
            </article>
            <article className="usecase-card reveal reveal-d1">
              <p className="kicker">VERTRIEB-BESCHLEUNIGUNG – ANGEBOT IN 4 MINUTEN</p>
              <h3>Angebotsentwurf – Zeitersparnis von Stunden</h3>
              <p>
                Das System fängt die eingehende Anfrage nicht nur, sondern erstellt im 
                Hintergrund automatisch einen fehlerfreien Angebotsentwurf aus Ihren 
                hinterlegten Preisen und Leistungen. Statt einer Stunde manueller Arbeit 
                klicken Sie nur noch auf „Prüfen und Senden". Ihr wertvollster Mitarbeiter 
                macht dringendere Dinge – und Sie gewinnen Stunden pro Woche zurück.
              </p>
            </article>
            <article className="usecase-card reveal reveal-d2">
              <p className="kicker">Szenario 3: Bewerbungseingang priorisiert</p>
              <h3>HR / Recruiting – Die besten Leute zuerst</h3>
              <p>
                Eine Bewerbung für Ihre offene Stelle trifft ein. Das System erkennt 
                Schlüsselqualifikationen (z. B. „Meisterprüfung" oder „einschlägige 
                Berufserfahrung"), priorisiert die Meldung und schickt sie sofort 
                als WhatsApp-Nachricht an Sie oder Ihren Personalverantwortlichen. 
                Während andere erst Montagfrüh ihre E-Mails checken, haben Sie dem 
                besten Kandidaten schon längst geantwortet.
              </p>
            </article>
          </div>
        </section>

        {/* ====== SEKTION 5: ÜBER MICH + CTA ====== */}
        <section id="ueber-mich" className="section about-section">
          <div className="site-container about-grid">
            <div>
              <p className="section-label reveal">Über mich</p>
              <h2 className="section-title reveal">
                Sicherheitsgarantie<span>aus der System-Architektur.</span>
              </h2>
              <p className="reveal">
                Ich habe Systeme gebaut, die für den Staat kritisch waren (ORF Werbetechnologie, 
                Bundesrechenzentrum). Dieselbe kompromisslose Stabilität, Ausfallsicherheit und 
                der harte österreichische Datenschutz (lokales Hosting) kommen jetzt in Ihren Betrieb.
              </p>
              <p className="reveal reveal-d1">
                Kein Overhead, keine wechselnden Ansprechpartner. Sie arbeiten direkt mit demjenigen, 
                der Ihr System baut.
              </p>
              <p className="reveal reveal-d1">
                Und weil Sie nicht für meine Technologie-Schulungen bezahlen sollen: Das System 
                basiert auf Open Source (n8n). Kein Vendor Lock-in. Sie besitzen es. Ich warte es, 
                solange Sie wollen.
              </p>
              <div className="credentials reveal reveal-d2">
                <p>
                  <span>ORF</span> Werbetechnologie
                </p>
                <p>
                  <span>BRZ</span> Requirement Engineer (Bundesrechenzentrum)
                </p>
                <p>
                  <span>Studium</span> Wirtschaftsinformatik
                </p>
              </div>
            </div>
            <div className="portrait-placeholder reveal reveal-d3">
              <img
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
                  height: '100%',
                  minHeight: '320px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4rem',
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                  color: '#475569',
                  background: 'linear-gradient(135deg,#e2e8f0,#f1f5f9)',
                  borderRadius: 'inherit',
                }}
              >
                BS
              </div>
            </div>
          </div>
        </section>

        {/* ====== SEKTION 6: CTA & ABSCHLUSS ====== */}
        <section id="kontakt" className="section cta-section">
          <div className="site-container cta-content">
            <h2>
              Sind Sie bereit, Ihre erste
              <span>Leck-Stelle zu finden?</span>
            </h2>
            <p>
              Der kostenlose Systemcheck dauert 30 Minuten. Ich schaue mir Ihre aktuelle 
              Anfrage-Verarbeitung an, identifiziere die kritischsten Lecks und zeige Ihnen 
              live, wie das System auf Ihrem eigenen Smartphone funktioniert. Keine 
              Verpflichtung. Nur ein Erlebnis.
            </p>
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
              <li>→ Live-Demo: Ich leite eine Test-Anfrage auf Ihr Handy</li>
              <li>→ Ich zeige Ihnen, wo heute wertvolle Leads versickern</li>
              <li>→ Sie sehen den konkreten Bauplan für Ihr Unternehmen</li>
              <li>→ Sie wissen danach exakt, ob sich die Investition lohnt</li>
            </ul>
            <DiagnosisForm />
            <p
              style={{
                maxWidth: '440px',
                margin: '1.25rem auto 0',
                fontSize: '0.85rem',
                opacity: 0.75,
                lineHeight: 1.5,
              }}
            >
              Kein Pitch. Kein Verkaufsdruck. Wir schauen 30 Minuten auf Ihren Anfrage-Eingang – 
              finden wir keinen konkreten Hebel, hat es Sie nur die Zeit gekostet, nicht mein Honorar.
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
          <p className="copyright">© {new Date().getFullYear()} Berkay Seckin - Wien</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recruiting" element={<Recruiting />} />
          <Route path="/cv" element={<CV />} />
          <Route
            path="/admin"
            element={
              <Suspense fallback={<div style={{ padding: '2rem', fontFamily: 'system-ui' }}>Admin lädt …</div>}>
                <Admin />
              </Suspense>
            }
          />
          <Route path="/case-study/:id" element={<CaseStudy />} />
          <Route path="/impressum" element={<LegalPage type="impressum" />} />
          <Route path="/datenschutz" element={<LegalPage type="datenschutz" />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;