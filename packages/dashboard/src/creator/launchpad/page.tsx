'use client';
import { DashboardMainPageLayout } from '@oe/ui/common/layout';
import { Tabs, TabsList, TabsTrigger } from '@oe/ui/shadcn/tabs';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';
import CreatorLaunchpadList from './_components/creator-launchpad-list';

export default function CreateLaunchpadManagement() {
  const tDashboard = useTranslations('dashboard.launchpad');
  const t = useTranslations('creatorLaunchpad');
  const [tab, setTab] = useState<string>('draft');
  const displayTabs = useMemo(
    () => [
      { id: 'draft', label: t('status.draft') },
      { id: 'reviewing', label: t('status.reviewing') },
      { id: 'approved', label: t('status.approved') },
      { id: 'publish', label: t('status.publish') },
      { id: 'funding', label: t('status.funding') },
      { id: 'waiting', label: t('status.waiting') },
      { id: 'voting', label: t('status.voting') },
      { id: 'success', label: t('status.success') },
      { id: 'failed', label: t('status.failed') },
      { id: 'refunded', label: t('status.refunded') },
    ],
    [t]
  );

  const handleChangeTab = useCallback((tab: string) => {
    setTab(tab);
  }, []);

  return (
    <DashboardMainPageLayout
      breadcrumbs={[{ label: tDashboard('title'), disabled: true }]}
      dashboard="admin"
      contentClassName="bg-transparent px-0"
      title={
        <div className="flex flex-col justify-between gap-2">
          <h2 className="giant-iheading-semibold20 md:giant-iheading-semibold32 mb-1">{t('title')}</h2>
          <Tabs defaultValue="draft" className="w-full" onValueChange={handleChangeTab}>
            <div className="w-full overflow-x-auto">
              <TabsList className="mb-1 flex h-auto min-w-max justify-start bg-transparent p-0">
                {displayTabs.map(tab => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className={`relative mr-6 whitespace-nowrap px-3 py-1.5 font-medium text-gray-600 text-sm transition-all before:absolute before:right-0 before:bottom-0 before:left-0 before:h-0.5 before:scale-x-0 before:transform before:bg-blue-600 before:transition-transform before:duration-300 before:content-[''] last:mr-0 hover:text-gray-800 data-[state=active]:text-blue-600 data-[state=active]:before:scale-x-100 `}
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </Tabs>
        </div>
      }
    >
      <CreatorLaunchpadList status={tab} />
    </DashboardMainPageLayout>
  );
}
