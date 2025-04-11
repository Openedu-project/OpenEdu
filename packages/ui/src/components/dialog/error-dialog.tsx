import { CircleX } from 'lucide-react';
import { BaseDialog, type IDialogProps } from './dialog';

export function ErrorDialog(props: IDialogProps) {
  return <BaseDialog {...props} icon={<CircleX className="size-10 text-destructive" />} />;
}
