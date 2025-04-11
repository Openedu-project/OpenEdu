import { isLogin } from '@oe/api';
import type { ReactNode } from 'react';
import { AISidebar } from '#components/conversation';
import { cn } from '#utils/cn';

type Props = {
  children: ReactNode;
  className?: string;
};

export async function AILayout({ children, className }: Props) {
  const login = await isLogin();
  return (
    <main
      className={cn(
        'relative flex h-[calc(100dvh-var(--header-small-height))] w-full justify-end overflow-hidden overflow-x-hidden transition-[margin] md:h-[calc(100dvh-var(--header-height))] md:overflow-y-hidden md:pt-0',
        className
      )}
    >
      <AISidebar isLogin={login} />
      <div className="flex-1 overflow-hidden">{children}</div>
    </main>
  );
}
