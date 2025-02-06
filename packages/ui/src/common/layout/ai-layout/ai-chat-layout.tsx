import { getAIModels, getListConversation } from '@oe/api/services/conversation';
import { isLogin } from '@oe/api/utils/auth';
import AIBg from '@oe/assets/images/ai-bg.png';
import { AI_ROUTES } from '@oe/core/utils/routes';
import { Plus } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';
import { Link } from '#common/navigation';
import { AIHistory, HISTORY_DEFAULT_PARAMS } from '#components/conversation';
import { AIModelDropdown } from '#components/conversation';
import { Image } from '#components/image';
import { cn } from '#utils/cn';

type Props = {
  children: ReactNode;
  className?: string;
};

export default async function AIChatLayout({ children, className }: Props) {
  const [AIChatModels, tAI, login, aiHistoryData] = await Promise.all([
    getAIModels(),
    getTranslations('aiAssistant'),
    isLogin(),
    getListConversation(undefined, HISTORY_DEFAULT_PARAMS),
  ]);

  return (
    <div
      className={cn(
        'flex h-[calc(100vh-var(--header-small-height))] md:h-[calc(100vh-var(--header-height))]',
        className
      )}
    >
      <div className="flex grow flex-col gap-4 p-4">
        <div className="flex flex-wrap justify-between gap-2">
          {AIChatModels?.length > 0 && <AIModelDropdown AIModels={AIChatModels} />}
          <Link variant="default" className="hover:no-underline" activeClassName="" href={AI_ROUTES.chat}>
            <Plus size={16} />
            <span className="ml-2 hidden md:block">{tAI('startNewChat')}</span>
          </Link>
        </div>
        <div className="relative flex grow flex-col overflow-hidden">
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
          {children}
        </div>
      </div>
      {aiHistoryData && <AIHistory isLogin={login} initData={aiHistoryData} />}
    </div>
  );
}
