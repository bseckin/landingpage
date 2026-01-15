import { useState, useEffect } from 'react';
import { Save, Loader, AlertCircle, CheckCircle, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import RichTextEditor from '../components/RichTextEditor';

const SECTIONS = [
    { id: 'hero.json', label: 'Startseite (Hero)' },
    { id: 'services.json', label: 'Services' },
    { id: 'about.json', label: 'Über Mich' },
    { id: 'process.json', label: 'Prozess' },
    { id: 'footer.json', label: 'Footer' }
];

const MODES = {
    SECTIONS: 'sections',
    CASE_STUDIES: 'case-studies'
};

export default function Admin() {
    const [mode, setMode] = useState(MODES.SECTIONS);
    const [activeFile, setActiveFile] = useState(SECTIONS[0].id); // For Sections Mode

    // Case Study State
    const [caseStudies, setCaseStudies] = useState<string[]>([]);
    const [activeCaseStudy, setActiveCaseStudy] = useState<string | null>(null); // path or filename
    const [isNewCaseStudy, setIsNewCaseStudy] = useState(false);

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null, msg: string }>({ type: null, msg: '' });

    useEffect(() => {
        if (mode === MODES.SECTIONS) {
            fetchFile(activeFile);
        } else if (mode === MODES.CASE_STUDIES) {
            fetchCaseStudiesList();
            setData(null);
            setActiveCaseStudy(null);
        }
    }, [mode, activeFile]);

    // Fetch Content (Generic)
    const fetchFile = async (filename: string) => {
        setLoading(true);
        setStatus({ type: null, msg: '' });
        try {
            const res = await fetch(`http://localhost:3001/api/${filename}`);
            if (!res.ok) throw new Error('Failed to load');
            const json = await res.json();
            setData(json);
        } catch (err) {
            console.error(err);
            setStatus({ type: 'error', msg: 'Fehler beim Laden' });
        } finally {
            setLoading(false);
        }
    };

    // Case Study Specifics
    const fetchCaseStudiesList = async () => {
        try {
            const res = await fetch('http://localhost:3001/api/list/case-studies');
            if (res.ok) {
                const list = await res.json();
                setCaseStudies(list);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const loadCaseStudy = (filename: string) => {
        setActiveCaseStudy(filename);
        setIsNewCaseStudy(false);
        fetchFile(`case-studies/${filename}`);
    };

    const createNewCaseStudy = () => {
        setActiveCaseStudy('new-case-study');
        setIsNewCaseStudy(true);
        setData({
            title: 'Neue Fallstudie',
            client: '',
            summary: '',
            image: '',
            content: '<h1>Ergebnis</h1><p>Beschreiben Sie hier das Ergebnis...</p>'
        });
    };

    const handleDeleteCaseStudy = async (filename: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!window.confirm(`Wirklich löschen: ${filename}?`)) return;

        try {
            const res = await fetch(`http://localhost:3001/api/case-studies/${filename}`, { method: 'DELETE' });
            if (res.ok) {
                fetchCaseStudiesList();
                if (activeCaseStudy === filename) {
                    setActiveCaseStudy(null);
                    setData(null);
                }
            }
        } catch (e) { console.error(e); }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            let filename = activeFile;

            if (mode === MODES.CASE_STUDIES) {
                if (!activeCaseStudy) return;

                // If new, generate filename from title
                if (isNewCaseStudy) {
                    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                    filename = `case-studies/${slug}`;
                } else {
                    filename = `case-studies/${activeCaseStudy}`;
                }
            }

            const res = await fetch(`http://localhost:3001/api/${filename}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!res.ok) throw new Error('Failed to save');

            setStatus({ type: 'success', msg: 'Gespeichert!' });

            if (mode === MODES.CASE_STUDIES) {
                fetchCaseStudiesList();
                if (isNewCaseStudy) {
                    setIsNewCaseStudy(false);
                    // Update active ID logic if needed, but simple re-list works for now
                    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                    setActiveCaseStudy(slug);
                }
            }

            setTimeout(() => setStatus({ type: null, msg: '' }), 3000);
        } catch (err) {
            setStatus({ type: 'error', msg: 'Fehler beim Speichern' });
        } finally {
            setSaving(false);
        }
    };

    const updateField = (key: string, value: any) => {
        setData((prev: any) => ({ ...prev, [key]: value }));
    };

    // Render Fields Logic
    const renderFields = (obj: any) => {
        if (!obj) return null;

        // Special Layout for Case Studies
        if (mode === MODES.CASE_STUDIES) {
            return (
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Titel</label>
                            <input type="text" className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none"
                                value={obj.title || ''} onChange={e => updateField('title', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Kunde</label>
                            <input type="text" className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none"
                                value={obj.client || ''} onChange={e => updateField('client', e.target.value)} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Titelbild URL</label>
                        <input type="text" className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none"
                            value={obj.image || ''} onChange={e => updateField('image', e.target.value)} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Kurzfassung</label>
                        <textarea className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none h-24"
                            value={obj.summary || ''} onChange={e => updateField('summary', e.target.value)} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-primary mb-2">Inhalt (Rich Text)</label>
                        <RichTextEditor value={obj.content || ''} onChange={val => updateField('content', val)} />
                    </div>
                </div>
            )
        }

        // Default Sections Render Logic
        return Object.keys(obj).map(key => {
            const val = obj[key];
            if (Array.isArray(val) || (typeof val === 'object' && val !== null)) {
                return (
                    <div key={key} className="mb-6">
                        <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">{key} (JSON / Liste)</label>
                        <textarea
                            className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white font-mono text-sm h-48 focus:border-primary outline-none"
                            value={JSON.stringify(val, null, 2)}
                            onChange={(e) => {
                                try {
                                    updateField(key, JSON.parse(e.target.value));
                                } catch (e) { console.warn("Invalid JSON"); }
                            }}
                        />
                    </div>
                );
            }
            const isLongText = String(val).length > 60 || key === 'headline' || key === 'description' || key === 'subHeadline';
            return (
                <div key={key} className="mb-6">
                    <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">{key}</label>
                    {isLongText ? (
                        <textarea className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none min-h-[100px]"
                            value={val} onChange={(e) => updateField(key, e.target.value)} />
                    ) : (
                        <input type="text" className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none"
                            value={val} onChange={(e) => updateField(key, e.target.value)} />
                    )}
                </div>
            );
        });
    };

    return (
        <div className="min-h-screen bg-black text-white flex">
            {/* Sidebar */}
            <div className="w-64 border-r border-white/10 bg-surface/50 p-6 flex flex-col overflow-y-auto h-screen sticky top-0">
                <h2 className="text-xl font-bold mb-8 text-primary">Content Manager</h2>

                {/* Mode Switcher */}
                <div className="flex gap-2 mb-6 p-1 bg-white/5 rounded-lg">
                    <button onClick={() => setMode(MODES.SECTIONS)}
                        className={`flex-1 py-1 px-2 text-sm rounded ${mode === MODES.SECTIONS ? 'bg-primary text-black font-bold' : 'text-gray-400 hover:text-white'}`}>
                        Seiten
                    </button>
                    <button onClick={() => setMode(MODES.CASE_STUDIES)}
                        className={`flex-1 py-1 px-2 text-sm rounded ${mode === MODES.CASE_STUDIES ? 'bg-primary text-black font-bold' : 'text-gray-400 hover:text-white'}`}>
                        Fallstudien
                    </button>
                </div>

                {/* Sections List */}
                {mode === MODES.SECTIONS && (
                    <div className="space-y-2">
                        {SECTIONS.map(file => (
                            <button
                                key={file.id}
                                onClick={() => setActiveFile(file.id)}
                                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${activeFile === file.id
                                    ? 'bg-primary/20 text-primary border border-primary/20'
                                    : 'hover:bg-white/5 text-gray-400'
                                    }`}
                            >
                                {file.label}
                            </button>
                        ))}
                    </div>
                )}

                {/* Case Studies List */}
                {mode === MODES.CASE_STUDIES && (
                    <div className="space-y-2">
                        <button onClick={createNewCaseStudy} className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-2 rounded-lg mb-4 transition-all">
                            <Plus className="w-4 h-4" /> Neu
                        </button>

                        {caseStudies.length === 0 && <p className="text-gray-500 text-sm text-center">Keine Fallstudien</p>}

                        {caseStudies.map(slug => (
                            <div key={slug} className="group relative">
                                <button
                                    onClick={() => loadCaseStudy(slug)}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${activeCaseStudy === slug
                                        ? 'bg-primary/20 text-primary border border-primary/20'
                                        : 'hover:bg-white/5 text-gray-400'
                                        }`}
                                >
                                    <span className="truncate block w-4/5">{slug}</span>
                                </button>
                                <button onClick={(e) => handleDeleteCaseStudy(slug, e)}
                                    className="absolute right-2 top-3 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-auto pt-6 border-t border-white/10">
                    <p className="text-xs text-gray-500">
                        Local Server: <span className="text-green-500">Required (Port 3001)</span>
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-10 overflow-auto">
                <div className="max-w-4xl mx-auto pb-20">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            {mode === MODES.CASE_STUDIES && activeCaseStudy && (
                                <button onClick={() => { setActiveCaseStudy(null); setData(null); }} className="text-gray-500 hover:text-white flex items-center gap-2 mb-2 text-sm">
                                    <ArrowLeft className="w-4 h-4" /> Zurück zur Liste
                                </button>
                            )}
                            <h1 className="text-3xl font-bold mb-2">
                                {mode === MODES.SECTIONS
                                    ? SECTIONS.find(f => f.id === activeFile)?.label
                                    : (isNewCaseStudy ? 'Neue Fallstudie erstellen' : (data?.title || activeCaseStudy || 'Wähle eine Fallstudie'))
                                }
                            </h1>
                            <p className="text-gray-400 text-sm font-mono">
                                {mode === MODES.SECTIONS ? `src/content/${activeFile}` : (activeCaseStudy ? `src/content/case-studies/${activeCaseStudy}.json` : 'Liste')}
                            </p>
                        </div>

                        {data && (
                            <button
                                onClick={handleSave}
                                disabled={saving || loading}
                                className="flex items-center gap-2 bg-primary text-black px-6 py-3 rounded-lg font-bold hover:bg-primary/90 disabled:opacity-50 transition-all"
                            >
                                {saving ? <Loader className="animate-spin w-5 h-5" /> : <Save className="w-5 h-5" />}
                                {saving ? 'Speichert...' : 'Speichern'}
                            </button>
                        )}
                    </div>

                    {/* Status Message */}
                    {status.msg && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-4 rounded-lg mb-8 flex items-center gap-3 ${status.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
                                }`}
                        >
                            {status.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                            {status.msg}
                        </motion.div>
                    )}

                    {/* Editor Form */}
                    {loading ? (
                        <div className="flex items-center justify-center h-64 text-gray-500 gap-2">
                            <Loader className="animate-spin" /> Lädt Inhalte...
                        </div>
                    ) : (
                        data ? (
                            <div className="bg-surface/30 p-8 rounded-2xl border border-white/5">
                                {renderFields(data)}
                            </div>
                        ) : (
                            mode === MODES.CASE_STUDIES && !isNewCaseStudy && (
                                <div className="flex flex-col items-center justify-center h-64 text-gray-500 border-2 border-dashed border-white/10 rounded-2xl">
                                    <p>Wähle eine Fallstudie aus der Leiste links oder erstelle eine neue.</p>
                                </div>
                            )
                        )
                    )}

                </div>
            </div>
        </div>
    );
}
