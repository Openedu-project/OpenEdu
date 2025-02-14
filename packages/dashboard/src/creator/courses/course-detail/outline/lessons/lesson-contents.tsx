'use client';
import { useGetSegmentById } from '@oe/api/hooks/useCourse';
import { updateSegmentService } from '@oe/api/services/course';
import type { ILessonContent, ISegment } from '@oe/api/types/course/segment';
import { DndSortable, DndSortableDragButton } from '@oe/ui/components/dnd-sortable';
import { Button } from '@oe/ui/shadcn/button';
import { toast } from '@oe/ui/shadcn/sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@oe/ui/shadcn/tabs';
import { cn } from '@oe/ui/utils/cn';
import { PlusIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { type FieldErrors, useFormContext } from 'react-hook-form';
import { useOutlineStore } from '../../_store/useOutlineStore';
import { tabOptions } from './lesson-content-options';
import { LessonContentTabHeader } from './lesson-content-tab-header';

export function LessonContents() {
  const { sectionId, lessonId } = useParams<{
    courseId: string;
    sectionId: string;
    lessonId: string;
  }>();
  const { segment: activeSection, mutateSegment } = useGetSegmentById(sectionId);

  const activeLessons = activeSection?.lessons ?? [];

  const activeLesson = activeLessons.find(lesson => lesson.id === lessonId);
  const activeLessonContents = activeLesson?.contents?.sort((a, b) => a.order - b.order) ?? [];

  const { activeLessonContent, setActiveLessonContent } = useOutlineStore();

  const [isSorting, setIsSorting] = useState(false);

  const { formState } = useFormContext();

  const contentErrors = (formState.errors as unknown as Record<string, FieldErrors<ILessonContent>[]>).contents;

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (activeLessonContents[0] && !activeLessonContent) {
      setActiveLessonContent(activeLessonContents[0]);
    }
    return () => {
      if (activeLessonContent) {
        setActiveLessonContent(null);
      }
    };
  }, [lessonId, sectionId, activeLessonContents, setActiveLessonContent]);

  useEffect(() => {
    if (contentErrors) {
      let errorTabOrder: number | null = null;
      for (let i = 0; i < (contentErrors ?? []).length; i++) {
        if (contentErrors?.[i]) {
          errorTabOrder = i;
          break;
        }
      }
      if (errorTabOrder !== null) {
        setActiveLessonContent(activeLessonContents.find(content => content.order === errorTabOrder) ?? null);
      }
    }
  }, [contentErrors, activeLessonContents, setActiveLessonContent]);

  const handleAddLessonContent = async () => {
    try {
      const order = activeLessonContents.length;
      const newLesson = await updateSegmentService(undefined, {
        ...activeLesson,
        contents: [
          ...activeLessonContents,
          {
            status: 'draft',
            title: 'New Lesson Content',
            note: '',
            free: false,
            type: 'text',
            order,
            content: '',
            duration: 0,
          },
        ],
      } as ISegment);
      await mutateSegment();
      setActiveLessonContent(newLesson.contents?.find(content => content.order === order) ?? null);
    } catch {
      toast.error('Failed to add lesson content');
    }
  };

  const handleTabsChange = (value: string) => {
    setActiveLessonContent(activeLessonContents.find(content => content.id === value) ?? null);
  };

  const handleSortContents = async (items: ILessonContent[]) => {
    setIsSorting(true);
    try {
      await updateSegmentService(undefined, {
        ...activeLesson,
        contents: items.map((content, index) => ({
          ...content,
          order: index,
        })),
      } as ISegment);
      await mutateSegment();
    } catch {
      toast.error('Failed to sort lesson contents');
    }
    setIsSorting(false);
  };

  return (
    // <div className="mx-auto w-full max-w-3xl">
    <Tabs
      value={activeLessonContent?.id ?? activeLessonContents[0]?.id}
      onValueChange={handleTabsChange}
      className={cn('w-full')}
    >
      <div className="scrollbar flex items-center overflow-x-auto">
        <DndSortable<ILessonContent, ILessonContent>
          data={activeLessonContents}
          dataConfig={{
            idProp: 'id',
            type: 'array',
            direction: 'horizontal',
          }}
          className="gap-0"
          loading={isSorting}
          renderConfig={{
            className: 'flex-1',
            renderItem: ({ item }) => {
              const tabOption = tabOptions[item.original.type];
              // const hasError = !!errors.content || !!errors.files;
              return (
                <TabsList className="h-auto items-center justify-start p-0">
                  <TabsTrigger value={item.original.id ?? ''} asChild>
                    <div
                      className={cn(
                        'relative h-8 cursor-pointer rounded-b-none border-t border-r border-l bg-background',
                        'data-[state=active]:rounded-b-none data-[state=active]:border data-[state=active]:border-primary data-[state=active]:border-b-0 data-[state=active]:bg-muted data-[state=active]:font-semibold data-[state=active]:text-primary',
                        contentErrors?.[item.original.order] &&
                          'data-[state]:border-destructive data-[state]:text-destructive'
                      )}
                    >
                      <DndSortableDragButton className="mr-1 h-4 w-4" />
                      <div className="flex items-center gap-2">
                        {tabOption?.icon}
                        <span>{tabOption?.label}</span>
                      </div>
                    </div>
                  </TabsTrigger>
                </TabsList>
              );
            },
          }}
          onChange={handleSortContents}
        />
        <Button
          variant="default"
          size="icon"
          className="h-8 w-8 shrink-0 rounded-md rounded-b-none border-b-0"
          onClick={handleAddLessonContent}
        >
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>

      {activeLessonContents.map(content => {
        const tabOption = tabOptions[content.type];
        return (
          <TabsContent
            key={`${content.id}-${content.type}`}
            value={content.id ?? ''}
            className="mt-0 flex flex-1 flex-col overflow-hidden data-[state=inactive]:hidden"
            forceMount
          >
            <div className="space-y-0">
              <LessonContentTabHeader
                value={content.type}
                activeLessonContent={activeLessonContent ?? activeLessonContents[0]}
                activeLesson={activeLesson}
                hasErrors={!!contentErrors?.[content.order]}
              />
              <div
                className={cn(
                  'overflow-hidden border border-primary border-t-0',
                  contentErrors?.[content.order] && 'border-destructive'
                )}
              >
                {tabOption?.content(content, content.order)}
              </div>
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
    // </div>
  );
}
