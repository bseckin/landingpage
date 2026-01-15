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
            <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden focus-within:border-primary/50 transition-colors">
                <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={onChange}
                    modules={modules}
                    formats={formats}
                    // @ts-expect-error: Placeholder is valid but missing in type definition
                    placeholder={placeholder}
                    className="text-white"
                />
            </div>
            <style>{`
                .ql-toolbar.ql-snow {
                    border: none;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    background: rgba(255, 255, 255, 0.02);
                }
                .ql-container.ql-snow {
                    border: none;
                    font-family: 'Inter', sans-serif;
                    font-size: 1rem;
                }
                .ql-editor {
                    min-height: 200px;
                    color: white;
                }
                .ql-editor.ql-blank::before {
                    color: rgba(255, 255, 255, 0.3);
                    font-style: normal;
                }
                .ql-snow .ql-stroke {
                    stroke: rgba(255, 255, 255, 0.6);
                }
                .ql-snow .ql-fill {
                    fill: rgba(255, 255, 255, 0.6);
                }
                .ql-snow .ql-picker {
                    color: rgba(255, 255, 255, 0.6);
                }
                .ql-snow .ql-picker-options {
                    background-color: #1a1a1a;
                    border-color: rgba(255, 255, 255, 0.1);
                }
                .ql-snow .ql-picker-item:hover {
                    color: #00ffa3;
                }
                .ql-snow .ql-picker-label:hover {
                    color: #00ffa3;
                }
                .ql-snow .ql-picker-label:hover .ql-stroke {
                    stroke: #00ffa3;
                }
                .ql-snow .ql-active .ql-stroke {
                    stroke: #00ffa3;
                }
                .ql-snow .ql-active {
                    color: #00ffa3;
                }
                .ql-snow a {
                    color: #00ffa3;
                }
            `}</style>
        </div>
    );
};

export default RichTextEditor;
