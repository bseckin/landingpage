const About = () => {
    return (
        <section className="py-20 md:py-32 bg-black border-t border-white/5">
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                {/* Text Content */}
                <div className="order-2 lg:order-1">
                    <div className="flex items-center gap-4 mb-8">
                        <span className="text-primary text-5xl font-mono font-light">{'//'}</span>
                        <h2 className="text-3xl md:text-5xl font-mono font-bold text-primary tracking-widest uppercase">WHO_AM_I</h2>
                    </div>

                    <p className="text-lg md:text-xl text-text-secondary leading-relaxed font-sans mb-12 max-w-lg">
                        Die Brücke zwischen Betriebswirtschaft und IT. Ich verstehe nicht nur Code, sondern Ihre Zahlen. Ich baue keine technischen Spielereien, sondern nützliche Lösungen für Ihr Wachstum.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Badge label="CODE" sub="Full Stack" />
                        <Badge label="TERM" sub="n8n Expert" />
                    </div>
                </div>

                {/* Profile Visual */}
                <div className="relative order-1 lg:order-2">
                    <div className="aspect-square w-full max-w-[500px] mx-auto bg-surface/5 border border-white/5 relative flex items-center justify-center">
                        {/* Corner Accents */}
                        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary" />
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-primary" />

                        <div className="text-6xl font-bold font-mono text-white/5 select-none hover:text-white/10 transition-colors">ME</div>

                        <div className="absolute bottom-6 right-6 px-4 py-2 bg-black border border-primary rounded-full flex items-center gap-3 shadow-[0_0_15px_rgba(0,255,163,0.15)]">
                            <span className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_5px_#00ffa3]" />
                            <span className="text-primary text-xs font-mono tracking-widest uppercase">STATUS: DEPLOYING</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Badge = ({ label, sub }: { label: string, sub: string }) => (
    <div className="p-5 bg-surface/5 border border-white/5 min-w-[140px] hover:border-primary/30 transition-colors">
        <div className="text-xs font-bold text-secondary mb-2 font-mono tracking-wider">{label}</div>
        <div className="text-sm text-text-muted font-mono">{sub}</div>
    </div>
);

export default About;
