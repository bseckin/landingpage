import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden border-b border-white/5 bg-black">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* Curved Lines Decoration */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M-100 400 C 200 400, 400 200, 600 400 S 1000 600, 1540 400" stroke="#00ffa3" strokeWidth="1" strokeOpacity="0.15" fill="none" />
                <path d="M-100 600 C 200 600, 400 400, 600 600 S 1000 800, 1540 600" stroke="#00F0FF" strokeWidth="1" strokeOpacity="0.15" fill="none" />
            </svg>

            {/* Content */}
            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm text-xs font-semibold text-primary mb-8 md:mb-12 tracking-wide font-sans"
                >
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(0,255,163,0.8)]" />
                    VERFÜGBAR FÜR NEUE PROJEKTE
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mb-8 font-sans text-white"
                >
                    Ein System, das Sie<br />
                    <span className="text-secondary">nicht ständig braucht.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-8 md:mb-12 font-sans font-light leading-relaxed"
                >
                    Ich befreie Ihr Unternehmen von manueller Arbeit. <br className="hidden md:block" />
                    Für stabile Abläufe, weniger Fehler und echtes Wachstum.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col md:flex-row items-center justify-center gap-6"
                >
                    <a href="#contact" className="w-full md:w-auto px-8 py-4 bg-primary text-black font-bold text-lg hover:bg-primary/90 transition-all duration-200 rounded-full font-sans shadow-[0_0_20px_rgba(0,255,163,0.3)] hover:shadow-[0_0_30px_rgba(0,255,163,0.5)] transform hover:scale-105 text-center flex items-center justify-center gap-3">
                        <span className="flex items-center justify-center gap-3">
                            Potenzial-Gespräch vereinbaren <ArrowRight className="w-5 h-5" />
                        </span>
                    </a>

                    <a href="#case-studies" className="w-full md:w-auto px-8 py-4 text-text-secondary hover:text-white transition-all font-sans font-medium text-sm tracking-wide border-b border-transparent hover:border-white/20 text-center">
                        Fallstudien ansehen
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
