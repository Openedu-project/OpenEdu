import { CircleAlert } from 'lucide-react';
import { BaseDialog, type IDialogProps } from './dialog';

export function WarningDialog(props: IDialogProps) {
  return <BaseDialog {...props} icon={<CircleAlert className="size-10 text-warning" />} />;
}
