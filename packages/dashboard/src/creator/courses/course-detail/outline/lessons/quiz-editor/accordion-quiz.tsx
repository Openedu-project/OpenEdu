import type { IQuizItemResponse } from '@oe/api';
import { DeleteButton } from '@oe/ui';
import { DndSortable, DndSortableDragButton, type IDndSortableRef } from '@oe/ui';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@oe/ui';
import { FormFieldWithLabel } from '@oe/ui';
import { Input } from '@oe/ui';
import { ChevronDown, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { useLessonActions } from '../../../_hooks/useLessonActions';
import { useOutlineStore } from '../../../_store/useOutlineStore';
import { QuizEditor } from './quiz-editor';

interface AccordionQuizProps {
  quizzes: IQuizItemResponse[];
  order: number;
}

export function AccordionQuiz({ quizzes, order }: AccordionQuizProps) {
  const tCourse = useTranslations('course');
  const sortableRef = useRef<IDndSortableRef<IQuizItemResponse, unknown>>(null);

  const { getValues, reset } = useFormContext();

  const { handleDeleteQuiz } = useLessonActions();
  const { activeLessonContent, accordionStates, setAccordionValues, initializeAccordionValues } = useOutlineStore();

  const contentId = activeLessonContent?.id;
  const accordionValues = contentId ? accordionStates[contentId] || [] : [];

  useEffect(() => {
    if (contentId && activeLessonContent.order === order && quizzes?.length > 0) {
      if (!accordionStates[contentId]) {
        initializeAccordionValues(
          contentId,
          quizzes.map(q => q.id)
        );
      }
    }
  }, [contentId, quizzes, accordionStates, activeLessonContent, order, initializeAccordionValues]);

  const handleAccordionChange = (values: string[]) => {
    if (contentId) {
      setAccordionValues(contentId, values);
    }
  };

  if (!contentId) {
    return null;
  }
  return (
    <Accordion type="multiple" className="space-y-2" value={accordionValues} onValueChange={handleAccordionChange}>
      <FormFieldWithLabel
        name={`contents.${order}.quizzes`}
        render={({ field }) => {
          return (
            <DndSortable<IQuizItemResponse, unknown>
              data={field.value}
              ref={sortableRef}
              dataConfig={{
                idProp: 'id',
                type: 'array',
                direction: 'vertical',
              }}
              className="flex flex-col gap-2"
              renderConfig={{
                renderItem: ({ item, index, onRemoveItem }) => {
                  const quiz = item.original;
                  return (
                    <AccordionItem
                      key={quiz.id}
                      value={quiz.id}
                      className="flex flex-col gap-2 rounded-lg border bg-background p-2 shadow-xs"
                    >
                      <div className="flex items-center gap-2">
                        <DndSortableDragButton />
                        <AccordionTrigger
                          asChild
                          className="flex-1 cursor-pointer p-0 hover:no-underline"
                          headerClassName="mb-0 flex-1"
                          onClick={e => e.stopPropagation()}
                        >
                          <div className="flex items-center gap-2">
                            <FormFieldWithLabel
                              name={`contents.${order}.quizzes.${index}.title`}
                              showErrorMessage={false}
                              className="flex-1"
                              render={({ field }) => {
                                return (
                                  <Input
                                    className="h-8"
                                    placeholder={tCourse('outline.lesson.content.quiz.titlePlaceholder')}
                                    onClick={e => e.stopPropagation()}
                                    {...field}
                                  />
                                );
                              }}
                            />
                            <DeleteButton
                              title={tCourse('common.modal.delete.title', {
                                item: tCourse('outline.lesson.contentTitle').toLowerCase(),
                              })}
                              variant="outline"
                              description={tCourse('common.modal.delete.description', {
                                item: tCourse('outline.lesson.contentTitle').toLowerCase(),
                              })}
                              onDelete={async handleClose => {
                                const currentLesson = getValues();
                                const updatedLesson = await handleDeleteQuiz(
                                  quiz.id,
                                  currentLesson.contents[order].quizzes
                                );

                                if (updatedLesson) {
                                  reset({
                                    contents: updatedLesson.contents,
                                  });
                                }
                                onRemoveItem?.();
                                handleClose?.();
                              }}
                              className="ml-auto"
                            >
                              <Trash2 className="h-4 w-4" />
                            </DeleteButton>
                            <ChevronDown className="size-4 shrink-0 transition-transform duration-200" />
                          </div>
                        </AccordionTrigger>
                      </div>
                      <AccordionContent className="border-t pt-2">
                        <QuizEditor key={quiz.id} contentIndex={order} quizIndex={index as number} />
                      </AccordionContent>
                    </AccordionItem>
                  );
                },
              }}
              onChange={field.onChange}
            />
          );
        }}
      />
    </Accordion>
  );
}
