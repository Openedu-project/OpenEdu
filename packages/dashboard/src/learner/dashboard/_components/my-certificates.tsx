import { getCertByUserIdService } from '@oe/api';
import type { IUser } from '@oe/api';
import { LEARNER_ROUTES } from '@oe/core';
import { CertificateCard } from '@oe/ui';
import { NoDataAvailable } from '@oe/ui';
import { ScrollArea, ScrollBar } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { SectionCard } from './section-card';

export async function DashboardMyCertificates({ me }: { me: IUser | null }) {
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
