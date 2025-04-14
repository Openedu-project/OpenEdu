import type { ICertificateDetail, ICertificateUser } from '@oe/api';
import { LEARNER_ROUTES } from '@oe/core';
import { Link } from '@oe/ui';
import { CertificateDetail } from '@oe/ui';
import { NoDataAvailable } from '@oe/ui';
import { Spinner } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { MintCertButton } from './mint-cert-button';

interface IMyCertDetail {
  isLoading: boolean;
  data?: ICertificateDetail;
  onClickMintCert?: () => void;
}
export function MyCertDetail({ isLoading, data, onClickMintCert }: IMyCertDetail) {
  const t = useTranslations('myLearningSpace.myCertificates');

  return (
    <div className="flex flex-col gap-6">
      <Link
        href={LEARNER_ROUTES.myCertificates}
        className="mbutton-semibold16 !text-foreground/40 w-fit border-none px-0"
      >
        {t('back')}
      </Link>
      <h3 className="giant-iheading-semibold20 mb-0 border-primary border-l-[3px] pl-[12px] text-primary uppercase">
        {data?.course?.name}
      </h3>
      {isLoading ? (
        <div className="absolute top-0 right-0 bottom-0 left-0 z-[1] flex h-[100%] min-h-screen items-center justify-center rounded-[16px]">
          <Spinner />
        </div>
      ) : data ? (
        <CertificateDetail certificate={data}>
          <MintCertButton certificate={data as unknown as ICertificateUser} onClickMintCert={onClickMintCert} />
        </CertificateDetail>
      ) : (
        <NoDataAvailable className="m-auto" />
      )}
    </div>
  );
}
