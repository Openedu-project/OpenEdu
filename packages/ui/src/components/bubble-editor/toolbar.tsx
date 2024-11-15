// import React from 'react';

// import OrderedListIcon from './icons/OrderedListIcon';
// import UnorderedListIcon from './icons/UnorderedListIcon';
import { cn } from '@oe/ui/utils/cn';
import { Bold, Italic, Link, List, ListOrdered, Redo, Strikethrough, Underline, Undo } from 'lucide-react';

import type { HTMLAttributes, MouseEvent, ReactNode } from 'react';
import type { EditorState } from './editor-context';

import { Button } from '#shadcn/button';
import { useEditorState } from './editor-context';

export const BtnBold = createButton('Bold', <Bold className="h-4 w-4" />, 'bold');

export const BtnBulletList = createButton('Bullet list', <List className="h-4 w-4" />, 'insertUnorderedList');

export const BtnClearFormatting = createButton('Clear formatting', 'T̲ₓ', 'removeFormat');

export const BtnItalic = createButton('Italic', <Italic className="h-4 w-4" />, 'italic');

export const BtnStrikeThrough = createButton('Strike through', <Strikethrough className="h-4 w-4" />, 'strikeThrough');

export const BtnLink = createButton('Link', <Link className="h-4 w-4" />, ({ $selection }) => {
  if ($selection?.nodeName === 'A') {
    document.execCommand('unlink');
  } else {
    // eslint-disable-next-line no-alert
    document.execCommand('createLink', false, prompt('URL', '') || undefined);
  }
});

export const BtnNumberedList = createButton('Numbered list', <ListOrdered className="h-4 w-4" />, 'insertOrderedList');

export const BtnRedo = createButton('Redo', <Redo className="h-4 w-4" />, 'redo');

export const BtnUnderline = createButton('Underline', <Underline className="h-4 w-4" />, 'underline');

export const BtnUndo = createButton('Undo', <Undo className="h-4 w-4" />, 'undo');

export function createButton(title: string, content: ReactNode, command: ((state: EditorState) => void) | string) {
  ButtonFactory.displayName = title.replaceAll(/\s/g, '');

  return ButtonFactory;

  function ButtonFactory(props: HTMLAttributes<HTMLButtonElement>) {
    const editorState = useEditorState();
    const { $el, $selection } = editorState;

    let active = false;

    if (typeof command === 'string') {
      active = !!$selection && document.queryCommandState(command);
    }

    function onAction(e: MouseEvent<HTMLButtonElement>) {
      e.preventDefault();

      if (document.activeElement !== $el) {
        $el?.focus();
      }

      if (typeof command === 'function') {
        command(editorState);
      } else {
        document.execCommand(command);
      }
    }

    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn('btn-editor h-6 w-6 cursor-pointer p-0', active && 'bg-accent text-accent-foreground')}
        onMouseDown={onAction}
        title={title}
        type="button"
        tabIndex={-1}
        {...props}
      >
        {content}
      </Button>
    );
  }
}

export function Toolbar({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex items-center space-x-2 rounded bg-primary p-2 text-primary-foreground', className)}
      {...rest}
    >
      <BtnUndo />
      <BtnRedo />
      <BtnBold />
      <BtnItalic />
      <BtnUnderline />
      <BtnStrikeThrough />
      <BtnNumberedList />
      <BtnBulletList />
      <BtnLink />
      <BtnClearFormatting />
    </div>
  );
}
