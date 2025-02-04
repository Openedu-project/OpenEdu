import Bookmark from '@oe/assets/icons/bookmark';
import DocumentDownload from '@oe/assets/icons/document-download';
import DocumentFill from '@oe/assets/icons/document-fill';
import Edit from '@oe/assets/icons/edit';
import Note2 from '@oe/assets/icons/note-2';
import School from '@oe/assets/icons/school';
import TaskSquare from '@oe/assets/icons/task-square';
import { LEARNER_ROUTES } from '@oe/core/utils/routes';
import { DashboardLayout } from '@oe/ui/common/layout';
import { House } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';

export default async function LearnerLayout({
  children,
}: {
  children: ReactNode;
}) {
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
