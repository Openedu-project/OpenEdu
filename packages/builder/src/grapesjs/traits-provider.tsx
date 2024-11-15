import type { Trait } from 'grapesjs';
import type React from 'react';
import { memo, useEffect, useState } from 'react';
import { useEditorInstance } from './context/editor-instance';
import { useEditorOptions } from './context/editor-options';
import { isFunction } from './utils';
import { type PortalContainerResult, portalContainer } from './utils/react';

export type TraitsState = {
  /**
   * Current selected traits.
   */
  traits: Trait[];

  /**
   * Default Trait Manager container.
   */
  Container: PortalContainerResult;
};

export type TraitsResultProps = TraitsState;

export interface TraitsProviderProps {
  children: (props: TraitsResultProps) => React.JSX.Element;
}

export const TraitsProvider = memo(({ children }: TraitsProviderProps) => {
  const { editor } = useEditorInstance();
  const options = useEditorOptions();
  const [propState, setPropState] = useState<TraitsState>(() => ({
    traits: [],
    Container: () => null,
  }));

  useEffect(() => {
    if (!editor) {
      return;
    }
    const { Traits } = editor;
    const event = Traits.events.custom;

    const up = ({ container }: { container: HTMLElement }) => {
      setPropState({
        traits: Traits.getCurrent(),
        Container: portalContainer(container),
      });
    };

    editor.on(event, up);
    Traits.__trgCustom();

    return () => {
      editor.off(event, up);
    };
  }, [editor]);

  useEffect(() => options.setCustomTraits(true), [options.setCustomTraits]);

  return editor ? (isFunction(children) ? children(propState) : null) : null;
});
