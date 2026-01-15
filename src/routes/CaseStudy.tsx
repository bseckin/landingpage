import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader } from 'lucide-react';
import { motion } from 'framer-motion';

type CaseStudyData = {
    title: string;
    client: string;
    summary: string;
    image: string;
    content: string; // HTML content from Rich Text Editor
};

const CaseStudy = () => {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<CaseStudyData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const loadCaseStudy = async () => {
            try {
                // Dynamically import the JSON content
                // Note: In a real build, we need to ensure these files are included in the bundle or fetched via API.
                // For this static setup with glob imports, we might need a different approach if we want fully dynamic routing without a build step for new content.
                // However, for now, we'll try to fetch it from the content directory assuming it's served or imported.

                // Strategy: Try to import heavily relies on Vite's glob import or dynamic import.
                // Since `id` is dynamic, we can't use a simple `import`.

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
        <div className="min-h-screen bg-black flex items-center justify-center text-primary">
            <Loader className="animate-spin w-8 h-8" />
        </div>
    );

    if (error || !data) return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-6 text-center">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-gray-400 mb-8">Fallstudie nicht gefunden.</p>
            <Link to="/" className="text-primary hover:underline">Zurück zur Startseite</Link>
        </div>
    );

    return (
        <main className="bg-black min-h-screen text-white selection:bg-primary selection:text-black">
            {/* Hero Section */}
            <section className="relative h-[60vh] md:h-[70vh] flex flex-col justify-end pb-20 border-b border-white/5 overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    {data.image && (
                        <img
                            src={data.image}
                            alt={data.title}
                            className="w-full h-full object-cover opacity-40 grayscale"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <Link to="/#case-studies" className="inline-flex items-center gap-2 text-sm font-mono text-primary mb-8 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" /> ZURÜCK ZUR ÜBERSICHT
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="inline-block px-3 py-1 bg-white/10 border border-white/10 rounded-full text-secondary text-xs font-bold font-sans mb-6 tracking-wide backdrop-blur-sm">
                            {data.client}
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl">
                            {data.title}
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 md:py-32">
                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Sidebar / Context */}
                    <div className="lg:col-span-4 space-y-12">
                        <div>
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Zusammenfassung</h3>
                            <p className="text-lg text-text-secondary leading-relaxed">
                                {data.summary}
                            </p>
                        </div>

                        <div className="p-8 bg-surface/20 rounded-2xl border border-white/5">
                            <h4 className="text-white font-bold mb-4">Interessiert an ähnlichen Ergebnissen?</h4>
                            <Link to="/#contact" className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 transition-all">
                                Termin vereinbaren
                            </Link>
                        </div>
                    </div>

                    {/* Main Content (Rich Text) */}
                    <article className="lg:col-span-8 prose prose-invert prose-lg max-w-none">
                        <style>{`
                            .prose h1, .prose h2, .prose h3 { color: white; font-family: 'Inter', sans-serif; font-weight: 700; }
                            .prose h2 { margin-top: 2em; margin-bottom: 1em; border-left: 2px solid #00ffa3; padding-left: 1rem; }
                            .prose p { color: #aaa; line-height: 1.8; }
                            .prose strong { color: white; }
                            .prose ul li::marker { color: #00ffa3; }
                            .prose a { color: #00ffa3; text-decoration: none; border-bottom: 1px solid rgba(0,255,163, 0.3); transition: border-color 0.2s; }
                            .prose a:hover { border-bottom-color: #00ffa3; }
                            .prose blockquote { border-left-color: #00ffa3; color: white; font-style: italic; background: rgba(255,255,255,0.03); padding: 1rem 1.5rem; border-radius: 0 0.5rem 0.5rem 0; }
                        `}</style>
                        <div dangerouslySetInnerHTML={{ __html: data.content }} />
                    </article>
                </div>
            </section>

            {/* Next Steps / Footer CTA is handled by the global footer, but we might want a specific CTA here too */}
        </main>
    );
};

export default CaseStudy;
