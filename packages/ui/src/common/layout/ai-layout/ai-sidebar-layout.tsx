'use client';
import type { IAIModel } from '@oe/api';
import { AI_ROUTES } from '@oe/core';
import { type CSSProperties, type ReactNode, useEffect } from 'react';
import { usePathname } from '#common/navigation';
import { AIModelDropdown, AISidebar, SIDEBAR_WIDTH, SIDEBAR_WIDTH_ICON } from '#components/conversation';
import { useLoginRequiredStore } from '#components/login-required-modal';
import { SidebarProvider } from '#shadcn/sidebar';
import { useConversationStore } from '#store/conversation-store';
import { cn } from '#utils/cn';

type Props = {
  children: ReactNode;
  className?: string;
  login?: boolean;
  AIChatModels?: IAIModel[];
};

export function AISidebarLayout({ children, className, login, AIChatModels }: Props) {
  const { setSelectedModel, selectedModel } = useConversationStore();
  const pathname = usePathname();
  const { setLoginRequiredModal } = useLoginRequiredStore();
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!login) {
      setLoginRequiredModal(true, false);
      return;
    }
    if (!selectedModel) {
      setSelectedModel(AIChatModels?.[0]);
    }
  }, []);

  return (
    <SidebarProvider
      className="relative flex h-[calc(100dvh-var(--header-small-height))] min-h-[calc(100dvh-var(--header-height))] w-full justify-end overflow-hidden overflow-x-hidden transition-[margin] md:h-[calc(100dvh-var(--header-height))] md:overflow-y-hidden md:pt-0"
      style={
        {
          '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
          '--sidebar-width': SIDEBAR_WIDTH,
        } as CSSProperties
      }
    >
      <AISidebar isLogin={login} />
      <main
        className={cn(
          'flex h-[calc(100dvh-var(--header-small-height))] grow flex-col gap-4 overflow-hidden p-2 md:h-[calc(100dvh-var(--header-height))]',
          className
        )}
      >
        {!pathname.includes(AI_ROUTES.history) && AIChatModels && AIChatModels?.length > 0 && (
          <AIModelDropdown AIModels={AIChatModels} isLogin={login} className="mx-auto shrink-0" />
        )}
        {children}
      </main>
    </SidebarProvider>
  );
}
