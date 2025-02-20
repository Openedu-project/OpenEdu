import { useGetLaunchpadMinSections } from '@oe/api/hooks/useLaunchpad';
import { InputNumber } from '@oe/ui/components/input-number';
import { Button } from '@oe/ui/shadcn/button';
import { Calendar } from '@oe/ui/shadcn/calendar';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@oe/ui/shadcn/form';
import { Popover, PopoverContent, PopoverTrigger } from '@oe/ui/shadcn/popover';
import { Separator } from '@oe/ui/shadcn/separator';
import { cn } from '@oe/ui/utils/cn';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { useWatch } from 'react-hook-form';

type VotingMilestonesProps<TFormValues extends FieldValues> = {
  form: UseFormReturn<TFormValues>;
  votingPhase: number;
};

const VotingNumberSymbol = ({
  order,
  votingPhase,
}: {
  order: number;
  votingPhase: number;
}) => {
  return (
    <span className="flex flex-col items-center">
      <div className="flex aspect-square w-10 items-center justify-center rounded-full border border-primary/50 font-semibold text-primary text-xl">
        {order}
      </div>
      <Separator
        className={cn('my-2 flex-1 bg-neutral-100', order === votingPhase && 'hidden')}
        orientation="vertical"
      />
    </span>
  );
};

const VotingMilestone = <TFormValues extends FieldValues>({
  order,
  form,
  votingPhase,
}: {
  order: number;
  form: UseFormReturn<TFormValues>;
  votingPhase: number;
}) => {
  const tLaunchpad = useTranslations('creatorSettingLaunchpad.votingPlan');
  const { dataLaunchpadMinSections } = useGetLaunchpadMinSections();
  const isFirstMilestone = order === 1;
  const isLastMilestone = order === votingPhase;
  const isOnlyOneMilestone = votingPhase === 1;

  const milestones = useWatch({
    control: form.control,
  });

  const previousMilestone = milestones.clp_voting_milestones[order - 2];

  return (
    <div className="flex space-x-10">
      {!isOnlyOneMilestone && <VotingNumberSymbol order={order} votingPhase={votingPhase} />}
      <div className={cn('grid w-full grid-cols-2 gap-x-8 pb-8 group-last:pb-0', !isOnlyOneMilestone && 'pe-20')}>
        <div className="">
          <FormField
            control={form.control}
            name={`clp_voting_milestones.${order - 1}.estimated_open_vote_date` as Path<TFormValues>}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  <h3 className={cn('font-semibold text-base', isLastMilestone && 'text-negative-500')}>
                    {isOnlyOneMilestone &&
                      `${tLaunchpad('publishDate')} & ${tLaunchpad('votingEnd')} (${tLaunchpad('estimated')})`}
                    {!isOnlyOneMilestone && tLaunchpad('publishDate')}
                    {!isOnlyOneMilestone && isFirstMilestone && ` (${tLaunchpad('estimatedAfter')})`}
                    {!isOnlyOneMilestone && isLastMilestone && ` aka ${tLaunchpad('votingEnd')}`}*
                  </h3>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn('text-left font-normal', !field.value && 'text-muted-foreground')}
                        disabled={previousMilestone && previousMilestone?.estimated_open_vote_date === 0}
                      >
                        {field.value ? format(field.value, 'dd/MM/yyyy') : <span>DD/MM/YYYY</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      startMonth={previousMilestone ? new Date(previousMilestone.estimated_open_vote_date) : new Date()}
                      onSelect={value => {
                        field.onChange(value?.getTime());
                      }}
                      disabled={date => {
                        if (previousMilestone) {
                          return date.getTime() <= previousMilestone.estimated_open_vote_date;
                        }

                        return date <= new Date();
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="">
          <FormField
            control={form.control}
            name={`clp_voting_milestones.${order - 1}.target_section` as Path<TFormValues>}
            rules={{
              min: {
                value: dataLaunchpadMinSections?.value ?? 0,
                message: `Minimum ${dataLaunchpadMinSections?.value ?? 0} sections are required`,
              },
            }}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  <h3 className="font-semibold text-base ">{tLaunchpad('numberOfSection')} *</h3>
                </FormLabel>
                <InputNumber
                  {...field}
                  type="number"
                  placeholder="Min 4"
                  value={field.value ?? 0}
                  onChange={value => {
                    field.onChange(Number(value));
                  }}
                  suffixIcon={<p className="text-base">Sections</p>}
                  className="flex w-full pe-20"
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-2 mt-3 flex flex-col">
          <h3 className="font-normal text-sm">{tLaunchpad('milestoneDescription')}</h3>
        </div>
      </div>
    </div>
  );
};

const VotingMilestones = <TFormValues extends FieldValues>({
  form,
  votingPhase,
}: VotingMilestonesProps<TFormValues>) => {
  const milestonesArray = Array.from({ length: votingPhase }, (_, index) => ({
    id: `milestone-${index}`,
    order: index + 1,
  }));

  return (
    <div className="flex flex-col">
      {milestonesArray.map(({ id, order }) => (
        <div key={id} className="group">
          <VotingMilestone order={order} form={form} votingPhase={votingPhase} />
        </div>
      ))}
    </div>
  );
};

export default VotingMilestones;
