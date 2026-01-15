declare module 'react-quill-new' {
    import React from 'react';
    export interface ReactQuillProps {
        value?: string;
        defaultValue?: string;
        readOnly?: boolean;
        theme?: string;
        modules?: any;
        formats?: string[];
        onChange?: (value: string, delta: any, source: any, editor: any) => void;
        className?: string;
    }
    export default class ReactQuill extends React.Component<ReactQuillProps> { }
}
