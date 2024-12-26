import { Info } from 'lucide-react';
import { Dialog, type IDialogProps } from './dialog';

export function InfoDialog(props: IDialogProps) {
  return <Dialog {...props} icon={<Info className="size-10 text-info" />} />;
}
