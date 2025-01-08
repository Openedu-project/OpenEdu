import DocumentDownload from '@oe/assets/icons/document-download';
import { toast } from '@oe/ui/shadcn/sonner';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { useGetMe } from '@oe/api/hooks/useMe';
import type { IFileResponse } from '@oe/api/types/file';
import { type DownloadFileProps, downloadAllFiles, processFileName } from '@oe/core/utils/download-file';
import { CircleChevronDown, CircleChevronUp } from 'lucide-react';
import { useLoginRequiredStore } from '#components/login-required-modal';
import { Button } from '#shadcn/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '#shadcn/collapsible';
import { FileDownloader } from './attached-file';

export default function CourseResources({ docs }: { docs: IFileResponse[] }) {
  const t = useTranslations('courseOutline.attachedDocs');

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setLoginRequiredModal } = useLoginRequiredStore();

  const { dataMe } = useGetMe();

  const handleDownload = async () => {
    const files: DownloadFileProps[] = docs?.map(file => {
      return {
        fileUrl: file.url,
        fileName: processFileName(file.name),
      };
    });

    if (dataMe && dataMe !== null) {
      setIsLoading(true);
      try {
        await downloadAllFiles(files);
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
    <>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex w-full items-center justify-between">
          <div className="mcaption-regular14 flex items-center gap-3 text-content-neutral-light-700">
            <DocumentDownload width={20} height={20} color="hsl(var(--muted-foreground))" />
            <span className="line-clamp-1 text-left">{t('title', { total: docs?.length })}</span>
          </div>
          {isOpen ? (
            <CircleChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <CircleChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mt-3 grid grid-cols-1 gap-3 rounded-lg border border-foreground/20 bg-background p-2 shadow">
            <div className="flex items-center justify-between space-x-spacing-mml">
              <span className="mcaption-semibold16 text-foreground/90">{t('resources')}</span>
              {docs?.length > 1 && (
                <Button
                  size="xs"
                  variant="link"
                  onClick={handleDownload}
                  disabled={isLoading}
                  className="mcaption-regular12 h-fit text-primary"
                >
                  {isLoading ? t('downloading') : t('downloadAll')}
                </Button>
              )}
            </div>
            <div className="grid max-h-24 grid-cols-1 gap-2 overflow-y-auto">
              {docs?.map(doc => (
                <FileDownloader key={doc.id} fileUrl={doc.url} fileName={doc.name} me={dataMe} />
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}
