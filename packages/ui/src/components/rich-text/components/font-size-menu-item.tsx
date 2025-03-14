import type { Editor } from '@tiptap/react';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type FC, type KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Button } from '#shadcn/button';
import { Input } from '#shadcn/input';
import { Popover, PopoverContent, PopoverTrigger } from '#shadcn/popover';

const fontSizes = [
  '8px',
  '9px',
  '10px',
  '11px',
  '12px',
  '14px',
  '16px',
  '18px',
  '20px',
  '24px',
  '30px',
  '36px',
  '48px',
  '60px',
  '72px',
  '96px',
];

export const FontSizeMenuItem: FC<{ editor: Editor }> = ({ editor }) => {
  const t = useTranslations('richText.menuItems');
  const [fontSize, setFontSize] = useState<string>(editor.getAttributes('textStyle').fontSize || '14px');
  const [inputValue, setInputValue] = useState<string>(fontSize.replace('px', ''));
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const updateFontSize = () => {
      const currentFontSize = editor.getAttributes('textStyle').fontSize;
      const newFontSize = currentFontSize || '14px';
      setFontSize(newFontSize);
      setInputValue(newFontSize.replace('px', ''));
    };

    editor.on('selectionUpdate', updateFontSize);
    editor.on('transaction', updateFontSize);

    return () => {
      editor.off('selectionUpdate', updateFontSize);
      editor.off('transaction', updateFontSize);
    };
  }, [editor]);

  // Tự động focus vào input khi popover mở
  useEffect(() => {
    if (isOpen && inputRef.current) {
      const timeoutId = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          const length = inputRef.current.value.length;
          inputRef.current.setSelectionRange(length, length);
        }
      }, 50);

      return () => clearTimeout(timeoutId);
    }
  }, [isOpen]);

  const applyFontSize = (size: string) => {
    if (size) {
      const newSize = size.endsWith('px') ? size : `${size}px`;
      editor.chain().focus().setFontSize(newSize).run();
      setFontSize(newSize);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();

    if (e.key === 'Enter') {
      applyFontSize(inputValue);
      setIsOpen(false);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="relative flex h-8 w-[80px] cursor-pointer overflow-hidden rounded-md border border-input">
          <Input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={e => {
              e.stopPropagation();
              setInputValue(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            onClick={e => {
              e.stopPropagation();
              if (!isOpen) {
                setIsOpen(true);
              }
            }}
            onFocus={e => {
              e.stopPropagation();
              if (!isOpen) {
                setIsOpen(true);
              }
            }}
            className="h-full w-full cursor-text rounded-none border-none pr-6 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            title={t('fontSize')}
          />
          <ChevronDown className="-translate-y-1/2 absolute top-1/2 right-2 h-4 w-4" />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="popover-content w-[80px] p-0"
        align="end"
        sideOffset={5}
        onOpenAutoFocus={e => {
          e.preventDefault();
        }}
        onCloseAutoFocus={e => {
          e.preventDefault();
          applyFontSize(inputValue);
        }}
      >
        <div className="max-h-[300px] overflow-y-auto">
          {fontSizes.map(size => (
            <Button
              key={size}
              variant="ghost"
              className="flex h-8 w-full justify-center rounded-none hover:bg-accent hover:text-accent-foreground"
              onClick={e => {
                e.stopPropagation();
                applyFontSize(size);
                setIsOpen(false);
              }}
              onMouseDown={e => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              {size.replace('px', '')}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
