'use client';

import { useGetSegmentById } from '@oe/api/hooks/useCourse';
import { createSegmentService, updateSegmentService } from '@oe/api/services/course';
import type { ILesson } from '@oe/api/types/course/segment';
import { CREATOR_ROUTES } from '@oe/core/utils/routes';
import { buildUrl } from '@oe/core/utils/url';
import { DndSortable, DndSortableDragButton } from '@oe/ui/components/dnd-sortable';
import { StatusBadge } from '@oe/ui/components/status-badge';
import { Button } from '@oe/ui/shadcn/button';
import { toast } from '@oe/ui/shadcn/sonner';
import { cn } from '@oe/ui/utils/cn';
import { PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export function LessonsPanel() {
  const tOutline = useTranslations('courses.outline');
  // const {
  //   activeLesson,
  //   activeSegment,
  //   // addLesson,
  //   // setActiveLessons,
  //   // setActiveLesson,
  // } = useOutlineStore();
  const router = useRouter();
  const { courseId, sectionId, lessonId } = useParams<{
    courseId: string;
    sectionId: string;
    lessonId: string;
  }>();

  const { segment: activeSection, mutateSegment } = useGetSegmentById(sectionId);

  const [loading, setLoading] = useState(false);
  const [sorting, setSorting] = useState(false);

  const handleAddLesson = async () => {
    if (!activeSection) {
      return;
    }

    setLoading(true);
    try {
      const maxOrder = Math.max(...(activeSection.lessons?.map(lesson => lesson.order) ?? []));
      const newLessonTitle = `Lesson ${maxOrder + 1}`;
      const newLesson = await createSegmentService(undefined, {
        course_id: courseId as string,
        title: newLessonTitle,
        note: '',
        order: maxOrder + 1,
        free: true,
        parent_id: activeSection.id,
        status: 'draft',
      });
      await updateSegmentService(undefined, {
        ...newLesson,
        contents: [
          {
            course_id: courseId,
            section_id: activeSection.id,
            lesson_id: newLesson.id,
            content: `Text content for ${newLessonTitle}`,
            status: 'draft',
            title: newLessonTitle,
            note: '',
            free: true,
            order: 0,
            type: 'text',
            duration: 0,
          },
        ],
      });
      await mutateSegment();
      router.push(
        buildUrl({
          endpoint: CREATOR_ROUTES.courseOutline,
          params: { courseId, sectionId, lessonId: newLesson.id },
        })
      );
    } catch {
      toast.error('Failed to add lesson');
    }
    setLoading(false);
  };

  const handleSelectLesson = (lesson: ILesson) => {
    router.push(
      buildUrl({
        endpoint: CREATOR_ROUTES.courseOutline,
        params: { courseId, sectionId, lessonId: lesson.id },
      })
    );
  };

  const handleSortLessons = async (lessons: ILesson[]) => {
    if (!activeSection) {
      return;
    }

    setSorting(true);
    try {
      const updatedSection = await updateSegmentService(undefined, {
        ...activeSection,
        lessons: lessons.map((lesson, index) => ({
          ...lesson,
          order: index,
        })),
      });
      await mutateSegment(updatedSection);
    } catch {
      toast.error('Failed to sort lessons');
    }
    setSorting(false);
  };

  return (
    <div className="scrollbar flex w-[280px] shrink-0 cursor-pointer flex-col gap-2 overflow-y-auto px-1">
      <Button
        variant="outline"
        className="flex w-full items-center justify-center gap-2 text-blue-600 hover:bg-background/80 hover:text-primary/80"
        // size="sm"
        onClick={handleAddLesson}
        loading={loading}
        disabled={loading}
        title="Add Lesson"
      >
        <PlusIcon className="h-4 w-4" />
        {tOutline('addLesson')}
      </Button>
      <DndSortable<ILesson, unknown>
        data={activeSection?.lessons?.sort((a, b) => a.order - b.order) || []}
        dataConfig={{
          idProp: 'id',
          type: 'array',
          direction: 'vertical',
        }}
        className="flex flex-col gap-2"
        loading={sorting}
        renderConfig={{
          renderItem: ({ item }) => (
            <div
              className={cn(
                'flex items-center gap-2 rounded-md border border-transparent bg-background p-2 ',
                item?.original.id === lessonId && 'border-primary',
                !item?.original.title && 'border-destructive'
              )}
              title={item?.original.title}
              onClick={() => handleSelectLesson(item?.original)}
              onKeyDown={() => {
                void 0;
              }}
            >
              <DndSortableDragButton />
              <p className="truncate font-medium text-sm">{item?.original.title}</p>
              <StatusBadge status={item?.original.status} className="ml-auto" />
            </div>
          ),
        }}
        onChange={handleSortLessons}
      />
    </div>
  );
}
