import type { ICoursesCounting } from '@oe/api/types/my-learning-space';
import type { IUser } from '@oe/api/types/user';
import DocumentDownload from '@oe/assets/icons/document-download';
import Edit from '@oe/assets/icons/edit';
import TaskSquare from '@oe/assets/icons/task-square';
import { LEARNER_ROUTES } from '@oe/core/utils/routes';
import { useTranslations } from 'next-intl';
import DashboardMyCertificates from './my-certificates';
import MyInProgressCourse from './my-in-progress-course';
import MyLearningHistory from './my-learning-history';
import StatusCard from './status-card';
import WelcomeBanner from './welcome';

interface IDashboardContentProps {
  coursesCountingData: ICoursesCounting;
  userData: IUser | null;
}
export default function DashboardContent({ coursesCountingData, userData }: IDashboardContentProps) {
  const tLearnerDashboard = useTranslations('myLearningSpace.dashboard');

  const courseStatus = [
    {
      label: tLearnerDashboard('inProgressCourse'),
      amount: coursesCountingData?.in_progress ?? 0,
      href: LEARNER_ROUTES.coursesInProgress,
      icon: <Edit color="#FD77F3" />,
      color: '#FFF0FE',
    },
    {
      label: tLearnerDashboard('completed'),
      amount: coursesCountingData?.completed ?? 0,
      href: LEARNER_ROUTES.coursesCompleted,
      icon: <DocumentDownload color="#FFBD04" />,
      color: '#FFF6DC',
    },
    {
      label: tLearnerDashboard('notStartedCourse'),
      amount: coursesCountingData?.not_started ?? 0,
      href: LEARNER_ROUTES.coursesNotStarted,
      icon: <TaskSquare color="#33C639" />,
      color: '#E1F7E2',
    },
  ];

  const username = userData && userData?.display_name?.length > 0 ? userData?.display_name : (userData?.username ?? '');

  return (
    <div className="space-y-4 py-6">
      <WelcomeBanner username={username} avatar={userData?.avatar ?? ''} />

      <div className="mb-6 flex w-full flex-col flex-wrap justify-between gap-4 sm:flex-row">
        {courseStatus.map((card, index) => (
          <StatusCard
            key={index}
            label={card.label}
            icon={card.icon}
            color={card.color}
            amount={card.amount}
            href={card.href}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <MyInProgressCourse />
        <DashboardMyCertificates me={userData} />
      </div>

      <div className="grid grid-cols-1 gap-5">
        <MyLearningHistory />
      </div>
    </div>
  );
}
