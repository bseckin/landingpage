import { useState, useEffect } from 'react';
import { Save, Loader, AlertCircle, CheckCircle, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import RichTextEditor from '../components/RichTextEditor';

const SECTIONS = [
    { id: 'hero.json', label: 'Startseite (Hero)' },
    { id: 'services.json', label: 'Services' },
    { id: 'about.json', label: 'Über Mich' },
    { id: 'process.json', label: 'Prozess' },
    { id: 'footer.json', label: 'Footer' },
    { id: 'impressum.json', label: 'Impressum' },
    { id: 'datenschutz.json', label: 'Datenschutzerklärung' }
];

const MODES = {
    SECTIONS: 'sections',
    CASE_STUDIES: 'case-studies'
};

export default function Admin() {
    const [mode, setMode] = useState(MODES.SECTIONS);
    const [activeFile, setActiveFile] = useState(SECTIONS[0].id);

    const [caseStudies, setCaseStudies] = useState<string[]>([]);
    const [activeCaseStudy, setActiveCaseStudy] = useState<string | null>(null);
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

    const renderFields = (obj: any) => {
        if (!obj) return null;

        if (mode === MODES.CASE_STUDIES) {
            return (
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-500 mb-2">Titel</label>
                            <input type="text" className="w-full bg-white border border-slate-200/80 rounded-lg p-3 text-slate-900 focus:border-primary outline-none shadow-sm"
                                value={obj.title || ''} onChange={e => updateField('title', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-500 mb-2">Kunde</label>
                            <input type="text" className="w-full bg-white border border-slate-200/80 rounded-lg p-3 text-slate-900 focus:border-primary outline-none shadow-sm"
                                value={obj.client || ''} onChange={e => updateField('client', e.target.value)} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-500 mb-2">Titelbild URL</label>
                        <input type="text" className="w-full bg-white border border-slate-200/80 rounded-lg p-3 text-slate-900 focus:border-primary outline-none shadow-sm"
                            value={obj.image || ''} onChange={e => updateField('image', e.target.value)} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-500 mb-2">Kurzfassung</label>
                        <textarea className="w-full bg-white border border-slate-200/80 rounded-lg p-3 text-slate-900 focus:border-primary outline-none h-24 shadow-sm"
                            value={obj.summary || ''} onChange={e => updateField('summary', e.target.value)} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-primary mb-2">Inhalt (Rich Text)</label>
                        <RichTextEditor value={obj.content || ''} onChange={val => updateField('content', val)} />
                    </div>
                </div>
            )
        }

        return Object.keys(obj).map(key => {
            const val = obj[key];
            if (Array.isArray(val) || (typeof val === 'object' && val !== null)) {
                return (
                    <div key={key} className="mb-6">
                        <label className="block text-sm font-medium text-slate-500 mb-2 capitalize">{key} (JSON / Liste)</label>
                        <textarea
                            className="w-full bg-white border border-slate-200/80 rounded-lg p-3 text-slate-900 font-mono text-sm h-48 focus:border-primary outline-none shadow-sm"
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
                    <label className="block text-sm font-medium text-slate-500 mb-2 capitalize">{key}</label>
                    {isLongText ? (
                        <textarea className="w-full bg-white border border-slate-200/80 rounded-lg p-3 text-slate-900 focus:border-primary outline-none min-h-[100px] shadow-sm"
                            value={val} onChange={(e) => updateField(key, e.target.value)} />
                    ) : (
                        <input type="text" className="w-full bg-white border border-slate-200/80 rounded-lg p-3 text-slate-900 focus:border-primary outline-none shadow-sm"
                            value={val} onChange={(e) => updateField(key, e.target.value)} />
                    )}
                </div>
            );
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex">
            <div className="w-64 border-r border-slate-200/80 bg-white p-6 flex flex-col overflow-y-auto h-screen sticky top-0 shadow-sm">
                <h2 className="text-xl font-bold mb-8 text-primary">Content Manager</h2>

                <div className="flex gap-2 mb-6 p-1 bg-slate-100 rounded-lg border border-slate-200/60">
                    <button onClick={() => setMode(MODES.SECTIONS)}
                        className={`flex-1 py-1 px-2 text-sm rounded ${mode === MODES.SECTIONS ? 'bg-primary text-white font-bold shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>
                        Seiten
                    </button>
                    <button onClick={() => setMode(MODES.CASE_STUDIES)}
                        className={`flex-1 py-1 px-2 text-sm rounded ${mode === MODES.CASE_STUDIES ? 'bg-primary text-white font-bold shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>
                        Fallstudien
                    </button>
                </div>

                {mode === MODES.SECTIONS && (
                    <div className="space-y-2">
                        {SECTIONS.map(file => (
                            <button
                                key={file.id}
                                onClick={() => setActiveFile(file.id)}
                                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${activeFile === file.id
                                    ? 'bg-indigo-50 text-primary border border-primary/20'
                                    : 'hover:bg-slate-50 text-slate-600'
                                    }`}
                            >
                                {file.label}
                            </button>
                        ))}
                    </div>
                )}

                {mode === MODES.CASE_STUDIES && (
                    <div className="space-y-2">
                        <button onClick={createNewCaseStudy} className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-200/80 text-slate-800 py-2 rounded-lg mb-4 transition-all shadow-sm">
                            <Plus className="w-4 h-4" /> Neu
                        </button>

                        {caseStudies.length === 0 && <p className="text-slate-500 text-sm text-center">Keine Fallstudien</p>}

                        {caseStudies.map(slug => (
                            <div key={slug} className="group relative">
                                <button
                                    onClick={() => loadCaseStudy(slug)}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${activeCaseStudy === slug
                                        ? 'bg-indigo-50 text-primary border border-primary/20'
                                        : 'hover:bg-slate-50 text-slate-600'
                                        }`}
                                >
                                    <span className="truncate block w-4/5">{slug}</span>
                                </button>
                                <button onClick={(e) => handleDeleteCaseStudy(slug, e)}
                                    className="absolute right-2 top-3 text-slate-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-auto pt-6 border-t border-slate-200/80">
                    <p className="text-xs text-slate-500">
                        Local Server: <span className="text-secondary font-medium">Required (Port 3001)</span>
                    </p>
                </div>
            </div>

            <div className="flex-1 p-10 overflow-auto bg-[#f8fafc]">
                <div className="max-w-4xl mx-auto pb-20">

                    <div className="flex items-center justify-between mb-10">
                        <div>
                            {mode === MODES.CASE_STUDIES && activeCaseStudy && (
                                <button onClick={() => { setActiveCaseStudy(null); setData(null); }} className="text-slate-500 hover:text-slate-900 flex items-center gap-2 mb-2 text-sm">
                                    <ArrowLeft className="w-4 h-4" /> Zurück zur Liste
                                </button>
                            )}
                            <h1 className="text-3xl font-bold mb-2 text-slate-900">
                                {mode === MODES.SECTIONS
                                    ? SECTIONS.find(f => f.id === activeFile)?.label
                                    : (isNewCaseStudy ? 'Neue Fallstudie erstellen' : (data?.title || activeCaseStudy || 'Wähle eine Fallstudie'))
                                }
                            </h1>
                            <p className="text-slate-500 text-sm font-mono">
                                {mode === MODES.SECTIONS ? `src/content/${activeFile}` : (activeCaseStudy ? `src/content/case-studies/${activeCaseStudy}.json` : 'Liste')}
                            </p>
                        </div>

                        {data && (
                            <button
                                onClick={handleSave}
                                disabled={saving || loading}
                                className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary/90 disabled:opacity-50 transition-all shadow-[0_8px_24px_-6px_rgba(79,70,229,0.35)]"
                            >
                                {saving ? <Loader className="animate-spin w-5 h-5" /> : <Save className="w-5 h-5" />}
                                {saving ? 'Speichert...' : 'Speichern'}
                            </button>
                        )}
                    </div>

                    {status.msg && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-4 rounded-lg mb-8 flex items-center gap-3 ${status.type === 'success' ? 'bg-teal-50 text-teal-800 border border-teal-200/80' : 'bg-red-50 text-red-700 border border-red-200/80'
                                }`}
                        >
                            {status.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                            {status.msg}
                        </motion.div>
                    )}

                    {loading ? (
                        <div className="flex items-center justify-center h-64 text-slate-500 gap-2">
                            <Loader className="animate-spin" /> Lädt Inhalte...
                        </div>
                    ) : (
                        data ? (
                            <div className="bg-white p-8 rounded-xl border border-slate-200/60 shadow-card">
                                {renderFields(data)}
                            </div>
                        ) : (
                            mode === MODES.CASE_STUDIES && !isNewCaseStudy && (
                                <div className="flex flex-col items-center justify-center h-64 text-slate-500 border-2 border-dashed border-slate-200/80 rounded-xl bg-white">
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
