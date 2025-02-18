'use client';

import type { INotificationItem } from '@oe/api/types/notification';
import { formatDate } from '@oe/core/utils/datetime';
import { useTranslations } from 'next-intl';
import React, { type ReactNode } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { Link } from '#common/navigation';
import { formatCurrency } from '#components/input-currency';
import { Button } from '#shadcn/button';
import { cn } from '#utils/cn';
import { NotificationSkeleton } from './notification-skeleton';
import { useNotifications } from './useNotifications';

export function NotificationList() {
  const t = useTranslations('notification');
  const { notifications, isLoading, hasMore, markAsRead, markAllAsRead, fetchNextPage } = useNotifications();

  if (isLoading && notifications.length === 0) {
    return <NotificationSkeleton />;
  }

  return (
    <div className="flex max-h-[calc(100vh-120px)] flex-col sm:max-h-[480px]">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-popover p-3">
        <h3 className="mb-0 font-semibold text-lg">{t('notifications')}</h3>
        <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
          {t('markAllAsRead')}
        </Button>
      </div>

      <div className="flex-1">
        <Virtuoso
          style={{ height: '400px', maxHeight: 'calc(100vh-180px)' }}
          totalCount={notifications.length}
          data={notifications}
          endReached={() => {
            if (hasMore) {
              fetchNextPage();
            }
          }}
          overscan={10}
          components={{
            List: React.forwardRef(({ style, children }, ref) => (
              <div ref={ref} style={style} className="w-full">
                {children}
              </div>
            )),
            EmptyPlaceholder: () => (
              <div className="p-4 text-center text-muted-foreground text-sm">{t('noNotifications')}</div>
            ),
            Footer: () =>
              hasMore ? (
                <div className="p-2">
                  <NotificationSkeleton count={1} />
                </div>
              ) : notifications.length > 0 ? (
                <p className="p-2 text-center text-muted-foreground text-xs">{t('noMoreNotifications')}</p>
              ) : null,
          }}
          itemContent={(_index, notification) => (
            <NotificationRow notification={notification} onMarkAsRead={markAsRead} />
          )}
        />
      </div>
    </div>
  );
}

interface NotificationRowProps {
  notification: INotificationItem;
  onMarkAsRead: (id: string, notification: INotificationItem) => void;
}

function NotificationRow({ notification, onMarkAsRead }: NotificationRowProps) {
  const t = useTranslations('notification');
  const { redirectLink } = useNotifications();

  return (
    <div
      onClick={() => onMarkAsRead(notification.id, notification)}
      onKeyUp={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          onMarkAsRead(notification.id, notification);
        }
      }}
      className={cn(
        'cursor-pointer border-b p-3 transition-all last:border-b-0',
        'hover:bg-muted/40',
        !notification.read_at && 'bg-muted'
      )}
    >
      <Link
        href={redirectLink(notification)}
        className={cn(
          '!text-foreground !border-none mb-1 block h-auto whitespace-pre-wrap p-0 text-sm hover:no-underline',
          !notification.read_at && 'font-medium'
        )}
      >
        {t?.rich(`code${notification.code}`, {
          strong: (chunks: ReactNode) => <strong>{chunks}</strong>,
          course_name: notification?.props?.course_name ?? '',
          org_name: notification?.props?.org_name ?? '',
          organization_name: notification?.props?.org_name ?? '',
          user_name: notification?.props?.username ?? '',
          blog_name: notification?.props?.blog_title ?? '',
          display_name: notification?.props?.display_name ?? '',
          launchpad_name: notification?.props?.launchpad_name ?? '',
          amount: formatCurrency(String(Number.parseFloat(notification?.props?.amount ?? '') ?? 0)) ?? '',
          currency: notification?.props?.currency ?? '',
          collaborator: notification?.props?.course_roles?.join(', ') ?? '',
          course_ai_tool: t?.(notification?.props?.provider ?? 'ai_tool'),
        })}
      </Link>
      <time className="text-muted-foreground text-xs">{formatDate(notification.create_at)}</time>
    </div>
  );
}
