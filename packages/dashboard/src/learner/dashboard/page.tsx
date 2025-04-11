import { getMeServiceWithoutError } from '@oe/api';
import { getCoursesCountingService } from '@oe/api';
import { DashboardContent } from './_components/dashboard';

export async function LearnerDashboard() {
  const me = await getMeServiceWithoutError();
  const courseCountData = await getCoursesCountingService(undefined, {});

  return <DashboardContent coursesCountingData={courseCountData} userData={me} />;
}
