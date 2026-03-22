import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

type CaseStudy = {
    id: string;
    title: string;
    client: string;
    summary: string;
    imageUrl: string;
};

const CaseStudyGrid = () => {
    const { t } = useLanguage();
    const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
    const [loading, setLoading] = useState(true);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCaseStudies = async () => {
            try {
                const modules = import.meta.glob('../content/case-studies/*.json', { eager: true });
                const loadedStudies = Object.entries(modules).map(([path, mod]: [string, any]) => {
                    const id = path.split('/').pop()?.replace('.json', '') || '';
                    const data = mod.default;
                    return {
                        id,
                        title: data.title,
                        client: data.client,
                        summary: data.summary,
                        imageUrl: data.image
                    };
                });
                setCaseStudies(loadedStudies);
            } catch (error) {
                console.error('Failed to fetch case studies:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCaseStudies();
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const scrollAmount = container.clientWidth * 0.8;
            const newScrollLeft = direction === 'left'
                ? container.scrollLeft - scrollAmount
                : container.scrollLeft + scrollAmount;

            container.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    if (loading || caseStudies.length === 0) return null;

    const centerClass = caseStudies.length < 3 ? 'md:justify-center' : '';

    return (
        <section className="py-20 md:py-32 relative border-t border-slate-200/80" id="case-studies">
            <div className="container mx-auto px-6 mb-12 flex justify-between items-end">
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 font-sans tracking-tight">
                        {t.caseStudies.recentWork}
                    </h2>
                </div>

                <div className="hidden md:flex gap-4">
                    <button
                        onClick={() => scroll('left')}
                        className="p-3 rounded-full border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 shadow-sm transition-all disabled:opacity-30"
                        aria-label="Previous slide"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="p-3 rounded-full border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 shadow-sm transition-all disabled:opacity-30"
                        aria-label="Next slide"
                    >
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div
                ref={scrollContainerRef}
                className={`flex overflow-x-auto gap-6 px-6 pb-8 snap-x snap-mandatory scrollbar-hide ${centerClass}`}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {caseStudies.map((study) => (
                    <CaseStudyCard
                        key={study.id}
                        study={study}
                        navigate={navigate}
                        t={t}
                    />
                ))}
            </div>
        </section>
    );
};

const CaseStudyCard = ({ study, navigate, t }: { study: CaseStudy, navigate: any, t: any }) => (
    <div
        onClick={() => navigate(`/case-study/${study.id}`)}
        className="min-w-[85vw] md:min-w-[400px] bg-white border border-slate-200/60 rounded-xl overflow-hidden group hover:border-primary/40 shadow-card hover:shadow-glow transition-all cursor-pointer snap-center"
    >
        <div className="aspect-video relative overflow-hidden bg-slate-100">
            {study.imageUrl ? (
                <img
                    src={study.imageUrl}
                    alt={study.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <span className="font-mono text-sm">NO IMAGE</span>
                </div>
            )}
            <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors" />
        </div>

        <div className="p-8">
            <div className="text-secondary font-mono text-xs mb-3 tracking-wider">{study.client}</div>
            <h3 className="text-xl font-bold text-slate-900 mb-4 line-clamp-1">{study.title}</h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-8 line-clamp-3">
                {study.summary}
            </p>

            <div className="flex items-center text-slate-800 text-sm font-bold group-hover:text-primary transition-colors gap-2">
                {t.caseStudies.viewButton} <ArrowUpRight className="w-4 h-4" />
            </div>
        </div>
    </div>
);

export default CaseStudyGrid;
