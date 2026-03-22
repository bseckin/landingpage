import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader } from 'lucide-react';
import { motion } from 'framer-motion';

type CaseStudyData = {
    title: string;
    client: string;
    summary: string;
    image: string;
    content: string;
};

const CaseStudy = () => {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<CaseStudyData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const loadCaseStudy = async () => {
            try {
                const modules = import.meta.glob('../content/case-studies/*.json');
                const path = `../content/case-studies/${id}.json`;

                if (modules[path]) {
                    const mod: any = await modules[path]();
                    setData(mod.default);
                } else {
                    throw new Error('Case Study not found');
                }
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadCaseStudy();
        }
    }, [id]);

    if (loading) return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center text-primary">
            <Loader className="animate-spin w-8 h-8" />
        </div>
    );

    if (error || !data) return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-900 p-6 text-center">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-slate-500 mb-8">Fallstudie nicht gefunden.</p>
            <Link to="/" className="text-primary hover:underline font-medium">Zurück zur Startseite</Link>
        </div>
    );

    return (
        <main className="bg-slate-50 min-h-screen text-slate-900 selection:bg-primary selection:text-white">
            <section className="relative h-[60vh] md:h-[70vh] flex flex-col justify-end pb-20 border-b border-slate-200/80 overflow-hidden bg-white">
                <div className="absolute inset-0 z-0">
                    {data.image && (
                        <img
                            src={data.image}
                            alt={data.title}
                            className="w-full h-full object-cover opacity-50 grayscale-[30%]"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/70 to-transparent" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <Link to="/#case-studies" className="inline-flex items-center gap-2 text-sm font-mono text-primary mb-8 hover:text-primary/80 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> ZURÜCK ZUR ÜBERSICHT
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="inline-block px-3 py-1 bg-teal-50 border border-teal-100/80 rounded-full text-secondary text-xs font-bold font-sans mb-6 tracking-wide">
                            {data.client}
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl text-slate-900">
                            {data.title}
                        </h1>
                    </motion.div>
                </div>
            </section>

            <section className="py-20 md:py-32">
                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-4 space-y-12">
                        <div>
                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Zusammenfassung</h3>
                            <p className="text-lg text-text-secondary leading-relaxed">
                                {data.summary}
                            </p>
                        </div>

                        <div className="p-8 bg-white rounded-xl border border-slate-200/60 shadow-card">
                            <h4 className="text-slate-900 font-bold mb-4">Interessiert an ähnlichen Ergebnissen?</h4>
                            <Link to="/#contact" className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all shadow-[0_8px_24px_-6px_rgba(79,70,229,0.35)]">
                                Termin vereinbaren
                            </Link>
                        </div>
                    </div>

                    <article className="lg:col-span-8 prose prose-slate prose-lg max-w-none">
                        <style>{`
                            .prose h1, .prose h2, .prose h3 { color: #0f172a; font-family: 'Inter', sans-serif; font-weight: 700; }
                            .prose h2 { margin-top: 2em; margin-bottom: 1em; border-left: 2px solid #4f46e5; padding-left: 1rem; }
                            .prose p { color: #64748b; line-height: 1.8; }
                            .prose strong { color: #0f172a; }
                            .prose ul li::marker { color: #14b8a6; }
                            .prose a { color: #4f46e5; text-decoration: none; border-bottom: 1px solid rgba(79, 70, 229, 0.25); transition: border-color 0.2s; }
                            .prose a:hover { border-bottom-color: #4f46e5; }
                            .prose blockquote { border-left-color: #14b8a6; color: #334155; font-style: italic; background: #f8fafc; padding: 1rem 1.5rem; border-radius: 0 0.5rem 0.5rem 0; }
                        `}</style>
                        <div dangerouslySetInnerHTML={{ __html: data.content }} />
                    </article>
                </div>
            </section>
        </main>
    );
};

export default CaseStudy;
