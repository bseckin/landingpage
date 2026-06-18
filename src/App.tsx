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
            <a href="#funktion">So funktioniert's</a>
            <a href="#leistungen">Leistungen</a>
            <a href="#referenzen">Beispiele</a>
            <a href="#ueber-mich">Über mich</a>
          </nav>
          <a href="#kontakt" className="btn nav-cta">
            30 Min. Leck-Analyse
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
              <span /> Lead-Retter-System
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
                30-Minuten Leck-Analyse buchen
              </a>
            </div>
            <div className="hero-tags">
              <span>Festpreis ab 2.000 €</span>
              <span>Schlüsselfertig</span>
              <span>Open Source (n8n)</span>
              <span>Enterprise-Stabilität</span>
            </div>
          </div>
        </section>

        {/* ====== SEKTION 2: SO FUNKTIONIERT'S ====== */}
        <section id="funktion" className="section section-light">
          <div className="site-container">
            <p className="section-label reveal">So funktioniert's</p>
            <h2 className="section-title reveal">
              Vom Formular<span>aufs Handy – in 60 Sekunden.</span>
            </h2>
            <div className="demo-grid">
              <div className="demo-steps">
                <div className="demo-step reveal reveal-d1">
                  <p className="kicker">1. Der Interessent füllt aus</p>
                  <p>Ein schlichtes Formular auf Ihrer Website. Name. Telefon. Kurze Nachricht. Absenden.</p>
                </div>
                <div className="demo-step reveal reveal-d2">
                  <p className="kicker">2. n8n verarbeitet</p>
                  <p>
                    Die Anfrage wird durch unsere Open-Source-Engine (n8n) geprüft, 
                    angereichert und in unter 60 Sekunden als WhatsApp-Nachricht 
                    auf das Handy der zuständigen Person weitergeleitet.
                  </p>
                </div>
                <div className="demo-step reveal reveal-d3">
                  <p className="kicker">3. Ausfallsicherheit & Redundanz</p>
                  <p>
                    Das System läuft weiter, auch wenn Schnittstellen kurzzeitig haken. 
                    Fehler werden automatisch abgefangen, wiederholt und protokolliert. 
                    Jeder Schritt ist lückenlos nachvollziehbar – kein Lead kann unbemerkt ignoriert werden.
                  </p>
                </div>
                <div className="demo-step reveal reveal-d4">
                  <p className="kicker">4. Live erleben</p>
                  <p>In der kostenlosen 30-Minuten-Leck-Analyse sehen Sie den Durchlauf live auf Ihrem eigenen Smartphone.</p>
                </div>
                <a href="#kontakt" className="btn btn-primary reveal reveal-d4">
                  30-Minuten Leck-Analyse buchen
                </a>
              </div>
              <div className="demo-visual reveal reveal-d2">
                <div className="demo-phone">
                  <div className="demo-phone-screen">
                    <p className="demo-whatsapp-label">WhatsApp</p>
                    <div className="demo-message">
                      <strong>Neue Kundenanfrage</strong>
                      <span>Max Mustermann · +43 664 123 45 67</span>
                      <span className="demo-time">gerade eben ✓✓</span>
                    </div>
                    <div className="demo-message demo-message-incoming">
                      <strong>Angebot: Dachsanierung</strong>
                      <span>„Können Sie nächste Woche einen Kostenvoranschlag machen?“</span>
                      <span className="demo-time">vor 30 Sek</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== SEKTION 3: METHODIK & ABGRENZUNG ====== */}
        <section className="section section-muted">
          <div className="site-container differentiator-wrap">
            <p className="section-label reveal">Warum nicht einfach eine Allrounder-Agentur?</p>
            <p className="differentiator-text reveal">
              Die meisten Automatisierer
              <br />
              bauen für jedes Problem ein neues, fragiles Software-Konstrukt.
            </p>
            <p className="differentiator-text reveal reveal-d1">
              Ich habe mich radikal auf das kritischste Nadelöhr in Ihrem Betrieb spezialisiert:{' '}
              <em>den Moment, in dem aus einer digitalen Anfrage ein echter Kunde werden muss.</em>
              <br className="hide-sm" />
              Ein erprobtes System. Angepasst auf Ihre Situation. Nichts anderes.
            </p>
            <p className="differentiator-highlight reveal reveal-d2">
              Spitz schlägt generisch. Im Erstgespräch und beim Ergebnis.
            </p>
          </div>
        </section>

        {/* ====== SEKTION 4: LEISTUNGSPHASEN ====== */}
        <section id="leistungen" className="section section-dark">
          <div className="site-container">
            <p className="section-label reveal">Leistungen</p>
            <h2 className="section-title reveal dark-title">
              Drei Schritte.<span>Ein klares System.</span>
            </h2>
            <p className="section-subtext reveal">
              Kein Behörden-IT-Overhead: Sie bekommen einen glasklaren, schriftlichen 
              Projekt-Bauplan mit Fixpreis-Garantie – bevor wir einen einzigen Schritt umsetzen.
            </p>
            <div className="pricing-grid">
              <article className="pricing-card reveal">
                <p className="kicker">Schritt 01</p>
                <h3>Kostenlose Leck-Analyse</h3>
                <p className="price">0 EUR</p>
                <p className="price-note">30 Minuten, unverbindlich</p>
                <ul>
                  <li>Live-System-Demo auf Ihrem Smartphone</li>
                  <li>Wir identifizieren, wo genau wertvolle Anfragen versickern</li>
                  <li>Ehrliche Einschätzung, ob sich eine Umsetzung lohnt</li>
                  <li>Kein Verkaufsdruck – nur ein Erlebnis</li>
                </ul>
              </article>
              <article className="pricing-card featured reveal reveal-d1">
                <p className="featured-badge">Kernleistung</p>
                <p className="kicker">Schritt 02</p>
                <h3>Schlüsselfertiges Lead-Retter-System</h3>
                <p className="price">ab 2.000 EUR</p>
                <p className="price-note">Fixpreis-Garantie nach Analyse</p>
                <ul>
                  <li>Glasklarer, schriftlicher Projekt-Bauplan mit Fixpreis</li>
                  <li>Open-Source-Basis (n8n) – digitale Unabhängigkeit, kein Vendor Lock-in</li>
                  <li>Enterprise-Stabilität: Ausfallsicherheit & lückenlose Nachvollziehbarkeit</li>
                  <li>Volle Übergabe – das System gehört zu 100 % Ihnen</li>
                </ul>
              </article>
              <article className="pricing-card reveal reveal-d2">
                <p className="kicker">Schritt 03</p>
                <h3>Dauerhafter Systemschutz & Wartung</h3>
                <p className="price">Optional</p>
                <p className="price-note">Monatlich, im Gespräch festgelegt</p>
                <ul>
                  <li>Monitoring & Redundanz – Ihr System läuft auch nach Meta-/WhatsApp-Updates</li>
                  <li>Priority-Support bei Störungen</li>
                  <li>Sicherstellung der reibungslosen Funktion aller Schnittstellen</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* ====== SEKTION 5: ANWENDUNGSSZENARIEN ====== */}
        <section id="referenzen" className="section section-light">
          <div className="site-container">
            <p className="section-label reveal">Anwendungsszenarien</p>
            <h2 className="section-title reveal">Drei Wege, wie Ihr Lead-Retter arbeitet.</h2>
            <p className="section-subtext reveal">
              Das gleiche Kernsystem – drei typische Situationen aus dem echten Betrieb.
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
              <p className="kicker">Szenario 2: Automatischer Angebotsentwurf</p>
              <h3>Backoffice – Zeitersparnis von Stunden</h3>
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

        {/* ====== SEKTION 6: ÜBER MICH ====== */}
        <section id="ueber-mich" className="section about-section">
          <div className="site-container about-grid">
            <div>
              <p className="section-label reveal">Über mich</p>
              <h2 className="section-title reveal">
                Systeme für die kritische Infrastruktur.<span>Jetzt für Ihren Betrieb.</span>
              </h2>
              <p className="reveal">
                Bevor ich mich auf das Lead-Retter-System für inhabergeführte Betriebe spezialisiert 
                habe, war ich Wirtschaftsinformatiker bei ORF Werbetechnologie und Requirement Engineer 
                beim Bundesrechenzentrum (BRZ). Dort habe ich gelernt, was kompromisslose Stabilität, 
                Ausfallsicherheit und harter österreichischer Datenschutz wirklich bedeuten.
              </p>
              <p className="reveal reveal-d1">
                Dieselbe architektonische Disziplin – lokal gehostet, Open-Source-basiert, 
                lückenlos dokumentiert – bringe ich jetzt in Ihren Betrieb. Kein Overhead, 
                keine wechselnden Ansprechpartner. Sie arbeiten direkt mit demjenigen, 
                der Ihr System baut, betreut und garantiert.
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

        {/* ====== SEKTION 7: CTA & ABSCHLUSS ====== */}
        <section id="kontakt" className="section cta-section">
          <div className="site-container cta-content">
            <h2>
              Sehen Sie selbst, wie Ihr neuer
              <span>Lead-Retter funktioniert.</span>
            </h2>
            <p>
              30 Minuten. Kostenlos. Sie erleben auf Ihrem eigenen Smartphone, wie 
              sekundenschnelle Weiterleitung abläuft – bevor Sie auch nur einen Cent investieren.
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
            <a href="/cv">Lebenslauf</a>
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