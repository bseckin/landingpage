import { useEffect, useRef, useState } from 'react'; // useState used by HomePage
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SectionWaveCanvas from './components/SectionWaveCanvas';
import { LanguageProvider } from './context/LanguageContext';
import LegalPage from './pages/LegalPage';
import Admin from './routes/Admin';
import CaseStudy from './routes/CaseStudy';

const API_BASE = 'http://localhost:3001';

interface CaseStudyData {
  id: string;
  title: string;
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
  const [cases, setCases] = useState<CaseStudyData[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/list/case-studies`)
      .then((r) => r.json())
      .then((ids: string[]) =>
        Promise.all(
          ids.map((id) =>
            fetch(`${API_BASE}/api/case-studies/${id}`)
              .then((r) => r.json())
              .then((data) => ({ id, ...data }))
              // Skip entries without a title (old test data)
              .then((data) => (data.title && data.kicker ? data : null))
          )
        )
      )
      .then((all) => setCases(all.filter(Boolean) as CaseStudyData[]))
      .catch(() => {});
  }, []);

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
            <a href="#referenzen">Referenzen</a>
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
              Ich finde, wo dein Geschäft
              <span>Geld verbrennt.</span>
            </h1>
            <p className="hero-subtext">
              Und baue Systeme, die das dauerhaft stoppen. Schlüsselfertig. Keine Theorie.
            </p>
            <div className="hero-actions">
              <a href="#kontakt" className="btn btn-primary">
                Kostenloses Erstgespräch buchen
              </a>
              <a href="#leistungen" className="btn btn-secondary">
                Leistungen ansehen
              </a>
            </div>
            <div className="hero-tags">
              {['Prozessanalyse', 'Workflow-Automatisierung', 'Schlüsselfertig', 'Kein Vendor Lock-in'].map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </section>
        <section id="ansatz" className="section section-light">
          <div className="site-container">
            <p className="section-label reveal">Ansatz</p>
            <h2 className="section-title reveal">
              Drei Prinzipien.<span>Keine Kompromisse.</span>
            </h2>
            <div className="principles-grid">
              <article className="principle-card reveal reveal-d1">
                <div className="icon-box icon-search" />
                <p className="kicker">01 - Analyse</p>
                <h3>Analyse first.</h3>
                <p>Erst verstehen, was verloren geht - dann bauen. So zahlen Sie nie für das Falsche.</p>
              </article>
              <article className="principle-card reveal reveal-d2">
                <div className="icon-box icon-grid" />
                <p className="kicker">02 - Industrieller Standard</p>
                <h3>Industrieller Standard.</h3>
                <p>Error Handling, Backups, Monitoring. Architektur wie beim ORF und BRZ - Tempo wie ein Freelancer.</p>
              </article>
              <article className="principle-card reveal reveal-d3">
                <div className="icon-box icon-growth" />
                <p className="kicker">03 - Ergebnisse</p>
                <h3>Ergebnisse, nicht Technik.</h3>
                <p>Sie bekommen Zeit und Fokus zurück. Am Ende gehört Ihnen alles - kein Vendor Lock-in.</p>
              </article>
            </div>
          </div>
        </section>
        <section id="leistungen" className="section section-dark">
          <div className="site-container">
            <p className="section-label reveal">Leistungen</p>
            <h2 className="section-title reveal dark-title">
              Drei Schritte.<span>Ein klares System.</span>
            </h2>
            <div className="pricing-grid">
              <article className="pricing-card reveal">
                <p className="kicker">Schritt 01</p>
                <h3>Profit-Prozess-Audit</h3>
                <p className="price">ab 690 EUR</p>
                <p className="price-note">Anrechenbar auf Schritt 02</p>
                <ul>
                  <li>Prozessanalyse</li>
                  <li>10-15 Seiten Lastenheft</li>
                  <li>ROI-Kalkulation</li>
                  <li>Umsetzungsroadmap</li>
                </ul>
              </article>
              <article className="pricing-card featured reveal reveal-d1">
                <p className="featured-badge">Kernleistung</p>
                <p className="kicker">Schritt 02</p>
                <h3>Schlüsselfertige Umsetzung</h3>
                <p className="price">ab 2.000 EUR</p>
                <p className="price-note">S:2k-4k - M:4k-9k - L:ab 10k</p>
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
                <p className="price">ab 99 EUR / Monat</p>
                <p className="price-note">Optional</p>
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
        <section className="section section-dark border-top">
          <div className="site-container">
            <p className="section-label reveal">Betrieb und SLA</p>
            <h2 className="section-title reveal dark-title">Systeme brauchen jemanden der wacht.</h2>
            <p className="section-subtext reveal">
              Externe APIs ändern sich. Prozesse wachsen. Wählen Sie Ihr Sicherheitsnetz.
            </p>
            <div className="sla-grid">
              {[
                { tier: 'Basic', price: '99 EUR', features: ['Monitoring', 'Fehlerdiagnose', 'Report', 'Response 48h'] },
                {
                  tier: 'Professional',
                  price: '149 EUR',
                  features: ['API-Updates', 'Kleinanpassungen', 'Report', 'Response 24h'],
                },
                { tier: 'Premium', price: '299 EUR', features: ['Dedizierte Betreuung', 'Reviews', 'Report', 'Response 4h'] },
              ].map((plan, idx) => (
                <article key={plan.tier} className={`sla-card reveal reveal-d${idx}`}>
                  <p className="kicker">{plan.tier}</p>
                  <p className="price">{plan.price}</p>
                  <p className="price-note">pro Monat</p>
                  <ul>
                    {plan.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="referenzen" className="section section-light">
          <div className="site-container">
            <p className="section-label reveal">Referenzen</p>
            <h2 className="section-title reveal">Was in der Praxis passiert.</h2>
          </div>
          {cases.length > 0 && <CaseCarousel cases={cases} />}
        </section>
        <section id="ueber-mich" className="section about-section">
          <div className="site-container about-grid">
            <div>
              <p className="section-label reveal">Über mich</p>
              <h2 className="section-title reveal">
                Enterprise-Stabilität.<span>KMU-Geschwindigkeit.</span>
              </h2>
              <p className="reveal">
                Ich bin Berkay Seckin - Wirtschaftsinformatiker. Werbetechnologie beim ORF. Requirement Engineer im
                Bundesrechenzentrum.
              </p>
              <p className="reveal reveal-d1">
                Enterprise-Architektur. Solo-Tempo. Kein Overhead - und vor Beginn wissen Sie genau, was gebaut wird.
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
              <img src="/portrait.jpg" alt="Berkay Seckin" />
            </div>
          </div>
        </section>
        <section id="kontakt" className="section cta-section">
          <div className="site-container cta-content">
            <h2>
              Wo verliert Ihr Geschäft gerade
              <span>Geld?</span>
            </h2>
            <p>30 Minuten. Kostenlos. Keine Agenda außer Klarheit.</p>
            <a href="mailto:hello@berkayseckin.at" className="btn btn-primary">
              Kostenloses Erstgespräch buchen
            </a>
            <small>Oder direkt: hello@berkayseckin.at</small>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="site-container footer-inner">
          <p className="brand">
            Berkay <span>Seckin</span>
          </p>
          <div className="footer-links">
            <a href="#ansatz">Ansatz</a>
            <a href="#leistungen">Leistungen</a>
            <a href="#ueber-mich">Über mich</a>
            <a href="#kontakt">Kontakt</a>
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
          <Route path="/admin" element={<Admin />} />
          <Route path="/case-study/:id" element={<CaseStudy />} />
          <Route path="/impressum" element={<LegalPage type="impressum" />} />
          <Route path="/datenschutz" element={<LegalPage type="datenschutz" />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
