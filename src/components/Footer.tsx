import footerContent from '../content/footer.json';

const Footer = () => {
    return (
        <footer className="py-24 md:py-32 bg-black border-t border-white/5">
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                {/* Contact Info */}
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6 font-sans">
                        Der erste Schritt raus aus dem Chaos.
                    </h2>

                    <p className="text-lg text-text-secondary font-sans mb-12 max-w-md leading-relaxed">
                        Lassen Sie uns sprechen. Unverbindlich. Auf Augenhöhe. Finden wir heraus, ob wir zusammenpassen.
                    </p>

                    <div className="space-y-6 font-sans text-sm md:text-base text-text-muted border-l-2 border-primary/20 pl-6">
                        <div>
                            <span className="text-white font-bold block text-xs mb-1 tracking-wider uppercase">Standort</span>
                            Chiang Mai, TH
                        </div>
                        <div>
                            <span className="text-white font-bold block text-xs mb-1 tracking-wider uppercase">Zeitzone</span>
                            GMT+7
                        </div>
                    </div>
                </div>

                {/* Clean Form */}
                <div className="p-8 md:p-12 bg-surface/10 border border-white/5 rounded-3xl backdrop-blur-sm">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-text-secondary mb-2 uppercase tracking-wider font-sans">Ihre Email</label>
                            <input
                                type="email"
                                placeholder="name@firma.de"
                                className="w-full h-14 bg-black/30 border border-white/10 px-6 text-white font-sans placeholder:text-white/20 focus:border-primary focus:ring-1 focus:ring-primary/50 focus:outline-none transition-all rounded-xl"
                            />
                        </div>
                        <button className="w-full h-14 bg-primary text-black font-bold text-lg hover:bg-primary/90 transition-all font-sans tracking-wide rounded-xl shadow-lg hover:shadow-primary/20">
                            {footerContent.ctaButton}
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
