import { Skeleton } from "@oe/ui";

export default function Loading() {
  return (
    <div className="container mx-auto flex max-w-[1440px] flex-col gap-[60px] px-4 py-0 md:px-6 lg:px-8">
      {/* Hero Section Skeleton */}
      <div className="w-full py-10">
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>

      {/* Popular Courses Section Skeleton */}
      <div className="w-full">
        <Skeleton className="mb-6 h-10 w-[300px]" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {new Array(6).fill(0).map((_, index) => (
            <Skeleton key={index} className="h-[250px] w-full rounded-lg" />
          ))}
        </div>
      </div>

      {/* Learning Path Section Skeleton */}
      <div className="w-full">
        <Skeleton className="mb-6 h-10 w-[300px]" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {new Array(4).fill(0).map((_, index) => (
            <Skeleton key={index} className="h-[200px] w-full rounded-lg" />
          ))}
        </div>
      </div>

      {/* Additional Sections Skeleton */}
      {new Array(5).fill(0).map((_, index) => (
        <div key={index} className="w-full">
          <Skeleton className="mb-6 h-10 w-[300px]" />
          <Skeleton className="h-[300px] w-full rounded-xl" />
        </div>
      ))}
    </div>
  );
}
