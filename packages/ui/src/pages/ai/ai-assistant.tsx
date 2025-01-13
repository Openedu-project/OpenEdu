import { getMeServiceWithoutError } from '@oe/api/services/auth';
import AIBg from '@oe/assets/images/ai-bg.png';
import { getTranslations } from 'next-intl/server';
import { AIModule } from '#components/conversation';
import { Image } from '#components/image';

export default async function AIAssistantPage() {
  const [tAI, me] = await Promise.all([getTranslations('aiAssistant'), getMeServiceWithoutError()]);

  return (
    <div className="container relative flex min-h-[calc(100vh-var(--header-height))] flex-col items-center justify-center px-4 py-8">
      <Image
        src={AIBg.src}
        noContainer
        alt="ai-assistant"
        fill
        objectFit="contain"
        sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw"
        className="z-[-1]"
      />
      <h2 className="mcaption-regular24 md:giant-iheading-bold40 !font-normal mb-6 text-center">
        {tAI.rich('aiHelloText', {
          name: (me?.display_name?.length ?? 0) > 0 ? me?.display_name : me?.username,
        })}
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        <AIModule showDesc className="items-start shadow" />
      </div>
    </div>
  );
}
