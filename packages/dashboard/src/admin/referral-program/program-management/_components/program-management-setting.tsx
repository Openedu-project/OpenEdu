'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from '@oe/api';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Form,
  FormFieldWithLabel,
  FormSubmitButton,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Switch,
  toast,
} from '@oe/ui';
import { Plus, Trash2 } from 'lucide-react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

// Define Zod schemas
const UnitSchema = z.enum(['points', '% of base']);

const MilestoneSchema = z.object({
  id: z.number(),
  count: z.number().int().positive(),
  value: z.number().positive(),
  unit: UnitSchema,
});

const ReferralFormSchema = z.object({
  // Program status
  isProgramEnabled: z.boolean(),

  // Basic settings
  basePoints: z.number().min(0),
  refereePoints: z.number().min(0),

  // Success criteria
  requireRegistration: z.boolean(),
  requireFirstCourse: z.boolean(),

  // Advanced settings sections
  milestoneEnabled: z.boolean(),
  featuresEnabled: z.boolean(),
  timeBasedEnabled: z.boolean(),
  streakEnabled: z.boolean(),

  // Milestone data
  milestones: z.array(MilestoneSchema),

  // Feature discovery rewards
  courseCompletion: z.number().min(0),
  courseUnit: UnitSchema,
  fiatDeposit: z.number().min(0),
  fiatUnit: UnitSchema,
  tokenDeposit: z.number().min(0),
  tokenUnit: UnitSchema,

  // Time-based rewards
  firstWeekMultiplier: z.number().min(0).max(500),
  firstWeekUnit: UnitSchema,

  // Streak rewards
  weeklyThreshold: z.number().int().positive(),
  weeklyReward: z.number().min(0),
  weeklyUnit: UnitSchema,
  monthlyThreshold: z.number().int().positive(),
  monthlyReward: z.number().min(0),
  monthlyUnit: UnitSchema,
});

// Infer TypeScript type from the schema
type ReferralFormValues = z.infer<typeof ReferralFormSchema>;

