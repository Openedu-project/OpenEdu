import { getAIModels } from '@oe/api/services/conversation';
import { isLogin } from '@oe/api/utils/auth';
import { AI_ROUTES } from '@oe/core/utils/routes';
import { MessageSquareDiff } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';
import { Link } from '#common/navigation';
import { AIHistoryModal, AIModelDropdown } from '#components/conversation';
import { cn } from '#utils/cn';

type Props = {
  children: ReactNode;
  className?: string;
};

export default async function AIChatLayout({ children, className }: Props) {
  const [AIChatModels, login, tAI] = await Promise.all([
    getAIModels(undefined, { next: { tags: ['get_ai_models'] } }),
    isLogin(),
    getTranslations('aiAssistant'),
  ]);

  return (
    <div
      className={cn(
        'flex h-[calc(100dvh-var(--header-small-height))] md:h-[calc(100dvh-var(--header-height))]',
        className
      )}
    >
      <div className="flex grow flex-col gap-4 p-2 lg:p-4">
        {AIChatModels && AIChatModels?.length > 0 && (
          <AIModelDropdown AIModels={AIChatModels} isLogin={login} className="shrink-0 lg:mx-auto" />
        )}
        <div className="flex grow flex-col overflow-hidden">{children}</div>
      </div>
      <div className="fixed right-2 flex gap-2 rounded-xl bg-background p-2 shadow-shadow-8 lg:flex-col">
        <Link
          variant="default"
          className="flex items-center gap-2 rounded-full hover:no-underline"
          activeClassName=""
          href={AI_ROUTES.chat}
        >
          <MessageSquareDiff size={16} />
          <span className="mcaption-semibold14 hidden md:block">{tAI('newChat')}</span>
        </Link>
        <AIHistoryModal isLogin={login} />
      </div>
    </div>
  );
}
