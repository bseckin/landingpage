import { useEffect } from 'react';
import './cv.css';

/* ──────────────────────────────────────────────────────────────
   /cv — Lebenslauf / Profil (additiv & reversibel, wie /recruiting).
   Eigenständige, dokument-artige Route. Bedient die CV-Funktion,
   ohne die problembasierte Sales-Page (/) anzufassen.

   Vertraulichkeit: vom Inhaber freigegeben ("alles darf stehen").
   Truth-Guard: Selbstständigkeit ohne erfundene Mandate ("verfügbar
   für Mandate"); keine erfundenen Metriken bei ORF/BRZ.

   Alle Daten vom Inhaber bestätigt und gefüllt (LinkedIn, Telefon,
   Ausbildung, Sprach-Niveaus). Copy 2026-06-02 entstilisiert
   (menschlicher Ton, keine Gedankenstriche/AI-Floskeln).
   ────────────────────────────────────────────────────────────── */

const EMAIL = 'hallo@berkayseckin.at';
const PHONE_DISPLAY = '+43 660 154 68 53';
const PHONE_HREF = 'tel:+436601546853';
const LINKEDIN_URL = 'https://www.linkedin.com/in/berkay-seckin-917ab7175/';
const LINKEDIN_LABEL = 'linkedin.com/in/berkay-seckin';

const competencies = [
  {
    title: 'Requirements Engineering',
    desc: 'Anforderungen erheben und spezifizieren, dann gegen Abnahmekriterien prüfen. Lasten- und Pflichtenheft schreibe ich dazu.',
  },
  {
    title: 'Business Analysis',
    desc: 'Prozesse und Stakeholder analysieren. Und die Schnittstelle sein zwischen Fachbereich, internen Entwicklern und externen Partnern.',
  },
  {
    title: 'Prozessautomatisierung',
    desc: 'Workflows in n8n, oft Speed-to-Lead. Error-Handling und Audit-Trail gehören dazu.',
  },
  {
    title: 'System- und API-Integration',
    desc: 'REST, JSON, XML. Datenflüsse zwischen Systemen, die schon da sind, ohne dass das Team ein neues Tool lernen muss.',
  },
];

interface Experience {
  role: string;
  org: string;
  period: string;
  location: string;
  bullets: string[];
  tags: string[];
}

const experience: Experience[] = [
  {
    role: 'Requirements Engineer und Automation Consultant',
    org: 'Selbstständig',
    period: 'seit Apr. 2026',
    location: 'Wien, remote oder DACH',
    bullets: [
      'Prozessautomatisierung für KMU konzipiert und schlüsselfertig gebaut. Meist Speed-to-Lead: eine Anfrage kommt rein, wird erfasst und ist in Sekunden bei der Person, die sie bearbeitet.',
      'Eigene Lead-Pipeline in n8n. Error-Handling und Monitoring laufen mit, jeder Schritt landet im Audit-Trail.',
      'Aktuell offen für RE- und BA-Mandate, remote oder im DACH-Raum.',
    ],
    tags: ['Requirements Engineering', 'Business Analysis', 'n8n', 'REST', 'BPMN'],
  },
  {
    role: 'Requirements Engineer',
    org: 'Bundesrechenzentrum (BRZ)',
    period: 'Aug. 2024 – Juni 2025',
    location: 'Wien',
    bullets: [
      'Anforderungen erhoben für Projekte der österreichischen Bundesverwaltung, rund um Datenmanagement, Knowledge Discovery und KI.',
      'Stakeholder koordiniert und spezifiziert, unter den Audit- und Sicherheitsstandards, die im öffentlichen Sektor gelten.',
    ],
    tags: ['Requirements Engineering', 'Datenmanagement', 'Public Sector', 'KI-Projekte'],
  },
  {
    role: 'Business Analyst',
    org: 'PROTAS (Mandat ORF TVThek)',
    period: 'Okt. 2019 – Juni 2023',
    location: 'Wien',
    bullets: [
      'Schnittstelle zwischen ORF, internen Teams und externen Entwicklungspartnern. Es ging um die Streaming-Plattform ORF TVThek.',
      'Anforderungen erhoben und über mehrere Vendoren hinweg koordiniert, unter anderem für den Timeshift- und den DRM-Token-Validation-Flow.',
    ],
    tags: ['Business Analysis', 'Streaming', 'Multi-Vendor', 'DRM / Token-Flow'],
  },
];

interface Project {
  title: string;
  problem: string;
  solution: string;
  result: string;
}

