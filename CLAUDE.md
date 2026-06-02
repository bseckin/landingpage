# berkayseckin.at — Landing Page

Solo-Freelance-Landingpage (Speed-to-Lead / Prozessautomatisierung, Wien). React 19 + Vite + Tailwind. Deploy: `git push` auf `main` → GitHub (`bseckin/landingpage`) → Vercel (Auto-Deploy). SPA-Rewrites in `vercel.json`.

## Go-Live-Status (zuerst lesen)

Das frühere harte Deploy-Gate (Gewerbe-Vorbehalt) ist **aufgehoben** (Inhaber-Bestätigung 2026-05-16): kommerzieller Go-Live / `git push` auf `main` ist erlaubt. **Vor dem ersten Live-Deploy** muss aber die echte Impressum-Hausnummer gesetzt sein (siehe Offene Blocker) — eine kommerzielle Seite mit unvollständigem Impressum ist rechtswidrig. Push auf `main` weiterhin nicht ungefragt — Risiko/Blast-Radius mit Inhaber abstimmen.

## Content-Architektur (kritisch — spart Wiederentdeckung)

- **Die Live-Homepage ist zu 100 % hardcodiert in `src/App.tsx`.**
- **TOT / nicht gerendert** (nicht hier editieren): `src/content/hero.json`, `problem.json`, `services.json`, `about.json`, `footer.json`, `src/content/translations.tsx` (EN/i18n), `src/components/Footer.tsx`, `src/components/CaseStudyGrid.tsx`. Legacy-Ebene ohne Wirkung.
- Inhaltliche Änderungen an Homepage ⇒ **immer `src/App.tsx`**.
- Legal-Seiten **leben**: `src/content/impressum.json` + `datenschutz.json` → `src/pages/LegalPage.tsx` (Routen `/impressum`, `/datenschutz`).
- Lebenslauf/CV-Route **lebt**: `src/routes/CV.tsx` + `src/routes/cv.css` (Route `/cv`) — eigenständiger, dokument-artiger Lebenslauf; Inhalt hardcodiert in `CV.tsx` (Daten-Arrays oben: `experience`, `projects`, `skills`, `education`). Erreichbar via dezentem Footer-Link auf `/` (`App.tsx`) + direkt (LinkedIn-Bio). Zweck/Register siehe „Positionierung & Stil".

## Case Studies

- Dateien: `src/content/case-studies/*.json`. Feld-Konvention: `"status": "client" | "demo" | "draft"`.
- Gerendert nur über: App.tsx `CaseCarousel` (Filter `title && kicker && status !== 'draft'`) und `/case-study/:id` (`src/routes/CaseStudy.tsx`; `draft` oder nicht-String-`content` → 404).
- **Integritätsregel:** nie Demo/fiktiv als echtes Kundenprojekt darstellen. `demo` trägt sichtbares Badge + Disclaimer; `draft` = unfertig/versteckt. Stand: **alle Cases sind Demos** (kein echtes Kundenprojekt) — kein `client` ohne Bestätigung des Inhabers.

## Positionierung & Stil

- **Zielgruppe — AUFGELÖST 2026-05-16 (Drei-Achsen-Modell, Achsen NICHT wieder vermengen):**
  - **A) Öffentliche Positionierung = breit, problembasiert. Endgültig.** Seite/CLAUDE/Impressum/AMS-Geschäftsidee: ein Versprechen, Speed-to-Lead („keine Anfrage geht verloren"), **keine Branche** in der Außenkommunikation. Begründung: subsumiert jede Vertikale, technisch identisches Produkt, war durchgängig die einzige kundenseitige Copy.
  - **B) Outreach-Beachhead = EINE Vertikale: Recruiting-Boutiquen DACH** bis 3 Referenzdeals → dann Performance-Agenturen → dann Steuerberater (Strategiepapier v3). Nur 1:1-Pitch, nicht auf der Seite. Alle früheren Beauty/SHK/Makler/PV/Coaches/Verlage-Varianten = **tot** (Strategiepapier strich sie explizit).
  - **C) Proof/Case-Studies**: Recruiting-`demo`-Case `recruiting-speed-to-lead.json` existiert; auf `/recruiting` als Proof gerendert. Lücke geschlossen.
  - Seite breit ≠ Outreach spitz ist **gewollt**, kein Widerspruch. Wer „die Zielgruppe" ändern will, muss sagen *welche Achse*.
