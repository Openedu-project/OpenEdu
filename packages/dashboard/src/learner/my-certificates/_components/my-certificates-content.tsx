'use client';

import type { ICertificateDetail, ICertificateUser } from '@oe/api';
import type { IUser } from '@oe/api';
import { useGetCertById, useGetCertByUserId } from '@oe/api';
import { CertificateCard } from '@oe/ui';
import { NoDataAvailable } from '@oe/ui';
import { PaginationCustom } from '@oe/ui';
import { Spinner } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { MintCertButton } from './mint-cert-button';
import { MintCertModal } from './mint-cert-modal';
import { MyCertDetail } from './my-cert-detail';

export function MyCertificatesContent({ meData }: { meData?: IUser | null }) {
  const t = useTranslations('myLearningSpace.myCertificates');

  const searchParams = useSearchParams();
  const certificateId = searchParams.get('certificate');

  const [page, setPage] = useState<number>(1);
  const [certificate, setCertificate] = useState<ICertificateUser | ICertificateDetail | undefined>();

  const { dataCertByUser, isLoadingCertByUser, mutateCertByUser } = useGetCertByUserId(meData?.id as string, { page }); // certificate list
  const { dataCertById, isLoadingCertById, mutateCertById } = useGetCertById(certificateId as string); // certificate details

  const onMutate = async () => {
    await mutateCertById();
    await mutateCertByUser();
  };

  return (
    <>
      {isLoadingCertByUser || isLoadingCertById ? (
        <Spinner />
      ) : (
        <div className="space-y-6 py-6">
          {certificateId && dataCertById ? (
            <MyCertDetail
              data={dataCertById}
              isLoading={isLoadingCertById}
              onClickMintCert={() => setCertificate(dataCertById)}
            />
          ) : (
            <>
              <h3 className="giant-iheading-semibold20 mb-0 border-primary border-l-[3px] pl-[12px] text-primary uppercase">
                {t('title')} ({dataCertByUser?.pagination?.total_items})
              </h3>

              {dataCertByUser && dataCertByUser?.results?.length > 0 ? (
                // <div className="w-full">
                <div className="grid w-full auto-rows-fr justify-center gap-6 sm:grid-cols-[repeat(auto-fit,minmax(280px,360px))] md:justify-start">
                  {/* <div className="grid auto-rows-fr grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6"> */}
                  {dataCertByUser.results?.map(certificate => (
                    <CertificateCard
                      key={certificate.id}
                      certificate={certificate}
                      username=""
                      type="learning_space"
                      className="h-full w-full max-w-full"
                    >
                      <MintCertButton certificate={certificate} onClickMintCert={() => setCertificate(certificate)} />
                    </CertificateCard>
                  ))}
                </div>
              ) : (
                // </div>
                <NoDataAvailable />
              )}

              <PaginationCustom
                currentPage={dataCertByUser?.pagination?.page ?? 1}
                totalCount={dataCertByUser?.pagination?.total_items ?? 0}
                onPageChange={page => setPage(page)}
                className="p-8"
              />
            </>
          )}
        </div>
      )}

      {certificate && (
        <MintCertModal certificate={certificate} onClose={() => setCertificate(undefined)} mutate={onMutate} />
      )}
    </>
  );
}
