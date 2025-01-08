'use client';

import type { IBlog } from '@oe/api/types/blog';
import { BookOpenCheck, ChevronDown, Eye, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { DeleteButton } from '#components/delete-button';
import { PublishButton } from '#components/publish-button';
import { Button } from '#shadcn/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '#shadcn/dropdown-menu';

type Props = {
  blogData: IBlog;
  handlePreview?: (blog: IBlog) => void;
  handlePublish: (param: { note?: string | undefined }, blog: IBlog, action: 'publish' | 'unpublish') => Promise<void>;
  handleDelete: (blog: IBlog) => Promise<void>;
};

export const BlogTableItemActions = ({ blogData, handlePublish, handlePreview, handleDelete }: Props) => {
  const t = useTranslations('general');
  const tPublish = useTranslations('blogManagement');
  const [open, setOpen] = useState(false);

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {t('actions')} <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex w-30 flex-col">
          <Button
            variant="ghost"
            leftSection={<Eye className="h-4 w-4" />}
            onClick={() => {
              handlePreview?.(blogData);
            }}
          >
            {t('preview')}
          </Button>

          <PublishButton
            action="publish"
            onlyText
            onClose={() => setOpen(false)}
            desc={tPublish('publishBlogDes')}
            triggerProps={{ leftSection: <BookOpenCheck className="h-4 w-4" />, variant: 'ghost' }}
            onConfirm={(param: { note?: string }) => handlePublish(param, blogData, 'publish')}
          />

          <DeleteButton
            leftSection={<Trash2 className="h-4 w-4" />}
            size="default"
            onClose={() => setOpen(false)}
            onDelete={async onClose => {
              await handleDelete?.(blogData);
              onClose?.();
            }}
            className="h-auto w-auto"
          >
            {t('delete')}
          </DeleteButton>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
