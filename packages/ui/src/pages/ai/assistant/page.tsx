import AIBg from '@oe/assets/images/ai/ai-bg.png';
import AIMascot from '@oe/assets/images/ai/ai-mascot.png';
import { useTranslations } from 'next-intl';
import { InputFrame, PromptCategory } from '#components/conversation';
import { Image } from '#components/image';

export default function AIAssistantPage() {
  const tAI = useTranslations('aiAssistant');

  return (
    <div className="flex h-[calc(100dvh-var(--header-height))] flex-col items-center gap-4 px-2 md:container">
      <div className="no-scrollbar relative flex w-full grow flex-col gap-4 overflow-y-auto px-4 pt-4 md:pt-8 lg:justify-center xl:px-40">
        <div className="-z-10 -translate-x-1/2 -translate-y-1/6 fixed top-1/4 left-[54%] h-1/2 w-1/2 transform md:h-2/5 md:w-2/5">
          <Image
            src={AIBg.src}
            noContainer
            alt="ai-assistant"
            fill
            objectFit="contain"
            sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw"
          />
        </div>
        <Image
          src={AIMascot.src}
          alt="ai-bot"
          aspectRatio="1:1"
          width={80}
          height={80}
          className="hidden h-16 w-16 md:block md:h-20 md:w-20"
          wrapClassNames="w-auto"
          objectFit="contain"
          containerHeight={80}
        />
        <h2 className="mcaption-regular20 md:giant-iheading-semibold28 text-center md:mb-6">
          <span className="mr-2 bg-ai-gradient bg-clip-text text-transparent">{tAI('aiAssitantStrongText')}</span>
          {tAI('aiAssitantText')}
        </h2>

        <PromptCategory />
      </div>
      <InputFrame className="mb-4 w-full" updateWidth reset />
    </div>
  );
}
