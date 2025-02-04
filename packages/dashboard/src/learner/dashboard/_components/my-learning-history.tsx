import { CourseComingSoon } from '@oe/ui/components/course-coming-soon';
import { useTranslations } from 'next-intl';
import SectionCard from './section-card';

export default function MyLearningHistory() {
  const tLearnerDashboard = useTranslations('myLearningSpace.dashboard');

  return (
    <SectionCard title={tLearnerDashboard('learningHistory')}>
      <CourseComingSoon />
    </SectionCard>
  );
}
