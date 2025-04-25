'use client';
import type { IAIModel } from '@oe/api';
import { type CSSProperties, type ReactNode, useEffect, useState } from 'react';
import { AIModelDropdown, AISidebar, SIDEBAR_WIDTH, SIDEBAR_WIDTH_ICON } from '#components/conversation';
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
  const [open, setOpen] = useState(true);
  const { setSelectedModel, selectedModel } = useConversationStore();
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!selectedModel) {
      setSelectedModel(AIChatModels?.[0]);
    }
  }, []);

  return (
    <SidebarProvider
      className="relative flex h-[calc(100dvh-var(--header-small-height))] min-h-[calc(100dvh-var(--header-height))] w-full justify-end overflow-hidden overflow-x-hidden transition-[margin] md:h-[calc(100dvh-var(--header-height))] md:overflow-y-hidden md:pt-0"
      open={open}
      onOpenChange={setOpen}
      style={
        {
          '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
          '--sidebar-width': SIDEBAR_WIDTH,
        } as CSSProperties
      }
    >
      <AISidebar isLogin={login} open={open} />
      <main
        className={cn(
          'flex h-[calc(100dvh-var(--header-small-height))] grow flex-col gap-4 overflow-hidden p-2 md:h-[calc(100dvh-var(--header-height))]',
          className
        )}
      >
        {AIChatModels && AIChatModels?.length > 0 && (
          <AIModelDropdown AIModels={AIChatModels} isLogin={login} className="mx-auto shrink-0" />
        )}
        {children}
      </main>
    </SidebarProvider>
  );
}
