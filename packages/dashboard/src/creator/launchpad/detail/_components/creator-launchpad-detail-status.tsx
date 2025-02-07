'use client';
import { Button } from '@oe/ui/shadcn/button';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo } from 'react';

// Badge Component with integrated translation
export type CreatorLaunchpadStatusType =
  | 'draft'
  | 'waiting'
  | 'reviewing'
  | 'failed'
  | 'rejected'
  | 'cancelled'
  | 'success'
  | 'approved'
  | 'publish'
  | 'voting'
  | 'funding'
  | 'refunded';
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
}: {
  status: CreatorLaunchpadStatusType;
}) {
  const t = useTranslations('creatorLaunchpad');

  const getBadgeContent = useCallback(
    (status: string) => {
      if (!status) {
        return null;
      }
      return <Badge status={status as CreatorLaunchpadStatusType} t={t} />;
    },
    [t]
  );

  return (
    <>
      {status === 'draft' ? (
        <div className="flex gap-2">
          <Button variant="secondary">123123</Button>
          <Button>123123</Button>
        </div>
      ) : (
        getBadgeContent(status)
      )}
    </>
  );
}
