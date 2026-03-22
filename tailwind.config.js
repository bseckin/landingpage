/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#f8fafc',
                surface: {
                    DEFAULT: '#ffffff',
                    highlight: '#f1f5f9',
                },
                primary: {
                    DEFAULT: '#4f46e5',
                    dim: '#4338ca',
                },
                secondary: '#14b8a6',
                error: '#dc2626',
                text: {
                    primary: '#0f172a',
                    secondary: '#64748b',
                    muted: '#94a3b8',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'monospace'],
            },
            backgroundImage: {
                'grid-pattern': "linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)",
                'mesh-page':
                    'radial-gradient(ellipse 100% 80% at 12% 0%, rgba(45, 212, 191, 0.09), transparent 52%), radial-gradient(ellipse 85% 65% at 88% 15%, rgba(99, 102, 241, 0.07), transparent 48%), radial-gradient(ellipse 75% 55% at 45% 95%, rgba(250, 204, 21, 0.06), transparent 50%)',
            },
            backgroundSize: {
                'grid-sm': '24px 24px',
            },
            boxShadow: {
                glow: '0 0 0 1px rgba(15, 23, 42, 0.04), 0 8px 24px -6px rgba(15, 23, 42, 0.12)',
                card: '0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px -4px rgba(15, 23, 42, 0.08)',
            },
        },
    },
    plugins: [],
}
