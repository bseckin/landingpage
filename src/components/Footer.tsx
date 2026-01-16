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
            // Reset to idle after error so user can try again
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    return (
        <footer className="py-20 bg-black border-t border-white/5 relative overflow-hidden" id="contact">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-20" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">

                    {/* Left Column: CTA */}
                    <div>
                        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-8 font-sans">
                            {t.footer.headline}
                        </h2>
                        <p className="text-xl text-text-secondary mb-12 max-w-md font-sans leading-relaxed">
                            {t.footer.text}
                        </p>

                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-surface/20 border border-white/10 flex items-center justify-center">
                                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_#00ffa3]" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-secondary font-sans tracking-wider mb-1">{t.footer.location.label}</div>
                                    <div className="text-white font-sans">{t.footer.location.value}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-surface/20 border border-white/10 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-text-muted rounded-full" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-secondary font-sans tracking-wider mb-1">{t.footer.timezone.label}</div>
                                    <div className="text-white font-sans">{t.footer.timezone.value}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Contact Form (Simulated) */}
                    <div className="bg-surface/10 border border-white/5 p-8 md:p-10 rounded-2xl relative">
                        {status === 'success' ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-12">
                                <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">{t.footer.form.successHeadline}</h3>
                                <p className="text-text-secondary">{t.footer.form.successText}</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-xl font-bold text-white font-sans">{t.footer.form.newMessage}</h3>
                                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_5px_#00ffa3]" />
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
                                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 text-white px-4 py-3 rounded-lg outline-none transition-all font-sans"
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
                                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 text-white px-4 py-3 rounded-lg outline-none transition-all font-sans"
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
                                        className="w-full bg-black/50 border border-white/10 focus:border-primary/50 text-white px-4 py-3 rounded-lg outline-none transition-all font-sans resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-lg transition-all font-sans shadow-[0_0_20px_rgba(0,255,163,0.2)] hover:shadow-[0_0_30px_rgba(0,255,163,0.4)] disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                                >
                                    {status === 'submitting' ? 'Sending...' : t.footer.ctaButton}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            {/* Legal Footer */}
            <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-center items-center gap-4 text-xs text-text-secondary font-sans uppercase tracking-wider">
                <div className="flex gap-8">
                    <a href="/impressum" className="hover:text-white transition-colors">Impressum</a>
                    <a href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

