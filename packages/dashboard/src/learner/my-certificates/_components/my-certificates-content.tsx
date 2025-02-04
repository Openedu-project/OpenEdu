import type { ICertificateUser } from '@oe/api/types/certificate';
import type { IDataPagination } from '@oe/api/types/pagination';
import { CertificateCard } from '@oe/ui/components/certificate';
import { NoDataAvailable } from '@oe/ui/components/no-data-available';
import { useTranslations } from 'next-intl';

export default function MyCertificatesContent({
  certificates,
}: {
  certificates?: IDataPagination<ICertificateUser[]> | null;
}) {
  const t = useTranslations('myLearningSpace.myCertificates');

  console.log(certificates, 'certificate list');

  return (
    <div className="space-y-6 py-6">
      <h3 className="giant-iheading-semibold20 mb-0 border-primary border-l-[3px] pl-[12px] text-primary uppercase">
        {t('title')} ({certificates?.pagination?.total_items})
      </h3>

      {certificates && certificates.results?.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {certificates.results?.map(certificate => (
            <CertificateCard key={certificate.id} certificate={certificate} username="" type="learning_space" />
          ))}
        </div>
      ) : (
        <NoDataAvailable />
      )}
    </div>
  );
}
