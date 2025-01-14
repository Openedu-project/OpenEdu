import { ASSET_TYPES, type TAssetType } from '@oe/api/utils/wallet';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from '#common/navigation';

const useWithdrawType = () => {
  const [withdrawType, setWithdrawType] = useState<TAssetType>(ASSET_TYPES.CRYPTO);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const type = searchParams.get('type');
    if (type !== ASSET_TYPES.FIAT && type !== ASSET_TYPES.CRYPTO) {
      return;
    }

    setWithdrawType(type === ASSET_TYPES.CRYPTO ? ASSET_TYPES.CRYPTO : ASSET_TYPES.FIAT);
    router.replace('/wallet/withdraw');
  }, [searchParams, router]);

  return {
    withdrawType,
    setWithdrawType,
  };
};

export default useWithdrawType;
