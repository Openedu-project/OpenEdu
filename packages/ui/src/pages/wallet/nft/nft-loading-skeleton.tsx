export const NftLoadingSkeleton = () => (
  <div className="animate-pulse space-y-8">
    {[1, 2].map(section => (
      <div key={section} className="space-y-4">
        {/* Collection title skeleton */}
        <div className="h-7 w-1/4 rounded bg-gray-200" />

        {/* Grid of NFT items skeleton */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {[1, 2, 3, 4, 5].map(item => (
            <div key={item} className="space-y-2">
              <div className="aspect-square rounded-lg bg-gray-200" />
              <div className="h-5 w-3/4 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);
