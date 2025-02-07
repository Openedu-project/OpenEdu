import { CircleAlert } from 'lucide-react';
import { Dialog, type IDialogProps } from './dialog';

export function WarningDialog(props: IDialogProps) {
  return <Dialog {...props} icon={<CircleAlert className="size-10 text-warning" />} />;
}
