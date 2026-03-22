import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const Footer = () => {
    const { t } = useLanguage();
    const [status, setStatus] = useState<Status>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setStatus('success');
            } else {
                const errorData = await response.json().catch(() => ({}));
                console.error('Submission failed details:', errorData);
                throw new Error(errorData.error || 'Failed to send');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    return (
        <footer className="py-20 border-t border-slate-200/80 relative overflow-hidden bg-[#f8fafc]" id="contact">
            <div className="absolute inset-0 bg-mesh-page opacity-60 pointer-events-none" aria-hidden />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">

                    <div>
                        <h2 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight mb-8 font-sans">
                            {t.footer.headline}
                        </h2>
                        <p className="text-xl text-text-secondary mb-12 max-w-md font-sans leading-relaxed">
                            {t.footer.text}
                        </p>

                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white border border-slate-200/80 shadow-sm flex items-center justify-center">
                                    <span className="w-2 h-2 bg-secondary rounded-full animate-pulse shadow-[0_0_8px_rgba(20,184,166,0.55)]" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-secondary font-sans tracking-wider mb-1">{t.footer.location.label}</div>
                                    <div className="text-slate-900 font-sans">{t.footer.location.value}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white border border-slate-200/80 shadow-sm flex items-center justify-center">
                                    <div className="w-2 h-2 bg-text-muted rounded-full" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-secondary font-sans tracking-wider mb-1">{t.footer.timezone.label}</div>
                                    <div className="text-slate-900 font-sans">{t.footer.timezone.value}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200/60 p-8 md:p-10 rounded-xl shadow-card relative">
                        {status === 'success' ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-12">
                                <div className="w-16 h-16 rounded-full bg-teal-50 text-secondary flex items-center justify-center mb-6 border border-teal-100">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">{t.footer.form.successHeadline}</h3>
                                <p className="text-text-secondary">{t.footer.form.successText}</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-xl font-bold text-slate-900 font-sans">{t.footer.form.newMessage}</h3>
                                    <div className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_6px_rgba(20,184,166,0.5)]" />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-xs font-bold text-secondary tracking-widest uppercase font-sans ml-1">
                                        {t.footer.form.name}
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className="w-full bg-slate-50 border border-slate-200/80 focus:border-primary/50 text-slate-900 placeholder:text-slate-400 px-4 py-3 rounded-lg outline-none transition-all font-sans"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-xs font-bold text-secondary tracking-widest uppercase font-sans ml-1">
                                        {t.footer.form.email}
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="w-full bg-slate-50 border border-slate-200/80 focus:border-primary/50 text-slate-900 placeholder:text-slate-400 px-4 py-3 rounded-lg outline-none transition-all font-sans"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-xs font-bold text-secondary tracking-widest uppercase font-sans ml-1">
                                        {t.footer.form.message}
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={4}
                                        className="w-full bg-slate-50 border border-slate-200/80 focus:border-primary/50 text-slate-900 placeholder:text-slate-400 px-4 py-3 rounded-lg outline-none transition-all font-sans resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg transition-all font-sans shadow-[0_8px_24px_-6px_rgba(79,70,229,0.35)] hover:shadow-[0_12px_28px_-4px_rgba(79,70,229,0.45)] disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                                >
                                    {status === 'submitting' ? 'Sending...' : t.footer.ctaButton}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-20 pt-8 border-t border-slate-200/80 flex flex-col md:flex-row justify-center items-center gap-4 text-xs text-text-secondary font-sans uppercase tracking-wider">
                <div className="flex gap-8">
                    <a href="/impressum" className="hover:text-slate-900 transition-colors">Impressum</a>
                    <a href="/datenschutz" className="hover:text-slate-900 transition-colors">Datenschutz</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
