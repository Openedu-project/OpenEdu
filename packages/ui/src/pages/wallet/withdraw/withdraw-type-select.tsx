'use client';

import { type TWithdrawType, WITHDRAW_TYPE } from '@oe/api';
import { WALLET_ROUTES } from '@oe/core';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useRouter } from '#common/navigation';
import { Label } from '#shadcn/label';
import { RadioGroup, RadioGroupItem } from '#shadcn/radio-group';
import { useWalletStore } from '../_store/useWalletStore';

export function WithdrawTypeSelect() {
  const t = useTranslations('wallets.withdrawPage.form');
  const { withdrawType, setWithdrawType } = useWalletStore();
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const router = useRouter();

  useEffect(() => {
    if (withdrawType !== type) {
      setWithdrawType(type as TWithdrawType);
    }
  }, [type, withdrawType, setWithdrawType]);

  const handleChange = (value: string) => {
    setWithdrawType(value as TWithdrawType);
    router.replace(`${WALLET_ROUTES.withdraw}?type=${value}`);
  };

  return (
    <RadioGroup
      defaultValue={WITHDRAW_TYPE.TOKEN}
      className="flex gap-6"
      value={withdrawType}
      onValueChange={handleChange}
    >
      {Object.values(WITHDRAW_TYPE).map(type => (
        <div key={type} className="flex items-center space-x-2">
          <RadioGroupItem value={type} id={type} />
          <Label htmlFor={type} className="cursor-pointer font-normal text-base leading-5">
            {t(type)}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
