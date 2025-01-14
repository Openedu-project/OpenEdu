import { Button } from '@oe/ui/shadcn/button';
import { formatCurrency } from '@oe/ui/utils/format-currency';
import { useTranslations } from 'next-intl';
// biome-ignore lint/nursery/noRestrictedImports: <explanation>
import Image from 'next/image';
import { memo } from 'react';

type CryptoCardProps = {
  logo: string;
  symbol: string;
  balance: number;
  onClaim: () => void;
  isLoading: boolean;
};

const EarnCryptoCard = memo(({ logo, symbol, balance, onClaim, isLoading }: CryptoCardProps) => {
  const t = useTranslations('earnPage');

  return (
    <div className="flex flex-col justify-between gap-3 rounded-xl bg-white p-4 sm:flex-row">
      <div className="flex items-center gap-2">
        <Image src={logo} alt={`${symbol} Logo`} width={40} height={40} />
        <div>
          <p className="font-bold text-[24px] leading-[125%] md:text-[28px]">
            {formatCurrency(balance, 'en-US', {
              useGrouping: true,
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            {symbol}
          </p>
        </div>
      </div>
      <Button
        variant="outline"
        onClick={onClaim}
        className="font-semibold text-[16px] text-primary leading-[125%]"
        disabled={isLoading || balance === 0}
      >
        {isLoading ? t('loading') : `${t('claimBtn')} ${symbol}`}
      </Button>
    </div>
  );
});

EarnCryptoCard.displayName = 'CryptoCard';

export default EarnCryptoCard;
