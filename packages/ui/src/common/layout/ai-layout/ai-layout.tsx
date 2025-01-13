import type { ReactNode } from 'react';
import { AISidebar } from '#components/conversation';
import { cn } from '#utils/cn';

type Props = {
  children: ReactNode;
};

export default function AILayout({ children }: Props) {
  return (
    <main className={cn('overflow-x-hidden transition-[margin] md:overflow-y-hidden md:pt-0')}>
      <div className="relative flex h-[calc(100vh-var(--header-small-height))] w-full justify-end overflow-hidden md:h-[calc(100vh-var(--header-height))]">
        <AISidebar className="bg-primary/5" />
        <div className="horizontal-scrollbar flex-1 overflow-y-auto lg:max-w-[80%]">{children}</div>
      </div>
    </main>
  );
}
