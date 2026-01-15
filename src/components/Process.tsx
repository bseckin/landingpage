import { Search, FileJson, Hammer, Rocket } from 'lucide-react';

const steps = [
    {
        icon: Search,
        title: 'Klarheit schaffen',
        desc: 'Wir analysieren Ihr Business und identifizieren die Hebel mit dem größten ROI.',
    },
    {
        icon: FileJson,
        title: 'Maßarbeit',
        desc: 'Ich entwickle eine Strategie, die genau auf Ihre Ziele einzahlt. Kein "Schema F".',
    },
    {
        icon: Hammer,
        title: 'Umsetzung',
        desc: 'Ich baue die Systeme, während Sie sich um Ihr Geschäft kümmern.',
    },
    {
        icon: Rocket,
        title: 'Die Befreiung',
        desc: 'Ihr Business läuft auf Autopilot. Sie gewinnen 10-20 Stunden pro Woche zurück.',
    },
];

const Process = () => {
    return (
        <section className="py-20 md:py-32 bg-black relative border-t border-white/5 overflow-hidden">
            {/* Centered Vertical Line (Desktop only) */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent -translate-x-1/2 hidden md:block" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-sans tracking-tight">
                        Der Weg zur Freiheit
                    </h2>
                    <p className="text-text-secondary max-w-xl mx-auto font-sans text-lg">
                        Von der Analyse bis zum Autopiloten in vier Schritten.
                    </p>
                </div>

                <div className="relative space-y-16 md:space-y-32">
                    {steps.map((step, index) => (
                        <div key={index} className={`flex flex-col md:flex-row items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>

                            {/* Text Content */}
                            <div className={`w-full md:w-1/2 ${index % 2 !== 0 ? 'md:pl-24 text-left' : 'md:pr-24 text-center md:text-right'} mb-8 md:mb-0 relative`}>
                                {/* Mobile Icon (visible only on mobile) */}
                                <div className="md:hidden w-12 h-12 mx-auto mb-4 rounded-full bg-surface/20 border border-primary/50 text-primary flex items-center justify-center">
                                    <step.icon className="w-5 h-5" />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-4 font-sans">{step.title}</h3>
                                <p className="text-text-secondary leading-relaxed font-sans text-base md:text-lg">
                                    {step.desc}
                                </p>
                            </div>

                            {/* Center Icon (Desktop only) */}
                            <div className="absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-black border border-primary text-primary shadow-[0_0_20px_rgba(0,255,163,0.3)] hidden md:flex items-center justify-center z-10 transform transition-transform hover:scale-110 duration-300">
                                <step.icon className="w-6 h-6" />
                            </div>

                            {/* Spacer for balance */}
                            <div className="w-full md:w-1/2" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;
