'use client';

import type { ICertificateDetail } from '@oe/api/types/certificate';
import ArrowDownCircle from '@oe/assets/icons/arrow-down-circle';
import ShareSocial from '@oe/assets/icons/share-social';
import { Button } from '@oe/ui/shadcn/button';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { type HTMLAttributes, useCallback, useState } from 'react';

import { formatDate } from '@oe/core/utils/datetime';
import { downloadFile } from '@oe/core/utils/download-file';
import { UserAvatar } from '../user-avatar/user-avatar';
import CourseInfo from './course-info';
import ShareCertModal from './share-cert-modal';

const PdfViewer = dynamic(() => import('../pdf-viewer/pdf-viewer'), {
  ssr: false,
});

interface ICertDetailProp extends HTMLAttributes<HTMLDivElement> {
  certificate: ICertificateDetail;
}

export default function CertificateDetail({ certificate, children }: ICertDetailProp) {
  const tProfile = useTranslations('userProfile.certificate');
  const t = useTranslations('courseOutline');

  const [isOpenShareModal, setOpenShareModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user, files, course, id } = certificate;

  const handleOpenShareModal = useCallback(() => setOpenShareModal(true), []);

  const handleCloseShareModal = useCallback(() => setOpenShareModal(false), []);

  const handleDownload = useCallback(async () => {
    setIsLoading(true);
    try {
      await downloadFile({
        fileUrl: files[0]?.url ?? '',
        fileName: `OpenEDU ${course?.name}`,
      });
    } catch (error) {
      console.error('Failed to download file. Please try again.', error);
    } finally {
      setIsLoading(false);
    }
  }, [files, course?.name]);

  const displayName = user?.display_name || user?.username;

  return (
    <div className="flex w-full flex-col gap-6 xl:flex-row">
      <PdfViewer
        className="max-h[380px] w-full xl:w-1/2 [&>div>div>div>div>div>canvas]:rounded-[12px] [&>div>div>div>div>div>canvas]:border [&>div>div>div>div>div>canvas]:border-primary [&>div]:px-0"
        files={files[0]?.url ?? ''}
      />

      <div className="flex w-full flex-col gap-3 xl:w-1/2">
        <CourseInfo courseData={course} />

        <div className="flex items-center rounded-[12px] bg-[#fff0fe] px-6 py-3">
          <UserAvatar src={user?.avatar} name={displayName} className="h-7 w-7" />
          <span className="mbutton-semibold16 ml-2">
            {displayName}&nbsp;
            <span className="mcaption-regular16">{tProfile('hasCompletedOn')}</span>
            &nbsp;
            {formatDate(user?.completed_at)}
          </span>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="default" className="!mbutton-bold16 w-full sm:w-1/2" onClick={handleOpenShareModal}>
            <ShareSocial color="hsl(var(--primary-foreground))" className="mr-3" />
            {tProfile('shareCertificate')}
          </Button>
          <Button variant="default" className="!mbutton-bold16 w-full sm:w-1/2" onClick={handleDownload}>
            <ArrowDownCircle color="hsl(var(--primary-foreground))" className="mr-3" />
            {isLoading ? t('attachedDocs.downloading') : tProfile('downloadCertificate')}
          </Button>
        </div>
        {children}
      </div>

      {isOpenShareModal && <ShareCertModal onClose={handleCloseShareModal} username={user?.username} certId={id} />}
    </div>
  );
}
