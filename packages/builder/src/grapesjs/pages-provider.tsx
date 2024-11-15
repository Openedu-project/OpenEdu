/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useEffect, useState } from 'react';

import type { Editor, Page } from 'grapesjs';
import type React from 'react';

import { useEditorInstance } from './context/editor-instance';
import { isFunction, noop } from './utils';

export type PagesState = {
  /**
   * Array of pages.
   */
  pages: Page[];

  /**
   * Selected page.
   */
  selected?: Page;

  /**
   * Select page.
   */
  select: Editor['Pages']['select'];

  /**
   * Add new page.
   */
  add: Editor['Pages']['add'];

  /**
   * Remove page.
   */
  remove: Editor['Pages']['remove'];
};

export type PagesResultProps = PagesState;

export interface PagesProviderProps {
  children: (props: PagesResultProps) => React.JSX.Element;
}

export const PagesProvider = memo(({ children }: PagesProviderProps) => {
  const { editor } = useEditorInstance();
  const [propState, setPropState] = useState<PagesState>(() => {
    return {
      pages: [],
      selected: undefined,
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      select: noop as any,
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      add: noop as any,
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      remove: noop as any,
    };
  });

  useEffect(() => {
    if (!editor) {
      return;
    }
    const { Pages } = editor;
    const event = Pages.events.all;

    const up = () => {
      setPropState({
        pages: Pages.getAll(),
        selected: Pages.getSelected(),
        select: (...args) => Pages.select(...args),
        add: (...args) => Pages.add(...args),
        remove: (...args) => Pages.remove(...args),
      });
    };

    editor.on(event, up);
    up();

    return () => {
      editor.off(event, up);
    };
  }, [editor]);

  return editor ? (isFunction(children) ? children(propState) : null) : null;
});

PagesProvider.displayName = 'PagesProvider';
