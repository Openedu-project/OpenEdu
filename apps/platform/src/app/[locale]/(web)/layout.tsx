import { MainLayout } from '@oe/ui/common/layout';
import { getTranslations } from 'next-intl/server';

import type { ReactNode } from 'react';

export default async function OpeneduLayout({
  children,
}: {
  children: ReactNode;
}) {
  const t = await getTranslations('headerMenu');
  const sidebarItems = [
    {
      id: 'ai-assistant',
      label: t('aiAssistant'),
      href: '#',
      isHighlight: true,
    },
    {
      id: 'courses',
      label: t('courses'),
      href: '#',
    },
    {
      id: 'blog',
      label: t('blog'),
      href: '#',
    },
    {
      id: 'launchpad',
      label: t('launchpad'),
      href: '#',
    },
    // {
    //   id: 'become-creator',
    //   label: t('becomeCreator'),
    //   href: '#',
    // },
  ];

  return <MainLayout sidebarItems={sidebarItems}>{children}</MainLayout>;
}
