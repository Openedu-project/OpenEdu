'use client';
import { useGetCourseOutline } from '@oe/api/hooks/useCourse';
import { useGetMe } from '@oe/api/hooks/useMe';
import { postBookmarkService, removeBookmarkService } from '@oe/api/services/bookmark';
import type { ICourseOutline } from '@oe/api/types/course/course';
import Heart from '@oe/assets/icons/heart';
import HeartOutline from '@oe/assets/icons/heart-outline';
import { type MouseEvent, type ReactNode, useCallback, useState } from 'react';
import { useLoginRequiredStore } from '#components/login-required-modal';
import { Button, type ButtonProps } from '#shadcn/button';
import { cn } from '#utils/cn';

interface WishlistButtonProps extends ButtonProps {
  bookmarkId?: string;
  entityId?: string;
  entityType?: string;
  children?: ReactNode;
  courseData: ICourseOutline;
  isWishlist?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>, id?: string) => void;
}

// const useWishlist = ({
//   isWishlist: initialIsWishlist,
//   entityId,
//   entityType,
//   bookmarkId,
//   onClick,
// }: Pick<
//   WishlistButtonProps,
//   "isWishlist" | "entityId" | "entityType" | "bookmarkId" | "onClick"
// >) => {
//   const [isBookmark, setIsBookmark] = React.useState(initialIsWishlist);
//   const [isBookmarking, setIsBookmarking] = React.useState<boolean>(false);
//   const { dataMe } = useGetMe();
//   const { setLoginRequiredModal } = useLoginRequiredStore();

//   React.useEffect(() => {
//     setIsBookmark(initialIsWishlist);
//   }, [initialIsWishlist]);

//   const handleWishlist = React.useCallback(
//     async (e: MouseEvent<HTMLButtonElement>) => {
//       e.stopPropagation();
//       e.preventDefault();
//       setIsBookmarking(true);
//       const { id } = e.currentTarget;

//       if (!dataMe) {
//         setLoginRequiredModal(true);
//         return;
//       }

//       try {
//         if (isBookmark) {
//           await removeBookmarkService(undefined, {
//             payload: { id: bookmarkId ?? "" },
//           });
//         } else {
//           await postBookmarkService(undefined, {
//             payload: {
//               entity_id: entityId,
//               entity_type: entityType,
//             },
//           });
//         }

//         setIsBookmark((prev) => !prev);
//         onClick?.(e, id);
//         setIsBookmarking(false);
//       } catch (error) {
//         console.error("Wishlist operation failed:", error);
//         setIsBookmarking(false);
//         return error;
//       }
//     },
//     [
//       dataMe,
//       entityId,
//       entityType,
//       onClick,
//       isBookmark,
//       bookmarkId,
//       setLoginRequiredModal,
//     ]
//   );

//   return { isBookmark, isBookmarking, handleWishlist };
// };

// const WishlistIcon = ({ isBookmark }: { isBookmark: boolean }) =>
//   isBookmark ? (
//     <Heart width={18} height={18} color="hsl(var(--primary))" />
//   ) : (
//     <HeartOutline width={18} height={18} />
//   );

export default function WishlistButton({
  className,
  // children,
  // bookmarkId,
  // entityType,
  // isWishlist,
  // entityId,
  courseData,
  // onClick,
  ...props
}: WishlistButtonProps) {
  // const { isBookmark, isBookmarking, handleWishlist } = useWishlist({
  //   isWishlist,
  //   entityId,
  //   entityType,
  //   bookmarkId,
  //   onClick,
  // });
  // console.log("courseData - WishlistButton", courseData);
  // const [isBookmark, setIsBookmark] = useState(courseData?.is_wishlist);
  const [isBookmarking, setIsBookmarking] = useState(false);
  const { dataMe } = useGetMe();
  const { course, mutateCourse } = useGetCourseOutline(courseData?.slug ?? '', courseData);
  const { setLoginRequiredModal } = useLoginRequiredStore();

  const handleWishlist = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();
      setIsBookmarking(true);

      if (!dataMe) {
        setLoginRequiredModal(true);
        return;
      }

      try {
        if (course?.is_wishlist) {
          await removeBookmarkService(undefined, {
            payload: { id: course?.bookmark?.id ?? '' },
          });
        } else {
          await postBookmarkService(undefined, {
            payload: {
              entity_id: course?.cuid ?? '',
              entity_type: 'course',
            },
          });
        }
        await mutateCourse();
        setIsBookmarking(false);
      } catch (error) {
        console.error('Wishlist operation failed:', error);
        setIsBookmarking(false);
        return error;
      }
    },
    [dataMe, setLoginRequiredModal, course, mutateCourse]
  );

  return (
    <Button
      size="icon"
      variant="outline"
      className={cn('p-0 focus:border md:p-2', className)}
      onClick={handleWishlist}
      disabled={isBookmarking}
      {...props}
    >
      {course?.is_wishlist ? (
        <Heart width={18} height={18} color="hsl(var(--primary))" />
      ) : (
        <HeartOutline width={18} height={18} />
      )}
    </Button>
  );
}
