import type { ISourceProps } from '@oe/api/types/conversation';
import { useTranslations } from 'next-intl';
import { Image } from '#components/image';
import { Button } from '#shadcn/button';
import { useConversationStore } from '#store/conversation-store';

export function SourcesButton({ sources, messageId }: { sources: ISourceProps[]; messageId: string }) {
  const { openWebSource, setOpenWebSource } = useConversationStore();
  const tAI = useTranslations('aiAssistant');

  return (
    <Button
      variant="outline"
      className="mcaption-semibold14 w-fit rounded-full"
      onClick={() => {
        setOpenWebSource({
          messageId: messageId,
          isOpen: openWebSource?.messageId === messageId ? !openWebSource.isOpen : true,
          sourceList: sources,
        });
      }}
    >
      <span>{tAI('resources')}:</span>
      <div className="-space-x-2 ml-2 flex rtl:space-x-reverse">
        {sources?.slice(0, 3).map(link => (
          <Image
            key={link.title}
            className="h-6 w-6 rounded-full border bg-background"
            externalSrc={`https://www.google.com/s2/favicons?domain=${new URL(link.url).hostname ?? ''}&sz=32`}
            alt="favicon"
            width={24}
            height={24}
            noContainer
            containerHeight="auto"
          />
        ))}
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground/80 font-medium text-background text-xs hover:bg-gray-600 dark:border-gray-800">
          +{(sources?.length ?? 5) - 3}
        </span>
      </div>
    </Button>
  );
}
