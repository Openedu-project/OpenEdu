import { Card, CardContent, CardHeader } from "#shadcn/card";

const AssetCardSkeleton = () => (
  <Card className="rounded-[12px] p-3 shadow-none sm:p-4 animate-pulse">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 sm:mb-1">
      <div className="flex w-fit items-center gap-2">
        <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
      </div>
      <div className="flex gap-4">
        <div className="h-6 w-6 bg-gray-200 rounded"></div>
      </div>
    </CardHeader>
    <CardContent className="p-0 pl-12">
      <div className="h-8 w-full bg-gray-200 rounded"></div>
    </CardContent>
  </Card>
);

export default AssetCardSkeleton;
