import type { ICertificateDetail, ICertificateUser } from '@oe/api';
import { ArrowSwapHorizontal, Eye } from '@oe/assets';
import { toast } from '@oe/ui';
import { Button, type ButtonProps } from '@oe/ui';
import { useTranslations } from 'next-intl';
import type { MouseEvent } from 'react';

interface IMintCertButtonProps extends ButtonProps {
  certificate: ICertificateUser | ICertificateDetail;
  onClickMintCert?: () => void;
}

export function MintCertButton({ certificate, onClickMintCert, disabled, loading }: IMintCertButtonProps) {
  const t = useTranslations('myLearningSpace.myCertificates');

  const handleMintCert = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    onClickMintCert?.();
  };

  const handleViewNFT = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    toast.info('Coming soon!');
  };

  return (
    <>
      {certificate?.nft_network || certificate?.nft_token_id || certificate?.nft_tx_hash ? (
        <Button variant="outline" className="border-primary text-primary hover:text-primary" onClick={handleViewNFT}>
          <Eye color="var(--primary)" className="mr-3" />
          {t('viewInWallet')}
        </Button>
      ) : (
        certificate?.mint_nft_enabled && (
          <Button onClick={handleMintCert} className="w-full" disabled={disabled} loading={loading}>
            <ArrowSwapHorizontal className="mr-3" />
            {t('mintCertificate')}
          </Button>
        )
      )}
    </>
  );
}
