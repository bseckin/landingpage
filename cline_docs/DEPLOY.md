# Deployment Guide: Automation Landing Page

Deine Webseite ist eine **Single Page Application (SPA)**, die mit **Vite** gebaut wurde.
Das Admin-Panel ist für die **lokale Nutzung** konzipiert.

## Strategie: "Local Admin, Static Build"

1.  **Content Management:** Du bearbeitest Inhalte lokal (`npm run server` + `localhost:5173/admin`).
2.  **Speicherung:** Änderungen landen als `.json` Dateien in `src/content`.
3.  **Deployment:** Du lädst den Code (inkl. neuer JSON-Dateien) zu GitHub hoch. Vercel/Netlify baut die Seite und veröffentlicht sie.

---

## Schritt 1: Vorbereitung (Einmalig)

Ich habe bereits eine Datei `public/_redirects` erstellt. Diese ist wichtig, damit Unterseiten (wie `/case-study/...`) auch beim Neuladen funktionieren.

Stelle sicher, dass du ein GitHub-Konto hast.

## Schritt 2: Code zu GitHub hochladen

1.  Erstelle ein **neues Repository** auf [GitHub.com](https://github.new) (z.B. `automation-landing`).
2.  Öffne dein Terminal im Projektordner und führe folgende Befehle aus (falls noch nicht geschehen):

```bash
# Initialisiere Git (falls noch nicht passiert)
git init

# Alle Dateien hinzufügen
git add .

# Erster Commit
git commit -m "Initial release"

# Mit GitHub verbinden (ersetze URL mit deiner Repo-URL!)
git branch -M main
git remote add origin https://github.com/DEIN_USER/automation-landing.git
git push -u origin main
```

## Schritt 3: Hosting auf Vercel (Empfohlen)

Vercel ist extrem schnell und perfekt für Vite-Projekte.

1.  Gehe zu [vercel.com](https://vercel.com) und logge dich ein (am besten mit GitHub).
2.  Klicke auf **"Add New..."** -> **"Project"**.
3.  Wähle dein `automation-landing` Repository aus und klicke auf **Import**.
4.  **Einstellungen:**
    *   **Framework Preset:** Vite (sollte automatisch erkannt werden).
    *   **Root Directory:** `./` (Standard).
    *   **Build Command:** `npm run build` (Standard).
    *   **Output Directory:** `dist` (Standard).
5.  Klicke auf **Deploy**.

🎉 **Fertig!** Nach ca. 1 Minute ist deine Seite online.

---

## Workflow: Inhalte aktualisieren

Wenn du eine neue Fallstudie erstellst oder Texte änderst:

1.  Mache deine Änderungen lokal im Admin-Panel.
2.  Stoppe den Server oder öffne ein neues Terminal.
3.  Lade die Änderungen hoch:

```bash
git add .
git commit -m "Neue Fallstudie hinzugefügt"
git push
```

Vercel erkennt den neuen Commit und aktualisiert die Live-Webseite automatisch in wenigen Sekunden.
