import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
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
      href: PLATFORM_ROUTES.courses,
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
  const subSidebarItems = [
    {
      id: 'learners',
      label: t('subSidebar.forLearners'),
      href: '#',
    },
    {
      id: 'educators',
      label: t('subSidebar.forEducators'),
      href: '#',
    },
    {
      id: 'organisations',
      label: t('subSidebar.forOrganisations'),
      href: '#',
    },
  ];

  return (
    <MainLayout sidebarItems={sidebarItems} subSidebarItems={subSidebarItems}>
      {children}
    </MainLayout>
  );
}
