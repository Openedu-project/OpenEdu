import type { ReactNode } from 'react';
import { LessonsPanel } from './lessons-panel';

export function LessonsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full justify-center gap-2 overflow-hidden">
      <LessonsPanel />
      <div className="scrollbar flex w-full max-w-7xl flex-col gap-2 overflow-y-auto rounded-md bg-background p-4">
        {children}
      </div>
    </div>
  );
}
