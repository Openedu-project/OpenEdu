import AIBg from '@oe/assets/images/ai-bg.png';
import { useTranslations } from 'next-intl';
import { AIModule, InputFrame } from '#components/conversation';
import { Image } from '#components/image';

export default function AIAssistantPage() {
  const tAI = useTranslations('aiAssistant');

  return (
    <div className="container relative flex min-h-[calc(100dvh-var(--header-height))] flex-col items-center gap-4">
      <div className="-z-10 fixed inset-10">
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
      <div className="flex grow flex-col items-center justify-center gap-4">
        <h2 className="mcaption-regular24 md:giant-iheading-semibold28 !font-normal mb-6 text-center">
          <strong className="mr-2 bg-ai-gradient bg-clip-text text-transparent">{tAI('aiAssitantStrongText')}</strong>
          {tAI('aiAssitantText')}
        </h2>

        <div className="grid gap-3 md:grid-cols-2 md:gap-6">
          <AIModule showDesc className="items-start shadow" />
        </div>
      </div>
      <InputFrame className="mb-4 w-full" />
    </div>
  );
}
