import { useGetMe } from '@oe/api/hooks/useMe';
import { getCourseOutlineService } from '@oe/api/services/course';
import type { ICourseOutline } from '@oe/api/types/course/course';
import { createAPIUrl } from '@oe/api/utils/fetch';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
import { ShareButton, type ShareConfig } from '#components/share-button';
import { WishlistButton } from '#components/wishlist-button';
import { cn } from '#utils/cn';
import { useCourseOutlineDetailStore } from '../_store/useCourseOutlineStore';

export default function CourseHeader({
  courseOutline,
}: {
  courseOutline: ICourseOutline;
}) {
  const { dataMe } = useGetMe();

  const { courseOutline: courseDataStore, setCourseOutline } = useCourseOutlineDetailStore();
  const { name, props, slug, cuid } = courseOutline;

  const url = createAPIUrl({
    endpoint: PLATFORM_ROUTES.courseDetail,
    params: { slug },
  });

  const shareConfig: ShareConfig = {
    url: `https://${courseOutline?.org?.domain}${url}/${dataMe ? `?ref_by=${dataMe?.id}` : ''}`,
    title: name,
    permalink: {
      enabled: true,
    },
    socials: [{ id: 'facebook' }, { id: 'twitter' }, { id: 'telegram' }],
  };

  return (
    <div className="flex items-start justify-between gap-2">
      <h1 className="giant-iheading-semibold24 md:giant-iheading-semibold32 mb-0 text-primary">{name}</h1>

      <div className="flex gap-1 md:gap-3">
        <WishlistButton
          bookmarkId={courseDataStore?.bookmark?.id}
          entityId={cuid}
          entityType="course"
          isWishlist={courseDataStore?.is_wishlist}
          className="flex h-6 w-6 items-center border-foreground/20 p-1 md:h-8 md:w-8"
          onClick={async () => {
            const courseData = await getCourseOutlineService(undefined, {
              id: slug,
            });

            if (courseData) {
              setCourseOutline({
                ...courseData,
                bookmark: courseData.bookmark,
                is_wishlist: courseData.is_wishlist,
              });
            }
          }}
        >
          {/* {courseOutline?.is_wishlist ? (
            <Heart
              className="h-3 w-3 md:h-4 md:w-4"
              color="hsl(var(--primary))"
            />
          ) : (
            <HeartOutline
              className="h-3 w-3 md:h-4 md:w-4"
              color="hsl(var(--foreground))"
            />
          )} */}
        </WishlistButton>

        <ShareButton
          className={cn('flex h-6 w-6 items-center p-1 md:h-8 md:w-8', props?.is_affiliate && '!mr-spacing-mml')}
          config={shareConfig}
          isAffiliate={props?.is_affiliate}
        />
      </div>
    </div>
  );
}
