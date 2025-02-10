'use client';
import { useGetSegmentById } from '@oe/api/hooks/useCourse';
import type { ILessonSchema } from '@oe/api/schemas/courses/segmentSchema';
import { lessonSchema } from '@oe/api/schemas/courses/segmentSchema';
import { deleteSegmentService } from '@oe/api/services/course';
import { CREATOR_ROUTES } from '@oe/core/utils/routes';
import { buildUrl } from '@oe/core/utils/url';
import { DeleteButton } from '@oe/ui/components/delete-button';
import { FormNestedWrapper, SubmitFormsButton } from '@oe/ui/components/form-wrapper';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { Input } from '@oe/ui/shadcn/input';
import { toast } from '@oe/ui/shadcn/sonner';
import { SaveIcon, Trash2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { COURSE_DETAIL_FORM_IDS } from '../../_utils/constants';

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

  // const handleSaveLesson = async (data: ILessonSchema) => {
  //   if (!(activeSection && activeLesson?.id)) {
  //     return;
  //   }
  //   if (activeLesson.title === data.title) {
  //     setEdit(false);
  //     return;
  //   }
  //   try {
  //     await updateSegmentService(undefined, {
  //       ...activeLesson,
  //       title: data.title,
  //     } as ISegment);
  //     await mutateSegment();
  //     toast.success("Lesson saved successfully");
  //   } catch {
  //     toast.error("Failed to save lesson");
  //   }
  //   setEdit(false);
  // };

  return (
    <div className="flex items-center justify-between gap-2">
      <FormNestedWrapper
        id={COURSE_DETAIL_FORM_IDS.lessonTitle}
        schema={lessonSchema}
        useFormProps={{
          defaultValues: activeLesson as ILessonSchema,
        }}
        // onSubmit={handleSaveLesson}
        className="flex w-full gap-2 space-y-0"
      >
        <FormFieldWithLabel name="title" formMessageClassName="hidden" className="w-full">
          <Input type="text" className="h-8" />
        </FormFieldWithLabel>
      </FormNestedWrapper>
      <div className="flex items-center gap-2">
        {/* <Button
          variant="outline"
          type="submit"
          className="gap-2 border-primary text-primary hover:bg-primary/90 hover:text-primary-foreground"
          size="xs"
        >
          <SaveIcon className="h-4 w-4" />
          Save
        </Button> */}
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
        <SubmitFormsButton
          variant="outline"
          className="gap-2 border-primary text-primary hover:bg-primary/90 hover:text-primary-foreground"
          size="xs"
        >
          <SaveIcon className="h-4 w-4" />
          Save
        </SubmitFormsButton>
      </div>
    </div>
  );
}
