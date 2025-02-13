'use client';
import { useGetAdminLaunchpads } from '@oe/api/hooks/useAdminLaunchpad';
import { useGetMe } from '@oe/api/hooks/useMe';
import { formatDate } from '@oe/core/utils/datetime';
import { PaginationCustom } from '@oe/ui/components/pagination-custom';
import { Spinner } from '@oe/ui/components/spinner';
import { useCallback, useState } from 'react';
import { CreatorLaunchpadCard } from './creator-launchpad-card';

export default function CreatorLaunchpadList({ status }: { status: string }) {
  const [page, setPage] = useState<number>(1);
  const { dataMe: me } = useGetMe();
  const { dataAdminLaunchpads, isLoadingAdminLaunchpads } = useGetAdminLaunchpads(me?.id ?? '', {
    page,
    per_page: 12,
    status: status,
    preloads: ['Owner', 'Investment'],
    user_id: me?.id,
  });

  const handlePageChange = useCallback((page: number) => {
    setPage(page);
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'auto',
      });
    }
  }, []);

  return isLoadingAdminLaunchpads ? (
    <Spinner />
  ) : (
    <div className="block">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {dataAdminLaunchpads?.results?.map(launchpad => (
          <CreatorLaunchpadCard
            key={launchpad.id}
            id={launchpad.id}
            title={launchpad.name}
            creator={launchpad.owner.display_name ?? launchpad.owner.email}
            thumbnail={launchpad?.thumbnail?.url ?? ''}
            date={formatDate(launchpad?.create_at)}
          />
        ))}
      </div>
      <PaginationCustom
        className="mt-6"
        currentPage={dataAdminLaunchpads?.pagination?.page ?? 1}
        totalCount={dataAdminLaunchpads?.pagination?.total_items ?? 0}
        onPageChange={handlePageChange}
        pageSize={12}
      />
    </div>
  );
}
