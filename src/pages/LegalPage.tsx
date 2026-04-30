import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import impressumData from '../content/impressum.json';
import datenschutzData from '../content/datenschutz.json';

const legalContent = {
    impressum: impressumData,
    datenschutz: datenschutzData,
} as const;

interface LegalPageProps {
    type: 'impressum' | 'datenschutz';
}

const LegalPage = ({ type }: LegalPageProps) => {
    const navigate = useNavigate();
    const { headline, content } = legalContent[type];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 px-6 py-24 md:py-32">
            <div className="container mx-auto max-w-4xl">
                <button
                    onClick={() => navigate('/')}
                    className="group flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-12 text-sm"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Zurück zur Übersicht
                </button>

                <h1 className="text-4xl md:text-5xl font-bold mb-12 text-slate-900">
                    {headline}
                </h1>

                <article className="text-slate-600 whitespace-pre-line leading-relaxed text-base md:text-lg">
                    {content}
                </article>
            </div>
        </div>
    );
};

export default LegalPage;
