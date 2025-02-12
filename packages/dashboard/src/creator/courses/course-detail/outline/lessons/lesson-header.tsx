'use client';
import { useGetSegmentById } from '@oe/api/hooks/useCourse';
import { deleteSegmentService, updateSegmentService } from '@oe/api/services/course';
import type { ISegment } from '@oe/api/types/course/segment';
import { CREATOR_ROUTES } from '@oe/core/utils/routes';
import { buildUrl } from '@oe/core/utils/url';
import { DeleteButton } from '@oe/ui/components/delete-button';
import { Button } from '@oe/ui/shadcn/button';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { Input } from '@oe/ui/shadcn/input';
import { toast } from '@oe/ui/shadcn/sonner';
import { Menu, SaveIcon, Trash2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { LessonDrawer } from './lesson-drawer';

export function LessonHeader() {
  const { courseId, sectionId, lessonId } = useParams<{
    courseId: string;
    sectionId: string;
    lessonId: string;
  }>();

  // const { activeLesson, activeSegment, activeLessons, updateLesson } =
  //   useOutlineStore();

  // const { watch } = useFormContext();

  // useEffect(() => {
  //   const subscription = watch((value, { name }) => {
  //     if (name === "title" && activeLesson && activeSegment) {
  //       const newTitle = value.title;
  //       const newActiveLesson = {
  //         ...activeLesson,
  //         title: newTitle,
  //       };
  //       updateLesson(activeSegment.id, activeLesson.id, newActiveLesson);
  //     }
  //   });

  //   return () => subscription.unsubscribe();
  // }, [activeLesson, activeSegment, updateLesson, watch]);
  // const { openLessonDrawer, setOpenLessonDrawer } = useOutlineStore();
  const router = useRouter();
  // const [edit, setEdit] = useState(false);

  const { segment: activeSection, mutateSegment } = useGetSegmentById(sectionId);

  const activeLessons = activeSection?.lessons ?? [];

  const activeLesson = activeLessons.find(lesson => lesson.id === lessonId);

  const handleDeleteLesson = async () => {
    if (!(activeSection && activeLesson?.id)) {
      return;
    }
    const activeLessonIndex = activeLessons?.findIndex(lesson => lesson.id === activeLesson.id) ?? -1;

    const previousLesson = activeLessonIndex > 0 ? activeLessons?.[activeLessonIndex - 1] : activeLessons?.[0];

    try {
      await deleteSegmentService(undefined, activeLesson?.id);
      await updateSegmentService(undefined, {
        ...activeSection,
        lessons: activeLessons
          .filter(lesson => lesson.id !== activeLesson.id)
          .map((lesson, index) => ({
            ...lesson,
            order: index,
          })),
      } as ISegment);
      await mutateSegment();
      router.push(
        buildUrl({
          endpoint: CREATOR_ROUTES.courseOutline,
          params: { courseId, sectionId, lessonId: previousLesson?.id },
        })
      );
      toast.success('Lesson deleted successfully');
    } catch {
      toast.error('Failed to delete lesson');
    }
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex w-full gap-2 space-y-0">
        <LessonDrawer
          trigger={
            <Button
              variant="ghost"
              size="xs"
              className="flex h-8 w-8 p-0 md:hidden"
              // onClick={() => setOpenLessonDrawer(!openLessonDrawer)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          }
        />
        <FormFieldWithLabel name="title" className="w-full" showErrorMessage={false}>
          <Input type="text" className="h-8" />
        </FormFieldWithLabel>
      </div>
      <div className="flex items-center gap-2">
        {activeLessons.length > 1 && (
          <DeleteButton
            title="Delete Lesson"
            description="All lessons and contents in this section will also be deleted. Are you sure you want to proceed?"
            onDelete={handleDeleteLesson}
            variant="outline"
          >
            <Trash2 className="h-4 w-4" />
          </DeleteButton>
        )}
        <Button
          variant="outline"
          className="gap-2 border-primary text-primary hover:bg-primary/90 hover:text-primary-foreground"
          size="xs"
          type="submit"
        >
          <SaveIcon className="h-4 w-4" />
          Save
        </Button>
      </div>
    </div>
  );
}
