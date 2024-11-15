import type { Asset } from 'grapesjs';
import type React from 'react';
import { memo, useEffect, useState } from 'react';
import { useEditorInstance } from './context/editor-instance';
import { useEditorOptions } from './context/editor-options';
import { isFunction } from './utils';
import { type PortalContainerResult, portalContainer } from './utils/react';

export type AssetsState = {
  /**
   * Array of assets.
   */
  assets: Asset[];

  /**
   * Asset types.
   */
  types: string[];

  /**
   * Select asset.
   */
  select: (asset: Asset, complete?: boolean) => void;

  /**
   * Close assets.
   */
  close: () => void;

  /**
   * Asset Manager container.
   */
  Container: PortalContainerResult;
};

export type AssetsResultProps = AssetsState & {
  /**
   * Indicates if the Asset Manager is open.
   */
  open: boolean;
};

export interface AssetsProviderProps {
  children: (props: AssetsResultProps) => React.JSX.Element;
}

export interface AssetsEventProps {
  open: boolean;
  assets: Asset[];
  types: string[];
  select: () => void;
  close: () => void;
  container: HTMLElement;
}

export const AssetsProvider = memo(({ children }: AssetsProviderProps) => {
  const { editor } = useEditorInstance();
  const options = useEditorOptions();
  const [open, setOpen] = useState(false);
  const [propState, setPropState] = useState<AssetsState>({
    assets: [],
    types: [],
    close: () => {
      // TODO: Implement close function
    },
    select: () => {
      // TODO: Implement select function
    },
    Container: () => null,
  });

  useEffect(() => {
    if (!editor) {
      return;
    }
    const event = editor.Assets.events.custom;

    const toListen = ({ open, assets, types, select, close, container }: AssetsEventProps) => {
      open &&
        setPropState({
          assets,
          types,
          select,
          close,
          Container: portalContainer(container),
        });
      setOpen(open);
    };

    editor.on(event, toListen);

    return () => {
      editor.off(event, toListen);
    };
  }, [editor]);

  useEffect(() => options.setCustomAssets(true), [options.setCustomAssets]);

  return editor ? (isFunction(children) ? children({ open, ...propState }) : null) : null;
});
