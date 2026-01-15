import problemContent from '../content/problem.json';

const ProblemGrid = () => {
    return (
        <section className="py-20 md:py-32 bg-black relative border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="mb-16 md:mb-24 text-center md:text-left">
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6 font-sans">
                        {problemContent.headline}
                    </h2>
                    <p className="text-text-secondary max-w-2xl font-sans text-lg leading-relaxed">
                        {problemContent.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                    {problemContent.cards.map((card, index) => (
                        <ErrorCard
                            key={index}
                            tag={card.tag}
                            title={card.title}
                            desc={card.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

const ErrorCard = ({ tag, title, desc }: { tag: string, title: string, desc: string }) => (
    <div className="group relative p-8 md:p-10 bg-surface/20 border border-white/5 hover:border-primary/30 hover:bg-surface/40 transition-all duration-300 rounded-2xl">
        <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-secondary text-xs font-bold font-sans mb-6 tracking-wide">
            {tag}
        </div>
        <h3 className="text-2xl font-bold text-white mb-4 font-sans">{title}</h3>
        <p className="text-text-secondary leading-relaxed font-sans text-base">
            {desc}
        </p>
    </div>
);

export default ProblemGrid;
