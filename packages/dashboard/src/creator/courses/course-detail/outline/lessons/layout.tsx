import type { ReactNode } from 'react';
import { LessonsPanel } from './lessons-panel';

export function LessonsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full justify-center overflow-hidden">
      <div className="relative flex w-full max-w-7xl gap-2" id="lesson-drawer-container">
        <LessonsPanel className="hidden md:flex" />
        <div className="scrollbar flex w-full flex-1 flex-col gap-2 overflow-y-auto rounded-md bg-background p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
