'use client';
import { useGetSegmentById } from '@oe/api/hooks/useCourse';
import { updateSegmentService } from '@oe/api/services/course';
import type { ILessonContent, ISegment } from '@oe/api/types/course/segment';
import type { z } from '@oe/api/utils/zod';
import { DndSortable, DndSortableDragButton } from '@oe/ui/components/dnd-sortable';
import { FormNestedWrapper } from '@oe/ui/components/form-wrapper';
import { Button } from '@oe/ui/shadcn/button';
import { toast } from '@oe/ui/shadcn/sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@oe/ui/shadcn/tabs';
import { cn } from '@oe/ui/utils/cn';
import { PlusIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
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

  const [activeLessonContent, setActiveLessonContent] = useState<ILessonContent | undefined>(activeLessonContents[0]);

  const [isSorting, setIsSorting] = useState(false);

  const [errors] = useState<Record<string, z.ZodError>>({});

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
      setActiveLessonContent(newLesson.contents?.find(content => content.order === order));
    } catch {
      toast.error('Failed to add lesson content');
    }
  };

  const handleTabsChange = (value: string) => {
    setActiveLessonContent(activeLessonContents.find(content => content.id === value));
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
    <div className="mx-auto w-full max-w-3xl">
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
                          errors[item.original.id ?? ''] &&
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
          // const hasError = !!errors.content || !!errors.files;
          return (
            <TabsContent
              key={content.id}
              value={content.id ?? ''}
              className="mt-0 flex flex-1 flex-col overflow-hidden data-[state=inactive]:hidden"
              forceMount
            >
              <FormNestedWrapper
                id={content.id ?? ''}
                tabId={content.id ?? ''}
                schema={tabOption?.schema}
                className="space-y-0"
                useFormProps={{
                  defaultValues: {
                    ...content,
                  },
                }}
                onError={error => {
                  console.log(error);
                  // setErrors((prev) => ({
                  //   ...prev,
                  //   [content.id ?? ""]: error as z.ZodError,
                  // }));
                  // return undefined;
                }}
              >
                {() => (
                  <>
                    <LessonContentTabHeader
                      value={content.type}
                      activeLessonContent={activeLessonContent ?? activeLessonContents[0]}
                      activeLesson={activeLesson}
                      hasErrors={!!errors[content.id ?? '']}
                    />
                    <div
                      className={cn(
                        'overflow-hidden border border-primary border-t-0',
                        errors[content.id ?? ''] && 'border-destructive'
                      )}
                    >
                      {tabOption?.content(content)}
                    </div>
                  </>
                )}
              </FormNestedWrapper>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
