import { useGetCertNFTFees } from '@oe/api/hooks/useCertificateNft';
import { postMintCertNFTService } from '@oe/api/services/certificate-nft';
import type { ICertificate } from '@oe/api/types/certificate';
import type { ICertNftFees, TPayer } from '@oe/api/types/certificate-nft';
import { Button } from '@oe/ui/shadcn/button';
import { RadioGroup, RadioGroupItem } from '@oe/ui/shadcn/radio-group';
import { toast } from '@oe/ui/shadcn/sonner';
import { Switch } from '@oe/ui/shadcn/switch';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

export function CertificateMintNFT({
  certificateLayer,
}: {
  certificateLayer: ICertificate;
}) {
  const tCourse = useTranslations('course');
  const tCertificate = useTranslations('certificate');
  const { courseId } = useParams<{ courseId: string }>();
  const { dataCertNftFees, mutateCertNftFees } = useGetCertNFTFees(certificateLayer?.id);

  const handleMintNFT = async (data: ICertNftFees) => {
    try {
      await postMintCertNFTService(undefined, {
        id: courseId,
        payload: {
          // ...dataCertNftFees,
          // ...data,
          gas_fee_payer: data.actual_gas_fee_payer,
        },
      });
      await mutateCertNftFees();
      toast.success(tCourse('mintNFT.mintSuccess'));
    } catch {
      toast.error(tCourse('mintNFT.mintError'));
    }
  };

  return (
    <div className="rounded-lg bg-background p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-medium text-lg">{tCertificate('mintNFT.title')}</h2>
        <Switch
          checked={dataCertNftFees?.mint_nft_enabled}
          // onCheckedChange={() => {
          //   handleMintNFT({
          //     ...dataCertNftFees,
          //     mint_nft_enabled: !dataCertNftFees.mint_nft_enabled,
          //   });
          // }}
        />
      </div>

      {dataCertNftFees?.mint_nft_enabled && (
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <span className="text-muted-foreground text-sm">
              {tCertificate('mintNFT.estimatedGasFee')}:{dataCertNftFees.estimated_fee} NEAR
            </span>
            <span className="text-muted-foreground text-sm">
              {tCertificate('mintNFT.sponsorBalance')}:{dataCertNftFees.sponsor_balance} NEAR
            </span>
          </div>

          <div className="space-y-2">
            <span className="font-medium text-sm">{tCertificate('mintNFT.gasFeePayedBy')}:</span>
            <RadioGroup
              defaultValue={dataCertNftFees.actual_gas_fee_payer}
              onValueChange={value =>
                handleMintNFT({
                  ...dataCertNftFees,
                  actual_gas_fee_payer: value as TPayer,
                })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="learner" id="learner" />
                <label htmlFor="learner">{tCertificate('mintNFT.learner')}</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="creator" id="creator" />
                <label htmlFor="creator">{tCertificate('mintNFT.creator')}</label>
              </div>
            </RadioGroup>
          </div>

          {dataCertNftFees.actual_gas_fee_payer === 'creator' && (
            <div className="rounded-md bg-destructive/10 p-2 text-destructive text-sm">
              {tCertificate('mintNFT.insufficientBalance', {
                balance: dataCertNftFees.sponsor_balance,
                unit: 'NEAR',
              })}
              <Button variant="link" className="h-auto px-1 text-primary">
                {tCertificate('mintNFT.deposit')}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
