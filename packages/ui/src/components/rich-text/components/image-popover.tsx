'use client';
import type { Editor } from '@tiptap/core';
import { ImageIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type React from 'react';
import { useState } from 'react';
import { Uploader } from '#components/uploader';
import { Button } from '#shadcn/button';
import { Input } from '#shadcn/input';
import { Popover, PopoverContent, PopoverTrigger } from '#shadcn/popover';

export const ImagePopover: React.FC<{ editor: Editor }> = ({ editor }) => {
  const t = useTranslations('richText.popover');
  const [url, setUrl] = useState('');

  const addImage = (src: string) => {
    if (src) {
      editor.chain().focus().setImage({ src }).run();
      setUrl('');
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="outline" className="h-8 w-8 p-0" title={t('addImage')}>
          <ImageIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex flex-col gap-4">
          <h4 className="font-medium leading-none">{t('addImage')}</h4>
          <Input placeholder="Enter image URL" value={url} onChange={e => setUrl(e.target.value)} />
          <Button onClick={() => addImage(url)} type="button">
            {t('addImage')}
          </Button>
          <Uploader
            accept="image/*"
            listType="picture"
            onSuccess={file => {
              addImage(file.url as string);
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
