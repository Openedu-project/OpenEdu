'use client';

import { ASSET_TYPES, type TAssetType } from '@oe/api/utils/wallet';
import { useRouter } from '@oe/ui/common/navigation';
import { Button } from '@oe/ui/shadcn/button';
import { Label } from '@oe/ui/shadcn/label';
import { RadioGroup, RadioGroupItem } from '@oe/ui/shadcn/radio-group';
import { ChevronLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import FiatWithdrawForm from './fiat-withdraw-form';
import TokenWithdrawForm from './token-withdraw-form';

const WithdrawHeader = memo(() => {
  const router = useRouter();
  const t = useTranslations('withdrawPage');

  const handleBackClick = useCallback(() => {
    router.push('/wallet');
  }, [router]);

  return (
    <div className="inline-flex items-center gap-2">
      <Button onClick={handleBackClick} variant="ghost" className="p-2">
        <ChevronLeft color="#6368DC" className="cursor-pointer transition-all hover:scale-110 active:scale-110" />
      </Button>
      <div className="inline-flex gap-2">
        <h2 className="m-0 font-semibold text-[#2C2C2C] text-[24px] leading-[30px]">{t('title')}</h2>
      </div>
    </div>
  );
});

WithdrawHeader.displayName = 'WithdrawHeader';

const Withdraw = () => {
  const [withdrawType, setWithdrawType] = useState<TAssetType>(ASSET_TYPES.CRYPTO);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Handle URL params for withdraw type
  useEffect(() => {
    const type = searchParams.get('type');
    if (type !== ASSET_TYPES.FIAT && type !== ASSET_TYPES.CRYPTO) {
      return;
    }

    setWithdrawType(type === ASSET_TYPES.CRYPTO ? ASSET_TYPES.CRYPTO : ASSET_TYPES.FIAT);

    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete('type');
    router.replace('/wallet/withdraw');
  }, [searchParams, router]);

  const handleRadioChange = useCallback((value: string) => {
    setWithdrawType(value as TAssetType);
  }, []);

  const withdrawForm = useMemo(() => {
    return withdrawType === ASSET_TYPES.CRYPTO ? <TokenWithdrawForm /> : <FiatWithdrawForm />;
  }, [withdrawType]);

  return (
    <div className="relative rounded-2xl bg-white p-4 shadow-[0px_4px_30px_0px_#F4F5F6] sm:p-8">
      <div className="space-y-6">
        <WithdrawHeader />

        <RadioGroup
          defaultValue={ASSET_TYPES.CRYPTO}
          className="flex gap-6"
          value={withdrawType}
          onValueChange={handleRadioChange}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={ASSET_TYPES.CRYPTO} id="option-one" />
            <Label htmlFor="option-one" className="font-normal text-base leading-5">
              Token
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={ASSET_TYPES.FIAT} id="option-two" />
            <Label htmlFor="option-two" className="font-normal text-base leading-5">
              Fiat
            </Label>
          </div>
        </RadioGroup>
        {withdrawForm}
      </div>
    </div>
  );
};

export default Withdraw;
