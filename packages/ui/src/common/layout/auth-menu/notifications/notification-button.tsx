'use client';

import { useGetNotification } from '@oe/api/hooks/useNotification';
import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '#shadcn/button';
import { Popover, PopoverContent, PopoverTrigger } from '#shadcn/popover';
import { useSocketStore } from '#store/socket';
import { NotificationList } from './notification-list';

export function NotificationButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [badges, setBadges] = useState<number>(0);

  const { dataNotification } = useGetNotification({
    page: 1,
    sort: 'create_at desc',
  });
  const { badgeData } = useSocketStore();

  useEffect(() => {
    if (dataNotification) {
      setBadges(dataNotification.badge_count);
    }
  }, [dataNotification]);

  useEffect(() => {
    if (badgeData) {
      setBadges(badgeData.data.badge);
    }
  }, [badgeData]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="group relative hover:bg-primary/80 hover:text-primary-foreground/80 focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <Bell className="h-5 w-5 text-primary-foreground transition-colors group-hover:text-primary-foreground/80" />
          {typeof badges === 'number' && badges > 0 && (
            <span className="-top-1 -right-1 absolute flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[11px] text-destructive-foreground">
              {badges > 99 ? '99+' : badges}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-0 sm:w-96" align="center" alignOffset={-40} sideOffset={5}>
        <NotificationList />
      </PopoverContent>
    </Popover>
  );
}
