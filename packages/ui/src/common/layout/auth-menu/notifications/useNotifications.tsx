import { useGetNotification, useUpdateNotification } from '@oe/api/hooks/useNotification';
import type { INotificationItem } from '@oe/api/types/notification';
import type { HTTPErrorMetadata } from '@oe/api/utils/http-error';
import { ADMIN_ROUTES, BLOG_ROUTES, CREATOR_ROUTES, PLATFORM_ROUTES } from '@oe/core/utils/routes';
import { buildUrl } from '@oe/core/utils/url';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from '#common/navigation';
import { useSocketStore } from '#store/socket';

export function useNotifications() {
  const [page, setPage] = useState(1);
  const tError = useTranslations('errors');
  const routes = useRouter();

  const [notifications, setNotifications] = useState<INotificationItem[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const {
    dataNotification,
    isLoadingNotification: isLoadingNotifications,
    mutateNotificationList,
  } = useGetNotification({
    page,
    sort: 'create_at desc',
  });
  const { triggerUpdateNotification } = useUpdateNotification();
  const { notificationData } = useSocketStore();

  useEffect(() => {
    if (dataNotification?.results) {
      if (page === 1) {
        // Reset list for first page
        setNotifications(dataNotification.results);
      } else {
        setNotifications(prev => [...prev, ...dataNotification.results]);
      }
      setHasMore(page < (dataNotification.pagination?.total_pages ?? 1));
    }
  }, [dataNotification?.results, dataNotification?.pagination?.total_pages, page]);

  useEffect(() => {
    // if (courseData) {
    //   setNotifications(prevNotifications => [
    //     { ...(courseData.data as unknown as INotificationItem) },
    //     ...prevNotifications,
    //   ]);
    // }
    if (notificationData) {
      setNotifications(prevNotifications => [
        { ...(notificationData.data as unknown as INotificationItem) },
        ...prevNotifications,
      ]);
    }
  }, [notificationData]);

  const fetchNextPage = useCallback(() => {
    if (!hasMore || isLoadingNotifications) {
      return;
    }
    setPage(p => p + 1);
  }, [hasMore, isLoadingNotifications]);

  const markAsRead = useCallback(
    async (id: string, notification: INotificationItem) => {
      try {
        await triggerUpdateNotification({
          ids: [id],
          read: true,
          read_all: false,
        });

        // Update local state without refetching
        setNotifications(prev => prev.map(notif => (notif.id === id ? { ...notif, read_at: Date.now() } : notif)));

        // Mutate the SWR cache without triggering a refetch
        await mutateNotificationList(
          cache => {
            if (!cache) {
              return cache;
            }
            return {
              ...cache,
              badge_count: cache.badge_count - 1,
              results: cache.results.map(notif => (notif.id === id ? { ...notif, read_at: Date.now() } : notif)),
            };
          },
          { revalidate: false }
        );
        redirectLink(notification);
      } catch (error) {
        console.error('Failed to mark notification as read:', error);
        toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      }
    },
    [tError, triggerUpdateNotification, mutateNotificationList]
  );

  const markAllAsRead = useCallback(async () => {
    try {
      await triggerUpdateNotification({
        ids: [],
        read: true,
        read_all: true,
      });

      // Update local state without refetching
      setNotifications(prev => prev.map(notif => ({ ...notif, read_at: Date.now() })));

      // Mutate the SWR cache without triggering a refetch
      await mutateNotificationList(
        cache => {
          if (!cache) {
            return cache;
          }
          return {
            ...cache,
            badge_count: 0,
            results: cache.results.map(notif => ({
              ...notif,
              read_at: Date.now(),
            })),
          };
        },
        { revalidate: false }
      );
    } catch (error) {
      console.error('Failed to mark all as read:', error);
      toast.error(tError((error as HTTPErrorMetadata).code.toString()));
    }
  }, [tError, triggerUpdateNotification, mutateNotificationList]);

  const redirectLink = useCallback(
    (notification: INotificationItem) => {
      switch (notification.code) {
        // Course (0-99)
        case 1:
        case 3:
          routes.push(
            buildUrl({
              endpoint: CREATOR_ROUTES.courseHistory,
              params: { courseId: notification.props?.course_id },
            })
          );
          break;
        case 4:
          routes.push('#');
          break;
        case 5:
        case 6:
        case 14:
        case 15:
          routes.push(CREATOR_ROUTES.courses);
          break;
        case 7:
          routes.push(ADMIN_ROUTES.coursesReviewing);
          break;
        case 11:
        case 13:
          routes.push(
            buildUrl({
              endpoint: CREATOR_ROUTES.courseSettingUp,
              params: { courseId: notification.props?.course_id },
            })
          );
          break;
        case 12:
          routes.push(
            buildUrl({
              endpoint: PLATFORM_ROUTES.courseDetail,
              params: { slug: notification.props?.course_slug },
            })
          );
          break;

        // Blog (100-199)
        case 100:
          routes.push(
            buildUrl({
              endpoint: BLOG_ROUTES.blogDetail,
              params: { slug: notification.props?.blog_slug },
            })
          );
          break;

        default:
          routes.push('#');
          break;
      }
    },
    [routes]
  );

  return {
    notifications,
    isLoading: isLoadingNotifications,
    hasMore,
    markAsRead,
    markAllAsRead,
    fetchNextPage,
  };
}