const projects: Project[] = [
  {
    title: 'ORF TVThek, Timeshift und DRM',
    problem: 'Die Timeshift-Funktion brauchte einen gesicherten Token-Validation-Flow, und das über mehrere Vendoren hinweg.',
    solution: 'Ich habe die Anforderungen erhoben und ORF, interne Teams und externe Entwickler auf eine gemeinsame Spezifikation gebracht.',
    result: 'Ein abgestimmter Token-Validation-Flow, mit dem die Vendoren dann tatsächlich umsetzen konnten.',
  },
  {
    title: 'BRZ, Datenmanagement und Knowledge Discovery',
    problem: 'Datenmanagement und Wissenserschließung für die Bundesverwaltung. Die Anforderungen an Nachvollziehbarkeit waren hoch.',
    solution: 'Anforderungen erhoben und spezifiziert, für Datenmanagement- und KI-Projekte, nach den Standards des öffentlichen Sektors.',
    result: 'Eine belastbare Anforderungsbasis, die durch die Abnahme ging und auf der die Umsetzung aufsetzen konnte.',
  },
  {
    title: 'Speed-to-Lead-Automation (eigenes System)',
    problem: 'Anfragen versanden oder werden zu spät beantwortet. Das kostet Umsatz.',
    solution: 'Ein schlüsselfertiges System in n8n. Die Anfrage ist in unter 60 Sekunden als Nachricht bei der richtigen Person, mit Logging und Error-Handling.',
    result: 'Keine Anfrage geht mehr verloren. Die Reaktionszeit fällt von Stunden auf Sekunden.',
  },
];

const skills: { label: string; items: string[] }[] = [
  { label: 'Methodik', items: ['Requirements Engineering', 'Business Analysis', 'UML', 'BPMN', 'Scrum', 'Kanban'] },
  { label: 'Werkzeuge', items: ['Jira', 'Confluence', 'Lucidchart', 'Draw.io', 'Figma', 'Miro'] },
  { label: 'Technologien', items: ['REST', 'JSON', 'XML', 'SQL (MySQL / PostgreSQL)', 'n8n', 'React'] },
  { label: 'Domänen', items: ['Streaming-Plattformen', 'Public Sector', 'KMU-Prozessautomatisierung'] },
  { label: 'Sprachen', items: ['Deutsch (Muttersprache)', 'Türkisch (fließend)', 'Englisch (verhandlungssicher)'] },
];

interface Education {
  degree: string;
  school: string;
  period: string;
  note: string;
}

const education: Education[] = [
  {
    degree: 'Wirtschaftsinformatik (BSc)',
    school: 'FH Technikum Wien',
    period: '2016 – 2019',
    note: '',
  },
  {
    degree: 'Information Technology',
    school: 'Technologisches Gewerbemuseum (TGM)',
    period: '2010 – 2015',
    note: 'Matura mit ausgezeichnetem Erfolg',
  },
];

const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21H9V9Z" />
  </svg>
);

const PinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M12 21s-7-6.3-7-11a7 7 0 1 1 14 0c0 4.7-7 11-7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
  </svg>
);

