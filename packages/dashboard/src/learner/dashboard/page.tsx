import { getMeServiceWithoutError } from '@oe/api/services/auth';
import { getCoursesCountingService } from '@oe/api/services/my-learning-space';
import DashboardContent from './_components/dashboard';

export default async function LearnerDashboard() {
  const me = await getMeServiceWithoutError();
  const courseCountData = await getCoursesCountingService(undefined, {});

  return <DashboardContent coursesCountingData={courseCountData} userData={me} />;
}
