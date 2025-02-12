import { useGetSegmentById, useGetSegments } from '@oe/api/hooks/useCourse';
import { createSegmentService, updateBulkSegmentsService, updateSegmentService } from '@oe/api/services/course';
import type { ISection } from '@oe/api/types/course/segment';
import { CREATOR_ROUTES } from '@oe/core/utils/routes';
import { buildUrl } from '@oe/core/utils/url';
import { useRouter } from '@oe/ui/common/navigation';
import { DndSortable, DndSortableDragButton } from '@oe/ui/components/dnd-sortable';
import { StatusBadge } from '@oe/ui/components/status-badge';
import { Button } from '@oe/ui/shadcn/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@oe/ui/shadcn/sheet';
import { toast } from '@oe/ui/shadcn/sonner';
import { cn } from '@oe/ui/utils/cn';
import { XCircle } from 'lucide-react';
import { PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { type ReactNode, useState } from 'react';

export const SectionsDrawer = ({ trigger }: { trigger?: ReactNode }) => {
  const { courseId, sectionId } = useParams<{
    courseId: string;
    sectionId: string;
  }>();
  const tOutline = useTranslations('courses.outline');
  const router = useRouter();
  // const { openSectionDrawer, setOpenSectionDrawer } = useOutlineStore();

  const { segments: sections, mutateSegments } = useGetSegments({
    course_id: courseId as string,
  });
  const { segment: activeSection } = useGetSegmentById(sectionId);

  const [loading, setLoading] = useState(false);
  const [updateSectionsLoading, setUpdateSectionsLoading] = useState(false);

  const handleCreateSection = async () => {
    setLoading(true);
    try {
      const sectionOrder = (sections?.length ?? 0) + 1;
      const newSection = await createSegmentService(undefined, {
        course_id: courseId as string,
        title: `Section ${sectionOrder}`,
        note: '',
        order: sectionOrder,
        free: true,
        status: 'draft',
      });
      const newLesson = await createSegmentService(undefined, {
        course_id: courseId as string,
        title: 'Lesson 1',
        note: '',
        order: 0,
        free: true,
        parent_id: newSection.id,
        status: 'draft',
      });
      await updateSegmentService(undefined, {
        ...newLesson,
        contents: [
          {
            course_id: courseId,
            section_id: newSection.id,
            lesson_id: newLesson.id,
            content: 'Text content for lesson 1',
            status: 'draft',
            title: 'Text content for lesson 1',
            note: '',
            free: true,
            order: 0,
            type: 'text',
            duration: 0,
          },
        ],
      });
      await mutateSegments();
      router.push(
        buildUrl({
          endpoint: CREATOR_ROUTES.courseOutline,
          params: {
            courseId,
            sectionId: newSection.id,
            lessonId: newLesson.id,
          },
        })
      );
    } catch {
      toast.error('Failed to create section');
    }
    setLoading(false);
  };

  const handleSelectSection = (section: ISection) => {
    router.push(
      buildUrl({
        endpoint: CREATOR_ROUTES.courseOutline,
        params: {
          courseId,
          sectionId: section.id,
          lessonId: section.lessons?.[0]?.id,
        },
      })
    );
  };

  const handleSortSections = async (sections: ISection[]) => {
    setUpdateSectionsLoading(true);
    try {
      const newSections = sections.map((section, index) => ({
        ...section,
        order: index,
      }));
      await updateBulkSegmentsService(undefined, {
        course_id: courseId as string,
        sections: newSections,
      });
      await mutateSegments();
    } catch {
      toast.error('Failed to update sections');
    }
    setUpdateSectionsLoading(false);
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent
          side="left"
          className="absolute top-0 left-0 w-[300px] p-0"
          container={
            typeof window !== 'undefined' ? (document.getElementById('outline-container') ?? document.body) : undefined
          }
          overlayClassName="bg-transparent"
          hasCloseButton={false}
        >
          <SheetHeader>
            <SheetTitle hidden />
            <SheetDescription hidden />
          </SheetHeader>
          <div className="p-4">
            <Button
              variant="outline"
              className="flex w-full items-center justify-center gap-2 text-blue-600 hover:bg-background/80 hover:text-primary/80"
              size="sm"
              onClick={handleCreateSection}
              loading={loading}
              disabled={loading}
              title="Create Section"
            >
              <PlusIcon className="h-4 w-4" />
              {tOutline('addSection')}
            </Button>
            <SheetClose
              // variant="ghost"
              className="-right-4 absolute top-1 flex h-8 w-8 items-center justify-center rounded-full bg-background p-0 hover:bg-background/80 hover:text-primary"
              // onClick={() => setOpenSectionDrawer(false)}
              title="Close Section Drawer"
            >
              <XCircle className="h-4 w-4" />
            </SheetClose>
          </div>
          {/* Section Input Rows */}
          <DndSortable<ISection, unknown>
            data={sections || []}
            dataConfig={{
              idProp: 'id',
              type: 'array',
              direction: 'vertical',
            }}
            className="scrollbar flex flex-col gap-2 overflow-y-auto p-4 pt-0"
            loading={updateSectionsLoading}
            renderConfig={{
              renderItem: ({ item }) => (
                <div
                  className={cn(
                    'flex cursor-pointer items-center gap-2 rounded-md border bg-background p-2',
                    item?.original.id === activeSection?.id && 'border-primary',
                    !item?.original.title && 'border-destructive'
                  )}
                  title={item?.original.title}
                  onClick={() => handleSelectSection(item?.original)}
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
            onChange={handleSortSections}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};
