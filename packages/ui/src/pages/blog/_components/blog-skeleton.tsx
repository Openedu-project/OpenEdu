import { Card } from '@oe/ui/shadcn/card';

const BlogCardSkeleton = () => {
  return (
    <Card className="flex flex-col space-y-3 p-4">
      <div className="h-48 w-full animate-pulse rounded-lg bg-gray-200" />
      <div className="space-y-3">
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-1/4 animate-pulse rounded bg-gray-200" />
      </div>
    </Card>
  );
};
BlogCardSkeleton.dislayName = 'BlogCardSkeleton';

const BlogGridSkeleton = ({ perPage = 12 }: { perPage?: number }) => {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 md:p-8 lg:grid-cols-4">
      {Array.from({ length: perPage }).map((_, index) => (
        <BlogCardSkeleton key={`skeleton-${index.toString()}`} />
      ))}
    </div>
  );
};
BlogGridSkeleton.displayName = 'BlogGridSkeleton';

export { BlogGridSkeleton, BlogCardSkeleton };
