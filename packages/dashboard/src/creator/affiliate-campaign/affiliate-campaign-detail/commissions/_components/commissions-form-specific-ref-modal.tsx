import type { ICommissionItem, ICommissionPayload } from '@oe/api';
import { useGetReferrerList } from '@oe/api';
import { Modal } from '@oe/ui';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@oe/ui';
import { Input } from '@oe/ui';
import { Switch } from '@oe/ui';
import { CirclePercent } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import type React from 'react';
import { Suspense, useCallback, useMemo } from 'react';

import { type CreateSpecialReferrerCommissionSchemaType, createSpecialReferrerCommissionSchema } from '@oe/api';
import { AutocompeteMultiple } from '@oe/ui';
import type { UseFormReturn } from 'react-hook-form';
import { FormBonusesCommission, type IBaseCommissionForm } from './commissions-bonuses-form';

interface IFormSpecificRefCommissionModal {
  data?: ICommissionItem | null;
  onSubmit: (value: ICommissionPayload) => void;
  onClose: () => void;
  mutateCommissionList: () => void;
}

const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  field: { onChange: (value: number | '') => void }
) => {
  const { value } = e.target;

  field.onChange(value === '' ? '' : Number(value));
};

export function FormSpecificRefCommissionModal({
  data,
  onSubmit,
  onClose,
  mutateCommissionList,
}: IFormSpecificRefCommissionModal) {
  const t = useTranslations('affiliateCommissionFormModal');
  const { campaignId } = useParams();
  const { dataReferrerList: users } = useGetReferrerList({
    params: {
      page: 1,
      per_page: 99_999,
    },
    id: String(campaignId),
  });
  const dataUser = useMemo(
    () =>
      users?.results?.map(item => ({
        label: item.email,
        value: item.id ?? '',
      })) ?? [],
    [users?.results]
  );

  const handleFormSubmit = useCallback(
    async (value: CreateSpecialReferrerCommissionSchemaType) => {
      const submissionValue: ICommissionPayload = {
        campaign_id: campaignId as string,
        ref1_rate: String(value.ref1_rate) === '' ? 0 : Number(value.ref1_rate),
        ref2_rate: value.ref2_rate === '' ? 0 : Number(value.ref2_rate),
        ref3_rate: value.ref3_rate === '' ? 0 : Number(value.ref3_rate),
        type: 'no_limit_qty',
        enable: value.enable,
        is_base_rate: false,
        bonuses: value.bonuses.map((bonus, index) => {
          return {
            ...bonus,
            campaign_id: campaignId as string,
            type: 'min_quantity',
            qty1: bonus.qty1 === '' ? 0 : Number(bonus.qty1),
            ref1_rate: bonus.ref1_rate === '' ? 0 : Number(bonus.ref1_rate),
            order: index,
          };
        }),
        referrer_types: [],
        referrer_ids: value.referrer_ids,
      };

      onSubmit(submissionValue);
    },
    [onSubmit, campaignId]
  );

  return (
    <Modal
      open={true}
      title={t('specificReferrers')}
      onClose={onClose}
      buttons={[
        {
          type: 'button',
          label: t('cancel'),
          variant: 'outline',
          onClick: () => onClose(),
        },
        {
          type: 'submit',
          label: t('save'),
          variant: 'default',
        },
      ]}
      validationSchema={createSpecialReferrerCommissionSchema}
      onSubmit={handleFormSubmit}
      defaultValues={{
        ref1_rate: data?.ref1_rate ?? undefined,
        ref2_rate: data?.ref2_rate || '',
        ref3_rate: data?.ref3_rate || '',
        referrer_ids: data?.referrer_ids ?? [],
        enable: true,
        bonuses: data?.bonuses
          ? data?.bonuses?.map(item => ({
              ...item,
              newId: item.id,
            }))
          : [],
      }}
    >
      {form => {
        return (
          <>
            <p className="mb-4 text-gray-500 text-sm">
              {t.rich('specificRefCommissionDescription', {
                strong: chunks => <strong>{chunks}</strong>,
              })}
            </p>
            <FormField
              control={form.control}
              name="enable"
              render={({ field }) => (
                <FormItem>
                  <div className="flex w-full items-center">
                    <FormLabel className="w-2/3 text-base">{t('activate')}</FormLabel>
                    <div className="w-full">
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </div>
                  </div>
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="ref1_rate"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel className="w-2/3 max-w-[185px] text-base">{t('commissionRate')}</FormLabel>
                      <FormControl>
                        <div className="relative w-2/3">
                          <div className="-translate-y-1/2 absolute top-1/2 left-3 z-10 h-5 w-5 text-gray-500">
                            <CirclePercent className="h-5 w-5 text-gray-500" />
                          </div>
                          <Input
                            {...field}
                            type="number"
                            min="0"
                            max="100"
                            step="0.1"
                            onChange={e => handleInputChange(e, field)}
                            className="pl-9" // Add left padding to make room for the icon
                            value={String(field.value) === '' ? '' : field.value}
                          />
                        </div>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="referrer_ids"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">{t('selectReferrers')}</FormLabel>
                  <FormControl>
                    <Suspense>
                      <AutocompeteMultiple
                        options={dataUser}
                        value={field?.value?.map(
                          useId =>
                            dataUser.find(user => user.value === useId) ?? {
                              label: useId,
                              value: useId,
                            }
                        )}
                        onChange={selected => field.onChange(selected.map(item => item.value))}
                      />
                    </Suspense>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormBonusesCommission
              campaignId={campaignId as string}
              form={form as unknown as UseFormReturn<IBaseCommissionForm>}
              mutateCommissionList={mutateCommissionList}
            />
          </>
        );
      }}
    </Modal>
  );
}
