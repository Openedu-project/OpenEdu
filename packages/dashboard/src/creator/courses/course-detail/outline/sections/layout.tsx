import type { ReactNode } from 'react';
import SectionHeader from './section-header';

export default function SectionsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-full flex-col gap-2 px-4 py-2" id="outline-container">
      <SectionHeader />
      {children}
    </div>
  );
}
