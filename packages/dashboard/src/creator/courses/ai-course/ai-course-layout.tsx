import { cn } from '@oe/ui/utils/cn';
import type { ReactNode } from 'react';
import { AICourseNavMenu } from './_components/ai-course-nav';

export default function AICourseLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex w-full items-center justify-center">
        <AICourseNavMenu />
      </div>
      <div className="grow overflow-hidden rounded p-4">
        <div className={cn('scrollbar m-auto h-full max-w-4xl overflow-auto rounded-xl bg-background p-4 md:px-8')}>
          {children}
        </div>
      </div>
    </div>
  );
}
