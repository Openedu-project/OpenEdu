import BlogLayout from '@oe/dashboard/blog-admin/layout';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return <BlogLayout>{children}</BlogLayout>;
}
