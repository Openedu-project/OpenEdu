import AIBg from '@oe/assets/images/ai-bg.png';
import { useTranslations } from 'next-intl';
import { Image } from '#components/image';

export default function EmptyChat() {
  const tAI = useTranslations('aiAssistant');

  return (
    <div className="relative flex h-full w-full max-w-4xl flex-col items-center justify-center">
      <Image
        src={AIBg.src}
        noContainer
        alt="ai-agent"
        fill
        objectFit="contain"
        sizes="(max-width: 768px) 100vw,
    (max-width: 1200px) 50vw,
    33vw"
        className="z-[-1]"
      />
      <h2 className="mcaption-regular24 md:giant-iheading-bold40 !font-normal m-auto text-center">
        {tAI('generalChat')}
      </h2>
    </div>
  );
}
