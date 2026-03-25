import { useEffect, useRef } from 'react';

export type WavePreset = 'hero' | 'trust';

type WaveLayer = {
    base: number;
    amp: number;
    speed: number;
    phase: number;
    color: string;
};

type WaveConfig = {
    layers: WaveLayer[];
    waveCyclesAcross: number;
    secondHarmonic: number;
    ampScale: number;
    timeStep: number;
    /** feinere Polylinie = ruhigere Kurve */
    sampleDivisor: number;
};

/**
 * Hero: lebendige, interferierende Wellen — Bühne / Aufmerksamkeit.
 *
 * Trust (nur Kontakt-Canvas): bewusst ANDERS als Hero — kein „Hero light“:
 * monochromer Stein-/Tinten-Raum, ein gedämpfter Teal-Anker (Seriosität, kein Neon),
 * längere Wellenlänge, flachere Amplitude, langsamere Zeit. Bewegung bewusst
 * reduziert (keine Schwebung/Gegenwelle) → wirkt stabil, institutionell, nicht generisch-blau.
 */
const PRESETS: Record<WavePreset, WaveConfig> = {
    hero: {
        waveCyclesAcross: 1.28,
        secondHarmonic: 0.1,
        ampScale: 0.062,
        timeStep: 0.0055,
        sampleDivisor: 128,
        layers: [
            { base: 0.17, amp: 1, speed: 0.44, phase: 0.45, color: 'rgba(186, 230, 253, 0.28)' },
            { base: 0.29, amp: 1, speed: 0.48, phase: 1.85, color: 'rgba(99, 102, 241, 0.22)' },
            { base: 0.41, amp: 1, speed: 0.46, phase: 3.35, color: 'rgba(45, 212, 191, 0.2)' },
            { base: 0.53, amp: 1, speed: 0.5, phase: 5.1, color: 'rgba(129, 140, 248, 0.18)' },
            { base: 0.65, amp: 1, speed: 0.47, phase: 2.2, color: 'rgba(167, 139, 250, 0.17)' },
            { base: 0.77, amp: 1, speed: 0.45, phase: 4.0, color: 'rgba(224, 242, 254, 0.22)' },
        ],
    },
    trust: {
        /* Breitere Kamms — ruhiger Horizont, weniger „buntes Meer“ */
        waveCyclesAcross: 0.76,
        secondHarmonic: 0.038,
        ampScale: 0.032,
        timeStep: 0.00185,
        sampleDivisor: 168,
        layers: [
            { base: 0.2, amp: 1, speed: 0.15, phase: 0.62, color: 'rgba(248, 250, 252, 0.44)' },
            { base: 0.36, amp: 1, speed: 0.14, phase: 2.25, color: 'rgba(226, 232, 240, 0.34)' },
            { base: 0.5, amp: 1, speed: 0.145, phase: 4.1, color: 'rgba(148, 163, 184, 0.1)' },
            { base: 0.62, amp: 1, speed: 0.138, phase: 1.05, color: 'rgba(15, 118, 110, 0.065)' },
            { base: 0.74, amp: 1, speed: 0.142, phase: 3.55, color: 'rgba(51, 65, 85, 0.055)' },
            { base: 0.85, amp: 1, speed: 0.135, phase: 2.1, color: 'rgba(241, 245, 249, 0.36)' },
        ],
    },
};

type SectionWaveCanvasProps = {
    preset: WavePreset;
    className?: string;
};

const SectionWaveCanvas = ({ preset, className }: SectionWaveCanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const timeRef = useRef(0);
    const rafRef = useRef<number>(0);

    useEffect(() => {
        const config = PRESETS[preset];
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const parent = canvas.parentElement;
        if (!parent) return;

        const sizeFromParent = () => {
            const rect = parent.getBoundingClientRect();
            const w = Math.max(1, Math.ceil(rect.width));
            const h = Math.max(1, Math.ceil(rect.height));
            return { w, h };
        };

        const resize = () => {
            const { w, h } = sizeFromParent();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.max(1, Math.floor(w * dpr));
            canvas.height = Math.max(1, Math.floor(h * dpr));
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const waveY = (x: number, w: number, h: number, layer: WaveLayer, t: number) => {
            const nx = (x / w) * Math.PI * 2;
            const k = config.waveCyclesAcross;
            const a = h * config.ampScale * layer.amp;
            const p = layer.phase;
            const s = layer.speed;
            const sh = config.secondHarmonic;

            const theta = nx * k - t * s + p;

            if (preset === 'trust') {
                /* Reduzierte Physik: nur Grundwelle + leichte Krümmung + minimales Heben — wirkt fest, nicht „Slider“ */
                const primary = Math.sin(theta) * a;
                const octave = Math.sin(theta * 2) * (a * sh);
                const heave = h * 0.0028 * Math.sin(t * 0.038 + p * 0.55);
                return h * layer.base + primary + octave + heave;
            }

            const thetaBeat = nx * k - t * s * 0.79 + p * 1.12;
            const thetaBack = nx * k + t * s * 0.48 + p * 1.55;

            const fundamental =
                Math.sin(theta) * a +
                Math.sin(thetaBeat) * (a * 0.3) +
                Math.sin(thetaBack) * (a * 0.18);
            const octave = Math.sin(theta * 2) * (a * sh);
            const heave = h * 0.006 * Math.sin(t * 0.065 + p * 0.7);

            return h * layer.base + fundamental + octave + heave;
        };

        const draw = () => {
            const { w, h } = sizeFromParent();
            if (w < 2 || h < 2) {
                rafRef.current = requestAnimationFrame(draw);
                return;
            }

            ctx.clearRect(0, 0, w, h);

            const t = timeRef.current;
            const step = Math.max(3, Math.floor(w / config.sampleDivisor));
            const layers = config.layers;

            for (let i = 0; i < layers.length; i++) {
                const layer = layers[i];
                const next = layers[i + 1];

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

            timeRef.current += config.timeStep;
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
    }, [preset]);

    return (
        <div
            className="pointer-events-none absolute inset-y-0 left-1/2 min-h-full w-[calc(100%+8px)] min-w-[calc(100%+8px)] max-w-none -translate-x-1/2"
            aria-hidden
        >
            <canvas ref={canvasRef} className={className ?? 'block h-full w-full'} aria-hidden />
        </div>
    );
};

export default SectionWaveCanvas;
