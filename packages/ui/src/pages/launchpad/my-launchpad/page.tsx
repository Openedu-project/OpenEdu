import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import { Card } from '#shadcn/card';
import { Tabs, TabsContent } from '#shadcn/tabs';
import LaunchpadList from './_components/my-launchpad-list';
import MyLaunchpadTab from './_components/my-launchpad-tab';

// Loading skeleton component
function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {[...new Array(4)].map(_ => (
        <Card key={Math.random()} className="flex h-full flex-col overflow-hidden">
          <div className="aspect-video w-full animate-pulse bg-gray-200" />
          <div className="p-4">
            <div className="mb-3 h-5 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="mb-4 h-5 w-1/2 animate-pulse rounded bg-gray-200" />
            <div className="mt-auto pt-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-1/4 animate-pulse rounded bg-gray-200" />
              </div>
              <div className="mb-2 h-1 w-full animate-pulse bg-gray-200" />
              <div className="h-4 w-1/4 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

// Main page component
export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { tab = 'pledged', page = '1' } = await searchParams;
  const t = await getTranslations('myLaunchpadList');

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="giant-iheading-bold24 mb-6">{t('title')}</h1>

      {/* Client-side Tabs component for navigation without page reloads */}
      <MyLaunchpadTab />

      <Tabs value={tab} className="w-full">
        {/* Pledging Tab Content */}
        <TabsContent value="pledged">
          <h2 className="giant-iheading-semibold20 mb-4">{t('pledgingLaunchpad')}</h2>
          <Suspense fallback={<LoadingSkeleton />}>
            <LaunchpadList type="pledged" currentPage={page} />
          </Suspense>
        </TabsContent>

        {/* Voting Tab Content */}
        <TabsContent value="voting">
          <h2 className="giant-iheading-semibold20 mb-4">{t('votingLaunchpad')}</h2>
          <Suspense fallback={<LoadingSkeleton />}>
            <LaunchpadList type="voting" currentPage={page} />
          </Suspense>
        </TabsContent>

        {/* Success Tab Content */}
        <TabsContent value="got_revenue">
          <h2 className="giant-iheading-semibold20 mb-4">{t('successLaunchpad')}</h2>
          <Suspense fallback={<LoadingSkeleton />}>
            <LaunchpadList type="got_revenue" currentPage={page} />
          </Suspense>
        </TabsContent>

        {/* Failed Tab Content */}
        <TabsContent value="got_refunded">
          <h2 className="giant-iheading-semibold20 mb-4">{t('failedLaunchpad')}</h2>
          <Suspense fallback={<LoadingSkeleton />}>
            <LaunchpadList type="got_refunded" currentPage={page} />
          </Suspense>
        </TabsContent>
      </Tabs>

      {/* TODO WHISH LIST TAB */}
      {/* <h2 className="giant-iheading-semibold20 mt-10 mb-4">
        {t("wishlistLaunchpad")}
      </h2>
      <Suspense fallback={<LoadingSkeleton />}>
        <LaunchpadList type="wishlist" currentPage={page} />
      </Suspense> */}
    </div>
  );
}
