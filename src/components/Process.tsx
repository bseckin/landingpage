import { Search, FileJson, Hammer, Rocket, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const icons = [Search, FileJson, Hammer, Rocket];

const Process = () => {
    const { t } = useLanguage();

    return (
        <section className="py-20 md:py-32 bg-[#050505] relative border-t border-white/5 overflow-hidden">
            {/* Centered Vertical Line (Mobile & Desktop) */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent -translate-x-1/2 block z-0" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-sans tracking-tight">
                        {t.process.headline}
                    </h2>
                    <p className="text-text-secondary max-w-xl mx-auto font-sans text-lg">
                        {t.process.sub}
                    </p>
                </div>

                <div className="relative space-y-16 md:space-y-32">
                    {t.process.steps.map((step, index) => {
                        const Icon = icons[index];
                        return (
                            <div key={index} className={`flex flex-col md:flex-row items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>

                                {/* Text Content */}
                                <div className={`w-full md:w-1/2 ${index % 2 !== 0 ? 'text-center md:pl-24 md:text-left' : 'text-center md:pr-24 md:text-right'} mb-8 md:mb-0 relative z-10`}>
                                    {/* Mobile Icon (visible only on mobile) */}
                                    <div className="md:hidden w-12 h-12 mx-auto mb-4 rounded-full bg-surface/20 border border-primary/50 text-primary flex items-center justify-center relative z-10 backdrop-blur-sm bg-black/40">
                                        <Icon className="w-5 h-5" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-4 font-sans">{step.title}</h3>
                                    <p className="text-text-secondary leading-relaxed font-sans text-base md:text-lg">
                                        {step.desc}
                                    </p>
                                </div>

                                {/* Center Icon (Desktop only) */}
                                <div className="absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-black border border-primary text-primary shadow-[0_0_20px_rgba(0,255,163,0.3)] hidden md:flex items-center justify-center z-10 transform transition-transform hover:scale-110 duration-300">
                                    <Icon className="w-6 h-6" />
                                </div>

                                {/* Spacer for balance */}
                                <div className="w-full md:w-1/2" />
                            </div>
                        );
                    })}

                    <ProcessConclusion t={t} />
                </div>
            </div>
        </section>
    );
};

// Extracted for maintainability: distinct visual component for the final state
const ProcessConclusion = ({ t }: { t: any }) => (
    <div className="flex flex-col items-center justify-center pt-24 md:pt-40 relative z-10">
        {/* Connecting Line (fading out into success) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-24 md:h-40 w-px bg-gradient-to-b from-primary/20 to-transparent block" />

        {/* The Success Symbol - Clear, Stable, Glowing */}
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} // Custom gentle ease
            className="relative w-24 h-24 md:w-32 md:h-32 mb-10 flex items-center justify-center"
        >
            {/* Stable Outer Glow */}
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl" />

            {/* The Ring - Calm, barely moving */}
            <motion.div
                className="absolute inset-0 rounded-full border border-primary/20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, delay: 0.2 }}
            />

            {/* The Icon Container */}
            <div className="w-16 h-16 md:w-20 md:h-20 bg-black border border-primary/30 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,255,163,0.15)] relative z-10">
                <Check className="w-8 h-8 md:w-10 md:h-10 text-primary" strokeWidth={1.5} />
            </div>
        </motion.div>

        {/* The Text - Confidence & Relief */}
        <div className="text-center max-w-lg px-4">
            <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-2xl md:text-3xl font-bold text-white mb-4 font-sans tracking-tight"
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
