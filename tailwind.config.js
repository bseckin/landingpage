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
                primary: "#00F2FE",
                background: "#F8FAFC",
                surface: "#FFFFFF",
                "outline-variant": "#E2E8F4",
                "on-surface": "#0F172A",
                "on-surface-variant": "#334155",
                error: "#EF4444",
            },
            borderRadius: {
                none: "0",
                sm: "2px",
                DEFAULT: "0px",
            },
            spacing: {
                "margin-desktop": "32px",
                "margin-mobile": "16px",
                "container-max": "1440px",
            },
            fontFamily: {
                display: ['"Cabinet Grotesk"', "sans-serif"],
                body: ["Satoshi", "sans-serif"],
            },
            backgroundImage: {
                "blueprint-grid":
                    "linear-gradient(#E2E8F4 1px, transparent 1px), linear-gradient(90deg, #E2E8F4 1px, transparent 1px)",
            },
            backgroundSize: {
                "blueprint": "20px 20px",
            },
            boxShadow: {
                "cta": "4px 4px 0px 0px #0F172A",
                "cta-hover": "6px 6px 0px 0px #0F172A",
                "technical": "4px 4px 0px 0px #00F2FE",
            },
        },
    },
    plugins: [],
}
