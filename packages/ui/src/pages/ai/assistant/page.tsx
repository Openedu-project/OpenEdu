import AIMascot from '@oe/assets/images/ai/ai-mascot.png';
import { useTranslations } from 'next-intl';
import { InputFrame, PromptCategory } from '#components/conversation';
import { Image } from '#components/image';

export function AIAssistantPage() {
  const tAI = useTranslations('aiAssistant');

  return (
    <div className="flex h-[calc(100dvh-var(--header-height))] flex-col items-center gap-4 overflow-auto px-2 md:container lg:pt-[8vh]">
      <div className="no-scrollbar relative flex w-full max-w-3xl grow flex-col gap-4 overflow-y-auto xl:max-w-4xl">
        <Image
          src={AIMascot.src}
          alt="ai-bot"
          aspectRatio="1:1"
          width={120}
          height={100}
          className="hidden w-16 md:block md:w-28"
          wrapClassNames="w-auto"
          objectFit="contain"
          containerHeight={100}
        />
        <h2 className="mcaption-regular20 md:giant-iheading-semibold28 -mt-2 text-center">
          <span className="mr-2 bg-ai-gradient bg-clip-text text-transparent">{tAI('aiAssitantStrongText')}</span>
          {tAI('aiAssitantText')}
        </h2>
        <InputFrame className="mb-4 w-full" reset />

        <PromptCategory />
      </div>
    </div>
  );
}
