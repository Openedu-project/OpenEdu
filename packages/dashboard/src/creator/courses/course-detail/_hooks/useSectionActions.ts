import {
  type ICreateLessonPayload,
  createSegmentService,
  deleteSegmentService,
  updateBulkSegmentsService,
  updateSegmentService,
} from '@oe/api';
import { useGetCourseById } from '@oe/api';
import type { ISection, ISegment } from '@oe/api';
import { toast } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { buildOutlineRoute } from '../_utils/build-outline-route';
import { createDefaultLesson, createDefaultLessonContent, createDefaultSection } from '../_utils/default';
import { useGetSection } from './useGetSection';

export function useSectionActions() {
  const tCourse = useTranslations('course');
  const router = useRouter();

  const { courseId, sections, activeSection, mutateSections, mutateSection } = useGetSection();
  const { mutateCourse } = useGetCourseById(courseId);

  const handleAddSection = async () => {
    try {
      const sectionOrder = (sections?.length ?? 0) + 1;
      const newSection = await createSegmentService(
        undefined,
        createDefaultSection(courseId, {
          order: sectionOrder,
        }) as ICreateLessonPayload
      );
      const newLesson = await createSegmentService(
        undefined,
        createDefaultLesson(courseId, {
          parent_id: newSection.id,
        }) as ICreateLessonPayload
      );
      await updateSegmentService(undefined, {
        ...newLesson,
        contents: [
          createDefaultLessonContent({
            courseId,
            sectionId: newSection.id,
            lessonId: newLesson.id,
          }),
        ],
      });
      await Promise.all([mutateSections(), mutateCourse()]);
      const outlineRoute = buildOutlineRoute({
        courseId,
        sectionId: newSection.id,
        lessonId: newLesson.id,
      });
      if (outlineRoute) {
        router.push(outlineRoute);
      }

      toast.success(
        tCourse('common.toast.createSuccess', {
          item: tCourse('outline.section.title'),
        })
      );
    } catch {
      toast.error(
        tCourse('common.toast.createError', {
          item: tCourse('outline.section.title'),
        })
      );
    }
  };

  const handleDeleteSection = async () => {
    if (!activeSection) {
      return;
    }
    const activeSectionIndex = sections?.findIndex(section => section.id === activeSection.id) ?? -1;

    const previousSection = activeSectionIndex > 0 ? sections?.[activeSectionIndex - 1] : sections?.[0];

    try {
      if (previousSection?.lessons?.[0]?.id) {
        await deleteSegmentService(undefined, activeSection.id);
        await updateBulkSegmentsService(undefined, {
          course_id: courseId as string,
          sections:
            sections
              ?.filter(section => section.id !== activeSection.id)
              .map((section, index) => ({
                ...section,
                order: index,
              })) ?? [],
        });
        await Promise.all([mutateSections(), mutateCourse()]);
        const outlineRoute = buildOutlineRoute({
          courseId,
          sectionId: previousSection.id,
          lessonId: previousSection.lessons[0].id,
        });
        if (outlineRoute) {
          router.push(outlineRoute);
        }
        toast.success(
          tCourse('common.toast.deleteSuccess', {
            item: tCourse('outline.section.title'),
          })
        );
      } else {
        throw new Error('No lesson found');
      }
    } catch {
      toast.error(
        tCourse('common.toast.deleteError', {
          item: tCourse('outline.section.title'),
        })
      );
    }
  };

  const handleDuplicateSection = async () => {
    if (!(activeSection && sections)) {
      return;
    }
    try {
      const newSection = await createSegmentService(undefined, {
        ...activeSection,
        id: undefined,
        title: `${activeSection.title} (${tCourse('common.copy')})`,
        lessons: undefined,
      });

      sections.splice(sections.findIndex(section => section.id === activeSection.id) + 1, 0, {
        ...newSection,
        lessons:
          activeSection.lessons?.map(lesson => ({
            ...lesson,
            id: undefined as unknown as string,
            parent_id: newSection.id,
            contents: lesson.contents?.map(content => ({
              ...content,
              id: undefined as unknown as string,
              lesson_id: undefined as unknown as string,
              section_id: newSection.id,
            })),
          })) ?? null,
      });

      const newSections = await updateBulkSegmentsService(undefined, {
        course_id: courseId as string,
        sections: sections.map((section, index) => ({
          ...section,
          order: index,
        })),
      });

      await Promise.all([mutateSections(), mutateCourse()]);
      const newActiveSection = newSections.find(section => section.id === newSection.id);

      const outlineRoute = buildOutlineRoute({
        courseId,
        sectionId: newActiveSection?.id,
        lessonId: newActiveSection?.lessons?.[0]?.id,
      });
      if (outlineRoute) {
        router.push(outlineRoute);
      }
      toast.success(
        tCourse('common.toast.duplicateSuccess', {
          item: tCourse('outline.section.title'),
        })
      );
    } catch {
      toast.error(
        tCourse('common.toast.duplicateError', {
          item: tCourse('outline.section.title'),
        })
      );
    }
  };

  const handleUpdateSection = async (data: Partial<ISegment>, showToast = true) => {
    try {
      await updateSegmentService(undefined, {
        ...data,
      } as ISegment);

      await Promise.all([mutateSections(), mutateSection(), mutateCourse()]);

      if (showToast) {
        toast.success(
          tCourse('common.toast.updateSuccess', {
            item: tCourse('outline.section.title'),
          })
        );
      }
    } catch {
      toast.error(
        tCourse('common.toast.updateError', {
          item: tCourse('outline.section.title'),
        })
      );
    }
  };

  const handleSortSections = async (sections: ISection[]) => {
    try {
      const newSections = sections.map((section, index) => ({
        ...section,
        order: index,
      }));
      await updateBulkSegmentsService(undefined, {
        course_id: courseId as string,
        sections: newSections,
      });
      await Promise.all([mutateSections(), mutateCourse()]);
    } catch {
      toast.error(
        tCourse('common.toast.sortError', {
          item: tCourse('outline.section.title'),
        })
      );
    }
  };
  return {
    sections,
    activeSection,
    handleAddSection,
    handleDeleteSection,
    handleDuplicateSection,
    handleUpdateSection,
    handleSortSections,
  };
}
