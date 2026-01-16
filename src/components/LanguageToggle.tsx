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
            className="fixed top-4 right-4 md:top-6 md:right-6 z-[100] flex items-center gap-2 px-3 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 hover:border-primary/50 text-xs font-sans text-white/80 hover:text-white transition-all shadow-lg"
            aria-label="Switch Language"
        >
            <Globe className="w-3 h-3" />
            <span className="font-bold tracking-wider">{language === 'de' ? 'DE' : 'EN'}</span>
        </button>
    );
};

export default LanguageToggle;
