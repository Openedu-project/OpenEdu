'use client';
import { sectionSchema } from '@oe/api/schemas/courseSchema';
import { FormNestedWrapper } from '@oe/ui/components/form-wrapper';
import { useSegments } from '../_hooks/useSegments';
import { useOutlineStore } from '../_store/useOutlineStore';
import { LessonContent } from './lesson-content';
import SectionHeader from './section-header';
import { SectionsDrawer } from './sections-drawer';

export default function CourseDetailOutlinePage() {
  useSegments();
  const { activeSection } = useOutlineStore();
  return (
    <>
      <FormNestedWrapper
        id="course-detail-outline"
        tabId="outline"
        schema={sectionSchema}
        useFormProps={{
          defaultValues: activeSection,
        }}
        className="relative h-full space-y-0"
      >
        <div className="flex h-full flex-col gap-4 p-4">
          <SectionHeader />
          <LessonContent />
        </div>
        <SectionsDrawer />
      </FormNestedWrapper>
    </>
  );
}
