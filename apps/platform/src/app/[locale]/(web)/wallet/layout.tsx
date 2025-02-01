import type { ReactNode } from "react";

export default function WalletLayout({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto min-h-screen bg-muted px-2 py-4 sm:p-6">
      {children}
    </main>
  );
}
