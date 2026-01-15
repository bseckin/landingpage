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

    // Center alignment class if fewer than 3 items
    const centerClass = caseStudies.length < 3 ? 'md:justify-center' : '';

    return (
        <section className="py-20 md:py-32 bg-[#050505] relative border-t border-white/5" id="case-studies">
            <div className="container mx-auto px-6 mb-12 flex justify-between items-end">
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-sans tracking-tight">
                        {t.caseStudies.recentWork}
                    </h2>
                </div>

                {/* Desktop Navigation Arrows */}
                <div className="hidden md:flex gap-4">
                    <button
                        onClick={() => scroll('left')}
                        className="p-3 rounded-full border border-white/10 hover:bg-white/10 text-white transition-all disabled:opacity-30"
                        aria-label="Previous slide"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="p-3 rounded-full border border-white/10 hover:bg-white/10 text-white transition-all disabled:opacity-30"
                        aria-label="Next slide"
                    >
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Carousel Container */}
            <div
                ref={scrollContainerRef}
                className={`flex overflow-x-auto gap-6 px-6 pb-8 snap-x snap-mandatory scrollbar-hide ${centerClass}`}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {caseStudies.map((study) => (
                    <div
                        key={study.id}
                        onClick={() => navigate(`/case-study/${study.id}`)}
                        className="min-w-[85vw] md:min-w-[400px] bg-surface/10 border border-white/5 rounded-2xl overflow-hidden group hover:border-primary/50 transition-all cursor-pointer snap-center"
                    >
                        {/* Image Container */}
                        <div className="aspect-video relative overflow-hidden bg-surface/20">
                            {study.imageUrl ? (
                                <img
                                    src={study.imageUrl}
                                    alt={study.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    loading="lazy"
                                    decoding="async"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-white/20">
                                    <span className="font-mono text-sm">NO IMAGE</span>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                        </div>

                        {/* Content */}
                        <div className="p-8">
                            <div className="text-secondary font-mono text-xs mb-3 tracking-wider">{study.client}</div>
                            <h3 className="text-xl font-bold text-white mb-4 line-clamp-1">{study.title}</h3>
                            <p className="text-text-secondary text-sm leading-relaxed mb-8 line-clamp-3">
                                {study.summary}
                            </p>

                            <div className="flex items-center text-white text-sm font-bold group-hover:text-primary transition-colors gap-2">
                                {t.caseStudies.viewButton} <ArrowUpRight className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CaseStudyGrid;
