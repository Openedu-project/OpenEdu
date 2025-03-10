import AIChat from '@oe/assets/images/ai/ai-chat.png';
import { useTranslations } from 'next-intl';
import { Image } from '#components/image';

export default function EmptyChat() {
  const tAI = useTranslations('aiAssistant');

  return (
    <div className="flex h-full w-full max-w-3xl flex-col items-center justify-center xl:max-w-4xl">
      <div className="h-24 w-24 md:h-40 md:w-40">
        <Image src={AIChat.src} alt="ai-chat" objectFit="contain" width={40} height={40} />
      </div>
      <h2 className="mcaption-regular24 md:giant-iheading-bold40 !font-normal">{tAI('generalChat')}</h2>
      <p>{tAI('chatDesc')}</p>
    </div>
  );
}
