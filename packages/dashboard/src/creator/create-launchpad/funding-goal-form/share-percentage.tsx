import { InputNumber } from '@oe/ui/components/input-number';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@oe/ui/shadcn/form';
import { CirclePercent } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form';

type SharePercentageProps<TFormValues extends FieldValues> = {
  form: UseFormReturn<TFormValues>;
};

const SharePercentage = <TFormValues extends FieldValues>({ form }: SharePercentageProps<TFormValues>) => {
  const tLaunchpad = useTranslations('creatorSettingLaunchpad.fundingGoal');

  return (
    <FormField
      control={form.control}
      name={'profit_percentage' as Path<TFormValues>}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-semibold text-base">{tLaunchpad('sharePercentage')} *</FormLabel>
          <FormControl>
            <InputNumber
              {...field}
              type="number"
              value={field.value}
              onChange={e => {
                field.onChange(Number(e.target.value));
              }}
              suffixIcon={<CirclePercent size={20} />}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SharePercentage;
