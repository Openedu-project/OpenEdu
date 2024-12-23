import { useGetMe } from '@oe/api/hooks/useMe';
import { postBookmarkService, removeBookmarkService } from '@oe/api/services/bookmark';
import Heart from '@oe/assets/icons/heart';
import HeartOutline from '@oe/assets/icons/heart-outline';
import React, { type MouseEvent, type ReactNode } from 'react';
import { useLoginRequiredStore } from '#components/login-required-modal';
import { Button, type ButtonProps } from '#shadcn/button';
import { cn } from '#utils/cn';

interface WishlistButtonProps extends ButtonProps {
  bookmarkId?: string;
  entityId: string;
  entityType: string;
  children?: ReactNode;
  isWishlist: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>, id?: string) => void;
}

const useWishlist = ({
  isWishlist: initialIsWishlist,
  entityId,
  entityType,
  bookmarkId,
  onClick,
}: Pick<WishlistButtonProps, 'isWishlist' | 'entityId' | 'entityType' | 'bookmarkId' | 'onClick'>) => {
  const [isBookmark, setIsBookmark] = React.useState(initialIsWishlist);
  const [isBookmarking, setIsBookmarking] = React.useState<boolean>(false);
  const { dataMe } = useGetMe();
  const { setLoginRequiredModal } = useLoginRequiredStore();

  React.useEffect(() => {
    setIsBookmark(initialIsWishlist);
  }, [initialIsWishlist]);

  const handleWishlist = React.useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();
      setIsBookmarking(true);
      const { id } = e.currentTarget;

      if (!dataMe) {
        setLoginRequiredModal(true);
        return;
      }

      try {
        if (isBookmark) {
          await removeBookmarkService(undefined, {
            payload: { id: bookmarkId ?? '' },
          });
        } else {
          await postBookmarkService(undefined, {
            payload: {
              entity_id: entityId,
              entity_type: entityType,
            },
          });
        }

        setIsBookmark(prev => !prev);
        onClick?.(e, id);
        setIsBookmarking(false);
      } catch (error) {
        console.error('Wishlist operation failed:', error);
        setIsBookmarking(false);
        return error;
      }
    },
    [dataMe, entityId, entityType, onClick, isBookmark, bookmarkId, setLoginRequiredModal]
  );

  return { isBookmark, isBookmarking, handleWishlist };
};

const WishlistIcon = ({ isBookmark }: { isBookmark: boolean }) =>
  isBookmark ? <Heart width={24} height={24} color="hsl(var(--primary))" /> : <HeartOutline />;

export default function WishlistButton({
  className,
  children,
  bookmarkId,
  entityType,
  isWishlist,
  entityId,
  onClick,
  ...props
}: WishlistButtonProps) {
  const { isBookmark, isBookmarking, handleWishlist } = useWishlist({
    isWishlist,
    entityId,
    entityType,
    bookmarkId,
    onClick,
  });

  return (
    <Button
      size="icon"
      variant="outline"
      className={cn('p-2 focus:border', className)}
      onClick={handleWishlist}
      disabled={isBookmarking}
      {...props}
    >
      {children ?? <WishlistIcon isBookmark={isBookmark} />}
    </Button>
  );
}
