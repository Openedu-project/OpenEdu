import { memo } from 'react';

import type { EditorProps } from './editor-instance';

import { EditorInstanceProvider, EditorOptionsProvider } from './context';
import EditorInstance from './editor-instance';
import EditorReady from './editor-ready';

export const GjsEditor = memo(({ children, ...rest }: EditorProps) => (
  <EditorInstanceProvider>
    <EditorOptionsProvider>
      <EditorInstance {...rest}>
        {children}
        <EditorReady />
      </EditorInstance>
    </EditorOptionsProvider>
  </EditorInstanceProvider>
));

GjsEditor.displayName = 'GjsEditor';
