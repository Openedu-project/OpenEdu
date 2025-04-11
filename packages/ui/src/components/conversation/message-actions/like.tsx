import { Like, LikeOutline } from '@oe/assets';
import { Button } from '#shadcn/button';

const LikeButton = ({
  handleLike,
  messageId,
  isLike,
  disabled,
}: {
  handleLike?: (messageId: string) => void;
  messageId: string;
  isLike?: boolean;
  disabled?: boolean;
}) => (
  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleLike?.(messageId)} disabled={disabled}>
    {isLike ? <Like width={16} height={16} /> : <LikeOutline width={16} height={16} color="black" />}
  </Button>
);

export { LikeButton };
