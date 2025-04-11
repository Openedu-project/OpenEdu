'use client';
import type { HTTPErrorMetadata } from '@oe/api';
import { useDeleteCommission } from '@oe/api';
import { getAlphabetLabel } from '@oe/core';
import { toast } from '@oe/ui';
import { Button } from '@oe/ui';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@oe/ui';
import { Input } from '@oe/ui';
import { CircleMinus, CirclePercent, Hash, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type React from 'react';
import { useCallback } from 'react';
import { type UseFormReturn, useFieldArray } from 'react-hook-form';
interface BonusItem {
  id?: string;
  newId?: string;
  type: 'min_quantity';
  qty1: number | '';
  ref1_rate: number | '';
  enable: boolean;
}

interface IBaseCommissionForm {
  enable: boolean;
  ref1_rate: number | '';
  ref2_rate: number | '';
  ref3_rate: number | '';
  bonuses: BonusItem[];
}

interface IFormBonusesCommission {
  campaignId: string;
  form: UseFormReturn<IBaseCommissionForm>;
  mutateCommissionList: () => void;
}

const isValidCommissionRate = (value: unknown): value is number | '' => {
  return typeof value === 'number' || value === '';
};

const validateCommissionRates = (ref1: number | '', ref2: number | '', ref3: number | ''): boolean => {
  if ([ref1, ref2, ref3].some(rate => !isValidCommissionRate(rate))) {
    return false;
  }

  const ref1Num = ref1 === '' ? 0 : ref1;
  const ref2Num = ref2 === '' ? 0 : ref2;
  const ref3Num = ref3 === '' ? 0 : ref3;

  return ref3Num <= ref2Num && ref2Num <= ref1Num;
};

export type { BonusItem, IBaseCommissionForm, IFormBonusesCommission };

export { isValidCommissionRate, validateCommissionRates };

const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  field: { onChange: (value: number | '') => void }
) => {
  const { value } = e.target;
  field.onChange(value === '' ? '' : Number(value));
};

export function FormBonusesCommission({
  campaignId,
  form,

  mutateCommissionList,
}: IFormBonusesCommission) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'bonuses',
  });

  const t = useTranslations('affiliateCommissionFormModal');
  const tError = useTranslations('errors');
  const { triggerDeleteCommission } = useDeleteCommission();

  const handleDeleteCommission = useCallback(
    async (id: string) => {
      try {
        if (!id) {
          return false;
        }
        await triggerDeleteCommission({
          ids: [id],
          campaign_id: campaignId,
        });
        void mutateCommissionList();
        toast.success(t('deleteCommissionSuccess'));
      } catch (error) {
        console.error(error);
        toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      }
    },
    [campaignId, mutateCommissionList, t, tError, triggerDeleteCommission]
  );

  return (
    <>
      {fields.map((item, index) => (
        <div key={item.id} className="space-y-2 rounded-md border p-4">
          <div className="flex items-center justify-between">
            <h4 className="mb-0 font-bold text-base">{`${t('level')} ${getAlphabetLabel(index)}`}</h4>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={async () => {
                await handleDeleteCommission(item?.newId ?? '');
                remove(index);
              }}
            >
              <CircleMinus className="h-5 w-5" />
            </Button>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <div className="mb-auto w-1/2 flex-1">
              <FormField
                control={form.control}
                name={`bonuses.${index}.qty1`}
                render={({ field: formField }) => (
                  <FormItem className="">
                    <div className="flex items-center gap-3">
                      <FormLabel className="text-sm">{t('bonusQuantity')}</FormLabel>
                      <FormControl>
                        <div className="relative w-full">
                          <div className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 z-10 text-gray-500">
                            <Hash className="h-4 w-4" />
                          </div>
                          <Input
                            {...formField}
                            type="number"
                            min="1"
                            step="1"
                            onChange={e => handleInputChange(e, formField)}
                            value={formField.value === '' ? '' : formField.value}
                            className="w-full pl-9"
                          />
                        </div>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mb-auto w-1/2 flex-1">
              <FormField
                control={form.control}
                name={`bonuses.${index}.ref1_rate`}
                render={({ field: formField }) => (
                  <FormItem>
                    <div className="flex items-center gap-3">
                      <FormLabel className="text-sm">{t('bonusRate')}</FormLabel>
                      <FormControl>
                        <div className="relative w-full">
                          <div className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 z-10 text-gray-500">
                            <CirclePercent className="h-5 w-5" />
                          </div>
                          <Input
                            {...formField}
                            type="number"
                            min="0"
                            max="100"
                            step="0.1"
                            onChange={e => handleInputChange(e, formField)}
                            value={formField.value === '' ? '' : formField.value}
                            className="w-full pl-9"
                          />
                        </div>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <input type="hidden" {...form.register(`bonuses.${index}.id`)} />
        </div>
      ))}

      <Button
        type="button"
        onClick={() =>
          append({
            type: 'min_quantity',
            qty1: '',
            ref1_rate: '',
            enable: true,
          })
        }
        variant="default"
        className="w-full"
      >
        <Plus />
        <span className="ml-2">{t('addBonusRate')}</span>
      </Button>
    </>
  );
}
