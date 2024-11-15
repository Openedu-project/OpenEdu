import type { ReactNode } from 'react';
import '@oe/core/global.css';

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return children;
}
