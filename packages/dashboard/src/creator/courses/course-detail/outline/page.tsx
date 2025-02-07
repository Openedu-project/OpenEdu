'use client';

import { segmentSchema } from '@oe/api/schemas/courses/segmentSchema';
import { FormNestedWrapper } from '@oe/ui/components/form-wrapper';
import { useSegments } from '../_hooks/useSegments';
import { useOutlineStore } from '../_store/useOutlineStore';
import { LessonDetail } from './lesson-detail';
import SectionHeader from './section-header';
import { SectionsDrawer } from './sections-drawer';

export default function CourseDetailOutlinePage() {
  useSegments();
  const { activeSegment } = useOutlineStore();
  return (
    <div className="relative flex h-full flex-col gap-4 p-4">
      <FormNestedWrapper
        id="course-detail-outline"
        tabId="outline"
        schema={segmentSchema}
        useFormProps={{
          defaultValues: activeSegment,
        }}
        className="space-y-0"
      >
        <SectionHeader />
        <SectionsDrawer />
      </FormNestedWrapper>
      <LessonDetail />
    </div>
  );
}
