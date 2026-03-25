import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';
import SectionWaveCanvas from './SectionWaveCanvas';

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
        <SectionWaveCanvas preset="hero" />
        <div
            className="absolute inset-0 bg-gradient-to-t from-white/75 via-transparent to-[#eef1fb]/30"
            aria-hidden
        />
    </div>
);

export default Hero;
