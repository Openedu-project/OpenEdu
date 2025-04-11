import { useGetLaunchpadMinPledgeOptions } from '@oe/api';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@oe/ui';
import { RadioGroup, RadioGroupItem } from '@oe/ui';
import { cn } from '@oe/ui';
import { useTranslations } from 'next-intl';
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form';

type MinPledgeProps<TFormValues extends FieldValues> = {
  form: UseFormReturn<TFormValues>;
};

const MinPledge = <TFormValues extends FieldValues>({ form }: MinPledgeProps<TFormValues>) => {
  const tLaunchpad = useTranslations('creatorSettingLaunchpad.fundingGoal');
  const { dataLaunchpadMinPledgeOptions } = useGetLaunchpadMinPledgeOptions();

  return (
    <FormField
      control={form.control}
      name={'min_pledge' as Path<TFormValues>}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-semibold text-base">{tLaunchpad('minPledge')} *</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={value => field.onChange(Number(value))}
              className="flex w-full flex-wrap text-wrap"
            >
              {dataLaunchpadMinPledgeOptions?.value.map(item => (
                <FormItem className="me-2 flex items-center" key={item}>
                  <FormControl>
                    <RadioGroupItem value={item.toString()} className="hidden h-5 w-5" />
                  </FormControl>
                  <FormLabel
                    className={cn(
                      'flex w-20 cursor-pointer items-center justify-center rounded-lg border border-neutral-100 py-3 text-2xl transition-all hover:border-primary',
                      field.value === item && 'border border-primary text-primary'
                    )}
                  >
                    {item}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { MinPledge };
