import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Fragment } from 'react';
import { Button } from '#shadcn/button';
import { ScrollArea } from '#shadcn/scroll-area';
import { Separator } from '#shadcn/separator';
import { useConversationStore } from '#store/conversation-store';
import { cn } from '#utils/cn';
import { SourceCard } from './source-card';

export function SourceList() {
  const tSources = useTranslations('aiAssistant.sources');

  const { setOpenWebSource, openWebSource } = useConversationStore();

  return (
    <>
      <div className="flex justify-between">
        <p className="mcaption-semibold20">{tSources('title')}</p>
        <Button
          onClick={() => setOpenWebSource({ ...openWebSource, isOpen: !openWebSource.isOpen })}
          variant="ghost"
          className="!p-1 h-auto"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="relative grow">
        <div className={cn('absolute top-0 left-0 h-full w-full rounded-lg p-2')}>
          <ScrollArea className="h-full">
            {openWebSource?.sourceList?.length === 0 ? (
              <p className="text-center">{tSources('nodata')}</p>
            ) : (
              openWebSource?.sourceList?.map((item, index) => (
                <Fragment key={`${item.title}_${index}`}>
                  <SourceCard {...item} className="mb-3" />
                  {index < (openWebSource?.sourceList?.length ?? 1) - 1 && <Separator className="mb-3" />}
                </Fragment>
              ))
            )}
          </ScrollArea>
        </div>
      </div>
    </>
  );
}
