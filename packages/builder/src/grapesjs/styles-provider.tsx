import type { Sector } from 'grapesjs';
import type React from 'react';
import { memo, useEffect, useState } from 'react';
import { useEditorInstance } from './context/editor-instance';
import { useEditorOptions } from './context/editor-options';
import { isFunction } from './utils';
import { type PortalContainerResult, portalContainer } from './utils/react';

export type StylesState = {
  /**
   * Array of visible sectors.
   */
  sectors: Sector[];

  /**
   * Default Styles container.
   */
  Container: PortalContainerResult;
};

export type StylesResultProps = StylesState;

export interface StylesProviderProps {
  children: (props: StylesResultProps) => React.JSX.Element;
}

export const StylesProvider = memo(({ children }: StylesProviderProps) => {
  const { editor } = useEditorInstance();
  const options = useEditorOptions();
  const [propState, setPropState] = useState<StylesState>(() => ({
    sectors: [],
    Container: () => null,
  }));

  useEffect(() => {
    if (!editor) {
      return;
    }
    const { Styles } = editor;
    const event = Styles.events.custom;

    const up = ({ container }: { container: HTMLElement }) => {
      setPropState({
        sectors: Styles.getSectors({ visible: true }),
        Container: portalContainer(container),
      });
    };

    editor.on(event, up);

    return () => {
      editor.off(event, up);
    };
  }, [editor]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => options.setCustomStyles(true), []);

  return editor ? (isFunction(children) ? children(propState) : null) : null;
});
