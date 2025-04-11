import { DashboardMainPageLayout } from '@oe/ui';
import { TableProvider } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { CertificatesList } from './_components/certificate-list';
import { CreateCertificateButton } from './_components/create-certificate-button';

export function Certificates() {
  const tCertificate = useTranslations('certificate');

  return (
    <TableProvider>
      <DashboardMainPageLayout
        breadcrumbs={[{ label: tCertificate('list.title') }]}
        dashboard="admin"
        header={
          <div className="flex flex-wrap items-center justify-between">
            <h1 className="text-2xl">{tCertificate('list.title')}</h1>
            <CreateCertificateButton />
          </div>
        }
      >
        <CertificatesList />
      </DashboardMainPageLayout>
    </TableProvider>
  );
}
