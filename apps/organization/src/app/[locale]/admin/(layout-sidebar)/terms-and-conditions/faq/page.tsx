
import { DashboardMainPageLayout } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { TermsConditionsForm } from '../_components';

export default function FAQConfigPage() {
  const tDashboard = useTranslations('dashboard.termsConditions');
  const t = useTranslations('faq');

  return (
    <DashboardMainPageLayout
      breadcrumbs={[{ label: tDashboard('title'), disabled: true }, { label: tDashboard('faq') }]}
      dashboard="admin"
      title={t('title')}
    >
      <TermsConditionsForm pageKey='faq_page'/>
    </DashboardMainPageLayout>
  );
}
