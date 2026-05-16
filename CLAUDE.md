# berkayseckin.at — Landing Page

Solo-Freelance-Landingpage (Speed-to-Lead / Prozessautomatisierung, Wien). React 19 + Vite + Tailwind. Deploy: `git push` auf `main` → GitHub (`bseckin/landingpage`) → Vercel (Auto-Deploy). SPA-Rewrites in `vercel.json`.

## Go-Live-Status (zuerst lesen)

Das frühere harte Deploy-Gate (Gewerbe-Vorbehalt) ist **aufgehoben** (Inhaber-Bestätigung 2026-05-16): kommerzieller Go-Live / `git push` auf `main` ist erlaubt. **Vor dem ersten Live-Deploy** muss aber die echte Impressum-Hausnummer gesetzt sein (siehe Offene Blocker) — eine kommerzielle Seite mit unvollständigem Impressum ist rechtswidrig. Push auf `main` weiterhin nicht ungefragt — Risiko/Blast-Radius mit Inhaber abstimmen.

## Content-Architektur (kritisch — spart Wiederentdeckung)

- **Die Live-Homepage ist zu 100 % hardcodiert in `src/App.tsx`.**
- **TOT / nicht gerendert** (nicht hier editieren): `src/content/hero.json`, `problem.json`, `services.json`, `about.json`, `footer.json`, `src/content/translations.tsx` (EN/i18n), `src/components/Footer.tsx`, `src/components/CaseStudyGrid.tsx`. Legacy-Ebene ohne Wirkung.
- Inhaltliche Änderungen an Homepage ⇒ **immer `src/App.tsx`**.
- Legal-Seiten **leben**: `src/content/impressum.json` + `datenschutz.json` → `src/pages/LegalPage.tsx` (Routen `/impressum`, `/datenschutz`).

## Case Studies

- Dateien: `src/content/case-studies/*.json`. Feld-Konvention: `"status": "client" | "demo" | "draft"`.
- Gerendert nur über: App.tsx `CaseCarousel` (Filter `title && kicker && status !== 'draft'`) und `/case-study/:id` (`src/routes/CaseStudy.tsx`; `draft` oder nicht-String-`content` → 404).
- **Integritätsregel:** nie Demo/fiktiv als echtes Kundenprojekt darstellen. `demo` trägt sichtbares Badge + Disclaimer; `draft` = unfertig/versteckt. Stand: **alle Cases sind Demos** (kein echtes Kundenprojekt) — kein `client` ohne Bestätigung des Inhabers.

## Positionierung & Stil

- **Zielgruppe — AUFGELÖST 2026-05-16 (Drei-Achsen-Modell, Achsen NICHT wieder vermengen):**
  - **A) Öffentliche Positionierung = breit, problembasiert. Endgültig.** Seite/CLAUDE/Impressum/AMS-Geschäftsidee: ein Versprechen, Speed-to-Lead („keine Anfrage geht verloren"), **keine Branche** in der Außenkommunikation. Begründung: subsumiert jede Vertikale, technisch identisches Produkt, war durchgängig die einzige kundenseitige Copy.
  - **B) Outreach-Beachhead = EINE Vertikale: Recruiting-Boutiquen DACH** bis 3 Referenzdeals → dann Performance-Agenturen → dann Steuerberater (Strategiepapier v3). Nur 1:1-Pitch, nicht auf der Seite. Alle früheren Beauty/SHK/Makler/PV/Coaches/Verlage-Varianten = **tot** (Strategiepapier strich sie explizit).
  - **C) Proof/Case-Studies** müssen zum Beachhead passen — **offene Lücke:** sichtbare Demos sind E-Commerce/Dienstleistung, kein Recruiting. To-do: ≥1 Recruiting-`demo`-Case.
  - Seite breit ≠ Outreach spitz ist **gewollt**, kein Widerspruch. Wer „die Zielgruppe" ändern will, muss sagen *welche Achse*.
- Umgesetzt: Eine Seite, **ein Versprechen**, breites Speed-to-Lead-Outcome („keine Anfrage geht verloren"). Outcome-Sprache, **kein** Tool/„n8n" als Held.
- Genau **ein** primärer CTA: kostenlose Prozess-Diagnose über Inline-`DiagnosisForm` (in `App.tsx`) → `POST /api/contact`.
- `api/contact.ts` = Vercel-Function (läuft **nicht** unter `vite dev`), mailt hardcodiert an `berkay.seckin1@gmail.com`.
- Design: `.cursorrules` befolgen (Anti-KI-Slop-Ästhetik).

## Werte / Leitplanken

- Keine Bastellösung in seriösen Projekten; keine erfundenen Belege/Claims; Rechtstexte müssen wahr sein.
- Build prüfen vor Commit: `npm run build` (tsc + vite) muss grün sein.

## Offene Blocker (nur vom Inhaber lösbar)

- ~~Impressum-Adresse~~ **GELÖST 2026-05-16:** echte Geschäftsadresse „Lissbauergasse 3, 1190 Wien" in `impressum.json` + `datenschutz.json` gesetzt. Go-Live-Blocker entfällt; Seite wurde nach `main` deployt.
- Produktions-WhatsApp statt Twilio-Sandbox (separates n8n-Projekt) — nötig, bevor das Produkt lieferbar ist.
