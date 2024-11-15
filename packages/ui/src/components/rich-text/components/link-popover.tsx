'use client';
import type { Editor } from '@tiptap/core';
import { Link as LinkIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type React from 'react';
import { useEffect, useState } from 'react';
import { Button } from '#shadcn/button';
import { Input } from '#shadcn/input';
import { Popover, PopoverContent, PopoverTrigger } from '#shadcn/popover';

export const LinkPopover: React.FC<{ editor: Editor }> = ({ editor }) => {
  const [url, setUrl] = useState(editor.getAttributes('link').href ?? '');
  const t = useTranslations('richText.popover');

  useEffect(() => {
    if (editor.getAttributes('link').href) {
      setUrl(editor.getAttributes('link').href);
    }
  }, [editor]);

  const addLink = () => {
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
      setUrl('');
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="outline" className="h-8 w-8 p-0" title={t('addLink')}>
          <LinkIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex flex-col gap-4">
          <h4 className="font-medium leading-none">{t('addLink')}</h4>
          <Input placeholder={t('enterURL')} value={url} onChange={e => setUrl(e.target.value)} />
          {editor.getAttributes('link').href ? (
            <Button
              variant="outline"
              type="button"
              className="flex items-center rounded-sm p-1 text-red-600 transition-all hover:bg-red-100 dark:hover:bg-red-800"
              onClick={() => {
                editor.chain().focus().unsetLink().run();
                setUrl('');
              }}
            >
              {t('remove')}
            </Button>
          ) : (
            <Button onClick={addLink} type="button">
              {t('addLink')}
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
