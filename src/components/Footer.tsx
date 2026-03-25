import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SectionReveal } from './SectionReveal';
import SectionWaveCanvas from './SectionWaveCanvas';

/** Kontakt-Section: gleiche Wellen-Technik wie Hero, aber ruhiger — kühle Slate-/Blau-/Teal-Palette (Vertrauen). */
const ContactSectionBackdrop = () => (
    <div className="absolute inset-0 z-0 pointer-events-none min-h-full" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-[#eef2f7] via-[#f8fafc] to-white" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_68%_at_50%_0%,rgba(148,163,184,0.2),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_78%_52%_at_10%_72%,rgba(59,130,246,0.07),transparent_52%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_72%_48%_at_90%_38%,rgba(20,184,166,0.055),transparent_50%)]" />
        <SectionWaveCanvas preset="trust" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/35 to-slate-50/30" />
        {/* Dissolve trust waves at the top edge — avoids a hard crop into the section above */}
        <div className="absolute inset-x-0 top-0 z-[2] h-[min(32vh,13rem)] bg-gradient-to-b from-[#f8fafc] via-[#f8fafc]/92 to-transparent" />
    </div>
);

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
        <footer
            className="relative isolate overflow-hidden bg-[#f8fafc] -mt-16 pt-36 pb-20 md:-mt-20 md:pt-44 md:pb-24"
            id="contact"
        >
            <ContactSectionBackdrop />
            {/* Fade from page / Process into contact backdrop — matches ProblemGrid-style handoff */}
            <div
                className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-[min(48vh,22rem)] bg-gradient-to-b from-[#f8fafc] via-[#f8fafc]/94 via-[40%] to-transparent"
                aria-hidden
            />

            <div className="container mx-auto px-6 relative z-10">
                <SectionReveal className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">

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
                </SectionReveal>
            </div>

            <SectionReveal className="relative z-10 mt-20 pt-8 border-t border-slate-200/70 flex flex-col md:flex-row justify-center items-center gap-4 text-xs text-text-secondary font-sans uppercase tracking-wider">
                <div className="flex gap-8">
                    <a href="/impressum" className="hover:text-slate-900 transition-colors">Impressum</a>
                    <a href="/datenschutz" className="hover:text-slate-900 transition-colors">Datenschutz</a>
                </div>
            </SectionReveal>
        </footer>
    );
};

export default Footer;
