import { CheckCircleIcon } from 'lucide-react';
import { BaseDialog, type IDialogProps } from './dialog';

export function SuccessDialog(props: IDialogProps) {
  return <BaseDialog {...props} icon={<CheckCircleIcon className="size-10 text-success" />} />;
}
