'use client';

import { useTranslations } from 'next-intl';
import { Link } from '#common/navigation';
import { Button } from '#shadcn/button';
import { getExplorerLink } from '#utils/wallet';
import { useDepositChainStore } from '../stores/deposit-chain-store';

const GoToExplorerBtn = () => {
  const t = useTranslations('depositPage');
  const selectedChain = useDepositChainStore(state => state.chosenChain);
  return selectedChain ? (
    <div className="block space-y-2">
      <a
        href={getExplorerLink(selectedChain.chain, 'address', selectedChain.address)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button className="w-full bg-primary font-medium text-base text-white">{t('viewTxns')}</Button>
      </a>
      <Link className="w-full border-none p-0" href="/wallet">
        <Button className="w-full font-medium text-base" variant="outline">
          {t('see')}
          <span className="mx-1 uppercase">{selectedChain.chain}</span>
          {t('amountInWallet')}
        </Button>
      </Link>
    </div>
  ) : null;
};

export default GoToExplorerBtn;
