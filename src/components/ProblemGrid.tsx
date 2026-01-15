import { useLanguage } from '../context/LanguageContext';
import { RefreshCcw, ShieldAlert, Activity, type LucideIcon } from 'lucide-react';

const ProblemGrid = () => {
    const { t } = useLanguage();

    // Expressive Metaphors:
    // 1. Loop/Grind -> RefreshCcw
    // 2. Risk/Danger -> ShieldAlert
    // 3. Chaos/Volatility -> Activity
    const icons = [RefreshCcw, ShieldAlert, Activity];

    // Subtle Symbolic Differentiation (Emojis)
    const emojis = ["⛓️", "⚠️", "🔥"];

    return (
        <section className="py-20 md:py-32 bg-[#050505] relative border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="mb-16 md:mb-24 text-center md:text-left">
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6 font-sans">
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
        // Unified "Deep Strain" Aesthetic - All cards share the same heavy, bruised look.
        <div className={`group relative p-10 bg-[#0A0A0A] border border-red-900/20 rounded-2xl overflow-hidden shadow-[inset_0_0_20px_rgba(20,0,0,0.5)] hover:border-red-900/40 transition-all duration-500`}>
            {/* Unified Distress Signal Gradient (Deep Oxide Red/Black) */}
            <div className={`absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500 bg-gradient-to-br from-red-950/40 via-[#0A0A0A] to-black`} />

            <div className="relative z-10 flex flex-col h-full">
                {/* Header: Tag + Icon */}
                <div className="flex justify-between items-start mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/30 border border-red-900/30 rounded-full text-red-200/80 text-xs font-bold font-sans tracking-wide">
                        <span>{emoji}</span>
                        <span>{tag}</span>
                    </div>
                    {/* Icon - Moved to Top Right, cohesive with Services but distinct placement */}
                    <Icon className="w-8 h-8 text-red-900/40 group-hover:text-red-900/60 transition-colors" />
                </div>

                {/* Body */}
                <div className="mt-auto">
                    <h3 className="text-2xl font-bold text-white mb-4 font-sans">{title}</h3>
                    <p className="text-text-secondary leading-relaxed font-sans text-base">
                        {desc}
                    </p>
                </div>
            </div>
        </div>
    );
};
export default ProblemGrid;
