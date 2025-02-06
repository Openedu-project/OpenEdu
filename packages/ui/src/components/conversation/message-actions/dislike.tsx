import { DisLike } from '@oe/assets/icons/dislike';
import { DisLikeOutline } from '@oe/assets/icons/dislike-outline';
import { Button } from '#shadcn/button';

const DisLikeButton = ({
  handleDisLike,
  messageId,
  isDisLike,
  disabled,
}: {
  handleDisLike?: (messageId: string) => void;
  messageId: string;
  isDisLike?: boolean;
  disabled?: boolean;
}) => (
  <Button
    variant="ghost"
    size="icon"
    className="h-8 w-8"
    disabled={disabled}
    onClick={() => handleDisLike?.(messageId)}
  >
    {isDisLike ? <DisLike /> : <DisLikeOutline />}
  </Button>
);

export default DisLikeButton;
