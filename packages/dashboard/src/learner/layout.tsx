import { Bookmark, DocumentDownload, DocumentFill, Edit, Note2, School, TaskSquare } from '@oe/assets';
import { LEARNER_ROUTES } from '@oe/core';
import { DashboardLayout } from '@oe/ui';
import { House } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';

export async function LearnerLayout({ children }: { children: ReactNode }) {
  const [tDashboard] = await Promise.all([getTranslations('dashboard')]);

  const filteredMenu = [
    {
      id: 'dashboard',
      label: tDashboard('dashboard'),
      icon: <House className="h-5 w-5" />,
      href: LEARNER_ROUTES.dashboard,
      isRoot: true,
    },
    {
      id: 'my-courses',
      label: tDashboard('learner.myCourse'),
      icon: <DocumentFill className="h-5 w-5" />,
      items: [
        {
          id: 'all-courses',
          label: tDashboard('learner.allCourse'),
          icon: <Note2 className="h-5 w-5" />,
          href: LEARNER_ROUTES.myCourses,
          isRoot: true,
        },
        {
          id: 'in-progress',
          label: tDashboard('learner.inProgress'),
          icon: <Edit className="h-5 w-5" />,
          href: LEARNER_ROUTES.coursesInProgress,
        },
        {
          id: 'not-started',
          label: tDashboard('learner.notStarted'),
          icon: <DocumentDownload className="h-5 w-5" color="#2C2C2C" />,
          href: LEARNER_ROUTES.coursesNotStarted,
        },
        {
          id: 'completed',
          label: tDashboard('learner.completed'),
          icon: <TaskSquare className="h-5 w-5" />,
          href: LEARNER_ROUTES.coursesCompleted,
        },
      ],
    },
    {
      id: 'my-certificates',
      label: tDashboard('learner.myCertificates'),
      icon: <School className="h-5 w-5" />,
      href: LEARNER_ROUTES.myCertificates,
    },
    {
      id: 'wishlist',
      label: tDashboard('learner.wishlist'),
      icon: <Bookmark className="h-5 w-5" />,
      href: LEARNER_ROUTES.wishlist,
    },
  ];

  return (
    <DashboardLayout className="p-4 pt-0" sidebarItems={filteredMenu}>
      {children}
    </DashboardLayout>
  );
}
