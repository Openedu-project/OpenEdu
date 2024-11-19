import type { ReactNode } from 'react';

export default function AuthCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <h1 className="giant-iheading-semibold20 mb-4 text-primary md:mb-6">{title}</h1>
      {children}
    </>
  );
}
