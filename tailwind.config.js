/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#15604A",          // Werkstatt-/Vertrauensgrün
                "primary-soft": "#E7F0EB",
                accent: "#C8742B",           // warmer Akzent (ersetzt kaltes Rot)
                background: "#F7F4EE",       // warmes Papier
                surface: "#FFFFFF",
                "outline-variant": "#E3DDD1",
                "on-surface": "#1C1A16",     // warmes Schwarz
                "on-surface-variant": "#5A554C",
                error: "#C0392B",
            },
            borderRadius: {
                none: "0",
                sm: "6px",
                DEFAULT: "10px",
                lg: "16px",
                xl: "20px",
                full: "999px",
            },
            spacing: {
                "margin-desktop": "32px",
                "margin-mobile": "16px",
                "container-max": "1240px",
            },
            fontFamily: {
                display: ["Fraunces", "Georgia", "serif"],
                body: ["Satoshi", "sans-serif"],
            },
            boxShadow: {
                "cta": "0 10px 24px -10px rgba(21,96,74,.5)",
                "cta-hover": "0 16px 32px -12px rgba(21,96,74,.6)",
                "technical": "0 16px 40px -24px rgba(28,26,22,.35)",
                "soft": "0 24px 60px -30px rgba(28,26,22,.30)",
            },
        },
    },
    plugins: [],
}
