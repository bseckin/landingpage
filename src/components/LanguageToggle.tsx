import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const LanguageToggle = () => {
    const { language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === 'de' ? 'en' : 'de');
    };

    return (
        <button
            onClick={toggleLanguage}
            className="fixed top-4 right-4 md:top-6 md:right-6 z-[100] flex items-center gap-2 px-3 py-2 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 hover:border-primary/40 text-xs font-sans text-slate-700 hover:text-slate-900 transition-all shadow-card"
            aria-label="Switch Language"
        >
            <Globe className="w-3 h-3" />
            <span className="font-bold tracking-wider">{language === 'de' ? 'DE' : 'EN'}</span>
        </button>
    );
};

export default LanguageToggle;
