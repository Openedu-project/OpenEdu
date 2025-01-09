import AIBg from '@oe/assets/images/ai-bg.png';
import type { ReactNode } from 'react';
import { AISidebar } from '#components/conversation';
import { Image } from '#components/image';
import { cn } from '#utils/cn';

type Props = {
  children: ReactNode;
};

export default function AILayout({ children }: Props) {
  return (
    <main className={cn('overflow-x-hidden transition-[margin] md:overflow-y-hidden md:pt-0')}>
      <div className="relative flex h-[calc(100vh-var(--header-small-height))] w-full justify-end overflow-hidden md:h-[calc(100vh-var(--header-height))]">
        <AISidebar className="bg-primary/5" />
        <div className="horizontal-scrollbar relative flex-1 overflow-y-auto lg:max-w-[80%]">
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
    </main>
  );
}
