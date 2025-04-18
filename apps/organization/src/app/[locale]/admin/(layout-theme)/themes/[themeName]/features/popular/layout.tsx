import type { ReactNode } from "react";

export default function FeatureContentLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <div className="flex h-full overflow-y-scroll">{children}</div>;
}
