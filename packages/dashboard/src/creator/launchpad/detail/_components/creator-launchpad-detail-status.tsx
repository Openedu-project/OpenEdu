'use client';
import { usePostAdminPublishLaunchpads } from '@oe/api/hooks/useAdminLaunchpad';
import type { CreatorLaunchpadStatusType } from '@oe/api/types/admin-launchpad';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import type { HTTPErrorMetadata } from '@oe/api/utils/http-error';
import { Button } from '@oe/ui/shadcn/button';
import { toast } from '@oe/ui/shadcn/sonner';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo } from 'react';
import { useSWRConfig } from 'swr';
import { revalidateAdminLaunchpadDetail } from '../_action';

// Badge Component with integrated translation

const Badge = ({
  status,
  t,
}: {
  status: CreatorLaunchpadStatusType;
  t: (key: string) => string;
}) => {
  const statusStyles = useMemo(
    () => ({
      draft: {
        bg: 'bg-neutral-50',
        text: 'text-neutral-600',
      },
      waiting: {
        bg: 'bg-info-50',
        text: 'text-info-600',
      },
      reviewing: {
        bg: 'bg-info-50',
        text: 'text-info-600',
      },
      failed: {
        bg: 'bg-negative-50',
        text: 'text-negative-500',
      },
      rejected: {
        bg: 'bg-negative-50',
        text: 'text-negative-500',
      },
      cancelled: {
        bg: 'bg-negative-50',
        text: 'text-negative-500',
      },
      success: {
        bg: 'bg-positive-50',
        text: 'text-positive-600',
      },
      approved: {
        bg: 'bg-positive-50',
        text: 'text-positive-600',
      },
      publish: {
        bg: 'bg-warning-50',
        text: 'text-warning-600',
      },
      voting: {
        bg: 'bg-tertiary-50',
        text: 'text-tertiary-800',
      },
      funding: {
        bg: 'bg-primary-100',
        text: 'text-primary',
      },
      refunded: {
        bg: 'bg-orange-50',
        text: 'text-orange-500',
      },
    }),
    []
  );

  const styles = statusStyles[status] || { bg: '', text: '' };

  return (
    <span
      className={`giant-iheading-semibold16 flex min-w-[120px] items-center justify-center rounded-[40px] px-6 py-2 ${styles.bg} ${styles.text}`}
    >
      {t(status)}
    </span>
  );
};

export default function CreatorLaunchpadDetailStatus({
  status,
  id,
}: {
  status: CreatorLaunchpadStatusType;
  id: string;
}) {
  const t = useTranslations('creatorLaunchpad');
  const tStatus = useTranslations('creatorLaunchpad.status');
  const tError = useTranslations('errors');
  const { mutate: globalMutate } = useSWRConfig();

  const { triggerPostAdminPublishLaunchpads } = usePostAdminPublishLaunchpads(id);

  const handleActionSuccess = useCallback(
    (endpoint: string) => {
      globalMutate((key: string) => !!key?.includes(endpoint), undefined, {
        revalidate: false,
      });
    },
    [globalMutate]
  );

  const getBadgeContent = useCallback(
    (status: string) => {
      if (!status) {
        return null;
      }
      return <Badge status={status as CreatorLaunchpadStatusType} t={tStatus} />;
    },
    [tStatus]
  );

  const handlePublishLaunchpad = useCallback(async () => {
    try {
      await triggerPostAdminPublishLaunchpads({ status: 'publish' });
      handleActionSuccess(API_ENDPOINT.LAUNCHPADS);
      await revalidateAdminLaunchpadDetail();
      toast.success(t('publishLaunchpadSuccess'));
    } catch (error) {
      console.error('Error Publish Launchpad', error);
      toast.error(tError((error as HTTPErrorMetadata).code.toString()));
    }
  }, [handleActionSuccess, t, tError, triggerPostAdminPublishLaunchpads]);

  return (
    <>
      {status === 'draft' ? (
        <div className="flex gap-2">
          <Button variant="secondary">{t('editLaunchpad')}</Button>
          <Button onClick={handlePublishLaunchpad}>{t('publishLaunchpad')}</Button>
        </div>
      ) : (
        getBadgeContent(status)
      )}
    </>
  );
}