export function ProgramManagementSetting() {
  // Default form values
  const defaultValues: ReferralFormValues = {
    isProgramEnabled: true,
    basePoints: 1,
    refereePoints: 1,
    requireRegistration: true,
    requireFirstCourse: false,

    milestoneEnabled: true,
    featuresEnabled: false,
    timeBasedEnabled: false,
    streakEnabled: false,

    milestones: [
      { id: 1, count: 5, value: 5, unit: 'points' },
      { id: 2, count: 10, value: 10, unit: 'points' },
      { id: 3, count: 20, value: 15, unit: 'points' },
    ],

    courseCompletion: 1,
    courseUnit: 'points',
    fiatDeposit: 2,
    fiatUnit: 'points',
    tokenDeposit: 5,
    tokenUnit: 'points',

    firstWeekMultiplier: 100,
    firstWeekUnit: '% of base',

    weeklyThreshold: 10,
    weeklyReward: 3,
    weeklyUnit: 'points',
    monthlyThreshold: 50,
    monthlyReward: 5,
    monthlyUnit: 'points',
  };

  // Initialize the form
  const form = useForm<ReferralFormValues>({
    resolver: zodResolver(ReferralFormSchema),
    defaultValues,
  });

  // Use useFieldArray for milestones
  const {
    fields: milestones,
    append: appendMilestone,
    remove: removeMilestone,
  } = useFieldArray({
    control: form.control,
    name: 'milestones',
  });

  // Form submission handler
  function onSubmit(data: ReferralFormValues) {
    console.log('Form submitted:', data);
    toast.success('Success');
  }

  // Milestone management functions
  const addMilestone = () => {
    const nextCount = milestones.length > 0 ? (milestones[milestones.length - 1]?.count || 0) + 10 : 5;

    appendMilestone({
      id: milestones.length > 0 ? Math.max(...milestones.map(m => m.id)) + 1 : 1,
      count: nextCount,
      value: 5,
      unit: 'points',
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Program Status</CardTitle>
          </CardHeader>
          <CardContent>
            <FormFieldWithLabel
              name="isProgramEnabled"
              label="Referral Program"
              description="Enable or disable the entire referral program"
              form={form}
              isToggleField
              render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
            />
          </CardContent>
        </Card>

        {/* Basic Settings */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Basic Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormFieldWithLabel
                name="basePoints"
                label="Base Point Reward"
                form={form}
                render={({ field }) => (
                  <div className="flex items-center">
                    <Input
                      type="number"
                      min={0}
                      step={0.01}
                      value={field.value}
                      onChange={e => field.onChange(+e.target.value)}
                    />
                    <span className="ml-2 whitespace-nowrap text-gray-500 text-sm">points per referral</span>
                  </div>
                )}
              />

              <FormFieldWithLabel
                name="refereePoints"
                label="Referee Reward"
                form={form}
                render={({ field }) => (
                  <div className="flex items-center">
                    <Input
                      type="number"
                      min={0}
                      step={0.01}
                      value={field.value}
                      onChange={e => field.onChange(+e.target.value)}
                    />
                    <span className="ml-2 whitespace-nowrap text-gray-500 text-sm">points for referee</span>
                  </div>
                )}
              />
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-sm">Success Criteria</h4>
              <div className="flex flex-col space-y-2 md:flex-row md:space-x-6 md:space-y-0">
                <FormFieldWithLabel
                  name="requireRegistration"
                  label="Complete Registration"
                  form={form}
                  isToggleField
                  render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
                />

                <FormFieldWithLabel
                  name="requireFirstCourse"
                  label="Complete First Course"
                  form={form}
                  isToggleField
                  render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Advanced Reward System</CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            {/* Milestone Rewards */}
            <Card className="mb-6">
              <div className="flex items-center justify-between border-b p-4">
                <h4 className="font-medium text-base">Milestone Rewards</h4>
                <FormFieldWithLabel
                  name="milestoneEnabled"
                  form={form}
                  className="m-0"
                  render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
                />
              </div>

              <CardContent
                className={`space-y-4 p-4 ${form.watch('milestoneEnabled') ? '' : 'pointer-events-none opacity-50'}`}
              >
                <p className="text-gray-500 text-sm">Set rewards for reaching referral milestones</p>

                {milestones.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex flex-col space-y-2 rounded-lg border p-3 md:flex-row md:items-center md:space-x-2 md:space-y-0"
                  >
                    <div className="md:w-1/4">
                      <Controller
                        name={`milestones.${index}.count`}
                        control={form.control}
                        render={({ field }) => (
                          <Input
                            type="number"
                            className="w-full"
                            value={field.value}
                            onChange={e => field.onChange(Number.parseInt(e.target.value))}
                            min="1"
                          />
                        )}
                      />
                    </div>

                    <div className="flex justify-center text-gray-500 text-sm md:w-1/6">referrals =</div>

                    <div className="md:w-1/4">
                      <Controller
                        name={`milestones.${index}.value`}
                        control={form.control}
                        render={({ field }) => (
                          <Input
                            type="number"
                            className="w-full"
                            placeholder="Value"
                            value={field.value}
                            onChange={e => field.onChange(Number.parseFloat(e.target.value))}
                            min="0"
                            step="0.01"
                          />
                        )}
                      />
                    </div>

                    <div className="md:w-1/4">
                      <Controller
                        name={`milestones.${index}.unit`}
                        control={form.control}
                        render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Unit" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="points">points</SelectItem>
                              <SelectItem value="% of base">% of base</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>

                    <div className="flex justify-end md:w-auto">
                      <Button variant="outline" size="icon" type="button" onClick={() => removeMilestone(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                <Button
                  className="flex w-full items-center justify-center md:w-auto"
                  type="button"
                  onClick={addMilestone}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Milestone
                </Button>
              </CardContent>
            </Card>

            {/* Feature Discovery Rewards */}
            <Card className="mb-6">
              <div className="flex items-center justify-between border-b p-4">
                <h4 className="font-medium text-base">Feature Discovery Rewards</h4>
                <FormFieldWithLabel
                  name="featuresEnabled"
                  form={form}
                  className="m-0"
                  render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
                />
              </div>

              <CardContent
                className={`space-y-4 p-4 ${form.watch('featuresEnabled') ? '' : 'pointer-events-none opacity-50'}`}
              >
                <div className="space-y-3">
                  <FeatureRewardField
                    label="Course Completion:"
                    form={form}
                    valueField="courseCompletion"
                    unitField="courseUnit"
                  />

                  <FeatureRewardField
                    label="Fiat Wallet Deposit:"
                    form={form}
                    valueField="fiatDeposit"
                    unitField="fiatUnit"
                  />

                  <FeatureRewardField
                    label="Token Wallet Deposit:"
                    form={form}
                    valueField="tokenDeposit"
                    unitField="tokenUnit"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Time-based Rewards */}
            <Card className="mb-6">
              <div className="flex items-center justify-between border-b p-4">
                <h4 className="font-medium text-base">Time-based Rewards</h4>
                <FormFieldWithLabel
                  name="timeBasedEnabled"
                  form={form}
                  className="m-0"
                  render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
                />
              </div>

              <CardContent
                className={`space-y-4 p-4 ${form.watch('timeBasedEnabled') ? '' : 'pointer-events-none opacity-50'}`}
              >
                <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-y-0">
                  <span className="font-medium text-sm md:w-1/2">First Week Multiplier:</span>
                  <div className="flex items-center">
                    <FormFieldWithLabel
                      name="firstWeekMultiplier"
                      form={form}
                      className="m-0"
                      render={({ field }) => (
                        <Input
                          type="number"
                          className="w-20"
                          value={field.value}
                          onChange={e => field.onChange(Number.parseInt(e.target.value))}
                          min="0"
                          max="500"
                        />
                      )}
                    />
                    <FormFieldWithLabel
                      name="firstWeekUnit"
                      form={form}
                      className="ml-2"
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="% of base">% of base</SelectItem>
                            <SelectItem value="points">point(s)</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>
                <p className="text-gray-500 text-sm">
                  Applies to referrals made during the first week after program activation. Example: When set to "100%
                  of base", points for first-week referrals are doubled.
                </p>
              </CardContent>
            </Card>

            {/* Streak Rewards */}
            <Card className="mb-6">
              <div className="flex items-center justify-between border-b p-4">
                <h4 className="font-medium text-base">Streak Rewards</h4>
                <FormFieldWithLabel
                  name="streakEnabled"
                  form={form}
                  className="m-0"
                  render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
                />
              </div>

              <CardContent
                className={`space-y-6 p-4 ${form.watch('streakEnabled') ? '' : 'pointer-events-none opacity-50'}`}
              >
                <div className="space-y-4">
                  <h5 className="font-semibold text-sm">Weekly Streak Settings</h5>
                  <StreakRewardFields
                    form={form}
                    thresholdField="weeklyThreshold"
                    thresholdLabel="referrals in a week"
                    rewardField="weeklyReward"
                    unitField="weeklyUnit"
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h5 className="font-semibold text-sm">Monthly Streak Settings</h5>
                  <StreakRewardFields
                    form={form}
                    thresholdField="monthlyThreshold"
                    thresholdLabel="referrals in a month"
                    rewardField="monthlyReward"
                    unitField="monthlyUnit"
                  />
                  <p className="mt-2 text-gray-500 text-xs">
                    Note: Streak rewards are granted when the referrer reaches the threshold within the specified time
                    period.
                  </p>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Form Buttons */}
        <Card className="mb-6">
          <CardContent className="flex flex-col space-y-2 pt-6 md:flex-row md:space-x-4 md:space-y-0">
            <FormSubmitButton label="Save Changes" className="w-full md:w-auto" />
            <Button
              type="button"
              variant="outline"
              className="w-full md:w-auto"
              onClick={() => form.reset(defaultValues)}
            >
              Cancel
            </Button>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}

// Helper component for feature rewards
interface FeatureRewardFieldProps {
  label: string;
  form: ReturnType<typeof useForm<ReferralFormValues>>;
  valueField: keyof ReferralFormValues;
  unitField: keyof ReferralFormValues;
}

function FeatureRewardField({ label, form, valueField, unitField }: FeatureRewardFieldProps) {
  return (
    <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-y-0">
      <span className="font-medium text-sm md:w-1/2">{label}</span>
      <div className="flex items-center">
        <FormFieldWithLabel
          name={valueField}
          form={form}
          className="m-0"
          render={({ field }) => (
            <Input
              type="number"
              className="w-20"
              value={field.value}
              onChange={e => field.onChange(Number.parseFloat(e.target.value))}
              min="0"
              step="0.01"
            />
          )}
        />
        <FormFieldWithLabel
          name={unitField}
          form={form}
          className="ml-2"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="points">point(s)</SelectItem>
                <SelectItem value="% of base">% of base</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>
    </div>
  );
}

// Helper component for streak rewards
interface StreakRewardFieldsProps {
  form: ReturnType<typeof useForm<ReferralFormValues>>;
  thresholdField: keyof ReferralFormValues;
  thresholdLabel: string;
  rewardField: keyof ReferralFormValues;
  unitField: keyof ReferralFormValues;
}

function StreakRewardFields({ form, thresholdField, thresholdLabel, rewardField, unitField }: StreakRewardFieldsProps) {
  return (
    <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
      <div className="space-y-2">
        <label htmlFor={`${thresholdField}-input`} className="font-medium text-gray-700 text-xs">
          Threshold:
        </label>
        <div className="flex items-center">
          <FormFieldWithLabel
            name={thresholdField}
            form={form}
            className="m-0"
            render={({ field }) => (
              <Input
                id={`${thresholdField}-input`}
                type="number"
                className="w-full"
                value={field.value}
                onChange={e => field.onChange(Number.parseInt(e.target.value))}
                min="1"
              />
            )}
          />
          <span className="ml-2 whitespace-nowrap text-gray-500 text-xs">{thresholdLabel}</span>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor={`${rewardField}-input`} className="font-medium text-gray-700 text-xs">
          Reward:
        </label>
        <div className="flex items-center">
          <FormFieldWithLabel
            name={rewardField}
            form={form}
            className="m-0"
            render={({ field }) => (
              <Input
                id={`${rewardField}-input`}
                type="number"
                className="w-full"
                value={field.value}
                onChange={e => field.onChange(Number.parseFloat(e.target.value))}
                min="0"
                step="0.01"
              />
            )}
          />
          <FormFieldWithLabel
            name={unitField}
            form={form}
            className="ml-2"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="points">point(s)</SelectItem>
                  <SelectItem value="% of base">% of base</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>
    </div>
  );
}
