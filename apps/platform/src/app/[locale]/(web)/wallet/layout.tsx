import type { ReactNode } from 'react';

export default function WalletLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F9FBFF]">
      <main className="container mx-auto py-4 px-2 sm:p-6">{children}</main>
    </div>
  );
}
