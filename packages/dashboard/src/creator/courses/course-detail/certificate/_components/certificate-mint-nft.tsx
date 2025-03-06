import { useGetEstimatedFee } from '@oe/api/hooks/useCertificateNft';
import type { ICreateCourseCertificate } from '@oe/api/schemas/courses/createCourseSchema';
import type { ICertificate } from '@oe/api/types/certificate';
import { Button } from '@oe/ui/shadcn/button';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { RadioGroup, RadioGroupItem } from '@oe/ui/shadcn/radio-group';
import { Switch } from '@oe/ui/shadcn/switch';
import { cn } from '@oe/ui/utils/cn';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';

export function CertificateMintNFT({
  form,
}: {
  certificateLayer: ICertificate;
  form: UseFormReturn<ICreateCourseCertificate & FieldValues>;
}) {
  // const tCourse = useTranslations('course');
  const tCertificate = useTranslations('certificate');
  const { courseId } = useParams<{ courseId: string }>();
  const { dataEstimatedFee } = useGetEstimatedFee(courseId);

  const [hasMintCert, setHasMintCert] = useState<boolean>(form?.watch('props.mint_cert_nft_settings.enabled'));

  const estimated_fee = dataEstimatedFee?.estimated_fee ?? 0;
  const sponsor_balance = dataEstimatedFee?.sponsor_balance ?? 0;
  const showWarning = useMemo(
    () => form?.watch('props.mint_cert_nft_settings.gas_fee_payer') === 'creator' && estimated_fee > sponsor_balance,
    [form]
  );

  // const handleMintNFT = async (data: ICertNftFees) => {
  //   try {
  //     await postMintCertNFTService(undefined, {
  //       id: courseId,
  //       payload: {
  //         // ...dataCertNftFees,
  //         // ...data,
  //         gas_fee_payer: data.actual_gas_fee_payer,
  //       },
  //     });
  //     // await mutateCertNftFees();
  //     toast.success(tCourse('mintNFT.mintSuccess'));
  //   } catch {
  //     toast.error(tCourse('mintNFT.mintError'));
  //   }
  // };

  return (
    <div className="rounded-lg bg-background p-4 shadow-sm">
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
                {tCertificate('mintNFT.estimatedGasFee')}: {estimated_fee} {dataEstimatedFee?.currency}
              </span>
              <span className="mbutton-semibold14 text-foreground">
                {tCertificate('mintNFT.sponsorBalance')}: {sponsor_balance} {dataEstimatedFee?.currency}
              </span>

              {showWarning && tCertificate('mintNFT.insufficientBalance')}
            </div>
            <Button className="h-auto bg-primary-foreground px-1 text-primary hover:bg-primary-foreground/90 hover:text-primary">
              {tCertificate('mintNFT.deposit')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
