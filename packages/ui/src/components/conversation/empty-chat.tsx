import type { TAgentType } from '@oe/api';
import AIChat from '@oe/assets/images/ai/ai-chat.png';
import { useTranslations } from 'next-intl';
import { Image } from '#components/image';
import { cn } from '#utils/cn';
import { AI_SIDEBAR, TRANSLATE_AGENT_KEY } from './constants';
import { InputFrame } from './message-input/input-frame';
import { PromptGrid } from './prompt/prompt-grid';
import { PromptPopup } from './prompt/prompt-popup';

export function EmptyChat({
  agent = 'ai_search',
  className,
}: {
  agent: TAgentType;
  className?: string;
}) {
  const tAI = useTranslations('aiAssistant');
  const agentData = AI_SIDEBAR()?.find(data => data.agent === agent);
  return (
    <div className={cn('scrollbar flex h-full flex-col overflow-y-auto p-2 md:p-1', className)}>
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-start p-4 lg:justify-center lg:pt-[6vh] xl:max-w-4xl">
        <div className="h-24 w-24 md:h-40 md:w-40">
          <Image src={agentData?.image ?? AIChat.src} alt="ai-agent" objectFit="contain" width={40} height={40} />
        </div>
        <h2 className="mcaption-regular24 md:giant-iheading-semibold32 -mt-8">
          {tAI(agentData?.lableKey ?? 'generalChat')}
        </h2>
        <p className="md:mcaption-regular20">{tAI(agentData?.descKey ?? 'chatDesc')}</p>
      </div>
      <InputFrame agent={agent} reset />
      <PromptGrid
        className="mx-auto mt-4 max-w-3xl px-2 md:mt-8 xl:max-w-4xl"
        name={tAI(TRANSLATE_AGENT_KEY[agent])}
        agent={agent}
        litmited={8}
        PromptPopup={PromptPopup}
      />
    </div>
  );
}
