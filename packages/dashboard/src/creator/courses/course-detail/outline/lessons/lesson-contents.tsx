'use client';
import type { ILessonContent } from '@oe/api/types/course/segment';
import { DndSortable, DndSortableDragButton } from '@oe/ui/components/dnd-sortable';
import { Button } from '@oe/ui/shadcn/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@oe/ui/shadcn/tabs';
import { cn } from '@oe/ui/utils/cn';
import { PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { type FieldErrors, useFormContext } from 'react-hook-form';
import { useLessonActions } from '../../_hooks/useLessonActions';
import { useOutlineStore } from '../../_store/useOutlineStore';
import { tabOptions } from './lesson-content-options';
import { LessonContentTabHeader } from './lesson-content-tab-header';

export function LessonContents() {
  const tCourseLesson = useTranslations('course.outline.lesson');
  const { activeLessonContents, activeLesson, handleSortContents, handleAddLessonContent } = useLessonActions();

  const { activeLessonContent, setActiveLessonContent } = useOutlineStore();

  const [isSorting, setIsSorting] = useState(false);

  const { formState } = useFormContext();

  const contentErrors = (formState.errors as unknown as Record<string, FieldErrors<ILessonContent>[]>).contents;

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
        const errorContent = activeLessonContents.find(content => content.order === errorTabOrder);
        if (errorContent) {
          setActiveLessonContent(errorContent);
        }
      }
    }
  }, [contentErrors, activeLessonContents, setActiveLessonContent]);

  const onAddLessonContent = async () => {
    await handleAddLessonContent();
  };

  const handleTabsChange = (value: string) => {
    setActiveLessonContent(activeLessonContents.find(content => content.id === value) ?? null);
  };

  const onSortContents = async (items: ILessonContent[]) => {
    setIsSorting(true);
    await handleSortContents(items);
    setIsSorting(false);
  };

  return (
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
                        <span>{tCourseLesson(tabOption?.label)}</span>
                      </div>
                    </div>
                  </TabsTrigger>
                </TabsList>
              );
            },
          }}
          onChange={onSortContents}
        />
        <Button
          variant="default"
          size="icon"
          className="h-8 w-8 shrink-0 rounded-md rounded-b-none border-b-0"
          onClick={onAddLessonContent}
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
                activeLesson={activeLesson}
                hasErrors={!!contentErrors?.[content.order]}
              />
              <div
                className={cn(
                  'overflow-hidden border border-primary border-t-0',
                  contentErrors?.[content.order] && 'border-destructive'
                )}
              >
                {tabOption?.content(content.order)}
              </div>
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
