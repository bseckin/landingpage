import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
    const { t } = useLanguage();
    return (
        <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden border-b border-slate-200/80 bg-[#f8fafc]/90">
            <HeroBackground />

            {/* Content */}
            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-teal-200/80 bg-white/85 backdrop-blur-md text-xs font-semibold text-slate-700 mb-8 md:mb-12 tracking-wide font-sans text-left shadow-card"
                >
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_rgba(20,184,166,0.55)]" />
                    {t.hero.badge}
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mb-8 font-sans text-slate-900 break-words hyphens-auto"
                >
                    {t.hero.headline}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-8 md:mb-12 font-sans font-light leading-relaxed"
                >
                    {t.hero.sub}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col md:flex-row items-center justify-center gap-6"
                >
                    <a href="#contact" className="w-full md:w-auto px-8 py-4 bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all duration-200 rounded-full font-sans shadow-[0_8px_28px_-6px_rgba(79,70,229,0.45)] hover:shadow-[0_12px_36px_-4px_rgba(79,70,229,0.5)] transform hover:scale-[1.02] text-center flex items-center justify-center gap-3">
                        <span className="flex items-center justify-center gap-3">
                            {t.hero.ctaPrimary} <ArrowRight className="w-5 h-5" />
                        </span>
                    </a>

                    <a href="#case-studies" className="w-full md:w-auto px-8 py-4 text-slate-600 hover:text-slate-900 transition-all font-sans font-medium text-sm tracking-wide border-b border-transparent hover:border-slate-400/80 text-center">
                        {t.hero.ctaSecondary}
                    </a>
                </motion.div>

            </div>
        </section >
    );
};

const HeroBackground = () => (
    <div className="absolute inset-0 z-0 pointer-events-none min-h-full">
        <div
            className="absolute inset-0 bg-gradient-to-b from-[#e8ecfa] via-[#f4f6fd] to-white"
            aria-hidden
        />
        <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_50%_-15%,rgba(180,210,255,0.55),transparent_58%)]"
            aria-hidden
        />
        <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_85%_45%,rgba(230,190,255,0.35),transparent_52%)]"
            aria-hidden
        />
        <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_15%_55%,rgba(160,235,255,0.4),transparent_48%)]"
            aria-hidden
        />
        <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_60%_25%,rgba(250,250,200,0.12),transparent_45%)]"
            aria-hidden
        />
        <HeroWaveCanvas />
        <div
            className="absolute inset-0 bg-gradient-to-t from-white/75 via-transparent to-[#eef1fb]/30"
            aria-hidden
        />
    </div>
);

type WaveLayer = {
    base: number;
    amp: number;
    freq: number;
    speed: number;
    phase: number;
    color: string;
    harmonic: number;
};

/* Band fills between curves — soft light blue + existing palette; higher freq/amp = more „wellig“ */
const WAVE_LAYERS: WaveLayer[] = [
    { base: 0.17, amp: 1, freq: 1.75, speed: 0.44, phase: 0.45, color: 'rgba(186, 230, 253, 0.28)', harmonic: 1.85 },
    { base: 0.29, amp: 1, freq: 1.95, speed: 0.52, phase: 2.0, color: 'rgba(99, 102, 241, 0.22)', harmonic: 1.75 },
    { base: 0.41, amp: 1, freq: 1.65, speed: 0.5, phase: 1.1, color: 'rgba(45, 212, 191, 0.2)', harmonic: 1.9 },
    { base: 0.53, amp: 1, freq: 2.05, speed: 0.58, phase: 3.0, color: 'rgba(129, 140, 248, 0.18)', harmonic: 1.7 },
    { base: 0.65, amp: 1, freq: 1.8, speed: 0.52, phase: 3.9, color: 'rgba(167, 139, 250, 0.17)', harmonic: 1.8 },
    { base: 0.77, amp: 1, freq: 1.55, speed: 0.48, phase: 1.65, color: 'rgba(224, 242, 254, 0.22)', harmonic: 1.75 },
];

const HeroWaveCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const timeRef = useRef(0);
    const rafRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const parent = canvas.parentElement;
        if (!parent) return;

        const resize = () => {
            const w = parent.clientWidth;
            const h = parent.clientHeight;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.max(1, Math.floor(w * dpr));
            canvas.height = Math.max(1, Math.floor(h * dpr));
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const waveY = (x: number, w: number, h: number, layer: WaveLayer, t: number) => {
            const nx = (x / w) * Math.PI * 2;
            const a = h * 0.072 * layer.amp;
            const primary = Math.sin(nx * layer.freq + t * layer.speed + layer.phase) * a;
            const secondary =
                Math.sin(nx * layer.freq * layer.harmonic + t * layer.speed * 0.62 + layer.phase * 1.35) *
                (a * 0.46);
            const tertiary =
                Math.sin(nx * layer.freq * 2.35 + t * layer.speed * 0.38 + layer.phase * 0.85) * (a * 0.18);
            return h * layer.base + primary + secondary + tertiary;
        };

        const draw = () => {
            const w = parent.clientWidth;
            const h = parent.clientHeight;
            if (w < 2 || h < 2) {
                rafRef.current = requestAnimationFrame(draw);
                return;
            }

            ctx.clearRect(0, 0, w, h);

            const t = timeRef.current;
            const step = Math.max(3, Math.floor(w / 128));

            /*
             * Band-fill between adjacent wave curves (no stacking to bottom).
             * Stacking many semi-transparent fills from each curve down to y=h made the
             * lower area read as gray; bands match the light tone of the upper waves.
             */
            for (let i = 0; i < WAVE_LAYERS.length; i++) {
                const layer = WAVE_LAYERS[i];
                const next = WAVE_LAYERS[i + 1];

                ctx.beginPath();
                ctx.moveTo(0, waveY(0, w, h, layer, t));
                for (let x = step; x <= w; x += step) {
                    ctx.lineTo(x, waveY(x, w, h, layer, t));
                }
                ctx.lineTo(w, waveY(w, w, h, layer, t));

                if (next) {
                    for (let x = w; x >= 0; x -= step) {
                        ctx.lineTo(x, waveY(x, w, h, next, t));
                    }
                } else {
                    ctx.lineTo(w, h);
                    ctx.lineTo(0, h);
                }
                ctx.closePath();
                ctx.fillStyle = layer.color;
                ctx.fill();
            }

            timeRef.current += 0.0055;
            rafRef.current = requestAnimationFrame(draw);
        };

        resize();
        const ro = new ResizeObserver(() => {
            resize();
        });
        ro.observe(parent);
        rafRef.current = requestAnimationFrame(draw);

        return () => {
            ro.disconnect();
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full"
            aria-hidden
        />
    );
};

export default Hero;
