import { useGetCertNFTFees, useMintCertNft } from '@oe/api/hooks/useCertificateNft';
import type { ICertificateDetail, ICertificateUser } from '@oe/api/types/certificate';
import { Modal } from '@oe/ui/components/modal';
import { PdfViewer } from '@oe/ui/components/pdf-viewer';
import { Badge } from '@oe/ui/shadcn/badge';
import { useTranslations } from 'next-intl';
import MintCertButton from './mint-cert-button';

interface IMintCertModal {
  certificate: ICertificateUser | ICertificateDetail;
  onClose?: () => void;
  mutate?: () => void;
}

export default function MintCertModal({ certificate, onClose, mutate }: IMintCertModal) {
  const tMintCert = useTranslations('mintCertificate');

  const { dataCertNftFees } = useGetCertNFTFees(certificate?.id);
  const { triggerMintCertNft, isLoadingMintCertNft } = useMintCertNft(certificate?.id);

  const handleMintCertificate = async () => {
    if (dataCertNftFees?.actual_gas_fee_payer) {
      try {
        await triggerMintCertNft({
          gas_fee_payer: dataCertNftFees?.actual_gas_fee_payer,
        });

        mutate?.();

        onClose?.();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Modal
      open={true}
      onClose={onClose}
      title={
        <div className="flex items-center justify-between">
          <span>{tMintCert('mintNFT')}</span>
          {dataCertNftFees?.actual_gas_fee_payer !== 'learner' && (
            <Badge className="mr-5 border-none bg-success-foreground px-[18px] py-2 text-success">
              {tMintCert('sponsored')}
            </Badge>
          )}
        </div>
      }
      hasCancelButton={false}
      hasCloseIcon
    >
      <div className="mb-2 space-y-4 overflow-y-auto">
        <PdfViewer
          className="[&>div>div>div>div>div>canvas]:rounded-[12px] [&>div>div>div>div>div>canvas]:border [&>div>div>div>div>div>canvas]:border-primary [&>div]:px-0"
          files={certificate?.files[0]?.url ?? ''}
        />

        <div className="mcaption-regular16">{tMintCert('thisNFTWillBeMintToYourOpenEduWallet')}</div>

        <div className="flex flex-col gap-2 rounded-lg bg-foreground/5 p-3">
          <span className="mbutton-semibold16">
            {tMintCert('totalGasFee', {
              total_fee: dataCertNftFees?.estimated_fee,
              nft_network: 'NEAR',
            })}
          </span>
          <span className="mcaption-semibold14">{tMintCert('storageDepositTransactionFee')}</span>
        </div>

        <MintCertButton
          certificate={certificate}
          onClickMintCert={handleMintCertificate}
          disabled={!dataCertNftFees?.mint_nft_enabled && isLoadingMintCertNft}
          loading={isLoadingMintCertNft}
        />
      </div>
    </Modal>
  );
}
