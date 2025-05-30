'use client';

import { useGetCertById } from '@oe/api/hooks/useCertificate';
import { createAPIUrl } from '@oe/api/utils/fetch';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { CertificateDetail } from '#components/certificate';
import { NoDataAvailable } from '#components/no-data-available';
import { Spinner } from '#components/spinner';

export default function Certificate() {
  const t = useTranslations('certificate');
  const { certificateId, user } = useParams();

  const { dataCertById, isLoadingCertById } = useGetCertById(certificateId as string);

  return (
    <div className="container flex min-h-[calc(100vh-var(--header-height))] py-6">
      {isLoadingCertById ? (
        <div className="absolute top-0 right-0 bottom-0 left-0 z-[1] flex h-[100%] min-h-screen items-center justify-center rounded-[16px]">
          <Spinner size="md" />
        </div>
      ) : dataCertById ? (
        <CertificateDetail certificate={dataCertById} />
      ) : (
        <NoDataAvailable
          className="m-auto"
          navigateLink={createAPIUrl({
            endpoint: PLATFORM_ROUTES.userProfile,
            params: { username: user },
          })}
          navigateTitle={t('backToUserProfile')}
        />
      )}
    </div>
  );
}
