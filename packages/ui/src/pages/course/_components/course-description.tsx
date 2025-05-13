import { ExpandableText } from '#components/expandable-text';
import { CourseSection } from './course-section';

export function DetailsToKnow({ description }: { description: string }) {
  return (
    <>
      {description?.length > 0 && (
        <CourseSection title="Details To Know">
          <ExpandableText
            content={description}
            // className="rounded-xl border border-foreground/20 p-4"
          />
        </CourseSection>
      )}
    </>
  );
}
