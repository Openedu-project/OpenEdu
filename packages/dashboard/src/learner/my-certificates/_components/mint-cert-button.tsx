import type { ICertificateDetail, ICertificateUser } from '@oe/api/types/certificate';
import ArrowSwapHorizontal from '@oe/assets/icons/arrow-swap-horizontal';
import Eye from '@oe/assets/icons/eye';
import { Button, type ButtonProps } from '@oe/ui/shadcn/button';
import { toast } from '@oe/ui/shadcn/sonner';
import { useTranslations } from 'next-intl';
import type { MouseEvent } from 'react';

interface IMintCertButtonProps extends ButtonProps {
  certificate: ICertificateUser | ICertificateDetail;
  onClickMintCert?: () => void;
}

export default function MintCertButton({ certificate, onClickMintCert, disabled, loading }: IMintCertButtonProps) {
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
          <Eye color="hsl(var(--primary))" className="mr-3" />
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
