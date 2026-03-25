import { useCallback, useEffect, useRef, useState } from 'react';
import { Search, FileJson, Hammer, Rocket, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { SectionReveal } from './SectionReveal';

const icons = [Search, FileJson, Hammer, Rocket];

const Process = () => {
    const { t } = useLanguage();
    const sectionRef = useRef<HTMLElement | null>(null);
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [activeStepIndex, setActiveStepIndex] = useState(0);

    const updateActiveStep = useCallback(() => {
        const steps = t.process.steps;
        if (!steps.length) return;

        const vh = window.innerHeight;
        // Scan line ~ upper third: reads naturally on mobile + desktop while scrolling
        const lineY = Math.min(Math.max(vh * 0.36, 96), vh * 0.48);

        let next = 0;
        for (let i = 0; i < steps.length; i++) {
            const el = stepRefs.current[i];
            if (!el) continue;
            const top = el.getBoundingClientRect().top;
            if (top <= lineY) next = i;
        }
        setActiveStepIndex((prev) => (prev !== next ? next : prev));
    }, [t.process.steps]);

    useEffect(() => {
        let scheduled = false;
        const onScrollOrResize = () => {
            if (scheduled) return;
            scheduled = true;
            requestAnimationFrame(() => {
                scheduled = false;
                updateActiveStep();
            });
        };

        updateActiveStep();
        window.addEventListener('scroll', onScrollOrResize, { passive: true });
        window.addEventListener('resize', onScrollOrResize, { passive: true });

        const ro =
            typeof ResizeObserver !== 'undefined' && sectionRef.current
                ? new ResizeObserver(onScrollOrResize)
                : null;
        ro?.observe(sectionRef.current!);

        return () => {
            window.removeEventListener('scroll', onScrollOrResize);
            window.removeEventListener('resize', onScrollOrResize);
            ro?.disconnect();
        };
    }, [updateActiveStep]);

    return (
        <section
            ref={sectionRef}
            className="py-20 md:py-32 relative border-t border-slate-200/80 overflow-hidden"
        >
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/25 to-transparent -translate-x-1/2 block z-0" />

            <div className="container mx-auto px-6 relative z-10">
                <SectionReveal className="text-center mb-24">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 font-sans tracking-tight">
                        {t.process.headline}
                    </h2>
                    <p className="text-text-secondary max-w-xl mx-auto font-sans text-lg">
                        {t.process.sub}
                    </p>
                </SectionReveal>

                <SectionReveal>
                    <div className="relative space-y-16 md:space-y-32">
                    {t.process.steps.map((step, index) => {
                        const Icon = icons[index];
                        const isActive = activeStepIndex === index;
                        return (
                            <div
                                key={index}
                                ref={(el) => {
                                    stepRefs.current[index] = el;
                                }}
                                className={`flex flex-col md:flex-row items-center transition-opacity duration-500 ease-out ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                                aria-current={isActive ? 'step' : undefined}
                            >
                                <div
                                    className={`w-full md:w-1/2 ${index % 2 !== 0 ? 'text-center md:pl-24 md:text-left' : 'text-center md:pr-24 md:text-right'} mb-8 md:mb-0 relative z-10`}
                                >
                                    <div
                                        className={[
                                            'md:hidden w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center relative z-10 transition-all duration-500 ease-out',
                                            isActive
                                                ? 'bg-white border border-primary text-primary shadow-[0_0_26px_-4px_rgba(79,70,229,0.5)] scale-100 opacity-100'
                                                : 'bg-slate-50 border border-slate-200/90 text-slate-400 shadow-none scale-[0.97] opacity-55',
                                        ].join(' ')}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </div>

                                    <h3
                                        className={[
                                            'text-2xl font-bold mb-4 font-sans transition-all duration-500 ease-out',
                                            isActive ? 'text-slate-900' : 'text-slate-500',
                                        ].join(' ')}
                                    >
                                        {step.title}
                                    </h3>
                                    <p
                                        className={[
                                            'leading-relaxed font-sans text-base md:text-lg transition-all duration-500 ease-out',
                                            isActive ? 'text-text-secondary' : 'text-text-secondary/45',
                                        ].join(' ')}
                                    >
                                        {step.desc}
                                    </p>
                                </div>

                                <div
                                    className={[
                                        'absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full hidden md:flex items-center justify-center z-10 transform duration-500 ease-out',
                                        isActive
                                            ? 'bg-white border border-primary text-primary shadow-[0_0_28px_-4px_rgba(79,70,229,0.55)] md:scale-110'
                                            : 'bg-slate-50 border border-slate-200/90 text-slate-400 shadow-none md:scale-100 opacity-50',
                                    ].join(' ')}
                                >
                                    <Icon className="w-6 h-6" />
                                </div>

                                <div className="w-full md:w-1/2" />
                            </div>
                        );
                    })}
                    </div>
                </SectionReveal>

                <ProcessConclusion t={t} />
            </div>
        </section>
    );
};

const ProcessConclusion = ({ t }: { t: any }) => (
    <div className="flex flex-col items-center justify-center pt-24 md:pt-40 relative z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-24 md:h-40 w-px bg-gradient-to-b from-primary/25 to-transparent block" />

        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-24 h-24 md:w-32 md:h-32 mb-10 flex items-center justify-center"
        >
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl" />

            <motion.div
                className="absolute inset-0 rounded-full border border-primary/25"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, delay: 0.2 }}
            />

            <div className="w-16 h-16 md:w-20 md:h-20 bg-white border border-primary/35 rounded-full flex items-center justify-center shadow-[0_0_28px_-6px_rgba(79,70,229,0.45)] relative z-10">
                <Check className="w-8 h-8 md:w-10 md:h-10 text-primary" strokeWidth={1.5} />
            </div>
        </motion.div>

        <div className="text-center max-w-lg px-4">
            <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 font-sans tracking-tight"
            >
                {t.process.conclusion.headline}
            </motion.h3>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.6 }}
                className="text-text-secondary text-lg font-sans leading-relaxed"
            >
                {t.process.conclusion.description}
            </motion.p>
        </div>
    </div>
);

export default Process;
