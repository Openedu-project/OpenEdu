import { DashboardMainPageLayout } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { TermsConditionsForm } from '../_components';

export function TermsConfigPage() {
  const tDashboard = useTranslations('dashboard.termsConditions');
  const t = useTranslations('terms');

  return (
    <DashboardMainPageLayout
      breadcrumbs={[{ label: tDashboard('title'), disabled: true }, { label: tDashboard('termsAndPrivacy') }]}
      dashboard="admin"
      title={t('title')}
    >
      <TermsConditionsForm pageKey="term_page" />
    </DashboardMainPageLayout>
  );
}
