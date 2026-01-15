import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader } from 'lucide-react';

export default function CaseStudy() {
    const { id } = useParams();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(`/case-studies/${id}.json`) // Assuming Vite copies public/admin content or we use the API? 
        // actually for production/dev Vite, dynamic JSON import is tricky if not in public.
        // BUT: our json-server.js serves /api/... Let's use that for consistent fetching, 
        // OR simpler: Vite imports.
        // Given the architecture: Frontend fetches from where?
        // If "build" happens, these JSONs should probably be in public/content to be fetchable via HTTP,
        // OR we just import them via a dynamic import glob map?
        // For now, let's try the backend API for dev, but for production this needs a strategy.
        // Wait, the user wants a static site output usually? 
        // If so, we should probably read these files at build time or fetch from public.
        // Let's assume for now we fetch from the running API server (same as admin) or just fetch the file if it's in public.
        // Checking project structure: src/content/case-studies/... 
        // These are NOT in public. So `fetch('/src/content/...')` won't work in prod.
        // Dynamic import is best for Vite: import(`../content/case-studies/${id}.json`)

        const load = async () => {
            try {
                // Vite dynamic import
                const modules = import.meta.glob('../content/case-studies/*.json');
                const path = `../content/case-studies/${id}.json`;

                if (modules[path]) {
                    const mod: any = await modules[path]();
                    setData(mod.default);
                } else {
                    throw new Error("Not found");
                }
            } catch (e) {
                console.error(e);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white"><Loader className="animate-spin" /></div>;
    if (error || !data) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Fallstudie nicht gefunden.</div>;

    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-black">
            {/* Header / Nav */}
            <div className="container mx-auto px-6 py-8">
                <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Zurück zur Startseite
                </Link>
            </div>

            <article className="max-w-4xl mx-auto px-6 pb-20">
                {/* Hero Image */}
                {data.image && (
                    <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-12 border border-white/10">
                        <img src={data.image} alt={data.title} className="w-full h-full object-cover" />
                    </div>
                )}

                {/* Header Info */}
                <div className="mb-12 border-b border-white/10 pb-12">
                    <p className="text-primary tracking-wider uppercase text-sm font-bold mb-4">{data.client}</p>
                    <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">{data.title}</h1>
                    {data.summary && (
                        <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
                            {data.summary}
                        </p>
                    )}
                </div>

                {/* Rich Text Content */}
                <div className="prose prose-invert prose-lg max-w-none 
                    prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    prose-img:rounded-xl prose-img:border prose-img:border-white/10">
                    <div dangerouslySetInnerHTML={{ __html: data.content }} />
                </div>
            </article>

            {/* Footer Call to Action (Simple) */}
            <div className="border-t border-white/10 bg-surface/30 mt-20">
                <div className="container mx-auto px-6 py-20 text-center">
                    <h3 className="text-2xl font-bold mb-6">Möchten Sie ähnliche Ergebnisse erzielen?</h3>
                    <Link to="/" className="inline-block bg-primary text-black px-8 py-4 rounded-full font-bold hover:bg-white transition-all transform hover:scale-105">
                        Kontakt aufnehmen
                    </Link>
                </div>
            </div>
        </div>
    );
}
