import { RotateCcw } from 'lucide-react';
import { Button } from '#shadcn/button';

const Rewrite = ({
  rewrite,
  messageId,
  disabled,
}: {
  rewrite?: (messageId: string) => void;
  messageId: string;
  disabled?: boolean;
}) => (
  <Button variant="ghost" size="icon" className="h-8 w-8" disabled={disabled} onClick={() => rewrite?.(messageId)}>
    <RotateCcw size={16} />
  </Button>
);

export { Rewrite };
