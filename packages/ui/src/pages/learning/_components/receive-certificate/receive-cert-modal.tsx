'use client';

import type { ICertificate, ICertificateData } from '@oe/api';
import { useGetMe } from '@oe/api';
import { useReceiveCertificate } from '@oe/api';
import { Trophy } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { TemplateScalePreview } from '#components/certificate-builder';
import { ExportPDFButton, generatePDF } from '#components/certificate-builder/_components/pdf';
import { Input } from '#components/dynamic-form/form-components/input';
import { Modal } from '#components/modal';
import { useUploadCertificate } from '#components/pdf-certificate';
import { Button } from '#shadcn/button';
import { Label } from '#shadcn/label';
import { useSocketStore } from '#store/socket';

interface IProps {
  certificate: ICertificate;
}

const ReceiveCertificateModal = ({ certificate }: IProps) => {
  const tReceiveCertModal = useTranslations('receiveCertificateModal');
  const { certificateData } = useSocketStore();
  const { dataMe } = useGetMe();

  const [learnerName, setLearnerName] = useState<string | undefined>();
  const [projectName, setProjectName] = useState<string | undefined>();
  const [certificateState, setCertificateState] = useState<ICertificate>(certificate);
  const [step, setStep] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { uploadPDF, uploadPNG, isUploading } = useUploadCertificate({
    certificate: certificateState,
  });
  const { triggerReceiveCert } = useReceiveCertificate();

  const handleNextStep = () => {
    if (!learnerName?.trim()) {
      return;
    }
    setStep(2);
  };

  const handlePreviousStep = () => setStep(1);

  const handleLearnerNameChange = (value: string) => {
    setLearnerName(value);
    setCertificateState(prev => ({
      ...prev,
      learner_name: value,
    }));
  };

  const handleProjectNameChange = (value: string) => {
    setProjectName(value);
    setCertificateState(prev => ({
      ...prev,
      project_name: value,
    }));
  };

  const handleReceiveCert = useCallback(async () => {
    try {
      const blob = await generatePDF(certificate?.template, {
        ...certificateState,
        issue_date: Date.now(),
      } as unknown as ICertificateData);

      const [pdfResponse, pngResponse] = await Promise.all([uploadPDF(blob), uploadPNG(blob)]);

      if (!pdfResponse?.id) {
        throw new Error('PDF upload failed');
      }
      if (!pngResponse?.id) {
        throw new Error('PNG upload failed');
      }

      const receiveRes =
        pdfResponse &&
        (await triggerReceiveCert({
          course_cuid: certificate.course_cuid,
          file: { id: pdfResponse.id },
          image: { id: pngResponse?.id ?? '' },
          completed_at: Date.now(),
        }));

      if (!receiveRes) {
        throw new Error('Failed to receive certificate');
      }

      toast.success(tReceiveCertModal('toastSuccess'));
      setIsOpen(false);
    } catch (error) {
      console.error('Error in handleReceiveCert:', error);
      toast.error('Error receiving certificate');
    }
  }, [
    certificate.course_cuid,
    triggerReceiveCert,
    uploadPDF,
    tReceiveCertModal,
    certificateState,
    uploadPNG,
    certificate?.template,
  ]);

  const renderStep1 = () => (
    <div className="py-4">
      <Trophy className="mx-auto my-4 h-16 w-16 text-yellow-400" />
      <Label htmlFor="learnerName" className="mb-2 block">
        {tReceiveCertModal('displayName')}
      </Label>
      <Input
        id="learnerName"
        value={learnerName}
        onChange={e => handleLearnerNameChange(e.currentTarget.value)}
        className="mb-4"
      />
      {/* <Label className="mb-2 block text-gray-600 text-sm">
        {tReceiveCertModal("reviewYourName")}
      </Label> */}

      {certificate?.enable_project && (
        <>
          <Label htmlFor="projectName" className="mb-2 block">
            {tReceiveCertModal('projectName')}
          </Label>
          <Input
            id="projectName"
            value={projectName}
            onChange={e => handleProjectNameChange(e.currentTarget.value)}
            className="mb-4"
          />
        </>
      )}
    </div>
  );

  const renderStep2 = () => (
    <TemplateScalePreview
      className="flex-1"
      template={certificate?.template}
      data={
        {
          ...certificateState,
          date: Date.now(),
        } as unknown as ICertificateData
      }
    />
  );

  const renderFooter = () => {
    if (step === 1) {
      return (
        <Button type="button" disabled={!learnerName?.trim()} onClick={handleNextStep} className="ml-auto">
          {tReceiveCertModal('next')}
        </Button>
      );
    }

    return (
      <div className="flex justify-between">
        <ExportPDFButton
          variant="outline"
          template={certificate?.template}
          data={
            {
              ...certificateState,
              date: Date.now(),
            } as unknown as ICertificateData
          }
        />
        <div className="ml-auto w-fit space-x-2">
          <Button variant="outline" type="button" onClick={handlePreviousStep}>
            {tReceiveCertModal('editName')}
          </Button>
          <Button disabled={isUploading} onClick={handleReceiveCert}>
            {tReceiveCertModal('receiveCertificate')}
          </Button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (certificateData?.data?.can_receive && !certificateData.data.is_received) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [certificateData?.data]);

  useEffect(() => {
    if (dataMe?.display_name) {
      handleLearnerNameChange(dataMe.display_name);
    }
  }, [dataMe]);

  return (
    <Modal
      title={step === 1 ? tReceiveCertModal('congratulations') : tReceiveCertModal('yourCert')}
      open={isOpen}
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
      {renderFooter()}
    </Modal>
  );
};

export { ReceiveCertificateModal };
