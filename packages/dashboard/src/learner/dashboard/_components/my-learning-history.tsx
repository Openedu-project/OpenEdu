import { CourseComingSoon } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { SectionCard } from './section-card';

export function MyLearningHistory() {
  const tLearnerDashboard = useTranslations('myLearningSpace.dashboard');

  return (
    <SectionCard title={tLearnerDashboard('learningHistory')}>
      <CourseComingSoon />
    </SectionCard>
  );
}
