import { useGetSegmentById, useGetSegments } from '@oe/api/hooks/useCourse';
import type { ISectionSchema } from '@oe/api/schemas/courses/segmentSchema';
import { sectionSchema } from '@oe/api/schemas/courses/segmentSchema';
import {
  createSegmentService,
  deleteSegmentService,
  updateBulkSegmentsService,
  updateSegmentService,
} from '@oe/api/services/course';
import type { ISegment } from '@oe/api/types/course/segment';
import { CREATOR_ROUTES } from '@oe/core/utils/routes';
import { buildUrl } from '@oe/core/utils/url';
import { useRouter } from '@oe/ui/common/navigation';
import { DeleteButton } from '@oe/ui/components/delete-button';
import { FormWrapper } from '@oe/ui/components/form-wrapper';
import { Button } from '@oe/ui/shadcn/button';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { Input } from '@oe/ui/shadcn/input';
import { toast } from '@oe/ui/shadcn/sonner';
import { Check, CopyIcon, PencilLine, Trash2 } from 'lucide-react';
import { MenuIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import StatusBadge from '../../../_components/status-badge';
import { useOutlineStore } from '../../_store/useOutlineStore';
import { COURSE_DETAIL_FORM_IDS } from '../../_utils/constants';

export default function SectionHeader() {
  const { courseId, sectionId } = useParams<{
    courseId: string;
    sectionId: string;
  }>();
  const { openSectionDrawer, setOpenSectionDrawer } = useOutlineStore();
  const router = useRouter();
  const { segments: sections, mutateSegments } = useGetSegments({
    course_id: courseId as string,
  });
  const { segment: activeSection, mutateSegment } = useGetSegmentById(sectionId);
  const [edit, setEdit] = useState(false);
  const [duplicateLoading, setDuplicateLoading] = useState(false);

  const handleDeleteSection = async (onClose?: () => void) => {
    if (!activeSection) {
      return;
    }
    const activeSectionIndex = sections?.findIndex(section => section.id === activeSection.id) ?? -1;

    const previousSection = activeSectionIndex > 0 ? sections?.[activeSectionIndex - 1] : sections?.[0];

    try {
      if (previousSection?.lessons?.[0]?.id) {
        await deleteSegmentService(undefined, activeSection.id);
        await mutateSegments();

        router.push(
          buildUrl({
            endpoint: CREATOR_ROUTES.courseOutline,
            params: {
              courseId,
              sectionId: previousSection.id,
              lessonId: previousSection.lessons[0].id,
            },
          })
        );
        toast.success('Section deleted successfully');
      } else {
        throw new Error('No lesson found');
      }
    } catch {
      toast.error('Failed to delete section');
    }
    onClose?.();
  };

  const handleSaveSection = async (data: ISectionSchema) => {
    if (activeSection?.title !== data.title) {
      try {
        await updateSegmentService(undefined, {
          ...(activeSection as ISegment),
          title: data.title,
        } as ISegment);
        await mutateSegments();
        await mutateSegment();
        toast.success('Section title updated successfully');
      } catch {
        toast.error('Failed to update section title');
      }
    }
    setEdit(false);
  };

  const handleDuplicateSection = async () => {
    if (!(activeSection && sections)) {
      return;
    }

    setDuplicateLoading(true);
    try {
      const newSection = await createSegmentService(undefined, {
        ...activeSection,
        id: undefined,
        title: `${activeSection.title} (Copy)`,
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

      await mutateSegments();
      const newActiveSection = newSections.find(section => section.id === newSection.id);

      if (newActiveSection?.lessons?.[0]?.id) {
        router.push(
          buildUrl({
            endpoint: CREATOR_ROUTES.courseOutline,
            params: {
              courseId,
              sectionId: newActiveSection.id,
              lessonId: newActiveSection.lessons?.[0]?.id,
            },
          })
        );
      }
      toast.success('Section duplicated successfully');
    } catch {
      toast.error('Failed to duplicate section');
    }
    setDuplicateLoading(false);
  };

  return (
    <div className="flex items-center gap-4 rounded-md border bg-background p-2">
      <div className="flex flex-1 items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpenSectionDrawer(!openSectionDrawer)}
          title="Open Section Drawer"
        >
          <MenuIcon className="h-4 w-4" />
        </Button>
        {edit ? (
          <FormWrapper
            id={COURSE_DETAIL_FORM_IDS.sectionHeader}
            schema={sectionSchema}
            useFormProps={{
              defaultValues: activeSection as ISectionSchema,
            }}
            onSubmit={handleSaveSection}
            className="flex w-full gap-2 space-y-0"
          >
            {({ loading }) => (
              <>
                <FormFieldWithLabel name="title" formMessageClassName="hidden" className="w-full">
                  <Input type="text" className="h-8" />
                </FormFieldWithLabel>
                <Button size="xs" type="submit" disabled={loading} loading={loading} title="Save Section">
                  <Check className="h-4 w-4" />
                </Button>
              </>
            )}
          </FormWrapper>
        ) : (
          <div className="flex items-center gap-2">
            <span className="giant-iheading-semibold16">{activeSection?.title}</span>
            <Button variant="ghost" size="xs" onClick={() => setEdit(true)} title="Edit Section">
              <PencilLine className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <StatusBadge status={activeSection?.status} />
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={handleDuplicateSection}
          disabled={duplicateLoading}
          loading={duplicateLoading}
          title="Duplicate Section"
        >
          <CopyIcon className="h-4 w-4" />
        </Button>
        {(sections?.length ?? 0) > 1 && (
          <DeleteButton
            title="Delete Section"
            description="All lessons and contents in this section will also be deleted. Are you sure you want to proceed?"
            onDelete={handleDeleteSection}
            variant="outline"
          >
            <Trash2 className="h-4 w-4" />
          </DeleteButton>
        )}
      </div>
    </div>
  );
}
