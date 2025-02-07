'use client';
import { useGetMe } from '@oe/api/hooks/useMe';
import { postBookmarkService, removeBookmarkService } from '@oe/api/services/bookmark';
import Heart from '@oe/assets/icons/heart';
import HeartOutline from '@oe/assets/icons/heart-outline';
import { type MouseEvent, useCallback, useState } from 'react';
import { useLoginRequiredStore } from '#components/login-required-modal';
import { Button, type ButtonProps } from '#shadcn/button';
import { cn } from '#utils/cn';

interface WishlistButtonProps extends ButtonProps {
  bookmarkId: string;
  entityId: string;
  entityType: string;
  isWishlist: boolean;
  onSuccess?: (bookmarkId: string, isWishlist: boolean) => void | Promise<void>;
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
  bookmarkId,
  entityType,
  isWishlist,
  entityId,
  onSuccess,
  // courseData,
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
  // const { course, mutateCourse } = useGetCourseOutline(courseData?.slug ?? '', courseData);
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
        let id = bookmarkId;
        if (isWishlist) {
          if (!bookmarkId) {
            return;
          }
          await removeBookmarkService(undefined, {
            payload: { id: bookmarkId ?? '' },
          });
        } else {
          const bookmark = await postBookmarkService(undefined, {
            payload: {
              entity_id: entityId ?? '',
              entity_type: entityType ?? '',
            },
          });
          id = bookmark.id;
        }
        // await mutateCourse();
        await onSuccess?.(id, !isWishlist);
        setIsBookmarking(false);
      } catch (error) {
        console.error('Wishlist operation failed:', error);
        setIsBookmarking(false);
        return error;
      }
    },
    [dataMe, bookmarkId, entityId, entityType, isWishlist, setLoginRequiredModal, onSuccess]
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
      {isWishlist ? (
        <Heart width={18} height={18} color="hsl(var(--primary))" />
      ) : (
        <HeartOutline width={18} height={18} />
      )}
    </Button>
  );
}
