import { useLanguage } from '../context/LanguageContext';
import { Link, Bot, ShieldCheck, type LucideIcon } from 'lucide-react';

const Services = () => {
    const { t } = useLanguage();

    const icons = [Link, Bot, ShieldCheck];

    return (
        <section className="py-20 md:py-32 bg-[#080808] relative border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="mb-20">
                    <div className="max-w-3xl">
                        {/* Principle / Credo */}
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 font-sans">
                            {t.services.headline}
                        </h2>

                        {/* Principle / Credo */}
                        <div className="mb-8">
                            <span className="text-secondary/90 font-mono text-sm tracking-wider uppercase mb-3 block">
                                Prinzip
                            </span>
                            <p className="text-xl md:text-2xl font-medium text-white/90 leading-relaxed max-w-2xl border-l-2 border-secondary/30 pl-6">
                                "{t.services.principle}"
                            </p>
                        </div>

                        <p className="text-text-secondary text-lg leading-relaxed max-w-2xl font-sans">
                            {t.services.sub}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                    {t.services.cards.map((card, index) => (
                        <ServiceCard
                            key={index}
                            tag={card.tag}
                            title={card.title}
                            desc={card.desc}
                            Icon={icons[index]}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

const ServiceCard = ({ tag, title, desc, Icon }: { tag: string, title: string, desc: string, Icon: LucideIcon }) => (
    <div className="group relative p-10 md:p-12 bg-white/[0.01] backdrop-blur-lg border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] hover:bg-white/[0.03] rounded-3xl overflow-hidden transition-all duration-500">
        <div className="relative z-10 flex flex-col items-center text-center">
            {/* Icon - Anchor of Stability (Top Center) */}
            <div className="mb-6 p-4 bg-white/5 rounded-full text-primary/40 group-hover:text-primary transition-colors duration-500">
                <Icon className="w-8 h-8" strokeWidth={1.5} />
            </div>

            <div className="text-xs font-bold font-sans text-secondary/80 mb-4 block tracking-wider">{tag}</div>
            <h3 className="text-2xl font-bold text-white mb-4 font-sans">{title}</h3>
            <p className="text-text-secondary leading-relaxed font-sans text-base max-w-sm mx-auto">
                {desc}
            </p>
        </div>
    </div>
);

export default Services;
