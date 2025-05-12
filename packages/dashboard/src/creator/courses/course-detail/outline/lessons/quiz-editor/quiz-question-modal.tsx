import type { IQuizAns, IQuizQuestion } from '@oe/api';
import { type TQuizQuestion, quizQuestionSchema } from '@oe/api';
import { uniqueID } from '@oe/core';
import { Button } from '@oe/ui';
import { DndSortable, DndSortableDragButton, type IDndSortableRef } from '@oe/ui';
import { InputNumber } from '@oe/ui';
import { InputTimeDuration } from '@oe/ui';
import { Modal } from '@oe/ui';
import { RichTextEditor } from '@oe/ui';
import { Selectbox } from '@oe/ui';
import { Checkbox } from '@oe/ui';
import { FormControl, FormField, FormFieldWithLabel, FormItem, FormLabel, FormLabelInfo, FormMessage } from '@oe/ui';
import { Input } from '@oe/ui';
import { RadioGroup, RadioGroupItem } from '@oe/ui';
import { PencilLine, Plus, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
// import { useWatch } from "react-hook-form";
import { QUESTION_TYPES } from './utils';

export function QuizQuestionModal({
  question,
  handleSubmit,
}: {
  question: IQuizQuestion;
  handleSubmit: (question: TQuizQuestion) => void;
}) {
  const tCourse = useTranslations('course');
  const tCourseQuiz = useTranslations('course.outline.lesson.content.quiz');
  const sortableRef = useRef<IDndSortableRef<IQuizAns, unknown>>(null);

  return (
    <Modal
      trigger={
        <Button variant="outline" className="h-8 w-8 p-0">
          <PencilLine className="h-4 w-4" />
        </Button>
      }
      title={tCourseQuiz('question.edit')}
      validationSchema={quizQuestionSchema}
      defaultValues={question}
      buttons={[
        {
          label: tCourse('common.actions.cancel'),
          variant: 'outline',
          onClick: handleClose => {
            handleClose?.();
          },
        },
        {
          label: tCourse('common.actions.save'),
          variant: 'default',
          type: 'submit',
        },
      ]}
      onSubmit={handleSubmit}
    >
      {form => {
        return (
          <div className="space-y-6">
            <FormFieldWithLabel name="type" label={tCourseQuiz('question.type')} required form={form}>
              <Selectbox
                options={QUESTION_TYPES.map(type => ({
                  label: tCourseQuiz(type.label),
                  value: type.value,
                  id: type.id,
                }))}
              />
            </FormFieldWithLabel>

            <FormFieldWithLabel name="title" label={tCourseQuiz('question.title')} required form={form}>
              <RichTextEditor />
            </FormFieldWithLabel>

            <div className="space-y-2">
              <FormFieldWithLabel
                name="items"
                label={tCourseQuiz('question.answers')}
                required
                form={form}
                render={({ field }) => {
                  const items = field.value || [];

                  return (
                    <DndSortable
                      data={items ?? []}
                      ref={sortableRef}
                      dataConfig={{
                        idProp: 'id',
                        type: 'array',
                        direction: 'vertical',
                      }}
                      className="flex flex-col gap-2"
                      renderConfig={{
                        renderItem: ({ item, onRemoveItem, index, onUpdateItem }) => (
                          <div className="flex items-center gap-2">
                            <DndSortableDragButton className="opacity-50 hover:opacity-100" />
                            <FormFieldWithLabel
                              name={`items.${index}.text`}
                              required
                              form={form}
                              className="flex-1"
                              render={({ field }) => (
                                <Input
                                  key={`items.${index}`}
                                  placeholder={tCourseQuiz('question.answerPlaceholder')}
                                  {...field}
                                  onChange={e => {
                                    const value = e.target.value;
                                    field.onChange(value);
                                  }}
                                  onBlur={e => onUpdateItem?.(e.target.value, 'text', item)}
                                />
                              )}
                            />
                            <Button type="button" variant="ghost" size="icon" onClick={onRemoveItem}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ),
                      }}
                      onChange={field.onChange}
                    />
                  );
                }}
              />

              <Button
                type="button"
                variant="outline"
                className="mt-2 w-full justify-center border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={() => {
                  sortableRef.current?.addItem({
                    text: '',
                  });
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                {tCourseQuiz('question.addAnswer')}
              </Button>
            </div>

            {/* Phần chọn đáp án đúng */}
            <div className="space-y-2">
              <FormLabelInfo className="cursor-pointer" data-field="correct_item_sets">
                {tCourseQuiz('question.correctAnswer')}
                <span className="ml-1 text-destructive">*</span>
              </FormLabelInfo>
              <FormField
                control={form.control}
                name="correct_item_sets"
                render={({ field: correctField }) => {
                  const items = form.watch('items') || [];
                  const type = form.watch('type');
                  const correctAnswers = correctField.value?.[0] || [];

                  if (type === 'single_choice') {
                    return (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            value={correctAnswers?.[0]?.text}
                            onValueChange={value => {
                              const selectedItem = items.find(
                                item =>
                                  new Intl.Collator(undefined, {
                                    sensitivity: 'base',
                                  }).compare(item.text ?? '', value ?? '') === 0
                              );
                              if (selectedItem) {
                                correctField.onChange([[selectedItem]]);
                              }
                            }}
                          >
                            {items
                              .filter(item => item.text)
                              .map((item, index) => (
                                <FormItem
                                  className="flex items-center space-x-3 space-y-0"
                                  key={`${item.text ?? uniqueID()}-${index}`}
                                >
                                  <FormControl>
                                    <RadioGroupItem value={item.text as string} />
                                  </FormControl>
                                  <FormLabel className="cursor-pointer font-normal">{item.text}</FormLabel>
                                </FormItem>
                              ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }

                  return (
                    <FormControl>
                      <div className="space-y-2">
                        {items
                          .filter(item => item.text)
                          .map((item, index) => (
                            <FormItem
                              className="flex items-center space-x-3 space-y-0"
                              key={`${item.text ?? uniqueID()}-${index}`}
                            >
                              <FormControl>
                                <Checkbox
                                  checked={correctAnswers.some(
                                    ans =>
                                      new Intl.Collator(undefined, {
                                        sensitivity: 'base',
                                      }).compare(ans.text ?? '', item.text ?? '') === 0
                                  )}
                                  onCheckedChange={checked => {
                                    const newCorrectAnswers = checked
                                      ? [...correctAnswers, item]
                                      : correctAnswers.filter(
                                          ans =>
                                            new Intl.Collator(undefined, {
                                              sensitivity: 'base',
                                            }).compare(ans.text ?? '', item.text ?? '') !== 0
                                        );
                                    correctField.onChange([newCorrectAnswers]);
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="cursor-pointer font-normal">{item.text}</FormLabel>
                              <FormMessage />
                            </FormItem>
                          ))}
                      </div>
                    </FormControl>
                  );
                }}
              />
            </div>

            <FormFieldWithLabel name="explanation" label={tCourseQuiz('question.explanation')} form={form}>
              <Input placeholder={tCourseQuiz('question.explanationPlaceholder')} />
            </FormFieldWithLabel>

            <FormFieldWithLabel name="points" label={tCourseQuiz('question.points')} required form={form}>
              <InputNumber type="number" min={0} />
            </FormFieldWithLabel>

            <FormFieldWithLabel
              name="settings.time_limit"
              label={tCourseQuiz('question.timeLimit')}
              form={form}
              render={({ field }) => <InputTimeDuration {...field} onValueChange={field.onChange} />}
            />
          </div>
        );
      }}
    </Modal>
  );
}
