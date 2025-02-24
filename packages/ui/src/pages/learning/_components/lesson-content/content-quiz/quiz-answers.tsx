import type { IQuizAnswer } from '@oe/api/types/quiz';
import { z } from '@oe/api/utils/zod';
import { Checkbox } from '@oe/ui/shadcn/checkbox';
import { RadioGroup, RadioGroupItem } from '@oe/ui/shadcn/radio-group';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem } from '#shadcn/form';
import { cn } from '#utils/cn';

export const quizAnswerSchema = z.object({
  answers: z.union([
    z.string(), // for single_choice
    z.array(z.string()), // for multiple_choice
  ]),
});

const QuizAnswers = ({
  questionType,
  items,
}: {
  questionType: string;
  items: IQuizAnswer[];
}) => {
  const form = useFormContext();

  switch (questionType) {
    case 'single_choice': {
      return (
        <FormField
          control={form.control}
          name="answers"
          render={({ field }) => (
            <FormItem>
              <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                {items?.map(item => (
                  <div
                    key={item.id}
                    className={cn(
                      'flex w-full items-center gap-2 rounded-[12px] border p-2 md:p-3',
                      field.value === item.id && 'border-[2px] border-primary'
                    )}
                  >
                    <RadioGroupItem value={item.id} id={item.id} />
                    <label
                      htmlFor={item.id}
                      className="mcaption-regular16 !mt-0 w-full cursor-pointer text-foreground/90"
                    >
                      {item.text}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </FormItem>
          )}
        />
      );
    }
    case 'multiple_choice': {
      return (
        <FormField
          control={form.control}
          name="answers"
          render={({ field }) => (
            <FormItem>
              <div>
                {items?.map(item => (
                  <div
                    key={item.id}
                    className={cn(
                      'mb-3 w-full rounded-[12px] border p-2 last:mb-0 md:p-3',
                      (field.value as string[])?.includes(item.id) && 'border-[2px] border-primary'
                    )}
                  >
                    <div className="flex w-full items-center gap-2">
                      <Checkbox
                        id={item.id}
                        checked={(field.value as string[])?.includes(item.id)}
                        onCheckedChange={checked => {
                          const updatedValue = checked
                            ? [...((field.value as string[]) || []), item.id]
                            : (field.value as string[])?.filter(id => id !== item.id);

                          field.onChange(updatedValue);
                        }}
                      />
                      <label
                        htmlFor={item.id}
                        className="mcaption-regular16 !mt-0 w-full cursor-pointer text-foreground/90"
                      >
                        {item.text}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </FormItem>
          )}
        />
      );
    }
    default: {
      return null;
    }
  }
};

export default QuizAnswers;
