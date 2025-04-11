import { useCallback, useEffect } from 'react';
import { cn } from '#utils/cn';

import type { ComponentProps, Ref, SyntheticEvent } from 'react';
import type { ContentEditableProps } from './content-editable';

import { ContentEditable } from './content-editable';
import { useEditorState } from './editor-context';
import { getSelectedNode } from './utils';

// import { HtmlEditor } from './HtmlEditor';
// import '../styles.css';

export function Editor({ children, containerProps, onSelect, ref, ...rest }: EditorProps) {
  const editorState = useEditorState();

  const onClickOutside = useCallback(
    (event: MouseEvent) => {
      if (event.target === editorState.$el) {
        return;
      }

      if (editorState.$el?.contains(event.target as HTMLElement)) {
        return;
      }

      editorState.update({ $selection: undefined });
    },
    [editorState]
  );

  useEffect(() => {
    document.addEventListener('click', onClickOutside);
    return () => document.removeEventListener('click', onClickOutside);
  }, [onClickOutside]);

  function onTextSelect(event: SyntheticEvent<HTMLElement>) {
    onSelect?.(event);
    editorState.update({ $selection: getSelectedNode() });
  }

  // if (editorState.htmlMode) {
  //   return (
  //     <div className="rsw-editor" {...containerProps}>
  //       {children}
  //       <HtmlEditor {...rest} className="rsw-ce rsw-html" />
  //     </div>
  //   );
  // }

  return (
    <div className={cn('relative flex flex-col', containerProps?.className)} ref={ref} {...containerProps}>
      {children}
      <ContentEditable
        {...rest}
        onSelect={onTextSelect}
        className={cn('flex-1 p-2 focus:outline-hidden', rest.className)}
      />
    </div>
  );
}

export interface EditorProps extends ContentEditableProps {
  isShowToolbar?: boolean;
  portalEl?: string;
  ref?: Ref<HTMLDivElement>;
  containerProps?: ComponentProps<'div'>;
  toolbarProps?: ComponentProps<'div'>;
}
