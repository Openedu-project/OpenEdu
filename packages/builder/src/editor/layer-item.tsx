import { Button } from '@oe/ui/shadcn/button';
import { cn } from '@oe/ui/utils/cn';
import { ChevronDown, Eye, EyeOff } from 'lucide-react';
import type React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useEditor } from '../grapesjs';

import type { Component } from 'grapesjs';

import { MAIN_BORDER_COLOR } from '../utils';

export interface LayerItemProps extends React.HTMLProps<HTMLDivElement> {
  component: Component;
  level: number;
  draggingCmp?: Component;
  dragParent?: Component;
}

const itemStyle = { maxWidth: '100%' };

export default function LayerItem({ component, draggingCmp, dragParent, ...props }: LayerItemProps) {
  const editor = useEditor();
  const { Layers } = editor;
  const layerRef = useRef<HTMLDivElement>(null);
  const [layerData, setLayerData] = useState(Layers.getLayerData(component));
  const { open, selected, hovered, components, visible, name } = layerData;
  const isDragging = draggingCmp === component;
  const level = props.level + 1;
  const isHovered = hovered || dragParent === component;

  useEffect(() => {
    level === 0 && setLayerData(Layers.getLayerData(component));
    if (layerRef.current) {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      (layerRef.current as any).__cmp = component;
    }
  }, [component, level, Layers.getLayerData]);

  useEffect(() => {
    const up = (cmp: Component) => {
      cmp === component && setLayerData(Layers.getLayerData(cmp));
    };
    const ev = Layers.events.component;
    editor.on(ev, up);

    return () => {
      editor.off(ev, up);
    };
  }, [editor, Layers, component]);

  const cmpToRender = useMemo(() => {
    return components.map(cmp => (
      <LayerItem key={cmp.getId()} component={cmp} level={level} draggingCmp={draggingCmp} dragParent={dragParent} />
    ));
  }, [draggingCmp, dragParent, level, components]);

  const toggleOpen = (ev: React.MouseEvent) => {
    ev.stopPropagation();
    Layers.setLayerData(component, { open: !open });
  };

  const toggleVisibility = (ev: React.MouseEvent) => {
    ev.stopPropagation();
    Layers.setLayerData(component, { visible: !visible });
  };

  const select = (event: React.MouseEvent) => {
    event.stopPropagation();
    Layers.setLayerData(component, { selected: true }, { event });
  };

  const hover = (hovered: boolean) => {
    if (!(hovered && draggingCmp)) {
      Layers.setLayerData(component, { hovered });
    }
  };

  const wrapperCls = cn('layer-item flex flex-col', selected && 'bg-sky-900', (!visible || isDragging) && 'opacity-50');

  return (
    <div className={wrapperCls}>
      <div
        onClick={select}
        onMouseEnter={() => hover(true)}
        onMouseLeave={() => hover(false)}
        className="group max-w-full"
        data-layer-item
        ref={layerRef}
        onKeyDown={() => {
          void 0;
        }}
      >
        <div
          className={cn(
            'flex items-center gap-1 border-b p-1 pr-2',
            level === 0 && 'border-t',
            MAIN_BORDER_COLOR,
            isHovered && 'bg-sky-700',
            selected && 'bg-sky-500'
          )}
        >
          <Button
            variant="ghost"
            size="icon"
            className={cn('cursor-pointer', components.length === 0 && 'pointer-events-none opacity-0')}
            onClick={toggleOpen}
            style={{ marginLeft: `${level * 10}px` }}
          >
            <ChevronDown className={cn('h-4 w-4', !open && 'rotate-[-90deg]')} />
          </Button>
          <div className="flex-grow truncate" style={itemStyle}>
            {name}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={cn('group-hover:opacity-100', visible ? 'opacity-0' : 'opacity-100')}
            onClick={toggleVisibility}
          >
            {visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      {!!(open && components.length > 0) && <div className={cn('max-w-full', !open && 'hidden')}>{cmpToRender}</div>}
    </div>
  );
}