- **Zwei Landingpages (Achsen getrennt umgesetzt):** `/` = breit, problembasiert (Achse A, kanonisch, hardcodiert in `src/App.tsx`). `/recruiting` = recruiting-spitze Hormozi-Variante (Achse B, `src/routes/Recruiting.tsx`) — Avatar-Headline, Offer-Stack, weiche Risikoumkehr; dorthin zeigt der Recruiting-Outreach. `/` bleibt unverändert; `/recruiting` ist additiv & reversibel.
- **Drittes Artefakt — Lebenslauf/CV (`/cv`), KEINE dritte Landingpage:** dokument-artiger Lebenslauf in `src/routes/CV.tsx` (achsen-unabhängig). Bedient die „CV für meine Dienste"-Funktion getrennt vom Sales-Register, damit weder Conversion-Fokus noch Achse A verwässert werden (Entscheidung 2026-06-02: separate Route statt `/`-Umbau). Rollen-Hero („Requirements Engineer & Business Analyst") ist hier bewusst OK — `/cv` ist NICHT die Achse-A-Seite. Additiv & reversibel; eigener `@media print`-Layer → „Als PDF speichern" = ATS-sicheres PDF (die Seite selbst wird nie von einem ATS geparst). Inhalt: echte Stationen (BRZ, ORF via PROTAS, FH Technikum Wien, TGM) — vom Inhaber zur öffentlichen Nutzung freigegeben; Selbstständigkeit als „verfügbar für Mandate" (keine erfundenen Mandate/Metriken). Bekannte Grenze: Social-Share-Preview von `/cv` zeigt die Homepage-OG-Tags (SPA, Scraper ohne JS) — nur per Prerender/SSR lösbar.
- Umgesetzt: breites Speed-to-Lead-Outcome („keine Anfrage geht verloren") auf `/`. Outcome-Sprache, **kein** Tool/„n8n" als Held.
- Genau **ein** primärer CTA je Seite: kostenlose Prozess-Diagnose über `DiagnosisForm` (`src/components/DiagnosisForm.tsx`, geteilt von `/` und `/recruiting`; letztere setzt `source="recruiting"`) → `POST /api/contact`.
- `api/contact.ts` = Vercel-Function (läuft **nicht** unter `vite dev`), mailt hardcodiert an `hallo@berkayseckin.at` (Business-Inbox). Mail-Body wird HTML-escaped (kein Injection-Sink); `GMAIL_USER`/`GMAIL_PASS` in Vercel Prod gesetzt & end-to-end bestätigt.
- Design: `.cursorrules` befolgen (Anti-KI-Slop-Ästhetik).

## Werte / Leitplanken

- Keine Bastellösung in seriösen Projekten; keine erfundenen Belege/Claims; Rechtstexte müssen wahr sein.
- Build prüfen vor Commit: `npm run build` (tsc + vite) muss grün sein.

## Stand / Letzte Änderungen (2026-05-31)

Live & verifiziert (Commit-Historie = Quelle der Wahrheit, nicht dieser Block):

- **Lead-Strecke läuft end-to-end** — `POST /api/contact` → `hallo@berkayseckin.at`; live getestet, Mail kommt an. Das frühere „GMAIL-env-vars-unbekannt"-Risiko (stiller Lead-Verlust) ist damit geschlossen.
- **Security:** Mail-Body in `api/contact.ts` HTML-escaped + `request.body ?? {}` (P6/P5 behoben).
- **Performance:** `/admin` (Quill-CMS) lazy-loaded → Public-Bundle 628→404 kB JS (gzip 197→131), Quill-CSS aus Main raus. Admin nur localhost, lädt on-demand — Verhalten unverändert.
- **Social:** dediziertes OG-Bild `public/og-image.png` (1200×630) + OG/Twitter-Tags (inkl. width/height/type/alt) in `index.html`. Reproduzierbar: `node scripts/generate-og.mjs` (bettet echte Sora/Manrope-Fonts ein, rendert via headless Chrome — keine npm-Dep).
- **Favicon:** `public/favicon.svg` (BS-Monogramm) statt `vite.svg`.

## Offene Blocker (nur vom Inhaber lösbar)

- ~~Impressum-Adresse~~ **GELÖST 2026-05-16:** echte Geschäftsadresse „Lissbauergasse 3, 1190 Wien" in `impressum.json` + `datenschutz.json` gesetzt. Go-Live-Blocker entfällt; Seite wurde nach `main` deployt.
- Produktions-WhatsApp statt Twilio-Sandbox (separates n8n-Projekt) — nötig, bevor das Produkt lieferbar ist.