export default function CV() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Berkay Seckin, Requirements Engineer und Business Analyst, Wien';

    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Berkay Seckin',
      jobTitle: 'Requirements Engineer & Business Analyst',
      email: `mailto:${EMAIL}`,
      telephone: '+436601546853',
      url: 'https://berkayseckin.at/cv',
      sameAs: [LINKEDIN_URL],
      address: { '@type': 'PostalAddress', addressLocality: 'Wien', addressCountry: 'AT' },
      knowsLanguage: ['de', 'tr', 'en'],
      alumniOf: [
        { '@type': 'CollegeOrUniversity', name: 'FH Technikum Wien' },
        { '@type': 'EducationalOrganization', name: 'Technologisches Gewerbemuseum (TGM)' },
      ],
      knowsAbout: [
        'Requirements Engineering',
        'Business Analysis',
        'Prozessautomatisierung',
        'System- und API-Integration',
        'BPMN',
        'n8n',
      ],
    });
    document.head.appendChild(ld);

    return () => {
      document.title = prevTitle;
      document.head.removeChild(ld);
    };
  }, []);

  return (
    <div className="cv-page">
      <header className="site-nav">
        <div className="site-container nav-inner">
          <a href="/" className="brand">
            Berkay <span>Seckin</span>
          </a>
          <nav className="nav-links">
            <a href="#erfahrung">Erfahrung</a>
            <a href="#projekte">Projekte</a>
            <a href="#kompetenzen">Kompetenzen</a>
          </nav>
          <button type="button" className="btn nav-cta" onClick={() => window.print()}>
            Als PDF speichern
          </button>
        </div>
      </header>

      <main className="cv-main">
        {/* ── Kopf ───────────────────────────────────────────── */}
        <header className="cv-header">
          <div className="site-container cv-header-grid">
            <div>
              <h1 className="cv-name">Berkay Seckin</h1>
              <p className="cv-role">
                Requirements Engineer · Business Analyst · Wien
              </p>
              <p className="cv-lead">
                Ich nehme unklare Anforderungen auseinander und schreibe Spezifikationen, mit denen Entwickler
                arbeiten können. Manches setze ich danach selbst um, schlüsselfertig. Die Erfahrung dazu kommt von
                der ORF&nbsp;TVThek und vom Bundesrechenzentrum. Heute selbstständig, vor allem für KMU im DACH-Raum.
              </p>
              <ul className="cv-contact">
                <li>
                  <MailIcon />
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </li>
                <li>
                  <PhoneIcon />
                  <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
                </li>
                <li>
                  <LinkedInIcon />
                  <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                    {LINKEDIN_LABEL}
                  </a>
                </li>
                <li>
                  <PinIcon />
                  Wien, Österreich
                </li>
              </ul>
              <div className="cv-actions">
                <a href={`mailto:${EMAIL}`} className="btn btn-primary">
                  Kontakt aufnehmen
                </a>
                <button type="button" className="btn btn-secondary" onClick={() => window.print()}>
                  Als PDF speichern
                </button>
              </div>
            </div>

            <div className="cv-portrait">
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
              <div className="cv-portrait-fallback" aria-hidden>
                BS
              </div>
            </div>
          </div>
        </header>

        <div className="site-container">
          {/* ── Profil ───────────────────────────────────────── */}
          <section className="cv-section" id="profil">
            <h2 className="cv-section-label">Profil</h2>
            <div className="cv-prose">
              <p>
                Requirements Engineer und Business Analyst aus Wien. Mein Schwerpunkt ist die saubere Erhebung von
                Anforderungen und der Weg von dort zu Systemen, die laufen und dokumentiert sind. Das reicht von
                der Streaming-Plattform bis in die Bundesverwaltung.
              </p>
              <p>
                Inzwischen bin ich selbstständig, mit Fokus auf KMU. Ich finde die Stellen, an denen Zeit in
                manueller, wiederkehrender Arbeit verloren geht, und baue die Abläufe so um, dass sie von selbst
                laufen und die vorhandenen Tools miteinander reden. Davor steht immer die Analyse, was wirklich
                gebraucht wird. Die Audit- und Qualitätsanforderungen dafür kenne ich von ORF und
                Bundesrechenzentrum, dort musste alles durch die Abnahme. Geliefert wird solo, ohne Vendor Lock-in.
              </p>
            </div>
          </section>

          {/* ── Kernkompetenzen ──────────────────────────────── */}
          <section className="cv-section" id="kompetenzen">
            <h2 className="cv-section-label">Kernkompetenzen</h2>
            <div className="cv-comp-grid">
              {competencies.map((c) => (
                <div key={c.title} className="cv-comp">
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Berufserfahrung ──────────────────────────────── */}
          <section className="cv-section" id="erfahrung">
            <h2 className="cv-section-label">Berufserfahrung</h2>
            <div className="cv-exp">
              {experience.map((e) => (
                <article key={`${e.org}-${e.period}`} className="cv-exp-item">
                  <h3 className="cv-exp-role">
                    {e.role} · <span className="cv-exp-org">{e.org}</span>
                  </h3>
                  <p className="cv-exp-meta">
                    <span>{e.period}</span>
                    <span>{e.location}</span>
                  </p>
                  <ul className="cv-exp-bullets">
                    {e.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <ul className="cv-tags">
                    {e.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          {/* ── Projekte ─────────────────────────────────────── */}
          <section className="cv-section" id="projekte">
            <h2 className="cv-section-label">Ausgewählte Projekte</h2>
            <div className="cv-projects">
              {projects.map((p) => (
                <article key={p.title} className="cv-project">
                  <h3>{p.title}</h3>
                  <div className="cv-pls">
                    <div>
                      <span>Problem</span>
                      <p>{p.problem}</p>
                    </div>
                    <div>
                      <span>Lösung</span>
                      <p>{p.solution}</p>
                    </div>
                    <div>
                      <span>Ergebnis</span>
                      <p>{p.result}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* ── Kompetenzen & Werkzeuge ──────────────────────── */}
          <section className="cv-section" id="skills">
            <h2 className="cv-section-label">Kenntnisse &amp; Werkzeuge</h2>
            <dl className="cv-skills">
              {skills.map((s) => (
                <div key={s.label} className="cv-skill-row">
                  <dt>{s.label}</dt>
                  <dd>
                    {s.items.map((i) => (
                      <span key={i}>{i}</span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ── Ausbildung ───────────────────────────────────── */}
          <section className="cv-section" id="ausbildung">
            <h2 className="cv-section-label">Ausbildung</h2>
            <div className="cv-edu">
              {education.map((e) => (
                <div key={e.school} className="cv-edu-item">
                  <div>
                    <h3>{e.degree}</h3>
                    <p>{e.note ? `${e.school} · ${e.note}` : e.school}</p>
                  </div>
                  <span className="cv-edu-period">{e.period}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ── Kontakt ──────────────────────────────────────── */}
          <section className="cv-section" id="kontakt">
            <div className="cv-contact-block">
              <h2>Verfügbar für neue Mandate.</h2>
              <p>
                Remote oder im DACH-Raum. Als Requirements Engineer oder Business Analyst, oder für ein konkretes
                Automatisierungsprojekt. Schreiben Sie mir, ich melde mich kurzfristig.
              </p>
              <div className="cv-actions">
                <a href={`mailto:${EMAIL}`} className="btn btn-primary">
                  {EMAIL}
                </a>
                <a className="btn btn-secondary" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </div>
            </div>
          </section>
        </div>
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
          <p className="copyright">© {new Date().getFullYear()} Berkay Seckin · Wien</p>
        </div>
      </footer>
    </div>
  );
}
