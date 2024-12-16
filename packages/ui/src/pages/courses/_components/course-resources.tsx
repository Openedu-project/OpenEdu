import ArrowSquareDown from '@oe/assets/icons/arrow-square-down';
import ArrowSquareUp from '@oe/assets/icons/arrow-square-up';
import DocumentDownload from '@oe/assets/icons/document-download';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { useGetMe } from '@oe/api/hooks/useMe';
import type { IFileResponse } from '@oe/api/types/file';
import { type DownloadFileProps, downloadAllFiles, processFileName } from '@oe/core/utils/download-file';
import { useLoginRequiredStore } from '#components/require-login-modal';
import { Button } from '#shadcn/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '#shadcn/collapsible';
import { FileDownloader } from './attached-file';

export default function CourseResources({ docs }: { docs: IFileResponse[] }) {
  const t = useTranslations('courseOutline.attachedDocs');

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      setError(null);
      try {
        await downloadAllFiles(files);
      } catch {
        setError('Failed to download file. Please try again.');
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
        <CollapsibleTrigger className="flex w-full justify-between">
          <div className="mcaption-regular16 flex items-center gap-3 text-content-neutral-light-700">
            <DocumentDownload width={24} height={24} color="#2C2C2C" />
            <span className="line-clamp-1 text-left">{t('title', { total: docs?.length })}</span>
          </div>
          {isOpen ? <ArrowSquareUp /> : <ArrowSquareDown />}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mt-3 grid grid-cols-1 gap-3 rounded-lg border border-foreground/20 bg-white p-4 shadow-shadow-2">
            <div className="flex justify-between space-x-spacing-mml">
              <span className="mcaption-semibold16 text-foreground/90">{t('resources')}</span>
              {docs?.length > 1 && (
                <>
                  <Button
                    size="small"
                    variant="link"
                    onClick={handleDownload}
                    disabled={isLoading}
                    className="mcaption-regular12 text-primary"
                  >
                    {isLoading ? t('downloading') : t('downloadAll')}
                  </Button>
                  {error && <p className="text-destructive">{error}</p>}
                </>
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
