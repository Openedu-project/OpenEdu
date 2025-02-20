import type { IQuizQuestion } from '@oe/api/types/course/quiz';
import { uniqueID } from '@oe/core/utils/unique';
import { DeleteButton } from '@oe/ui/components/delete-button';
import { DndSortable, DndSortableDragButton, type IDndSortableRef } from '@oe/ui/components/dnd-sortable';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@oe/ui/shadcn/accordion';
import { Button } from '@oe/ui/shadcn/button';
import { Checkbox } from '@oe/ui/shadcn/checkbox';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { Label } from '@oe/ui/shadcn/label';
import { RadioGroup, RadioGroupItem } from '@oe/ui/shadcn/radio-group';
import { ChevronDown, PlusIcon, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { useWatch } from 'react-hook-form';
import QuizQuestionModal from './quiz-question-modal';
import type { IQuizProps } from './types';
import { DEFAULT_QUIZ_QUESTION } from './utils';

export function QuizQuestions({ contentIndex, quizIndex }: IQuizProps) {
  const tCourse = useTranslations('course');
  const tCourseQuiz = useTranslations('course.outline.lesson.content.quiz');
  const sortableRef = useRef<IDndSortableRef<IQuizQuestion, unknown>>(null);
  const [accordionValues, setAccordionValues] = useState<string[]>([]);

  const questions: IQuizQuestion[] = useWatch({
    name: `contents[${contentIndex}].quizzes[${quizIndex}].questions`,
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (questions?.length > 0) {
      const questionIds = questions.map(q => q.id ?? q.question_id ?? '');
      setAccordionValues(questionIds);
    }
  }, []);

  return (
    <div className="space-y-4">
      <Button
        variant="outline"
        className="w-full justify-center border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        onClick={() => {
          const newQuestionId = `question_${uniqueID()}`;

          sortableRef.current?.addItem({
            ...DEFAULT_QUIZ_QUESTION,
            question_id: newQuestionId,
          });
          setAccordionValues([...accordionValues, newQuestionId]);
        }}
      >
        <PlusIcon className="mr-2 h-4 w-4" />
        {tCourseQuiz('question.add')}
      </Button>

      <Accordion type="multiple" className="w-full" value={accordionValues} onValueChange={setAccordionValues}>
        <FormFieldWithLabel
          name={`contents[${contentIndex}].quizzes[${quizIndex}].questions`}
          render={({ field }) => {
            return (
              <DndSortable<IQuizQuestion, unknown>
                data={field.value ?? []}
                ref={sortableRef}
                dataConfig={{
                  idProp: 'id',
                  type: 'array',
                  direction: 'vertical',
                }}
                className="flex flex-col gap-2"
                // loading={sorting}
                renderConfig={{
                  renderItem: ({ item, onRemoveItem, onUpdateItemWithNewItem }) => {
                    const question = item.original;
                    return (
                      <AccordionItem
                        value={(question.id ?? question.question_id ?? '').toString()}
                        className="flex flex-col gap-2 border-none"
                      >
                        <div className="flex items-center gap-2">
                          <DndSortableDragButton />
                          <AccordionTrigger asChild className="cursor-pointer p-0" headerClassName="m-0">
                            <div className="flex items-center gap-2 font-medium text-base">
                              {question.type === 'single_choice'
                                ? tCourseQuiz('types.singleChoice')
                                : tCourseQuiz('types.multipleChoice')}
                              <ChevronDown className="size-4 shrink-0 transition-transform duration-200" />
                            </div>
                          </AccordionTrigger>
                          <div className="ml-auto flex items-center gap-2">
                            <QuizQuestionModal
                              question={question}
                              handleSubmit={newQuestion => {
                                onUpdateItemWithNewItem?.(newQuestion, item);
                                // field.onChange(newItems);
                              }}
                            />
                            <DeleteButton
                              title={tCourse('common.modal.delete.title', {
                                item: tCourseQuiz('question.title').toLowerCase(),
                              })}
                              variant="outline"
                              description={tCourse('common.modal.delete.description', {
                                item: tCourseQuiz('question.title').toLowerCase(),
                              })}
                              onDelete={handleClose => {
                                onRemoveItem?.();
                                handleClose?.();
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </DeleteButton>
                          </div>
                        </div>

                        <AccordionContent className="flex flex-col gap-4 rounded-lg">
                          <div className="flex flex-col gap-4 rounded-lg border bg-background p-4">
                            {question.title ? (
                              <>
                                <div
                                  className="rich-text m-0"
                                  // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                                  dangerouslySetInnerHTML={{
                                    __html: question.title,
                                  }}
                                />
                                <div className="flex flex-col gap-2">
                                  {question.type === 'single_choice' ? (
                                    <RadioGroup value={question.correct_item_sets?.[0]?.[0]?.id}>
                                      {question.items?.map(item => (
                                        <div key={item.id ?? item.text ?? ''} className="flex items-center space-x-2">
                                          <RadioGroupItem
                                            value={item.id ?? item.text ?? ''}
                                            id={item.id ?? item.text ?? ''}
                                            disabled
                                            checked={
                                              question.correct_item_sets?.[0]?.[0]?.id === (item.id ?? item.text)
                                            }
                                          />
                                          <Label
                                            htmlFor={item.id ?? item.text ?? ''}
                                            className="cursor-default text-sm"
                                          >
                                            {item.text}
                                          </Label>
                                        </div>
                                      ))}
                                    </RadioGroup>
                                  ) : (
                                    <>
                                      {question.items?.map(item => (
                                        <div className="flex items-center space-x-2" key={item.id ?? item.text ?? ''}>
                                          <Checkbox
                                            id={item.id ?? item.text ?? ''}
                                            disabled
                                            checked={question.correct_item_sets?.[0]?.some(
                                              ans => (ans.id ?? ans.text) === (item.id ?? item.text)
                                            )}
                                          />
                                          <Label
                                            htmlFor={item.id ?? item.text ?? ''}
                                            className="cursor-default text-sm leading-none"
                                          >
                                            {item.text}
                                          </Label>
                                        </div>
                                      ))}
                                    </>
                                  )}
                                </div>
                              </>
                            ) : (
                              <div className="text-center text-muted-foreground text-sm">
                                {tCourseQuiz('question.noQuestion')}
                              </div>
                            )}
                          </div>
                          <div className="rounded-lg border bg-background p-4">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{tCourseQuiz('question.explanation')}:</span>
                              <span className="text-muted-foreground text-sm">
                                {question.explanation || tCourseQuiz('question.notIncludedYet')}
                              </span>
                            </div>
                            <div className="mt-2 text-muted-foreground text-sm">
                              <span className="font-medium">{tCourseQuiz('question.points')}:</span>
                              {question.points}
                              <span className="mx-2">•</span>
                              <span className="font-medium">{tCourseQuiz('question.timeLimit')}:</span>
                              <span className="mx-2">{question.settings.time_limit}</span>
                            </div>
                          </div>
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
    </div>
  );
}
