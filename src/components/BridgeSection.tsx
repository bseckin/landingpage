import { useLanguage } from '../context/LanguageContext';

const BridgeSection = () => {
    const { t } = useLanguage();

    return (
        <section className="py-24 md:py-32 border-t border-slate-200/80">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl md:mx-0">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 font-sans leading-tight">
                        {t.bridge.headline}
                    </h2>
                </div>
            </div>
        </section>
    );
};

export default BridgeSection;
