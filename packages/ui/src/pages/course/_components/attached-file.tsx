'use client';

import Import from '@oe/assets/icons/import';
import { toast } from '@oe/ui/shadcn/sonner';
import { useTranslations } from 'next-intl';
import type React from 'react';
import { useState } from 'react';

import type { IUser } from '@oe/api/types/user';
import { type DownloadFileProps, downloadFile, processFileName } from '@oe/core/utils/download-file';
import { useLoginRequiredStore } from '#components/login-required-modal';
import { Button } from '#shadcn/button';

interface Props extends DownloadFileProps {
  me?: IUser | null;
  updateAt?: number;
}

const FileDownloader: React.FC<Props> = ({ fileUrl, fileName, me }) => {
  const t = useTranslations('courseOutline.attachedDocs');

  const [isLoading, setIsLoading] = useState(false);

  const { setLoginRequiredModal } = useLoginRequiredStore();

  const docsName = processFileName(fileName);

  const handleDownload = async () => {
    if (me && me !== null) {
      setIsLoading(true);
      try {
        await downloadFile({ fileUrl, fileName: docsName });
        toast.success(t('downloadSuccess'));
      } catch {
        toast.error(t('downloadFail'));
      } finally {
        setIsLoading(false);
      }
    } else {
      setLoginRequiredModal(true);
    }
  };

  return (
    <div className="flex items-center justify-between gap-1 rounded-lg bg-foreground/5 px-2 py-1">
      <span className="mcaption-regular14 line-clamp-1">{docsName}</span>

      <Button
        size="xs"
        variant="link"
        onClick={handleDownload}
        disabled={isLoading}
        className="mcaption-regular14 h-fit text-primary"
      >
        {isLoading ? t('downloading') : <Import color="hsl(var(--primary))" />}
      </Button>
    </div>
  );
};

export { FileDownloader };
