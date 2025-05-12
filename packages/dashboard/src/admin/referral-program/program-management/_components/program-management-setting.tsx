'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type HTTPErrorMetadata,
  type IReferralProgramFormSchema,
  type IReferralProgramPayload,
  referralProgramSchema,
  useGetAllReferralProgramList,
  usePostReferralCampaign,
} from '@oe/api';
import { convertToTimeStamp } from '@oe/core';
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
  InputNumber,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Switch,
  toast,
} from '@oe/ui';
import { DateTimePicker } from '@oe/ui';
import { Plus, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Suspense, useCallback, useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

interface FeatureRewardFieldProps {
  label: string;
  form: ReturnType<typeof useForm<IReferralProgramFormSchema>>;
  amountField: `setting.${string}.amount`;
  typeField: `setting.${string}.type`;
}

interface StreakRewardFieldsProps {
  form: ReturnType<typeof useForm<IReferralProgramFormSchema>>;
  thresholdField: string;
  thresholdLabel: string;
  amountField: string;
  typeField: string;
  isDisabled?: boolean;
}

export function ProgramManagementSetting() {
  const t = useTranslations('referralProgram.dashboard');
  const tError = useTranslations('errors');

  const { dataAllReferralProgramList, mutateAllReferralProgramList } = useGetAllReferralProgramList({
    queryParams: {
      progam: 'ref-user',
      scope: 'global',
    },
  });

  const { triggerPostReferralCampaign, isLoadingPostReferralCampaign } = usePostReferralCampaign();
  const form = useForm<IReferralProgramFormSchema>({
    resolver: zodResolver(referralProgramSchema),
    defaultValues: {
      enabled: false,
      start_date: new Date(),
      end_date: new Date(),
      setting: {
        streak_bonus: false,
        milestone_bonus: false,
        time_based: false,
        featured_discover: false,
        ref_count_bonus: [],
        weekly_streak_bonus: {
          enable: false,
          threshold: 0,
          reward: { amount: 0, type: 'fixed' },
        },
        monthly_streak_bonus: {
          enable: false,
          threshold: 0,
          reward: { amount: 0, type: 'fixed' },
        },
        time_base_rewards: {
          start_date: new Date(),
          end_date: new Date(),
          reward: { amount: 0, type: 'fixed' },
        },
        referrer_reward: { amount: 0, type: 'fixed' },
        referee_reward: { amount: 0, type: 'fixed' },
        complete_course_bonus: { amount: 0, type: 'fixed' },
        deposit_fiat_bonus: { amount: 0, type: 'fixed' },
        deposit_crypto_bonus: { amount: 0, type: 'fixed' },
        trigger: 'register_account',
      },
    },
  });

  const {
    fields: milestones,
    append: appendMilestone,
    remove: removeMilestone,
    replace: replaceMilestones,
  } = useFieldArray({
    control: form.control,
    name: 'setting.ref_count_bonus',
  });
  useEffect(() => {
    if (dataAllReferralProgramList) {
      const data = dataAllReferralProgramList?.results?.[0];
      if (!data) {
        return;
      }
      const { setting } = data;

      form.setValue('id', data.id);
      form.setValue('program', data.program);
      form.setValue('name', data.name);
      form.setValue('scope', data.scope);
      form.setValue('enabled', data.enabled);
      form.setValue('start_date', data?.start_date ? new Date(data.start_date) : new Date());
      form.setValue('end_date', data?.end_date ? new Date(data.end_date) : new Date());
      form.setValue('setting.featured_discover', setting?.featured_discover ?? false);
      form.setValue('setting.milestone_bonus', setting?.milestone_bonus ?? false);
      form.setValue('setting.streak_bonus', setting?.streak_bonus ?? false);
      form.setValue('setting.time_based', setting?.time_based ?? false);
      form.setValue('setting.trigger', setting?.trigger ?? 'register_account');
      form.setValue('setting.complete_course_bonus', {
        amount: Number(setting?.complete_course_bonus?.amount ?? 0),
        type: setting?.complete_course_bonus?.type ?? 'fixed',
      });
      form.setValue('setting.deposit_crypto_bonus', {
        amount: Number(setting?.deposit_crypto_bonus?.amount ?? 0),
        type: setting?.deposit_crypto_bonus?.type ?? 'fixed',
      });
      form.setValue('setting.deposit_fiat_bonus', {
        amount: Number(setting?.deposit_fiat_bonus?.amount ?? 0),
        type: setting?.deposit_fiat_bonus?.type ?? 'fixed',
      });
      form.setValue('setting.monthly_streak_bonus', {
        enable: setting?.monthly_streak_bonus?.enable ?? false,
        threshold: setting?.monthly_streak_bonus?.threshold ?? 0,
        reward: {
          amount: Number(setting?.monthly_streak_bonus?.reward?.amount ?? 0),
          type: setting?.monthly_streak_bonus?.reward?.type ?? 'fixed',
        },
      });

      // Chỉ thiết lập ref_count_bonus khi có dữ liệu
      if (setting?.ref_count_bonus && setting.ref_count_bonus.length > 0) {
        const formattedMilestones = setting.ref_count_bonus.map(item => ({
          enable: item.enable,
          order: item.order,
          reach_count: item.reach_count,
          reward: {
            amount: Number(item.reward.amount ?? 0),
            type: item?.reward?.type ?? 'fixed',
          },
        }));
        replaceMilestones(formattedMilestones);
      }

      form.setValue('setting.referee_reward', {
        amount: Number(setting?.referee_reward?.amount ?? 0),
        type: setting?.referee_reward?.type ?? 'fixed',
      });
      form.setValue('setting.referrer_reward', {
        amount: Number(setting?.referrer_reward?.amount ?? 0),
        type: setting?.referrer_reward?.type ?? 'fixed',
      });
      form.setValue('setting.time_base_rewards', {
        start_date: setting?.time_base_rewards?.start_date
          ? new Date(setting.time_base_rewards.start_date)
          : new Date(),
        end_date: setting?.time_base_rewards?.end_date ? new Date(setting.time_base_rewards.end_date) : new Date(),
        reward: {
          amount: Number(setting?.time_base_rewards?.reward?.amount ?? 0),
          type: setting?.time_base_rewards?.reward?.type ?? 'fixed',
        },
      });
      form.setValue('setting.weekly_streak_bonus', {
        enable: setting?.weekly_streak_bonus?.enable ?? false,
        threshold: setting?.weekly_streak_bonus?.threshold ?? 0,
        reward: {
          amount: Number(setting?.weekly_streak_bonus?.reward?.amount ?? 0),
          type: setting?.weekly_streak_bonus?.reward?.type ?? 'fixed',
        },
      });
    }
  }, [dataAllReferralProgramList, form, replaceMilestones, form.setValue]);

  const onSubmit = useCallback(
    async (data: IReferralProgramFormSchema) => {
      try {
        const payload = {
          ...data,
          start_date: data.start_date ? convertToTimeStamp(data.start_date as unknown as string) : 0,
          end_date: data.end_date ? convertToTimeStamp(data.end_date as unknown as string) : 0,
          setting: {
            ...data.setting,
            ref_count_bonus: data?.setting?.ref_count_bonus?.map(item => ({
              ...item,
              reward: {
                ...item.reward,
                amount: item.reward.amount.toString(),
              },
            })),
            weekly_streak_bonus: {
              ...data.setting.weekly_streak_bonus,
              reward: {
                ...data.setting.weekly_streak_bonus.reward,
                amount: data?.setting?.weekly_streak_bonus?.reward?.amount?.toString(),
              },
            },
            monthly_streak_bonus: {
              ...data.setting.monthly_streak_bonus,
              reward: {
                ...data.setting.monthly_streak_bonus.reward,
                amount: data?.setting?.monthly_streak_bonus?.reward?.amount?.toString(),
              },
            },
            time_base_rewards: {
              ...data.setting.time_base_rewards,
              start_date: data?.setting?.time_base_rewards?.start_date
                ? convertToTimeStamp(data.setting.time_base_rewards.start_date as unknown as string)
                : 0,
              end_date: data?.setting?.time_base_rewards?.end_date
                ? convertToTimeStamp(data.setting.time_base_rewards.end_date as unknown as string)
                : 0,
              reward: {
                ...(data?.setting?.time_base_rewards?.reward ?? {}),
                amount: data?.setting?.time_base_rewards?.reward?.amount?.toString(),
              },
            },
            referrer_reward: {
              ...data.setting.referrer_reward,
              amount: data.setting.referrer_reward.amount.toString(),
            },
            referee_reward: {
              ...data.setting.referee_reward,
              amount: data.setting.referee_reward.amount.toString(),
            },
            complete_course_bonus: {
              ...data.setting.complete_course_bonus,
              amount: data?.setting?.complete_course_bonus?.amount?.toString(),
            },
            deposit_fiat_bonus: {
              ...data.setting.deposit_fiat_bonus,
              amount: data?.setting?.deposit_fiat_bonus?.amount?.toString(),
            },
            deposit_crypto_bonus: {
              ...data.setting.deposit_crypto_bonus,
              amount: data?.setting?.deposit_crypto_bonus?.amount?.toString(),
            },
          },
        } as IReferralProgramPayload;
        await triggerPostReferralCampaign(payload);
        toast.success('Success');
        await mutateAllReferralProgramList();
      } catch (error) {
        console.error(error);
        toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      }
    },
    [mutateAllReferralProgramList, tError, triggerPostReferralCampaign]
  );

  const addMilestone = useCallback(() => {
    const currentMilestones = form.getValues('setting.ref_count_bonus') || [];

    appendMilestone({
      enable: true,
      order: currentMilestones.length + 1,
      reach_count: 0,
      reward: {
        amount: 0,
        type: 'fixed',
      },
    });
  }, [appendMilestone, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t('programStatus.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <FormFieldWithLabel
              name="enabled"
              label={t('programStatus.referralProgram')}
              description={t('programStatus.description')}
              form={form}
              isToggleField
              render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
            />
          </CardContent>
        </Card>

        {/* Basic Settings */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t('basicSettings.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormFieldWithLabel
                name="start_date"
                label={t('basicSettings.startDate')}
                form={form}
                render={({ field }) => (
                  <Suspense>
                    <DateTimePicker
                      value={field.value}
                      onChange={date => field.onChange(date)}
                      disabled={{ before: new Date() }}
                    />
                  </Suspense>
                )}
              />
              <FormFieldWithLabel
                name="end_date"
                label={t('basicSettings.endDate')}
                form={form}
                render={({ field }) => (
                  <Suspense>
                    <DateTimePicker
                      value={field.value}
                      onChange={date => field.onChange(date)}
                      disabled={{ before: new Date() }}
                    />
                  </Suspense>
                )}
              />
              <div className="flex items-start">
                <FormFieldWithLabel
                  name="setting.referrer_reward.amount"
                  label={t('basicSettings.referrerReward')}
                  form={form}
                  render={({ field }) => (
                    <InputNumber type="number" value={Number(field.value)} onChange={field.onChange} />
                  )}
                />
                <FormFieldWithLabel
                  name="setting.referrer_reward.type"
                  form={form}
                  label=""
                  className="mt-[22px] ml-2 w-24"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="mb-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fixed">{t('common.fixed')}</SelectItem>
                        <SelectItem value="percentage">{t('common.percentage')}</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="flex items-start">
                <FormFieldWithLabel
                  name="setting.referee_reward.amount"
                  label={t('basicSettings.refereeReward')}
                  form={form}
                  render={({ field }) => (
                    <InputNumber type="number" value={Number(field.value)} onChange={field.onChange} />
                  )}
                />
                <FormFieldWithLabel
                  name="setting.referee_reward.type"
                  form={form}
                  label=""
                  className="mt-[22px] ml-2 w-24"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="mb-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fixed">{t('common.fixed')}</SelectItem>
                        <SelectItem value="percentage">{t('common.percentage')}</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            {/* TODO */}
            {/* <div className="space-y-3">
              <h4 className="font-medium text-sm">
                {t("basicSettings.successCriteria.title")}
              </h4>
              <div className="flex flex-col space-y-2 md:flex-row md:space-x-6 md:space-y-0">
                <FormFieldWithLabel
                  name="requireRegistration"
                  label={t(
                    "basicSettings.successCriteria.completeRegistration"
                  )}
                  form={form}
                  isToggleField
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />

                <FormFieldWithLabel
                  name="requireFirstCourse"
                  label={t("basicSettings.successCriteria.completeFirstCourse")}
                  form={form}
                  isToggleField
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div> */}
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t('advancedRewards.title')}</CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            {/* Milestone Rewards */}
            <Card className="mb-6">
              <div className="flex items-center justify-between border-b p-4">
                <h4 className="font-medium text-base">{t('advancedRewards.milestones.title')}</h4>
                <FormFieldWithLabel
                  name="setting.milestone_bonus"
                  form={form}
                  className="m-0"
                  render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
                />
              </div>

              <CardContent
                className={`space-y-4 p-4 ${
                  form.watch('setting.milestone_bonus') ? '' : 'pointer-events-none opacity-50'
                }`}
              >
                <p className="text-gray-500 text-sm">{t('advancedRewards.milestones.description')}</p>

                {milestones.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex flex-col space-y-2 rounded-lg border p-3 md:flex-row md:items-center md:space-x-2 md:space-y-0"
                  >
                    <div className="md:w-1/4">
                      <Controller
                        name={`setting.ref_count_bonus.${index}.reach_count`}
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

                    <div className="flex justify-center text-gray-500 text-sm md:w-1/6">
                      {t('advancedRewards.milestones.referralsEquals')}
                    </div>

                    <div className="md:w-1/4">
                      <Controller
                        name={`setting.ref_count_bonus.${index}.reward.amount`}
                        control={form.control}
                        render={({ field }) => (
                          <InputNumber
                            className="w-full"
                            placeholder={t('common.value')}
                            value={field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />
                    </div>

                    <div className="md:w-1/4">
                      <Controller
                        name={`setting.ref_count_bonus.${index}.reward.type`}
                        control={form.control}
                        render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="mb-0">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fixed">{t('common.fixed')}</SelectItem>
                              <SelectItem value="percentage">{t('common.percentage')}</SelectItem>
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
                  {t('advancedRewards.milestones.addNew')}
                </Button>
              </CardContent>
            </Card>

            {/* Feature Discovery Rewards */}
            <Card className="mb-6">
              <div className="flex items-center justify-between border-b p-4">
                <h4 className="font-medium text-base">{t('advancedRewards.featureDiscovery.title')}</h4>
                <FormFieldWithLabel
                  name="setting.featured_discover"
                  form={form}
                  className="m-0"
                  render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
                />
              </div>

              <CardContent
                className={`space-y-4 p-4 ${
                  form.watch('setting.featured_discover') ? '' : 'pointer-events-none opacity-50'
                }`}
              >
                <div className="space-y-3">
                  <FeatureRewardField
                    label={t('advancedRewards.featureDiscovery.courseCompletion')}
                    form={form}
                    amountField="setting.complete_course_bonus.amount"
                    typeField="setting.complete_course_bonus.type"
                  />

                  <FeatureRewardField
                    label={t('advancedRewards.featureDiscovery.fiatWalletDeposit')}
                    form={form}
                    amountField="setting.deposit_fiat_bonus.amount"
                    typeField="setting.deposit_fiat_bonus.type"
                  />

                  <FeatureRewardField
                    label={t('advancedRewards.featureDiscovery.tokenWalletDeposit')}
                    form={form}
                    amountField="setting.deposit_crypto_bonus.amount"
                    typeField="setting.deposit_crypto_bonus.type"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Time-based Rewards */}
            <Card className="mb-6">
              <div className="flex items-center justify-between border-b p-4">
                <h4 className="font-medium text-base">{t('advancedRewards.timeBased.title')}</h4>
                <FormFieldWithLabel
                  name="setting.time_based"
                  form={form}
                  className="m-0"
                  render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
                />
              </div>

              <CardContent
                className={`space-y-4 p-4 ${form.watch('setting.time_based') ? '' : 'pointer-events-none opacity-50'}`}
              >
                <div className="flex flex-col space-y-2 md:space-y-0">
                  <div className="grid md:grid-cols-2 md:gap-4">
                    <FormFieldWithLabel
                      name="setting.time_base_rewards.start_date"
                      label={t('basicSettings.startDate')}
                      form={form}
                      render={({ field }) => (
                        <Suspense>
                          <DateTimePicker
                            value={field.value}
                            onChange={date => field.onChange(date)}
                            disabled={{ before: new Date() }}
                          />
                        </Suspense>
                      )}
                    />
                    <FormFieldWithLabel
                      name="setting.time_base_rewards.end_date"
                      label={t('basicSettings.endDate')}
                      form={form}
                      render={({ field }) => (
                        <Suspense>
                          <DateTimePicker
                            value={field.value}
                            onChange={date => field.onChange(date)}
                            disabled={{ before: new Date() }}
                          />
                        </Suspense>
                      )}
                    />
                    <div>
                      <span className="font-medium text-sm md:w-1/2">
                        {t('advancedRewards.timeBased.timeBasedReward')}
                      </span>
                      <div className="flex w-full items-start">
                        <FormFieldWithLabel
                          name="setting.time_base_rewards.reward.amount"
                          form={form}
                          className="m-0 w-1/2"
                          render={({ field }) => (
                            <InputNumber className="w-full" value={field.value} onChange={field.onChange} />
                          )}
                        />
                        <FormFieldWithLabel
                          name="setting.time_base_rewards.reward.type"
                          form={form}
                          className="ml-2 w-1/2"
                          render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger className="mb-0">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="fixed">{t('common.fixed')}</SelectItem>
                                <SelectItem value="percentage">{t('common.percentage')}</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-500 text-sm">{t('advancedRewards.timeBased.description')}</p>
              </CardContent>
            </Card>

            {/* Streak Rewards */}
            <Card className="mb-6">
              <div className="flex items-center justify-between border-b p-4">
                <h4 className="font-medium text-base">{t('advancedRewards.streak.title')}</h4>
                <FormFieldWithLabel
                  name="setting.streak_bonus"
                  form={form}
                  className="m-0"
                  render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
                />
              </div>

              <CardContent
                className={`space-y-6 p-4 ${
                  form.watch('setting.streak_bonus') ? '' : 'pointer-events-none opacity-50'
                }`}
              >
                <div className="space-y-4">
                  <h5 className="font-semibold text-sm">{t('advancedRewards.streak.weekly.title')}</h5>
                  <div className="flex items-center justify-between">
                    <span>{t('advancedRewards.streak.weekly.enable')}</span>
                    <FormFieldWithLabel
                      name="setting.weekly_streak_bonus.enable"
                      form={form}
                      className="m-0"
                      render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
                    />
                  </div>
                  <StreakRewardFields
                    form={form}
                    thresholdField="setting.weekly_streak_bonus.threshold"
                    thresholdLabel={t('advancedRewards.streak.weekly.referralsInWeek')}
                    amountField="setting.weekly_streak_bonus.reward.amount"
                    typeField="setting.weekly_streak_bonus.reward.type"
                    isDisabled={!form.watch('setting.weekly_streak_bonus.enable')}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h5 className="font-semibold text-sm">{t('advancedRewards.streak.monthly.title')}</h5>
                  <div className="flex items-center justify-between">
                    <span>{t('advancedRewards.streak.monthly.enable')}</span>
                    <FormFieldWithLabel
                      name="setting.monthly_streak_bonus.enable"
                      form={form}
                      className="m-0"
                      render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
                    />
                  </div>
                  <StreakRewardFields
                    form={form}
                    thresholdField="setting.monthly_streak_bonus.threshold"
                    thresholdLabel={t('advancedRewards.streak.monthly.referralsInMonth')}
                    amountField="setting.monthly_streak_bonus.reward.amount"
                    typeField="setting.monthly_streak_bonus.reward.type"
                    isDisabled={!form.watch('setting.monthly_streak_bonus.enable')}
                  />
                  <p className="mt-2 text-gray-500 text-xs">{t('advancedRewards.streak.note')}</p>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Form Buttons */}
        <Card className="mb-6">
          <CardContent className="flex flex-col space-y-2 pt-6 md:flex-row md:space-x-4 md:space-y-0">
            <FormSubmitButton
              label={t('buttons.saveChanges')}
              className="w-full md:w-auto"
              loading={isLoadingPostReferralCampaign}
            />
            <Button type="button" variant="outline" className="w-full md:w-auto" onClick={() => form.reset()}>
              {t('buttons.cancel')}
            </Button>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}

function FeatureRewardField({ label, form, amountField, typeField }: FeatureRewardFieldProps) {
  const t = useTranslations('referralProgram.dashboard');

  return (
    <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-y-0">
      <span className="font-medium text-sm md:w-1/2">{label}</span>
      <div className="flex items-start">
        <FormFieldWithLabel
          name={amountField}
          form={form}
          className="m-0"
          render={({ field }) => <InputNumber className="w-24" value={field.value} onChange={field.onChange} />}
        />
        <FormFieldWithLabel
          name={typeField}
          form={form}
          className="ml-2"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="mb-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fixed">{t('common.fixed')}</SelectItem>
                <SelectItem value="percentage">{t('common.percentage')}</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>
    </div>
  );
}

function StreakRewardFields({
  form,
  thresholdField,
  thresholdLabel,
  amountField,
  typeField,
  isDisabled = false,
}: StreakRewardFieldsProps) {
  const t = useTranslations('referralProgram.dashboard');

  return (
    <div
      className={`space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 ${
        isDisabled ? 'pointer-events-none opacity-50' : ''
      }`}
    >
      <div className="space-y-2">
        <label htmlFor={`${thresholdField}-input`} className="font-medium text-gray-700 text-xs">
          {t('advancedRewards.streak.threshold')}:
        </label>
        <div className="flex items-center">
          <FormFieldWithLabel
            name={thresholdField}
            form={form}
            className="m-0"
            render={({ field }) => (
              <InputNumber
                id={`${thresholdField}-input`}
                type="number"
                className="w-full"
                value={field.value}
                onChange={value => field.onChange(Number(value))}
              />
            )}
          />
          <span className="ml-2 whitespace-nowrap text-gray-500 text-xs">{thresholdLabel}</span>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor={`${amountField}-input`} className="font-medium text-gray-700 text-xs">
          {t('common.reward')}:
        </label>
        <div className="flex items-start">
          <FormFieldWithLabel
            name={amountField}
            form={form}
            className="m-0"
            render={({ field }) => (
              <InputNumber
                id={`${amountField}-input`}
                className="w-full"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <FormFieldWithLabel
            name={typeField}
            form={form}
            className="ml-2"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="mb-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed">{t('common.fixed')}</SelectItem>
                  <SelectItem value="percentage">{t('common.percentage')}</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>
    </div>
  );
}
