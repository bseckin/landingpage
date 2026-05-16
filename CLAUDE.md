# berkayseckin.at — Landing Page

Solo-Freelance-Landingpage (Speed-to-Lead / Prozessautomatisierung, Wien). React 19 + Vite + Tailwind. Deploy: `git push` auf `main` → GitHub (`bseckin/landingpage`) → Vercel (Auto-Deploy). SPA-Rewrites in `vercel.json`.

## ⛔ HARTES DEPLOY-GATE (zuerst lesen)

**Nicht** die kommerzielle Verkaufsseite live deployen / `git push` auf `main`, **bis das Gewerbe angemeldet ist** (geplant ~2026-07). Verkaufende Tätigkeit (Preise, Diagnose-Funnel, „Umsetzung ab …") ohne Gewerbeberechtigung = GewO-Verwaltungsübertretung. Bis dahin: deploy-fertig halten, nicht pushen — oder nur eine klar **nicht-kommerzielle** „in Vorbereitung"-Variante.

## Content-Architektur (kritisch — spart Wiederentdeckung)

- **Die Live-Homepage ist zu 100 % hardcodiert in `src/App.tsx`.**
- **TOT / nicht gerendert** (nicht hier editieren): `src/content/hero.json`, `problem.json`, `services.json`, `about.json`, `footer.json`, `src/content/translations.tsx` (EN/i18n), `src/components/Footer.tsx`, `src/components/CaseStudyGrid.tsx`. Legacy-Ebene ohne Wirkung.
- Inhaltliche Änderungen an Homepage ⇒ **immer `src/App.tsx`**.
- Legal-Seiten **leben**: `src/content/impressum.json` + `datenschutz.json` → `src/pages/LegalPage.tsx` (Routen `/impressum`, `/datenschutz`).

## Case Studies

- Dateien: `src/content/case-studies/*.json`. Feld-Konvention: `"status": "client" | "demo" | "draft"`.
- Gerendert nur über: App.tsx `CaseCarousel` (Filter `title && kicker && status !== 'draft'`) und `/case-study/:id` (`src/routes/CaseStudy.tsx`; `draft` oder nicht-String-`content` → 404).
- **Integritätsregel:** nie Demo/fiktiv als echtes Kundenprojekt darstellen. `demo` trägt sichtbares Badge + Disclaimer; `draft` = unfertig/versteckt. Stand: **alle Cases sind Demos** (kein echtes Kundenprojekt) — kein `client` ohne Bestätigung des Inhabers.

## Positionierung & Stil (entschieden)

- Eine Seite, **ein Versprechen**: breites Speed-to-Lead-Outcome („keine Anfrage geht verloren"). *Nicht* recruiting-spezifisch, *nicht* „fertiges Produkt vs. Allround". Outcome-Sprache, **kein** Tool/„n8n" als Held.
- Genau **ein** primärer CTA: kostenlose Prozess-Diagnose über Inline-`DiagnosisForm` (in `App.tsx`) → `POST /api/contact`.
- `api/contact.ts` = Vercel-Function (läuft **nicht** unter `vite dev`), mailt hardcodiert an `berkay.seckin1@gmail.com`.
- Design: `.cursorrules` befolgen (Anti-KI-Slop-Ästhetik).

## Werte / Leitplanken

- Keine Bastellösung in seriösen Projekten; keine erfundenen Belege/Claims; Rechtstexte müssen wahr sein.
- Build prüfen vor Commit: `npm run build` (tsc + vite) muss grün sein.

## Offene Blocker (nur vom Inhaber lösbar)

- Echte Hausnummer Lissbauergasse fürs Impressum (kein Raten).
- Gewerbe-Anmeldung (~2026-07) — gated Go-Live (siehe oben).
- Produktions-WhatsApp statt Twilio-Sandbox (separates n8n-Projekt) — nötig, bevor das Produkt lieferbar ist.
