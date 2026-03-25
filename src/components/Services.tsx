import { useLanguage } from '../context/LanguageContext';
import { Link, Bot, ShieldCheck, type LucideIcon } from 'lucide-react';
import { SectionReveal, StaggerItem, StaggerReveal } from './SectionReveal';

const Services = () => {
    const { t } = useLanguage();

    const icons = [Link, Bot, ShieldCheck];

    return (
        <section className="py-20 md:py-32 relative border-t border-slate-200/80">
            <div className="container mx-auto px-6">
                <SectionReveal className="mb-20">
                    <div className="max-w-3xl">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-12 font-sans">
                            {t.services.headline}
                        </h2>

                        <div className="mb-8">
                            <span className="text-secondary/90 font-mono text-sm tracking-wider uppercase mb-3 block">
                                Prinzip
                            </span>
                            <p className="text-xl md:text-2xl font-medium text-slate-800 leading-relaxed max-w-2xl border-l-2 border-secondary/35 pl-6">
                                "{t.services.principle}"
                            </p>
                        </div>

                        <p className="text-text-secondary text-lg leading-relaxed max-w-2xl font-sans">
                            {t.services.sub}
                        </p>
                    </div>
                </SectionReveal>

                <StaggerReveal className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                    {t.services.cards.map((card, index) => (
                        <StaggerItem key={index}>
                            <ServiceCard
                                tag={card.tag}
                                title={card.title}
                                desc={card.desc}
                                Icon={icons[index]}
                            />
                        </StaggerItem>
                    ))}
                </StaggerReveal>
            </div>
        </section>
    );
};

const ServiceCard = ({ tag, title, desc, Icon }: { tag: string, title: string, desc: string, Icon: LucideIcon }) => (
    <div className="group relative p-10 md:p-12 bg-white border border-slate-200/60 rounded-xl shadow-card overflow-hidden transition-all duration-300 hover:border-slate-300/90 hover:shadow-glow">
        <div className="relative z-10 flex flex-col items-center text-center">
            <div className="mb-6 p-4 bg-teal-50 rounded-full text-secondary/70 group-hover:text-secondary transition-colors duration-300">
                <Icon className="w-8 h-8" strokeWidth={1.5} />
            </div>

            <div className="text-xs font-bold font-sans text-indigo-600/90 mb-4 block tracking-wider">{tag}</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 font-sans">{title}</h3>
            <p className="text-text-secondary leading-relaxed font-sans text-base max-w-sm mx-auto">
                {desc}
            </p>
        </div>
    </div>
);

export default Services;
