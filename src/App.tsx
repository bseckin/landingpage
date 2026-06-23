import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import LegalPage from './pages/LegalPage';
import CaseStudy from './routes/CaseStudy';
import Recruiting from './routes/Recruiting';
import CV from './routes/CV';

/* ── Modular Section Components ──────────────────────────────── */
import Hero from './components/Hero';
import ProblemGrid from './components/ProblemGrid';
import Process from './components/Process';
import CaseStudyGrid from './components/CaseStudyGrid';
import About from './components/About';
import Footer from './components/Footer';
import DiagnosisForm from './components/DiagnosisForm';
import VideoSection from './components/VideoSection';
import Testimonials from './components/Testimonials';

const Admin = lazy(() => import('./routes/Admin'));

/* ─── HomePage ────────────────────────────────────────────────── */
function HomePage() {
  /* ── Smooth scroll for anchor links ──────────────────────── */
  useEffect(() => {
    const handler = (e: Event) => {
      const anchor = e.target as HTMLAnchorElement;
      const href = anchor.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    document.querySelectorAll('a[href^="#"]').forEach((a) =>
      a.addEventListener('click', handler),
    );
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach((a) =>
        a.removeEventListener('click', handler),
      );
    };
  }, []);

  return (
    <div className="text-on-surface-variant selection:bg-primary selection:text-on-surface">
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* ═══════════════ HEADER ═══════════════ */}
      <header className="fixed top-0 w-full z-50 bg-background/85 backdrop-blur-md border-b border-outline-variant">
        <nav className="flex justify-between items-center h-16 md:h-[74px] px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="font-display text-xl font-semibold tracking-tight text-on-surface">
            Berkay Seckin
          </div>
          <div className="hidden md:flex gap-9 items-center">
            <a
              className="text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors"
              href="#process"
            >
              Prozess
            </a>
            <a
              className="text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors"
              href="#cases"
            >
              Fallstudien
            </a>
            <a
              className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:-translate-y-0.5 hover:shadow-cta transition-all"
              href="#diagnosis-form"
            >
              Systemcheck buchen
            </a>
          </div>
          <button className="md:hidden text-on-surface" aria-label="Menu">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </nav>
      </header>

      <main>
        {/* Sektion 1: Hero (modular) */}
        <Hero />

        {/* Sektion 2: Problem (modular) */}
        <ProblemGrid />

        {/* Sektion 3: Lösung & Prozess (modular, inkl. Countdown) */}
        <Process />

        {/* Sektion 4: About & Credibility — Person zuerst, dann Szenarien */}
        <About />

        {/* Sektion 5: Fallstudien / Szenarien */}
        <CaseStudyGrid />

        {/* Sektion 6: Testimonials */}
        <Testimonials />

        {/* Sektion 7: Video — emotionaler Trigger kurz vor CTA */}
        <VideoSection />

        {/* Diagnosis Form Section */}
        <section
          className="py-20 md:py-28 bg-surface border-t border-outline-variant"
          id="diagnosis-form"
        >
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
            <span className="label-caps text-primary mb-4 block">
              Kostenloser Systemcheck
            </span>
            <h3 className="text-3xl md:text-4xl font-display font-semibold leading-tight max-w-2xl mx-auto mb-3">
              Sagen Sie kurz, worum es geht — ich melde mich persönlich.
            </h3>
            <p className="text-on-surface-variant max-w-xl mx-auto mb-10">
              Drei Felder, kein Verkaufsdruck. 15 Minuten am Telefon, danach
              wissen Sie, was sich für Ihren Betrieb lohnt.
            </p>
            <DiagnosisForm source="landingpage-main" />
          </div>
        </section>
      </main>

      {/* Footer (modular) */}
      <Footer />
    </div>
  );
}

/* ─── App Router ────────────────────────────────────────────────── */
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
              <Suspense
                fallback={
                  <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
                    Admin lädt …
                  </div>
                }
              >
                <Admin />
              </Suspense>
            }
          />
          <Route path="/case-study/:id" element={<CaseStudy />} />
          <Route
            path="/impressum"
            element={<LegalPage type="impressum" />}
          />
          <Route
            path="/datenschutz"
            element={<LegalPage type="datenschutz" />}
          />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;