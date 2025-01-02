import { useGetNotification, useGetNotificationBadge, useUpdateNotification } from '@oe/api/hooks/useNotification';
import type { INotificationItem } from '@oe/api/types/notification';
import type { HTTPErrorMetadata } from '@oe/api/utils/http-error';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

export function useNotifications() {
  const [page, setPage] = useState(1);
  const tError = useTranslations('errors');

  const { dataNotification, isLoadingNotification: isLoadingNotifications } = useGetNotification({
    page,
    sort: 'create_at desc',
  });
  const { triggerUpdateNotification } = useUpdateNotification();
  const { mutateNotificationBadge } = useGetNotificationBadge();

  const [notifications, setNotifications] = useState<INotificationItem[]>([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (dataNotification?.results) {
      setNotifications(prev => [...prev, ...dataNotification.results]);
      setHasMore(page < (dataNotification.pagination?.total_pages ?? 1));
    }
  }, [dataNotification, page]);

  const fetchNextPage = useCallback(() => {
    if (!hasMore || isLoadingNotifications) {
      return;
    }
    setPage(p => p + 1);
  }, [hasMore, isLoadingNotifications]);

  const markAsRead = useCallback(
    async (id: string) => {
      try {
        await triggerUpdateNotification({
          ids: [id],
          read: true,
          read_all: false,
        });
        setNotifications(prev => prev.map(notif => (notif.id === id ? { ...notif, read_at: Date.now() } : notif)));
        mutateNotificationBadge();
      } catch (error) {
        console.error('Failed to mark notification as read:', error);
        toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      }
    },
    [tError, mutateNotificationBadge, triggerUpdateNotification]
  );

  const markAllAsRead = useCallback(async () => {
    try {
      await triggerUpdateNotification({
        ids: [],
        read: true,
        read_all: true,
      });
      setNotifications(prev => prev.map(notif => ({ ...notif, read_at: Date.now() })));
      mutateNotificationBadge();
    } catch (error) {
      console.error('Failed to mark all as read:', error);
      toast.error(tError((error as HTTPErrorMetadata).code.toString()));
    }
  }, [tError, triggerUpdateNotification, mutateNotificationBadge]);

  return {
    notifications,
    isLoading: isLoadingNotifications,
    hasMore,
    markAsRead,
    markAllAsRead,
    fetchNextPage,
  };
}
