import { CircleX } from 'lucide-react';
import { Dialog, type IDialogProps } from './dialog';

export function ErrorDialog(props: IDialogProps) {
  return <Dialog {...props} icon={<CircleX className="size-10 text-destructive" />} />;
}
