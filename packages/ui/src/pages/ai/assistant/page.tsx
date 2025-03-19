import AIBg from '@oe/assets/images/ai/ai-bg.png';
import { useTranslations } from 'next-intl';
import { AIModule, InputFrame } from '#components/conversation';
import { Image } from '#components/image';

export default function AIAssistantPage() {
  const tAI = useTranslations('aiAssistant');

  return (
    <div className="flex h-[calc(100dvh-var(--header-height))] flex-col items-center gap-4 px-2 md:container">
      <div className="scrollbar relative flex w-full grow flex-col items-center justify-start gap-4 overflow-y-auto pt-4 md:justify-center">
        <div className="-z-10 -translate-x-1/2 -translate-y-1/6 absolute top-1/4 left-1/2 h-2/3 w-2/3 transform">
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
        <h2 className="mcaption-regular20 md:giant-iheading-semibold28 !font-normal text-center md:mb-6">
          <strong className="mr-2 bg-ai-gradient bg-clip-text text-transparent">{tAI('aiAssitantStrongText')}</strong>
          {tAI('aiAssitantText')}
        </h2>

        <div className="grid gap-2 md:grid-cols-2 md:gap-6">
          <AIModule showDesc />
        </div>
      </div>
      <InputFrame className="mb-4 w-full" updateWidth reset />
    </div>
  );
}
