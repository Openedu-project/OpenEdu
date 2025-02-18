import { useGetNotification, useUpdateNotification } from '@oe/api/hooks/useNotification';
import type { INotificationItem } from '@oe/api/types/notification';
import type { HTTPErrorMetadata } from '@oe/api/utils/http-error';
import {
  ADMIN_ROUTES,
  BLOG_ADMIN_ROUTES,
  BLOG_ROUTES,
  CREATOR_ROUTES,
  PLATFORM_ROUTES,
  WALLET_ROUTES,
} from '@oe/core/utils/routes';
import { buildUrl } from '@oe/core/utils/url';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useSocketStore } from '#store/socket';

export function useNotifications() {
  const [page, setPage] = useState(1);
  const tError = useTranslations('errors');

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
    async (id: string) => {
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

  const redirectLink = useCallback((notification: INotificationItem) => {
    switch (notification.code) {
      // Course (0-99)
      case 1:
      case 3:
        return buildUrl({
          endpoint: CREATOR_ROUTES.courseHistory,
          params: { courseId: notification.props?.course_id },
        });
      case 4:
        return '#';
      case 5:
      case 6:
      case 14:
      case 15:
        return CREATOR_ROUTES.courses;
      case 7:
        return ADMIN_ROUTES.coursesReviewing;
      case 11:
      case 13:
        return buildUrl({
          endpoint: CREATOR_ROUTES.courseSettingUp,
          params: { courseId: notification.props?.course_id },
        });
      case 12:
        return buildUrl({
          endpoint: PLATFORM_ROUTES.courseDetail,
          params: { slug: notification.props?.course_slug },
        });

      // Blog (100-199)
      case 100:
        return buildUrl({
          endpoint: BLOG_ROUTES.blogDetail,
          params: { slug: notification.props?.blog_slug },
        });
      case 101:
      case 103:
      case 105:
      case 108:
      case 109:
        return BLOG_ADMIN_ROUTES.myBlog;
      case 104:
      case 106:
        return PLATFORM_ROUTES.homepage;

      // Certificate (200-299)
      case 200:
        return buildUrl({
          endpoint: PLATFORM_ROUTES.editProfileCertificates,
          params: { username: notification.props?.username },
        });
      case 201:
        return WALLET_ROUTES.nft;

      // Wallet (300-399)
      case 300:
        return ADMIN_ROUTES.withdrawRequest;
      case 301:
      case 302:
        return WALLET_ROUTES.history;

      // Avail Retroactive (400-499)
      case 400:
        return WALLET_ROUTES.wallet;

      // Launchpad (700-799)
      case 700:
        return buildUrl({
          endpoint: ADMIN_ROUTES.launchpadRequestsDetail,
          params: { id: notification.props?.launchpad_id },
        });
      case 701:
      case 702:
      case 703:
      case 704:
      case 705:
      case 708:
      case 709:
        return buildUrl({
          endpoint: CREATOR_ROUTES.creatorLaunchpadDetail,
          params: { id: notification.props?.launchpad_id },
        });
      case 706:
      case 707:
      case 711:
      case 712:
        return buildUrl({
          endpoint: PLATFORM_ROUTES.launchpadDetail,
          params: { id: notification.props?.launchpad_id },
        });
      case 710:
        return ADMIN_ROUTES.coursesReviewing;
      default:
        return '#';
    }
  }, []);

  return {
    notifications,
    isLoading: isLoadingNotifications,
    hasMore,
    markAsRead,
    markAllAsRead,
    fetchNextPage,
    redirectLink,
  };
}
