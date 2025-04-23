import { getAIModels, isLogin } from '@oe/api';
import type { ReactNode } from 'react';
import { AISidebarLayout } from './ai-sidebar-layout';

type Props = {
  children: ReactNode;
  className?: string;
};

export async function AILayout({ children, className }: Props) {
  const [AIChatModels, login] = await Promise.all([
    getAIModels(undefined, { next: { tags: ['get_ai_models'] } }),
    isLogin(),
  ]);

  return (
    <AISidebarLayout AIChatModels={AIChatModels} login={login} className={className}>
      {children}
    </AISidebarLayout>
  );
}
