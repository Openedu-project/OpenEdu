import { CheckCircleIcon } from 'lucide-react';
import { Dialog, type IDialogProps } from './dialog';

export function SuccessDialog(props: IDialogProps) {
  return <Dialog {...props} icon={<CheckCircleIcon className="size-10 text-success" />} />;
}
