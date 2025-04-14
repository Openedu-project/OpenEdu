'use client';
import type { IFileResponse } from '@oe/api';
import type { Editor } from '@tiptap/react';
import { VideoIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Uploader } from '#components/uploader';
import { Button } from '#shadcn/button';
import { Input } from '#shadcn/input';
import { Popover, PopoverContent, PopoverTrigger } from '#shadcn/popover';

export const VideoPopover = ({ editor }: { editor: Editor }) => {
  const t = useTranslations('richText.popover');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<IFileResponse>();

  const addVideo = (src: string) => {
    if (src) {
      editor.chain().focus().setVideo({ src }).run();
      setUrl('');
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="outline" className="h-8 w-8 p-0" title={t('addVideo')}>
          <VideoIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex flex-col gap-4">
          <h4 className="font-medium leading-none">{t('addVideo')}</h4>
          <Input placeholder="Enter video URL" value={url} onChange={e => setUrl(e.target.value)} />
          <Button onClick={() => addVideo(url)} type="button">
            {t('addVideo')}
          </Button>
          <Uploader
            accept="video/*"
            listType="picture"
            value={file}
            maxSizeBytes={2 * 1024 * 1024 * 1024}
            onChange={file => {
              setFile(file as IFileResponse);
              setUrl((file as IFileResponse)?.url as string);
              addVideo((file as IFileResponse)?.url as string);
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
