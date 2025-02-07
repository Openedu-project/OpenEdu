import type { ReactNode } from 'react';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  Dialog as DialogShadcn,
  DialogTitle,
} from '#shadcn/dialog';
import { cn } from '#utils/cn';

export interface IDialogProps {
  title: string;
  description: string;
  open: boolean;
  className?: string;
  icon?: ReactNode;
  renderActions?: ReactNode;
  setOpen: (open: boolean) => void;
}

export function Dialog({ title, description, open, className, icon, setOpen, renderActions }: IDialogProps) {
  return (
    <DialogShadcn open={open} onOpenChange={setOpen}>
      <DialogContent className={cn('flex min-w-sm flex-col items-center justify-center gap-4', className)}>
        {icon}
        <DialogHeader>
          <DialogTitle className="text-center font-bold text-2xl">{title}</DialogTitle>
          <DialogDescription className="text-center text-sm">{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>{renderActions}</DialogFooter>
      </DialogContent>
    </DialogShadcn>
  );
}
