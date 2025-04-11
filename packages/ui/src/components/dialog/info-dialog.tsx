import { Info } from 'lucide-react';
import { BaseDialog, type IDialogProps } from './dialog';

export function InfoDialog(props: IDialogProps) {
  return <BaseDialog {...props} icon={<Info className="size-10 text-info" />} />;
}
