import { getCertByUserIdService } from '@oe/api/services/certificate';
import type { IUser } from '@oe/api/types/user';
import { LEARNER_ROUTES } from '@oe/core/utils/routes';
import { CertificateCard } from '@oe/ui/components/certificate';
import { NoDataAvailable } from '@oe/ui/components/no-data-available';
import { ScrollArea, ScrollBar } from '@oe/ui/shadcn/scroll-area';
import { useTranslations } from 'next-intl';
import SectionCard from './section-card';

export default async function DashboardMyCertificates({
  me,
}: {
  me: IUser | null;
}) {
  const tLearnerDashboard = useTranslations('myLearningSpace.dashboard');

  const myCertificates = await getCertByUserIdService(undefined, {
    params: { user_id: me?.id ?? '' },
  });

  return (
    <SectionCard
      title={tLearnerDashboard('myCertificates')}
      viewAllButtonLink={LEARNER_ROUTES.myCertificates}
      className="col-span-1"
    >
      {myCertificates && myCertificates?.results?.length > 0 ? (
        <ScrollArea>
          <div className="mb-2 flex gap-4">
            {myCertificates?.results?.map(item => (
              <CertificateCard
                key={item.id}
                certificate={item}
                username={me?.username ?? ''}
                type="learning_space"
                // hasCompletedOn={false}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      ) : (
        <NoDataAvailable size="sm" />
      )}
    </SectionCard>
  );
}
