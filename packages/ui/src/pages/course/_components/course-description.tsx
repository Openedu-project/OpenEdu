import { useTranslations } from 'next-intl';
import { ExpandableText } from '#components/expandable-text';
import { CourseSection } from './course-section';

export function DetailsToKnow({ description }: { description: string }) {
  const tCourse = useTranslations('courseOutline');

  return (
    <>
      {description?.length > 0 && (
        <CourseSection title={tCourse('detailsToKnow')}>
          <ExpandableText content={description} />
        </CourseSection>
      )}
    </>
  );
}
