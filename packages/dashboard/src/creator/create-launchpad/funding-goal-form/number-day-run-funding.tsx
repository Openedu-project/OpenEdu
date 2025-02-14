import { InputNumber } from '@oe/ui/components/input-number';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@oe/ui/shadcn/form';
import { useTranslations } from 'next-intl';
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form';

type NumberDayRunFundingProps<TFormValues extends FieldValues> = {
  form: UseFormReturn<TFormValues>;
};

const NumberDayRunFunding = <TFormValues extends FieldValues>({ form }: NumberDayRunFundingProps<TFormValues>) => {
  const tLaunchpad = useTranslations('creatorSettingLaunchpad.fundingGoal');

  return (
    <FormField
      control={form.control}
      name={'estimate_funding_days' as Path<TFormValues>}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-semibold text-base">{tLaunchpad('numberDayRunFunding')} *</FormLabel>
          <FormControl>
            <InputNumber
              {...field}
              type="number"
              value={field.value}
              onChange={e => {
                field.onChange(Number(e.target.value));
              }}
              suffixIcon="Days"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default NumberDayRunFunding;
