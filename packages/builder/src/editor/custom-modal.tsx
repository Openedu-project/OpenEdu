import { Button } from '@oe/ui/shadcn/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@oe/ui/shadcn/dialog';
import { cn } from '@oe/ui/utils/cn';
import { X } from 'lucide-react';
import type React from 'react';

import { MAIN_BG_COLOR, MAIN_TXT_COLOR } from '../utils';

interface CustomModalProps {
  open: boolean;
  title: React.ReactNode;
  children: React.ReactNode;
  close: () => void;
}

export default function CustomModal({ children, title, close, open }: CustomModalProps) {
  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className={cn(MAIN_BG_COLOR, MAIN_TXT_COLOR, 'flex max-h-[90vh] max-w-[900px] flex-col rounded')}>
        <DialogHeader className="flex items-center justify-between pb-3">
          <DialogTitle className="text-lg">{title}</DialogTitle>
          <DialogDescription />
          <Button variant="ghost" size="icon" onClick={close}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
