import BlogLayoutNoSidebar from '@oe/dashboard/blog-admin/layout-no-siderbar';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return <BlogLayoutNoSidebar>{children}</BlogLayoutNoSidebar>;
}
