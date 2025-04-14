import { PenLine } from 'lucide-react';
import { Button } from '#shadcn/button';
import { cn } from '#utils/cn';

const EditButton = ({
  handleEdit,
  messageId,
  className,
}: {
  handleEdit: (messageId?: string) => void;
  messageId: string;
  className?: string;
}) => (
  <Button variant="outline" size="icon" className={cn('h-8 w-8', className)} onClick={() => handleEdit(messageId)}>
    <PenLine size={16} />
  </Button>
);

export { EditButton };
