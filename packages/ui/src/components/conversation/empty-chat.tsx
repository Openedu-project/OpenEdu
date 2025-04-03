import AIChat from '@oe/assets/images/ai/ai-chat.png';
import { useTranslations } from 'next-intl';
import { Image } from '#components/image';
import { useConversationStore } from '#store/conversation-store';
import { TRANSLATE_AGENT_KEY } from './constants';
import { PromptGrid } from './prompt/prompt-grid';

export default function EmptyChat() {
  const tAI = useTranslations('aiAssistant');
  const { selectedAgent } = useConversationStore();
  return (
    <div className="no-scrollbar flex h-[calc(100%-150px)] w-full max-w-3xl flex-col items-center justify-start overflow-auto lg:justify-center xl:max-w-4xl">
      <div className="h-24 w-24 md:h-40 md:w-40">
        <Image src={AIChat.src} alt="ai-chat" objectFit="contain" width={40} height={40} />
      </div>
      <h2 className="mcaption-regular24 md:giant-iheading-semibold32 -mt-8">{tAI('generalChat')}</h2>
      <p className="md:mcaption-regular20">{tAI('chatDesc')}</p>
      <PromptGrid
        className="mt-4 px-2 md:mt-8"
        name={tAI(TRANSLATE_AGENT_KEY[selectedAgent])}
        agent={selectedAgent}
        litmited={8}
      />
    </div>
  );
}
