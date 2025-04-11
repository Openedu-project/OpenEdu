'use client';

import type { EditorProps } from './bubble-editor';

import { Popover, PopoverContent, PopoverTrigger } from '#shadcn/popover';
import { Editor } from './bubble-editor';
import { EditorProvider } from './editor-context';
import { Toolbar } from './toolbar';

export function BubbleEditor({ value, isShowToolbar, portalEl, toolbarProps, onChange, ...rest }: EditorProps) {
  return (
    <EditorProvider>
      {/* {isShowToolbar ? <Toolbar {...toolbarProps} /> : null} */}
      {/* {portalEl && isShowToolbar ? ( */}
      <Popover open={!!(portalEl && isShowToolbar)}>
        <PopoverTrigger asChild>
          <Editor value={value} onChange={onChange} {...rest} />
        </PopoverTrigger>
        <PopoverContent
          className="w-auto bg-primary p-0 text-primary-foreground"
          side="top"
          align="start"
          sideOffset={0}
          {...(portalEl && isShowToolbar ? { container: document.querySelector(portalEl) as Element } : {})}
        >
          <Toolbar {...toolbarProps} />
        </PopoverContent>
      </Popover>
      {/* ) : null} */}
    </EditorProvider>
  );
}
