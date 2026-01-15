import { useState } from 'react';
import footerContent from '../content/footer.json';
import { Loader } from 'lucide-react';

const Footer = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <footer id="contact" className="py-24 md:py-32 bg-black border-t border-white/5">
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                {/* Contact Info */}
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6 font-sans">
                        Der erste Schritt raus aus dem Chaos.
                    </h2>

                    <p className="text-lg text-text-secondary font-sans mb-12 max-w-md leading-relaxed">
                        Lassen Sie uns sprechen. Unverbindlich. Auf Augenhöhe. Finden wir heraus, ob wir zusammenpassen.
                    </p>

                    <div className="space-y-6 font-sans text-sm md:text-base text-text-muted border-l-2 border-primary/20 pl-6">
                        <div>
                            <span className="text-white font-bold block text-xs mb-1 tracking-wider uppercase">Standort</span>
                            Chiang Mai, TH
                        </div>
                        <div>
                            <span className="text-white font-bold block text-xs mb-1 tracking-wider uppercase">Zeitzone</span>
                            GMT+7
                        </div>
                    </div>
                </div>

                {/* Clean Form */}
                <div className="p-8 md:p-12 bg-surface/10 border border-white/5 rounded-3xl backdrop-blur-sm">
                    {status === 'success' ? (
                        <div className="h-full flex flex-col items-center justify-center text-center py-12">
                            <span className="text-6xl mb-4">✅</span>
                            <h3 className="text-2xl font-bold text-white mb-2">Nachricht gesendet!</h3>
                            <p className="text-gray-400">Ich melde mich in Kürze bei Ihnen.</p>
                            <button onClick={() => setStatus('idle')} className="mt-8 text-primary hover:text-white underline text-sm">Neue Nachricht</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-xs font-bold text-text-secondary mb-2 uppercase tracking-wider font-sans">Ihr Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full h-14 bg-black/30 border border-white/10 px-6 text-white font-sans placeholder:text-white/20 focus:border-primary focus:ring-1 focus:ring-primary/50 focus:outline-none transition-all rounded-xl"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-xs font-bold text-text-secondary mb-2 uppercase tracking-wider font-sans">Ihre Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full h-14 bg-black/30 border border-white/10 px-6 text-white font-sans placeholder:text-white/20 focus:border-primary focus:ring-1 focus:ring-primary/50 focus:outline-none transition-all rounded-xl"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-xs font-bold text-text-secondary mb-2 uppercase tracking-wider font-sans">Ihre Nachricht</label>
                                <textarea
                                    id="message"
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-black/30 border border-white/10 p-6 text-white font-sans placeholder:text-white/20 focus:border-primary focus:ring-1 focus:ring-primary/50 focus:outline-none transition-all rounded-xl resize-none"
                                />
                            </div>

                            {status === 'error' && (
                                <p className="text-red-500 text-sm">Es gab einen Fehler. Bitte versuchen Sie es später erneut.</p>
                            )}

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full h-14 bg-primary text-black font-bold text-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-sans tracking-wide rounded-xl shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2"
                            >
                                {status === 'loading' && <Loader className="animate-spin w-5 h-5" />}
                                {footerContent.ctaButton}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
