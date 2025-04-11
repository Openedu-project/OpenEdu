import { getMyLaunchpadService } from '@oe/api';
import { getTranslations } from 'next-intl/server';
import { MyLaunchpadCard } from './my-launchpad-card';
import { MyLaunchpadPagination } from './my-launchpad-pagination';

export async function LaunchpadList({
  type,
  currentPage,
}: {
  type: string;
  currentPage: string;
}) {
  const [launchpads, t] = await Promise.all([
    getMyLaunchpadService({
      params: {
        page: Number(currentPage),
        per_page: 12,
        status: type,
        sort: 'create_at desc',
      },
    }),
    getTranslations('myLaunchpadList'),
  ]);

  if (launchpads?.results?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <h3 className="giant-iheading-semibold20 mb-2">{t('noLaunchpads')}</h3>
      </div>
    );
  }

  return (
    <div className="block">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {launchpads?.results?.map(item => (
          <MyLaunchpadCard key={item?.launchpad?.id} campaign={item.launchpad} />
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <MyLaunchpadPagination
          currentPage={Number(currentPage)}
          totalCount={launchpads?.pagination?.total_items ?? 0}
        />
      </div>
    </div>
  );
}
