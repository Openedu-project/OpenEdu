'use client';

import type { IBlog } from '@oe/api';
import { BookOpenCheck, ChevronDown, Eye, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Link } from '#common/navigation';
import { DeleteButton } from '#components/delete-button';
import { PublishButton } from '#components/publish-button';
import { Button } from '#shadcn/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '#shadcn/dropdown-menu';

type Props = {
  blogData: IBlog;
  previewUrl: string;
  handlePublish: (param: { note?: string | undefined }, blog: IBlog, action: 'publish' | 'un-publish') => Promise<void>;
  handleDelete: (blog: IBlog) => Promise<void>;
};

export const BlogTableItemActions = ({ blogData, handlePublish, previewUrl, handleDelete }: Props) => {
  const t = useTranslations('general');
  const tBlogMgt = useTranslations('blogManagement');
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
          <Link href={previewUrl} target="_blank" variant="ghost">
            <Eye className="mr-2 h-4 w-4" />
            <span>{t('preview')}</span>
          </Link>

          <PublishButton
            action="publish"
            onlyText
            onClose={() => setOpen(false)}
            desc={tBlogMgt('publishBlogDes')}
            triggerProps={{
              leftSection: <BookOpenCheck className="h-4 w-4" />,
              variant: 'ghost',
            }}
            onConfirm={(param: { note?: string }) => handlePublish(param, blogData, 'publish')}
          />

          <DeleteButton
            leftSection={<Trash2 className="h-4 w-4" />}
            title={tBlogMgt('delBlog')}
            description={tBlogMgt('delBlogDes')}
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
