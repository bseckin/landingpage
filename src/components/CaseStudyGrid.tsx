import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CaseStudyPreview {
    slug: string;
    title: string;
    client: string;
    summary: string;
    image: string;
}

export default function CaseStudyGrid() {
    const [studies, setStudies] = useState<CaseStudyPreview[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(3);

    useEffect(() => {
        const modules = import.meta.glob('../content/case-studies/*.json', { eager: true });
        const loadedStudies = Object.entries(modules).map(([path, mod]: [string, any]) => {
            const slug = path.split('/').pop()?.replace('.json', '') || '';
            const data = mod.default;
            return {
                slug,
                title: data.title,
                client: data.client,
                summary: data.summary,
                image: data.image
            };
        });
        setStudies(loadedStudies);

        const handleResize = () => {
            if (window.innerWidth < 768) setItemsPerPage(1);
            else if (window.innerWidth < 1024) setItemsPerPage(2);
            else setItemsPerPage(3);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const nextSlide = () => {
        if (currentIndex < studies.length - itemsPerPage) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    // Swipe Logic
    const handleDragEnd = (_: any, info: any) => {
        if (info.offset.x < -50) nextSlide();
        else if (info.offset.x > 50) prevSlide();
    };

    if (studies.length === 0) return null;

    const visibleStudies = studies.slice(currentIndex, currentIndex + itemsPerPage);
    const isCentered = studies.length <= itemsPerPage;
    const canScrollPrev = currentIndex > 0;
    const canScrollNext = currentIndex < studies.length - itemsPerPage;

    return (
        <section id="case-studies" className="py-20 bg-black border-b border-white/5 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Erfolgsgeschichten</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Sehen Sie, wie andere Unternehmen durch Automatisierung skaliert haben.
                    </p>
                </div>

                <div className="relative">
                    {/* Navigation Buttons (Desktop/Tablet) causes shift if not absolute, keep generic */}
                    {!isCentered && (
                        <>
                            <button
                                onClick={prevSlide}
                                disabled={!canScrollPrev}
                                className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-20 p-3 rounded-full bg-surface border border-white/10 text-white transition-all ${!canScrollPrev ? 'opacity-0 pointer-events-none' : 'hover:bg-white/10'}`}
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={nextSlide}
                                disabled={!canScrollNext}
                                className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-20 p-3 rounded-full bg-surface border border-white/10 text-white transition-all ${!canScrollNext ? 'opacity-0 pointer-events-none' : 'hover:bg-white/10'}`}
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </>
                    )}

                    {/* Draggable Area for Mobile */}
                    <div className="overflow-hidden px-1">
                        <motion.div
                            className={`grid gap-8 ${itemsPerPage === 1 ? 'grid-cols-1' :
                                itemsPerPage === 2 ? 'grid-cols-2' :
                                    'grid-cols-3'
                                } ${isCentered ? 'justify-center' : ''}`}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={handleDragEnd}
                        >
                            <AnimatePresence mode='popLayout'>
                                {visibleStudies.map((study) => (
                                    <motion.div
                                        key={study.slug}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                        className="h-full"
                                    >
                                        <Link to={`/case-study/${study.slug}`} className="group block h-full bg-surface/30 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all flex flex-col">
                                            {/* Image */}
                                            <div className="h-48 overflow-hidden shrink-0 relative">
                                                {study.image ? (
                                                    <img
                                                        src={study.image}
                                                        alt={study.title}
                                                        loading="lazy"
                                                        decoding="async"
                                                        width="400"
                                                        height="300"
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-white/5 flex items-center justify-center text-gray-600">Kein Bild</div>
                                                )}
                                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                            </div>

                                            {/* Content */}
                                            <div className="p-6 flex-1 flex flex-col">
                                                <p className="text-primary text-xs font-bold uppercase tracking-wider mb-2">{study.client}</p>
                                                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{study.title}</h3>
                                                <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-1">
                                                    {study.summary}
                                                </p>
                                                <span className="inline-flex items-center gap-2 text-sm font-bold text-white group-hover:gap-3 transition-all mt-auto">
                                                    Fallstudie lesen <ArrowRight className="w-4 h-4 text-primary" />
                                                </span>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </div>

                    {/* Mobile Dots Indicator */}
                    {studies.length > itemsPerPage && window.innerWidth < 768 && (
                        <div className="flex justify-center gap-2 mt-8">
                            {Array.from({ length: Math.ceil(studies.length / itemsPerPage) }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-2 h-2 rounded-full transition-colors ${i === Math.floor(currentIndex / itemsPerPage) ? 'bg-primary' : 'bg-white/20'}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
