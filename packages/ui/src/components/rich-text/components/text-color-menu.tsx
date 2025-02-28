import type { Editor } from '@tiptap/core';
import type React from 'react';
import type { ChangeEvent } from 'react';
import { buttonVariants } from '#shadcn/button';
import { Input } from '#shadcn/input';
import { Label } from '#shadcn/label';
import { cn } from '#utils/cn';

interface TextColorMenuProps {
  editor: Editor;
  currentColor?: string;
}

export const TextColorMenu: React.FC<TextColorMenuProps> = ({ editor, currentColor = '#000000' }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    editor.chain().focus().setTextColor(e.target.value).run();
  };

  return (
    <Label
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'flex h-8 w-8 cursor-pointer flex-col overflow-hidden border bg-background px-1 py-0'
      )}
    >
      <span className="mb-[1px]">A</span>
      <div className="relative h-1 w-full overflow-hidden">
        <Input
          type="color"
          value={currentColor}
          onChange={handleChange}
          className="-top-1 absolute right-0 h-3 cursor-pointer border-none p-0"
        />
      </div>
    </Label>
  );
};
