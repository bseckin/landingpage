import { lazy, Suspense, useEffect, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SectionWaveCanvas from './components/SectionWaveCanvas';
import DiagnosisForm from './components/DiagnosisForm';
import { LanguageProvider } from './context/LanguageContext';
import LegalPage from './pages/LegalPage';
import CaseStudy from './routes/CaseStudy';
import Recruiting from './routes/Recruiting';

// Admin is a localhost-only CMS that pulls in the heavy rich-text editor (Quill).
// Lazy-load it so its bundle ships as a separate chunk and never burdens the
// public pages that real visitors actually load.
const Admin = lazy(() => import('./routes/Admin'));

// Load all case studies at build time from src/content/case-studies/*.json
const caseModules = import.meta.glob<{ default: Record<string, unknown> }>(
  './content/case-studies/*.json',
  { eager: true }
);

const allCases: CaseStudyData[] = Object.entries(caseModules)
  .map(([path, mod]) => {
    const data = mod.default as unknown as CaseStudyData;
    return { ...data, id: path.split('/').pop()!.replace('.json', '') };
  })
  .filter((d) => d.title && d.kicker && d.status !== 'draft');

interface CaseStudyData {
  id: string;
  title: string;
  status?: 'client' | 'demo' | 'draft';
  kicker: string;
  summary: string;
  image: string;
  metrics: { value: string; label: string }[];
}

function CaseCarousel({ cases }: { cases: CaseStudyData[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const rafRef = useRef<number>(0);
  const posRef = useRef(0);
  const resetAtRef = useRef(0);
  // drag state kept in a ref to avoid re-renders
  const drag = useRef({ active: false, startX: 0, startPos: 0 });

  // ── Auto-scroll + clone setup ───────────────────────────────
  useEffect(() => {
    const track = trackRef.current;
    if (!track || cases.length === 0) return;

    posRef.current = 0;
    const original = Array.from(track.children) as HTMLElement[];
    const originalCount = original.length;

    for (let i = 0; i < 5; i++) {
      original.forEach((el) => {
        const clone = el.cloneNode(true) as HTMLElement;
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
      });
    }

    const firstClone = track.children[originalCount] as HTMLElement;
    const trackRect = track.getBoundingClientRect();
    const cloneRect = firstClone.getBoundingClientRect();
    resetAtRef.current = cloneRect.left - trackRect.left;

    const speed = 0.45;
    const normalise = (p: number) => {
      const r = resetAtRef.current;
      return r > 0 ? ((p % r) + r) % r : 0;
    };

    const tick = () => {
      if (!pausedRef.current && !drag.current.active) {
        posRef.current = normalise(posRef.current + speed);
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      track.style.transform = '';
      Array.from(track.children).slice(originalCount).forEach((el) => el.remove());
    };
  }, [cases]);

  // ── Mouse drag (desktop) ────────────────────────────────────
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const normalise = (p: number) => {
      const r = resetAtRef.current;
      return r > 0 ? ((p % r) + r) % r : 0;
    };

    const onDown = (e: MouseEvent) => {
      drag.current = { active: true, startX: e.clientX, startPos: posRef.current };
      pausedRef.current = true;
      viewport.classList.add('dragging');
    };

    const onMove = (e: MouseEvent) => {
      if (!drag.current.active) return;
      const delta = drag.current.startX - e.clientX;
      posRef.current = normalise(drag.current.startPos + delta);
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
      }
    };

    const onUp = () => {
      if (!drag.current.active) return;
      drag.current.active = false;
      pausedRef.current = false;
      viewport.classList.remove('dragging');
    };

    viewport.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);

    return () => {
      viewport.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  // ── Touch swipe (mobile) ────────────────────────────────────
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    let startX = 0, startY = 0, startPos = 0;
    let direction: 'horizontal' | 'vertical' | null = null;

    const normalise = (p: number) => {
      const r = resetAtRef.current;
      return r > 0 ? ((p % r) + r) % r : 0;
    };

    const onStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      startPos = posRef.current;
      direction = null;
      drag.current.active = true;
      pausedRef.current = true;
    };

    const onMove = (e: TouchEvent) => {
      if (!drag.current.active) return;
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;

      if (direction === null && (Math.abs(dx) > 4 || Math.abs(dy) > 4)) {
        direction = Math.abs(dx) >= Math.abs(dy) ? 'horizontal' : 'vertical';
      }

      if (direction === 'horizontal') {
        e.preventDefault();
        posRef.current = normalise(startPos - dx);
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
        }
      } else if (direction === 'vertical') {
        // vertical scroll wins — release carousel
        drag.current.active = false;
        pausedRef.current = false;
      }
    };

    const onEnd = () => {
      drag.current.active = false;
      pausedRef.current = false;
      direction = null;
    };

    // passive: true for start (no need to block), passive: false for move so we can preventDefault
    viewport.addEventListener('touchstart', onStart, { passive: true });
    viewport.addEventListener('touchmove', onMove, { passive: false });
    viewport.addEventListener('touchend', onEnd, { passive: true });
    viewport.addEventListener('touchcancel', onEnd, { passive: true });

    return () => {
      viewport.removeEventListener('touchstart', onStart);
      viewport.removeEventListener('touchmove', onMove);
      viewport.removeEventListener('touchend', onEnd);
      viewport.removeEventListener('touchcancel', onEnd);
    };
  }, []);

  return (
    <div ref={viewportRef} className="carousel-viewport">
      <div className="carousel-track" ref={trackRef}>
        {cases.map((c) => (
          <article key={c.id} className="case-card">
            <p className="kicker">{c.kicker}</p>
            <span
              style={{
                display: 'inline-block',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                padding: '0.2rem 0.6rem',
                borderRadius: '999px',
                marginBottom: '0.5rem',
                background: c.status === 'client' ? 'rgba(20,184,166,0.12)' : 'rgba(100,116,139,0.12)',
                color: c.status === 'client' ? '#0d9488' : '#475569',
              }}
            >
              {c.status === 'client' ? 'Echtes Kundenprojekt' : 'Demo-Szenario'}
            </span>
            <h3>{c.title}</h3>
            {c.image ? (
              <img src={c.image} alt={c.title} className="case-image" />
            ) : (
              <div className="case-placeholder" />
            )}
            <p>{c.summary}</p>
            {c.metrics?.length > 0 && (
              <div className="metrics">
                {c.metrics.map((m) => (
                  <div key={m.label}>
                    <strong>{m.value}</strong>
                    <span>{m.label}</span>
                  </div>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

function HomePage() {
  const cases = allCases;

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
  }, [cases]);

  return (
    <div className="site-shell">
      <header className="site-nav">
        <div className="site-container nav-inner">
          <a href="#hero" className="brand">
            Berkay <span>Seckin</span>
          </a>
          <nav className="nav-links">
            <a href="#leistungen">Leistungen</a>
            <a href="#referenzen">Beispiele</a>
            <a href="#ueber-mich">Über mich</a>
          </nav>
          <a href="#kontakt" className="btn nav-cta">
            Gespräch buchen
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
              <span /> Prozessautomatisierung - Wien
            </p>
            <h1>
              Keine Anfrage geht
              <span>mehr verloren.</span>
            </h1>
            <p className="hero-accent">Automatisch erfasst — in Sekunden bei der richtigen Person.</p>
            <p className="hero-subtext">
              Für Betriebe mit mehr Anfragen als Zeit, sie schnell zu beantworten. Ein konkretes System für ein konkretes Problem — schlüsselfertig.
            </p>
            <div className="hero-actions">
              <a href="#kontakt" className="btn btn-primary">
                Kostenlose Prozess-Diagnose
              </a>
              <a href="#demo" className="btn btn-secondary">
                So funktioniert's
              </a>
            </div>
            <div className="hero-tags">
              {['Festpreis', 'Schlüsselfertig', 'Kein Vendor Lock-in', 'Industrieller Standard'].map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </section>
        <section id="demo" className="section section-light">
          <div className="site-container">
            <p className="section-label reveal">So funktioniert's</p>
            <h2 className="section-title reveal">
              Vom Eingang<span>aufs Handy.</span>
            </h2>
            <div className="demo-grid">
              <div className="demo-steps">
                <div className="demo-step reveal reveal-d1">
                  <p className="kicker">Das sieht Ihr Interessent</p>
                  <p>Ein schlichtes Formular. Name. Nummer. Absenden.</p>
                </div>
                <div className="demo-step reveal reveal-d2">
                  <p className="kicker">Das passiert dahinter</p>
                  <p>
                    Die Anfrage landet in 60&nbsp;Sekunden als WhatsApp bei der richtigen Person — inklusive Log,
                    Error Handling, Audit-Trail.
                  </p>
                </div>
                <div className="demo-step reveal reveal-d3">
                  <p className="kicker">Im Erstgespräch</p>
                  <p>Ich zeige Ihnen den Durchlauf live an Ihrem eigenen Beispiel.</p>
                </div>
                <a href="#kontakt" className="btn btn-primary reveal reveal-d3">
                  Kostenlose Prozess-Diagnose
                </a>
              </div>
              <div className="demo-visual reveal reveal-d2">
                <div className="demo-phone">
                  <div className="demo-phone-screen">
                    <p className="demo-whatsapp-label">WhatsApp</p>
                    <div className="demo-message">
                      <strong>Neue Anfrage</strong>
                      <span>Max Mustermann · +43 664 123 45 67</span>
                      <span className="demo-time">gerade eben ✓✓</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section section-muted">
          <div className="site-container differentiator-wrap">
            <p className="section-label reveal">Warum nicht einfach jemand anderen?</p>
            <p className="differentiator-text reveal">
              Die meisten Automatisierer
              <br />
              bauen alles für jeden.
            </p>
            <p className="differentiator-text reveal reveal-d1">
              Ich komme mit einem erprobten System für <em>ein</em> bekanntes Problem —<br className="hide-sm" />
              und passe es auf Ihre Situation an.
            </p>
            <p className="differentiator-highlight reveal reveal-d2">
              Spitz schlägt generisch. Im Erstgespräch und beim Ergebnis.
            </p>
          </div>
        </section>
        <section id="leistungen" className="section section-dark">
          <div className="site-container">
            <p className="section-label reveal">Leistungen</p>
            <h2 className="section-title reveal dark-title">
              Drei Schritte.<span>Ein klares System.</span>
            </h2>
            <p className="section-subtext reveal">
              Kein Scope-Creep: erst Lastenheft, dann Festpreis — Sie wissen vor Beginn exakt, was gebaut wird und was es kostet.
            </p>
            <div className="pricing-grid">
              <article className="pricing-card reveal">
                <p className="kicker">Schritt 01</p>
                <h3>Kostenlose Prozess-Diagnose</h3>
                <p className="price">0 EUR</p>
                <p className="price-note">30 Minuten, unverbindlich</p>
                <ul>
                  <li>Wo geht Zeit/Umsatz verloren</li>
                  <li>Konkreter Lösungsweg</li>
                  <li>Ehrliche Einschätzung, kein Pitch</li>
                  <li>Grobe Investitions-Range</li>
                </ul>
              </article>
              <article className="pricing-card featured reveal reveal-d1">
                <p className="featured-badge">Kernleistung</p>
                <p className="kicker">Schritt 02</p>
                <h3>Schlüsselfertige Umsetzung</h3>
                <p className="price">Investition ab 2.000 EUR</p>
                <p className="price-note">Fixpreis — exakt nach Diagnose</p>
                <ul>
                  <li>Exakt nach Blueprint</li>
                  <li>Error Handling und Monitoring</li>
                  <li>Vollständige Dokumentation</li>
                  <li>Kein Vendor Lock-in</li>
                </ul>
              </article>
              <article className="pricing-card reveal reveal-d2">
                <p className="kicker">Schritt 03</p>
                <h3>Betrieb und SLA</h3>
                <p className="price">Optional</p>
                <p className="price-note">Monatlich, im Gespräch festgelegt</p>
                <ul>
                  <li>Aktives Monitoring</li>
                  <li>API-Update-Management</li>
                  <li>Priority Response</li>
                  <li>Monatlicher Statusbericht</li>
                </ul>
              </article>
            </div>
          </div>
        </section>
        <section id="referenzen" className="section section-light">
          <div className="site-container">
            <p className="section-label reveal">Beispiel-Szenarien</p>
            <h2 className="section-title reveal">Wie ein Durchlauf aussieht.</h2>
          </div>
          {cases.length > 0 && <CaseCarousel cases={cases} />}
        </section>
        <section id="ueber-mich" className="section about-section">
          <div className="site-container about-grid">
            <div>
              <p className="section-label reveal">Über mich</p>
              <h2 className="section-title reveal">
                Ein System.<span>Ein konkretes Problem.</span>
              </h2>
              <p className="reveal">
                Andere bieten generische Automatisierung. Ich bringe ein erprobtes System für genau ein Problem —
                eingehende Anfragen gehen nicht mehr verloren — und passe es an Ihren Betrieb an. Gebaut nach den
                Architektur- und Qualitätsstandards von ORF und Bundesrechenzentrum.
              </p>
              <p className="reveal reveal-d1">
                Solo geliefert. Kein Overhead. Sie sprechen immer mit mir.
              </p>
              <div className="credentials reveal reveal-d2">
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
        <section id="kontakt" className="section cta-section">
          <div className="site-container cta-content">
            <h2>
              Welches Problem lösen wir
              <span>zuerst?</span>
            </h2>
            <p>30 Minuten. Kostenlos. Sie hören ein konkretes System, kein Angebot.</p>
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
              <li>→ Wo genau Zeit/Umsatz im Anfrage-Eingang verloren geht</li>
              <li>→ Ein konkreter Lösungsweg für Ihren Fall</li>
              <li>→ Ehrliche Einschätzung, kein Pitch</li>
              <li>→ Grobe Investitions-Range</li>
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
              Kostenlos, unverbindlich, kein Pitch. Wir schauen 30 Minuten auf Ihren Anfrage-Eingang — finden wir
              keinen konkreten Hebel, hat es Sie nur die Zeit gekostet, nicht mein Honorar.
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

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recruiting" element={<Recruiting />} />
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
