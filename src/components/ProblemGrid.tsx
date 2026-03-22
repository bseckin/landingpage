import { useLanguage } from '../context/LanguageContext';
import { RefreshCcw, ShieldAlert, Activity, type LucideIcon } from 'lucide-react';

const ProblemGrid = () => {
    const { t } = useLanguage();

    const icons = [RefreshCcw, ShieldAlert, Activity];

    const emojis = ["⛓️", "⚠️", "🔥"];

    return (
        <section className="py-20 md:py-32 relative border-t border-slate-200/80">
            <div className="container mx-auto px-6">
                <div className="mb-16 md:mb-24 text-center md:text-left">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6 font-sans">
                        {t.problem.headline}
                    </h2>
                    <p className="text-text-secondary max-w-2xl font-sans text-lg leading-relaxed">
                        {t.problem.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                    {t.problem.cards.map((card, index) => (
                        <ErrorCard
                            key={index}
                            tag={card.tag}
                            emoji={emojis[index]}
                            title={card.title}
                            desc={card.description}
                            Icon={icons[index]}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

const ErrorCard = ({ tag, emoji, title, desc, Icon }: { tag: string, emoji: string, title: string, desc: string, Icon: LucideIcon }) => {
    return (
        <div className="group relative p-10 bg-white border border-slate-200/60 rounded-xl shadow-card overflow-hidden hover:border-slate-300/80 hover:shadow-glow transition-all duration-300">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-teal-50/50 via-transparent to-indigo-50/40 pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-50 border border-rose-100/80 rounded-full text-rose-800/90 text-xs font-bold font-sans tracking-wide">
                        <span>{emoji}</span>
                        <span>{tag}</span>
                    </div>
                    <Icon className="w-8 h-8 text-slate-400 group-hover:text-secondary transition-colors" />
                </div>

                <div className="mt-auto">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 font-sans">{title}</h3>
                    <p className="text-text-secondary leading-relaxed font-sans text-base">
                        {desc}
                    </p>
                </div>
            </div>
        </div>
    );
};
export default ProblemGrid;
