import { Search, FileJson, Hammer, Rocket, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const icons = [Search, FileJson, Hammer, Rocket];

const Process = () => {
    const { t } = useLanguage();

    return (
        <section className="py-20 md:py-32 relative border-t border-slate-200/80 overflow-hidden">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/25 to-transparent -translate-x-1/2 block z-0" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 font-sans tracking-tight">
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

                                <div className={`w-full md:w-1/2 ${index % 2 !== 0 ? 'text-center md:pl-24 md:text-left' : 'text-center md:pr-24 md:text-right'} mb-8 md:mb-0 relative z-10`}>
                                    <div className="md:hidden w-12 h-12 mx-auto mb-4 rounded-full bg-white border border-primary/40 text-primary flex items-center justify-center relative z-10 shadow-card">
                                        <Icon className="w-5 h-5" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-slate-900 mb-4 font-sans">{step.title}</h3>
                                    <p className="text-text-secondary leading-relaxed font-sans text-base md:text-lg">
                                        {step.desc}
                                    </p>
                                </div>

                                <div className="absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-white border border-primary text-primary shadow-[0_0_24px_-4px_rgba(79,70,229,0.35)] hidden md:flex items-center justify-center z-10 transform transition-transform hover:scale-110 duration-300">
                                    <Icon className="w-6 h-6" />
                                </div>

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
