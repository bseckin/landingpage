/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#050505', // Deep Black, not simple #000
                surface: {
                    DEFAULT: '#0a0a0a',
                    highlight: '#121212',
                },
                primary: {
                    DEFAULT: '#00ffa3', // Neon Cyan/Green
                    dim: '#00cc82',
                },
                secondary: '#00F0FF', // Cyan
                error: '#FF3333', // Tech Red
                text: {
                    primary: '#ffffff',
                    secondary: '#888888',
                    muted: '#444444',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'monospace'], // Restoring JetBrains
            },
            backgroundImage: {
                'grid-pattern': "linear-gradient(to right, #222 1px, transparent 1px), linear-gradient(to bottom, #222 1px, transparent 1px)",
            },
            backgroundSize: {
                'grid-sm': '24px 24px',
            },
            boxShadow: {
                'glow': '0 0 20px rgba(0, 255, 163, 0.2)',
            },
        },
    },
    plugins: [],
}
