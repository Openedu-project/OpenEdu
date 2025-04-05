'use client';
import { ShareButton } from '#components/share-button';
import { WishlistButton } from '#components/wishlist-button';
import { useCourseContext } from './course-context';

export default function CourseHeader() {
  const { courseData, updateWishlistStatus } = useCourseContext();
  // const { dataMe } = useGetMe();

  // const { courseOutline: courseDataStore, setCourseOutline } =
  //   useCourseOutlineDetailStore();
  // const { name, props, slug, cuid } = courseOutline;

  // const url = createAPIUrl({
  //   endpoint: PLATFORM_ROUTES.courseDetail,
  //   params: { slug },
  // });

  // const shareConfig: ShareConfig = {
  //   url: `https://${courseOutline?.org?.domain}${url}/${
  //     dataMe ? `?ref_by=${dataMe?.id}` : ""
  //   }`,
  //   title: name,
  //   permalink: {
  //     enabled: true,
  //   },
  //   socials: [{ id: "facebook" }, { id: "twitter" }, { id: "telegram" }],
  // };

  return (
    <div className="flex items-start justify-between gap-2">
      <h1 className="giant-iheading-semibold24 mb-0 text-primary">{courseData.name}</h1>

      <div className="flex gap-1 md:gap-3">
        <WishlistButton
          bookmarkId={courseData?.bookmark?.id ?? ''}
          entityId={courseData?.cuid}
          entityType="course"
          isWishlist={courseData?.is_wishlist}
          // courseData={courseData}
          className="flex h-6 w-6 items-center border-foreground/20 p-1 md:h-8 md:w-8"
          onSuccess={(bookmarkId, isWishlist) => {
            updateWishlistStatus(bookmarkId, isWishlist);
          }}
          // onClick={async () => {
          //   const courseData = await getCourseOutlineService(undefined, {
          //     id: slug,
          //   });

          //   if (courseData) {
          //     setCourseOutline({
          //       ...courseData,
          //       bookmark: courseData.bookmark,
          //       is_wishlist: courseData.is_wishlist,
          //     });
          //   }
          // }}
        />
        {/* {courseOutline?.is_wishlist ? (
            <Heart
              className="h-3 w-3 md:h-4 md:w-4"
              color="var(--primary)"
            />
          ) : (
            <HeartOutline
              className="h-3 w-3 md:h-4 md:w-4"
              color="var(--foreground)"
            />
          )} */}
        {/* </WishlistButton> */}

        <ShareButton
          courseData={courseData}
          // className={cn(
          //   "flex h-6 w-6 items-center p-1 md:h-8 md:w-8",
          //   props?.is_affiliate && "!mr-6"
          // )}
          // config={shareConfig}
          // isAffiliate={props?.is_affiliate}
        />
      </div>
    </div>
  );
}
