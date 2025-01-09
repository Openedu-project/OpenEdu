"use client";

import { useGetNotification } from "@oe/api/hooks/useNotification";
import { Bell } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "#shadcn/button";
import { Popover, PopoverContent, PopoverTrigger } from "#shadcn/popover";
import { NotificationList } from "./notification-list";

export function NotificationButton() {
  const [isOpen, setIsOpen] = useState(false);

  const { dataNotification } = useGetNotification({
    page: 1,
    sort: "create_at desc",
  });
  const unreadCount = useMemo(() => {
    if (!dataNotification) {
      return;
    }
    return dataNotification.badge_count;
  }, [dataNotification]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {typeof unreadCount === "number" && unreadCount > 0 && (
            <span className="-top-1 -right-1 absolute flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[11px] text-destructive-foreground">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-80 p-0 sm:w-96"
        align="center"
        alignOffset={-40}
        sideOffset={5}
      >
        <NotificationList />
      </PopoverContent>
    </Popover>
  );
}
