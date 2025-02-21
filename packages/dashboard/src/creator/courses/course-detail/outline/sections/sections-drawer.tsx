'use client';
import type { ISection } from '@oe/api/types/course/segment';
import { CREATOR_ROUTES } from '@oe/core/utils/routes';
import { buildUrl } from '@oe/core/utils/url';
import { useRouter } from '@oe/ui/common/navigation';
import { DndSortable, DndSortableDragButton } from '@oe/ui/components/dnd-sortable';
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
import { cn } from '@oe/ui/utils/cn';
import { XCircle } from 'lucide-react';
import { PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { type ReactNode, useEffect, useState } from 'react';
import { SegmentBadgeSelect } from '../../../_components/segment-badge-select';
import { useSectionActions } from '../../_hooks/useSectionActions';

export const SectionsDrawer = ({ trigger }: { trigger?: ReactNode }) => {
  const tOutline = useTranslations('course.outline');
  const router = useRouter();
  const { sections, activeSection, handleSortSections, handleAddSection } = useSectionActions();
  const { courseId } = useParams<{
    courseId: string;
  }>();

  const [container, setContainer] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setContainer(document.getElementById('outline-container'));
  }, []);

  const [loading, setLoading] = useState(false);
  const [updateSectionsLoading, setUpdateSectionsLoading] = useState(false);

  const handleCreateSection = async () => {
    setLoading(true);
    await handleAddSection();
    setLoading(false);
  };

  const handleSelectSection = (section: ISection) => {
    const minOrder = Math.min(...(section.lessons?.map(lesson => lesson.order) ?? []));
    const buildOutlineRoute = buildUrl({
      endpoint: CREATOR_ROUTES.courseOutline,
      params: {
        courseId,
        sectionId: section.id,
        lessonId: section.lessons?.find(lesson => lesson.order === minOrder)?.id ?? section.lessons?.[minOrder]?.id,
      },
    });
    if (buildOutlineRoute) {
      router.push(buildOutlineRoute);
    }
  };

  const onSortSections = async (sections: ISection[]) => {
    setUpdateSectionsLoading(true);
    await handleSortSections(sections);
    setUpdateSectionsLoading(false);
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent
          side="left"
          className="absolute top-0 left-0 w-[300px] p-0"
          container={container}
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
              {tOutline('section.actions.addNew')}
            </Button>
            <SheetClose
              className="-right-4 absolute top-1 flex h-8 w-8 items-center justify-center rounded-full bg-background p-0 hover:bg-background/80 hover:text-primary"
              title="Close Section Drawer"
            >
              <XCircle className="h-4 w-4" />
            </SheetClose>
          </div>
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
                  <SegmentBadgeSelect
                    className="ml-auto"
                    status={item?.original.status}
                    data={item?.original}
                    type="section"
                  />
                </div>
              ),
            }}
            onChange={onSortSections}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};
