'use client';

import { useReceiveCertificate } from '@oe/api/hooks/useCertificate';
import { useGetMe } from '@oe/api/hooks/useMe';
import type { ICertificate } from '@oe/api/types/certificate';
import { Trophy } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Input } from '#components/dynamic-form/form-components/input';
import { Modal } from '#components/modal';
import { ViewCertificate, useUploadCertificate } from '#components/pdf-certificate';
import { Button } from '#shadcn/button';
import { Label } from '#shadcn/label';
import { useSocketStore } from '#store/socket';

interface IProps {
  certificate: ICertificate;
}

const ReceiveCertificateModal = ({ certificate }: IProps) => {
  const tReceiveCertModal = useTranslations('receiveCertificateModal');

  const [learnerName, setLearnerName] = useState<string | undefined>();
  const [certificateState, setCertificateState] = useState<ICertificate>(certificate);
  const [step, setStep] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { certificateData } = useSocketStore();

  const { dataMe } = useGetMe();
  const { uploadPDF, uploadPNG, isUploading } = useUploadCertificate({ certificate: certificateState });
  const { triggerReceiveCert } = useReceiveCertificate();

  const handleNextStep = () => {
    if (learnerName?.trim() === '') {
      return;
    }
    setStep(2);
  };

  const handlePreviousStep = () => {
    setStep(1);
  };

  const handleReceiveCert = useCallback(async () => {
    try {
      const [pdfResponse, pngResponse] = await Promise.all([uploadPDF(), uploadPNG()]);

      if (!(pdfResponse?.id && pngResponse?.id)) {
        throw new Error('PDF upload failed');
      }

      const receiveRes = await triggerReceiveCert({
        course_cuid: certificate.course_cuid,
        file: {
          id: pdfResponse.id,
        },
        image: {
          id: pngResponse.id,
        },
        completed_at: Date.now(),
      });

      if (!receiveRes) {
        throw new Error('Failed to receive certificate');
      }

      toast.success('Certificate received successfully');

      setIsOpen(false);
    } catch (error) {
      console.error('Error in handleReceiveCert:', error);
      toast.error('Error receiving certificate');
    }
  }, [certificate.course_cuid, toast, triggerReceiveCert, uploadPDF, uploadPNG]);

  const renderStep1 = () => (
    <div className="py-4">
      <Trophy className="mx-auto my-4 h-16 w-16 text-yellow-400" />

      <Label htmlFor="learnerName" className="mb-2 block">
        {tReceiveCertModal('displayName')}
      </Label>

      <Input
        id="learnerName"
        value={learnerName}
        onChange={e => {
          setLearnerName(e.currentTarget.value);
          setCertificateState({
            ...certificateState,
            learner_name: e.currentTarget.value,
          });
        }}
        className="mb-4"
      />
      <Label className="mb-2 block text-gray-600 text-sm">{tReceiveCertModal('reviewYourName')}</Label>
    </div>
  );

  const renderStep2 = () => (
    <ViewCertificate
      certificate={{
        ...certificateState,
        date: Date.now(),
      }}
    />
  );

  useEffect(() => {
    if (certificateData?.data?.can_receive && !certificateData.data.is_received) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [certificateData]);

  useEffect(() => {
    if (dataMe) {
      setLearnerName(dataMe?.display_name);
      setCertificateState(prev => ({
        ...prev,
        learner_name: dataMe.display_name,
      }));
    }
  }, [dataMe]);

  return (
    <>
      {isOpen && (
        <Modal
          title={step === 1 ? tReceiveCertModal('congratulations') : tReceiveCertModal('yourCert')}
          open={isOpen}
          hasCloseIcon
          onClose={() => setIsOpen(false)}
          description={
            step === 1 ? (
              <>
                <span className="block">{tReceiveCertModal('successfullyCompleted')}</span>
                <span>{tReceiveCertModal('certIsNowAvailable')}</span>
              </>
            ) : null
          }
          hasCancelButton={false}
          className="h-[500px]"
          contentClassName="h-full flex flex-col pb-4 gap-4"
        >
          {step === 1 ? renderStep1() : renderStep2()}
          {step === 1 ? (
            <Button type="button" disabled={learnerName?.trim() === ''} onClick={handleNextStep} className="ml-auto">
              {tReceiveCertModal('next')}
            </Button>
          ) : (
            <div className="ml-auto w-fit space-x-2">
              <Button variant="outline" type="button" onClick={handlePreviousStep}>
                {tReceiveCertModal('editName')}
              </Button>
              <Button
                disabled={isUploading}
                onClick={async () => {
                  await handleReceiveCert();
                }}
              >
                {tReceiveCertModal('receiveCertificate')}
              </Button>
            </div>
          )}
        </Modal>
      )}
    </>
  );
};

export default ReceiveCertificateModal;
