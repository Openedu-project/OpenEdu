import type { Component } from 'grapesjs';
import type React from 'react';
import { memo, useEffect, useState } from 'react';
import { useEditorInstance } from './context/editor-instance';
import { useEditorOptions } from './context/editor-options';
import { isFunction } from './utils';
import { type PortalContainerResult, portalContainer } from './utils/react';

export type LayersState = {
  /**
   * Root layer component.
   */
  root?: Component;

  /**
   * Default Layers Manager container.
   */
  Container: PortalContainerResult;
};

export type LayersResultProps = LayersState;

export interface LayersProviderProps {
  children: (props: LayersResultProps) => React.JSX.Element;
}

export const LayersProvider = memo(({ children }: LayersProviderProps) => {
  const { editor } = useEditorInstance();
  const options = useEditorOptions();
  const [propState, setPropState] = useState<LayersState>(() => ({
    root: undefined,
    Container: () => null,
  }));

  useEffect(() => {
    if (!editor) {
      return;
    }
    const { Layers } = editor;
    const event = Layers.events.custom;

    const up = ({ container }: { container: HTMLElement }) => {
      setPropState({
        root: Layers.getRoot(),
        Container: portalContainer(container),
      });
    };

    editor.on(event, up);
    Layers.__trgCustom({});

    return () => {
      editor.off(event, up);
    };
  }, [editor]);

  useEffect(() => options.setCustomLayers(true), [options.setCustomLayers]);

  return editor ? (isFunction(children) ? children(propState) : null) : null;
});
