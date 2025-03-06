import type { ReactNode } from 'react';
import { AISidebar } from '#components/conversation';
import { cn } from '#utils/cn';

type Props = {
  children: ReactNode;
  className?: string;
};

export default function AILayout({ children, className }: Props) {
  return (
    <main
      className={cn(
        'relative flex h-[calc(100dvh-var(--header-small-height))] w-full justify-end overflow-hidden overflow-x-hidden transition-[margin] md:h-[calc(100dvh-var(--header-height))] md:overflow-y-hidden md:pt-0',
        className
      )}
    >
      <AISidebar />
      <div className="flex-1 overflow-hidden">{children}</div>
    </main>
  );
}
