import { useGetEstimatedFee } from '@oe/api/hooks/useCertificateNft';
import type { ICreateCourseCertificate } from '@oe/api/schemas/courses/createCourseSchema';
import { postDepositSponsorGasService } from '@oe/api/services/certificate-nft';
import type { HTTPError } from '@oe/api/utils/http-error';
import { Button } from '@oe/ui/shadcn/button';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { RadioGroup, RadioGroupItem } from '@oe/ui/shadcn/radio-group';
import { toast } from '@oe/ui/shadcn/sonner';
import { Switch } from '@oe/ui/shadcn/switch';
import { cn } from '@oe/ui/utils/cn';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';
import SponsorGasCourseModal, { type IAmountSponsor } from './sponsor-gas-course';

export function CertificateMintNFT({
  form,
}: {
  form: UseFormReturn<ICreateCourseCertificate & FieldValues>;
}) {
  const tError = useTranslations('errors');
  const tCertificate = useTranslations('certificate');
  const { courseId } = useParams<{ courseId: string }>();
  const { dataEstimatedFee, mutateEstimatedFee } = useGetEstimatedFee(courseId);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [transactionLoading, setTransactionLoading] = useState<boolean>(false);
  const [hasMintCert, setHasMintCert] = useState<boolean>(form?.watch('props.mint_cert_nft_settings.enabled'));

  const estimated_fee = dataEstimatedFee?.estimated_fee ?? 0;
  const sponsor_balance = useMemo(() => dataEstimatedFee?.sponsor_balance ?? 0, [dataEstimatedFee]);
  const showWarning = useMemo(
    () => form?.watch('props.mint_cert_nft_settings.gas_fee_payer') === 'creator' && estimated_fee > sponsor_balance,
    [form, estimated_fee, sponsor_balance]
  );

  const handleSubmitTransaction = async (data: IAmountSponsor) => {
    setTransactionLoading(true);
    try {
      await postDepositSponsorGasService(undefined, {
        id: courseId,
        payload: data,
      });

      setTimeout(async () => {
        await mutateEstimatedFee();
        setTransactionLoading(false);
        toast.success(tCertificate('mintNFT.depositSuccess'));
      }, 3000);
    } catch (error) {
      setTransactionLoading(false);
      console.error(error as Error);
      const code = (error as HTTPError).metadata?.code;

      if (code === 712) {
        toast.error(tError('712'));
      } else {
        toast.error(tCertificate('mintNFT.depositError'));
      }
    }
  };

  return (
    <div className="rounded-lg bg-background p-4 shadow-xs">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="mb-0 font-medium text-lg">{tCertificate('mintNFT.title')}</h2>
        <FormFieldWithLabel
          name="props.mint_cert_nft_settings.enabled"
          isToggleField
          render={({ field }) => (
            <Switch
              checked={field.value}
              onCheckedChange={isChecked => {
                field.onChange(isChecked);
                setHasMintCert(isChecked);
              }}
            />
          )}
        />
      </div>

      {hasMintCert && (
        <>
          <div className="space-y-4">
            <div className="space-y-2">
              <span className="font-medium text-sm">{tCertificate('mintNFT.gasFeePayedBy')}:</span>
              <FormFieldWithLabel
                name="props.mint_cert_nft_settings.gas_fee_payer"
                render={({ field }) => (
                  <RadioGroup onValueChange={val => field.onChange(val)} {...field}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="learner" id="learner" />
                      <label htmlFor="learner" className="text-sm hover:cursor-pointer">
                        {tCertificate('mintNFT.learner')}
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="creator" id="creator" />
                      <label htmlFor="creator" className="text-sm hover:cursor-pointer">
                        {tCertificate('mintNFT.creator')}
                      </label>
                    </div>
                  </RadioGroup>
                )}
              />
            </div>

            <div
              className={cn(
                'flex items-center justify-between rounded-md p-2 text-destructive text-sm',
                showWarning ? 'bg-destructive/10' : ''
              )}
            >
              <div className="flex flex-col gap-2">
                <span className="mbutton-semibold14 text-foreground">
                  {tCertificate('mintNFT.estimatedGasFee')}: {estimated_fee}
                  {dataEstimatedFee?.currency}
                </span>
                <span className="mbutton-semibold14 text-foreground">
                  {tCertificate('mintNFT.sponsorBalance')}: {sponsor_balance}
                  {dataEstimatedFee?.currency}
                </span>

                {showWarning && tCertificate('mintNFT.insufficientBalance')}
              </div>
              <Button
                className="h-auto bg-primary-foreground px-1 text-primary hover:bg-primary-foreground/90 hover:text-primary"
                onClick={() => setIsOpen(true)}
                loading={transactionLoading}
              >
                {tCertificate('mintNFT.deposit')}
              </Button>
            </div>
          </div>

          <SponsorGasCourseModal
            open={isOpen}
            currency={dataEstimatedFee?.currency ?? ''}
            onClose={() => setIsOpen(false)}
            handleSubmitTransaction={value => handleSubmitTransaction(value)}
          />
        </>
      )}
    </div>
  );
}
