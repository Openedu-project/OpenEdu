import type { ICommissionItem, ICommissionPayload, RefType } from '@oe/api';
import { type CreateBaseRateCommissionSchemaType, createBaseRateCommissionSchema } from '@oe/api';
import { Modal } from '@oe/ui';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@oe/ui';
import { Input } from '@oe/ui';
import { Switch } from '@oe/ui';
import { CirclePercent } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import type React from 'react';
import { useCallback } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { FormBonusesCommission, type IBaseCommissionForm } from './commissions-bonuses-form';

interface IFormBaseRateCommissionModal {
  onSubmit: (value: ICommissionPayload) => void;
  onClose: () => void;
  selectedType: RefType;
  data?: ICommissionItem | null;
  mutateCommissionList: () => void;
}

const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  field: { onChange: (value: number | '') => void }
) => {
  const { value } = e.target;

  field.onChange(value === '' ? '' : Number(value));
};

export function FormBaseRateCommissionModal({
  onSubmit,
  onClose,
  selectedType,
  data,
  mutateCommissionList,
}: IFormBaseRateCommissionModal) {
  const t = useTranslations('affiliateCommissionFormModal');

  const { campaignId } = useParams();

  const handleFormSubmit = useCallback(
    async (value: CreateBaseRateCommissionSchemaType) => {
      const submissionValue: ICommissionPayload = {
        campaign_id: campaignId as string,
        ref1_rate: String(value.ref1_rate) === '' ? 0 : Number(value.ref1_rate),
        ref2_rate: String(value.ref2_rate) === '' ? 0 : Number(value.ref2_rate.toString()),
        ref3_rate: String(value.ref3_rate) === '' ? 0 : Number(value.ref3_rate.toString()),
        type: 'no_limit_qty',
        is_base_rate: true,
        enable: value.enable,
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
        referrer_types: [selectedType],
        referrer_ids: [],
      };

      onSubmit(submissionValue);
    },
    [onSubmit, campaignId, selectedType]
  );

  return (
    <Modal
      open={true}
      title={t('baseCommission')}
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
      validationSchema={createBaseRateCommissionSchema}
      onSubmit={handleFormSubmit}
      defaultValues={{
        ref1_rate: data?.ref1_rate ?? undefined,
        ref2_rate: data?.ref2_rate ?? undefined,
        ref3_rate: data?.ref3_rate ?? undefined,
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
            <p className="mb-4 text-gray-500 text-sm">{t('baseCommissionDescription')}</p>

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
              {(['ref1_rate', 'ref2_rate', 'ref3_rate'] as const).map((rate, index) => (
                <FormField
                  key={rate}
                  control={form.control}
                  name={rate}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel className="w-2/3 max-w-[185px] text-base">
                          {index === 0 ? t('baseRate') : t(`ref${index + 1}BonusRate`)}
                        </FormLabel>
                        <FormControl>
                          <div className="relative w-2/3">
                            <div className="-translate-y-1/2 absolute top-1/2 left-3 z-10 h-5 w-5 text-gray-500">
                              <CirclePercent className="h-5 w-5 text-gray-500" />
                            </div>
                            <Input
                              {...field}
                              type="number"
                              max="100"
                              step="0.1"
                              onChange={e => handleInputChange(e, field)}
                              value={String(field.value) === '' ? '' : field.value}
                              className="pl-9" // Add left padding to make room for the icon
                            />
                          </div>
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>

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
