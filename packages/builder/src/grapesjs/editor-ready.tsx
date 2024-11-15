import { memo, useEffect } from 'react';
import { useEditorOptions } from './context/editor-options';

const EditorReady = memo(() => {
  const options = useEditorOptions();
  useEffect(() => options.setReady(true), [options.setReady]);
  return <></>;
});

export default EditorReady;
