import { type HTMLProps, useEffect, useRef } from 'react';
import { useEditorOptions } from './context/editor-options';

export function Canvas({ children, ...rest }: HTMLProps<HTMLDivElement>) {
  const editorOptions = useEditorOptions();
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    canvasRef.current && editorOptions.setRefCanvas(canvasRef.current);
  }, [editorOptions.setRefCanvas]);

  return (
    <div {...rest} ref={canvasRef}>
      {children}
    </div>
  );
}
