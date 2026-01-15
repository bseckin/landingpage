import { useLanguage } from '../context/LanguageContext';

const Services = () => {
    const { t } = useLanguage();
    return (
        <section className="py-20 md:py-32 bg-[#080808] relative border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="mb-16 md:mb-24 text-center md:text-left">
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6 font-sans">
                        {t.services.headline}
                    </h2>
                    <p className="text-text-secondary max-w-xl font-sans text-lg leading-relaxed">
                        {t.services.sub}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                    {t.services.cards.map((card, index) => (
                        <ServiceCard
                            key={index}
                            tag={card.tag}
                            title={card.title}
                            desc={card.desc}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

const ServiceCard = ({ tag, title, desc }: { tag: string, title: string, desc: string }) => (
    <div className="group p-8 md:p-10 bg-surface/20 border border-white/5 hover:border-primary/30 hover:bg-surface/30 transition-all duration-300 rounded-2xl">
        <div className="text-xs font-bold font-sans text-secondary/80 mb-8 block tracking-wider">{tag}</div>
        <h3 className="text-2xl font-bold text-white mb-4 font-sans">{title}</h3>
        <p className="text-text-secondary leading-relaxed font-sans text-base">
            {desc}
        </p>
    </div>
);

export default Services;
