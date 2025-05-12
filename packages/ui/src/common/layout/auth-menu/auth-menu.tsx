"use client";

import { useAuth } from "#common/providers";
import { Skeleton } from "#shadcn/skeleton";
// import { getMeServiceWithoutError } from '@oe/api';
import { AuthButtons } from "./auth-buttons";
import { NotificationButton } from "./notifications/notification-button";
import { UserMenu } from "./user-menu";

export function AuthMenu() {
  // const start = performance.now();
  // const me = await getMeServiceWithoutError(undefined, {
  //   next: { tags: ['getMeServiceWithoutError'] },
  // });
  // const end = performance.now();
  // console.info(`==========getMeServiceWithoutError took ${end - start}ms==========`);

  const { me, isMeLoading } = useAuth();

  if (isMeLoading) {
    return (
      <Skeleton className="ml-auto flex h-10 w-60 items-center space-x-1" />
    );
  }

  return (
    <div className="itxems-center ml-auto flex space-x-1">
      {me ? (
        <>
          <NotificationButton />
          <UserMenu me={me} />
        </>
      ) : (
        <AuthButtons />
      )}
    </div>
  );
}
