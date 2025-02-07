import { Skeleton } from '#shadcn/skeleton';

interface NotificationSkeletonProps {
  count?: number;
}

export function NotificationSkeleton({ count = 5 }: NotificationSkeletonProps) {
  return (
    <div className="space-y-4 p-4">
      {Array.from({ length: count }).map(() => (
        <div key={crypto.randomUUID()} className="flex flex-col space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-3 w-20" />
        </div>
      ))}
    </div>
  );
}
