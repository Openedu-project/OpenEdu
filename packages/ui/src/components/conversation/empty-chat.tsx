import AIChat from '@oe/assets/images/ai/ai-chat.png';
import { useTranslations } from 'next-intl';
import { Image } from '#components/image';

export default function EmptyChat() {
  const tAI = useTranslations('aiAssistant');

  return (
    <div className="scrollbar flex h-[calc(100%-150px)] w-full max-w-3xl flex-col items-center justify-start overflow-auto md:justify-center xl:max-w-4xl">
      <div className="h-24 w-24 md:h-40 md:w-40">
        <Image src={AIChat.src} alt="ai-chat" objectFit="contain" width={40} height={40} />
      </div>
      <h2 className="mcaption-regular24 md:giant-iheading-bold32 !font-normal">{tAI('generalChat')}</h2>
      <p className="md:mcaption-regular20">{tAI('chatDesc')}</p>
    </div>
  );
}
