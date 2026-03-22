import { useLanguage } from '../context/LanguageContext';

const About = () => {
    const { t } = useLanguage();
    return (
        <section className="py-20 md:py-32 border-t border-slate-200/80">
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                <div className="order-2 lg:order-1">
                    <div className="flex items-center gap-4 mb-8">
                        <span className="text-secondary text-5xl font-mono font-light">{'//'}</span>
                        <h2 className="text-3xl md:text-5xl font-mono font-bold text-primary tracking-widest uppercase">{t.about.whoAmI}</h2>
                    </div>

                    <p className="text-lg md:text-xl text-text-secondary leading-relaxed font-sans mb-12 max-w-lg">
                        {t.about.description}
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Badge label={t.about.badges.code.label} sub={t.about.badges.code.sub} />
                        <Badge label={t.about.badges.term.label} sub={t.about.badges.term.sub} />
                    </div>
                </div>

                <div className="relative order-1 lg:order-2">
                    <div className="aspect-square w-full max-w-[500px] mx-auto bg-white border border-slate-200/60 rounded-xl shadow-card relative flex items-center justify-center">
                        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary rounded-tr-xl" />
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-primary rounded-bl-xl" />

                        <div className="text-6xl font-bold font-mono text-slate-200 select-none hover:text-slate-300 transition-colors">ME</div>

                        <div className="absolute bottom-6 right-6 px-4 py-2 bg-white border border-slate-200/80 rounded-full flex items-center gap-3 shadow-card">
                            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse shadow-[0_0_6px_rgba(20,184,166,0.6)]" />
                            <span className="text-secondary text-xs font-mono tracking-widest uppercase">{t.about.status}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Badge = ({ label, sub }: { label: string, sub: string }) => (
    <div className="p-5 bg-white border border-slate-200/60 rounded-xl shadow-card min-w-[140px] hover:border-primary/25 transition-colors">
        <div className="text-xs font-bold text-secondary mb-2 font-mono tracking-wider">{label}</div>
        <div className="text-sm text-text-muted font-mono">{sub}</div>
    </div>
);

export default About;
