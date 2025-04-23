import type { TAgentType } from '@oe/api';
import AIChat from '@oe/assets/images/ai/ai-chat.png';
import { useTranslations } from 'next-intl';
import { Image } from '#components/image';
import { AI_SIDEBAR } from './constants';

export function EmptyChat({ agent = 'ai_search' }: { agent: TAgentType }) {
  const tAI = useTranslations('aiAssistant');
  const agentData = AI_SIDEBAR()?.find(data => data.agent === agent);
  return (
    <div className="no-scrollbar mx-auto flex w-full max-w-3xl flex-col items-center justify-start overflow-auto p-4 lg:justify-center xl:max-w-4xl">
      <div className="h-24 w-24 md:h-40 md:w-40">
        <Image src={agentData?.image ?? AIChat.src} alt="ai-agent" objectFit="contain" width={40} height={40} />
      </div>
      <h2 className="mcaption-regular24 md:giant-iheading-semibold32 -mt-8">
        {tAI(agentData?.lableKey ?? 'generalChat')}
      </h2>
      <p className="md:mcaption-regular20">{tAI(agentData?.descKey ?? 'chatDesc')}</p>
    </div>
  );
}
