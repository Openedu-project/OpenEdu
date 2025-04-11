import type { ILaunchpad } from '@oe/api';
import { InputNumber } from '@oe/ui';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { useTargetAmountStore } from '../_store/useTargetAmountStore';

type TargetFundingAmountProps<TFormValues extends FieldValues> = {
  form: UseFormReturn<TFormValues>;
  launchpad: ILaunchpad;
};

const TargetFundingAmount = <TFormValues extends FieldValues>({
  form,
  launchpad,
}: TargetFundingAmountProps<TFormValues>) => {
  const tLaunchpad = useTranslations('creatorSettingLaunchpad.fundingGoal');
  const { setTargetAmount } = useTargetAmountStore();

  useEffect(() => {
    if (launchpad) {
      setTargetAmount(Number(launchpad.funding_goal.target_funding));
    }
  }, [launchpad, setTargetAmount]);

  return (
    <FormField
      control={form.control}
      name={'target_funding' as Path<TFormValues>}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-semibold text-base">{tLaunchpad('targetFundingGoal')} *</FormLabel>
          <FormControl>
            <InputNumber
              {...field}
              type="number"
              onChange={value => {
                field.onChange(Number(value));
                setTargetAmount(Number(value));
              }}
            />
          </FormControl>
          <FormMessage />
          <p className="text-primary text-sm">{tLaunchpad('targetFundingGoalDesc')}</p>
        </FormItem>
      )}
    />
  );
};

export { TargetFundingAmount };
