import type { Block } from 'grapesjs';
import type React from 'react';
import { memo, useEffect, useState } from 'react';
import { useEditorInstance } from './context/editor-instance';
import { useEditorOptions } from './context/editor-options';
import { isFunction, noop } from './utils';
import { type PortalContainerResult, portalContainer } from './utils/react';

export type BlocksState = {
  /**
   * Array of blocks.
   */
  blocks: Block[];

  /**
   * Enable drag for a block.
   */
  dragStart: (block: Block, ev?: Event) => void;

  /**
   * Disable drag.
   */
  dragStop: (cancel?: boolean) => void;

  /**
   * Default Block Manager container.
   */
  Container: PortalContainerResult;

  /**
   * Map of blocks by category.
   */
  mapCategoryBlocks: MapCategoryBlocks;
};

export type BlocksResultProps = BlocksState;

export interface BlocksProviderProps {
  children: (props: BlocksResultProps) => React.JSX.Element;
}

export interface BlocksEventProps {
  blocks: Block[];
  container: HTMLElement;
  dragStart: (block: Block, ev?: Event) => void;
  drag: (ev: Event) => void;
  dragStop: (cancel?: boolean) => void;
}

export type MapCategoryBlocks = Map<string, Block[]>;

export const BlocksProvider = memo(({ children }: BlocksProviderProps) => {
  const { editor } = useEditorInstance();
  const options = useEditorOptions();
  const [propState, setPropState] = useState<BlocksState>(() => ({
    blocks: [],
    dragStart: noop,
    dragStop: noop,
    mapCategoryBlocks: new Map(),
    Container: () => null,
  }));

  useEffect(() => {
    if (!editor) {
      return;
    }
    const event = editor.Blocks.events.custom;
    const toListen = ({ blocks, container, dragStart, dragStop }: BlocksEventProps) => {
      const mapCategoryBlocks = blocks.reduce((res, block) => {
        const categoryLabel = block.getCategoryLabel();
        const categoryBlocks = res.get(categoryLabel);

        if (categoryBlocks) {
          categoryBlocks.push(block);
        } else {
          res.set(categoryLabel, [block]);
        }

        return res;
      }, new Map() as MapCategoryBlocks);

      setPropState({
        blocks,
        dragStart,
        dragStop,
        mapCategoryBlocks,
        Container: portalContainer(container),
      });
    };

    editor.on(event, toListen);
    editor.Blocks.__trgCustom();

    return () => {
      editor.off(event, toListen);
    };
  }, [editor]);

  useEffect(() => options.setCustomBlocks(true), [options.setCustomBlocks]);

  return editor ? (isFunction(children) ? children(propState) : null) : null;
});
