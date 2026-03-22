import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    label?: string;
}

const modules = {
    toolbar: [
        [{ 'header': [2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'clean']
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link'
];

const RichTextEditor = ({ value, onChange, placeholder, label }: RichTextEditorProps) => {
    return (
        <div className="space-y-2">
            {label && (
                <label className="text-xs font-bold text-secondary tracking-widest uppercase font-sans ml-1">
                    {label}
                </label>
            )}
            <div className="bg-white border border-slate-200/80 rounded-lg overflow-hidden focus-within:border-primary/50 transition-colors shadow-sm">
                <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={onChange}
                    modules={modules}
                    formats={formats}
                    // @ts-expect-error: Placeholder is valid but missing in type definition
                    placeholder={placeholder}
                    className="text-slate-900"
                />
            </div>
            <style>{`
                .ql-toolbar.ql-snow {
                    border: none;
                    border-bottom: 1px solid #e2e8f0;
                    background: #f8fafc;
                }
                .ql-container.ql-snow {
                    border: none;
                    font-family: 'Inter', sans-serif;
                    font-size: 1rem;
                }
                .ql-editor {
                    min-height: 200px;
                    color: #0f172a;
                }
                .ql-editor.ql-blank::before {
                    color: #94a3b8;
                    font-style: normal;
                }
                .ql-snow .ql-stroke {
                    stroke: #64748b;
                }
                .ql-snow .ql-fill {
                    fill: #64748b;
                }
                .ql-snow .ql-picker {
                    color: #64748b;
                }
                .ql-snow .ql-picker-options {
                    background-color: #ffffff;
                    border-color: #e2e8f0;
                }
                .ql-snow .ql-picker-item:hover {
                    color: #4f46e5;
                }
                .ql-snow .ql-picker-label:hover {
                    color: #4f46e5;
                }
                .ql-snow .ql-picker-label:hover .ql-stroke {
                    stroke: #4f46e5;
                }
                .ql-snow .ql-active .ql-stroke {
                    stroke: #4f46e5;
                }
                .ql-snow .ql-active {
                    color: #4f46e5;
                }
                .ql-snow a {
                    color: #4f46e5;
                }
            `}</style>
        </div>
    );
};

export default RichTextEditor;
