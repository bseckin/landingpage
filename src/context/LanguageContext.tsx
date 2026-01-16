import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { translations as defaultTranslations, type Language } from '../content/translations';

// Static Imports for Production Build
import heroData from '../content/hero.json';
import problemData from '../content/problem.json';
import servicesData from '../content/services.json';
import processData from '../content/process.json';
import aboutData from '../content/about.json';
import footerData from '../content/footer.json';
import impressumData from '../content/impressum.json';
import datenschutzData from '../content/datenschutz.json';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: typeof defaultTranslations['de'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>('de');
    const [translations, setTranslations] = useState(defaultTranslations);

    useEffect(() => {
        const saved = localStorage.getItem('language') as Language;
        if (saved && (saved === 'de' || saved === 'en')) {
            setLanguage(saved);
        }
    }, []);

    // Load Static Content on Mount
    useEffect(() => {
        // We use a function to map the static data just like we did with the fetched data
        const loadStaticContent = () => {
            setTranslations(prev => {
                const next = { ...prev };
                const hero = heroData;
                const problem = problemData;
                const services = servicesData;
                const process = processData;
                const about = aboutData;
                const footer = footerData;

                if (hero) {
                    // Helper to restore the 2-tone headline style if a newline is present
                    const formatHeadline = (text: string) => {
                        if (!text) return null;
                        if (text.includes('\n')) {
                            const [main, ...rest] = text.split('\n');
                            return <>{main}<br /> <span className="text-secondary">{rest.join(' ')}</span></>;
                        }
                        return text;
                    };

                    next.de.hero = {
                        ...next.de.hero,
                        badge: hero.status || next.de.hero.badge,
                        headline: (formatHeadline(hero.headline) || next.de.hero.headline) as any,
                        sub: (hero.subHeadline || hero.description || next.de.hero.sub) as any,
                        ctaPrimary: hero.primaryBtn || next.de.hero.ctaPrimary,
                        ctaSecondary: hero.secondaryBtn || next.de.hero.ctaSecondary
                    };
                }

                if (problem) {
                    next.de.problem = {
                        ...next.de.problem,
                        headline: problem.headline || next.de.problem.headline,
                        description: problem.description || next.de.problem.description,
                        cards: problem.cards?.map((c: any) => ({
                            tag: c.tag,
                            title: c.title,
                            description: c.description
                        })) || next.de.problem.cards
                    };
                }

                if (services) {
                    next.de.services = {
                        ...next.de.services,
                        headline: services.headline || next.de.services.headline,
                        sub: services.description || next.de.services.sub, // Services JSON uses 'description'
                        cards: services.cards?.map((c: any) => ({
                            tag: c.tag,
                            title: c.title,
                            desc: c.description // ServiceCard uses 'desc'
                        })) || next.de.services.cards
                    };
                }

                // Basic identity mapping for others if keys align, otherwise keep static
                // Explicitly map 'about' to avoid overwriting structural objects with flat arrays
                if (about) {
                    next.de.about = {
                        ...next.de.about,
                        whoAmI: about.headline || next.de.about.whoAmI, // Map JSON 'headline' to TS 'whoAmI'
                        description: about.description || next.de.about.description,
                        // We purposefully do NOT overwrite 'badges' or 'status' unless safe.
                        // This preserves the safe default structure.
                    };
                }

                if (process) {
                    next.de.process = {
                        ...next.de.process,
                        headline: process.headline || next.de.process.headline,
                        sub: process.description || next.de.process.sub, // JSON 'description' -> 'sub'
                        steps: process.steps?.map((s: any) => ({
                            title: s.title,
                            desc: s.description // JSON 'description' -> Component 'desc'
                        })) || next.de.process.steps
                    };
                }
                if (footer) {
                    next.de.footer = {
                        ...next.de.footer,
                        headline: footer.headline || next.de.footer.headline,
                        text: footer.text || next.de.footer.text,
                        ctaButton: footer.ctaButton || next.de.footer.ctaButton,
                        location: footer.location ? { ...next.de.footer.location, value: footer.location } : next.de.footer.location,
                        timezone: footer.timezone ? { ...next.de.footer.timezone, value: footer.timezone } : next.de.footer.timezone
                    };
                }

                if (impressumData) {
                    next.de.impressum = {
                        ...next.de.impressum,
                        headline: impressumData.headline || next.de.impressum.headline,
                        content: impressumData.content || next.de.impressum.content
                    };
                }

                if (datenschutzData) {
                    next.de.datenschutz = {
                        ...next.de.datenschutz,
                        headline: datenschutzData.headline || next.de.datenschutz.headline,
                        content: datenschutzData.content || next.de.datenschutz.content
                    };
                }

                return next;
            });
        };

        loadStaticContent();
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
    };

    const value = {
        language,
        setLanguage: handleSetLanguage,
        t: translations[language],
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
