'use client';

import { ASSET_TYPES, type TAssetType } from '@oe/api/utils/wallet';
import { memo, useCallback } from 'react';
import { Label } from '#shadcn/label';
import { RadioGroup, RadioGroupItem } from '#shadcn/radio-group';
import FiatWithdrawForm from './fiat-withdraw-form';
import TokenWithdrawForm from './token-withdraw-form';
import useWithdrawType from './useWithdrawType';

const WITHDRAW_OPTIONS = [
  { value: ASSET_TYPES.CRYPTO, label: 'Token', id: 'option-one' },
  { value: ASSET_TYPES.FIAT, label: 'Fiat', id: 'option-two' },
] as const;

const WithdrawForm = memo(({ type }: { type: TAssetType }) => {
  return type === ASSET_TYPES.CRYPTO ? <TokenWithdrawForm /> : <FiatWithdrawForm />;
});

const Withdraw = () => {
  const { withdrawType, setWithdrawType } = useWithdrawType();

  const handleRadioChange = useCallback(
    (value: string) => {
      setWithdrawType(value as TAssetType);
    },
    [setWithdrawType]
  );

  return (
    <div className="space-y-6">
      <RadioGroup
        defaultValue={ASSET_TYPES.CRYPTO}
        className="flex gap-6"
        value={withdrawType}
        onValueChange={handleRadioChange}
      >
        {WITHDRAW_OPTIONS.map(option => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={option.id} />
            <Label htmlFor={option.id} className="font-normal text-base leading-5">
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>

      <WithdrawForm type={withdrawType} />
    </div>
  );
};

export default Withdraw;
