import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LegalPageProps {
    type: 'impressum' | 'datenschutz';
}

const LegalPage = ({ type }: LegalPageProps) => {
    const { t } = useLanguage();
    const navigate = useNavigate();

    const data = t[type];

    if (!data) return null;

    return (
        <div className="min-h-screen bg-black text-white px-6 py-24 md:py-32">
            <div className="container mx-auto max-w-4xl">
                <button
                    onClick={() => navigate('/')}
                    className="group flex items-center gap-2 text-text-secondary hover:text-white transition-colors mb-12 font-sans text-sm"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    {t.caseStudies.backButton}
                </button>

                <h1 className="text-4xl md:text-5xl font-bold font-sans mb-12 text-white">
                    {data.headline}
                </h1>

                <div className="prose prose-invert prose-lg max-w-none font-sans text-text-secondary">
                    {data.content.split('\n').map((line, index) => (
                        line === '' ? <br key={index} /> : <p key={index}>{line}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LegalPage;
