import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@oe/ui/shadcn/sheet';
import { XCircle } from 'lucide-react';
import type { ReactNode } from 'react';
import { LessonsPanel } from './lessons-panel';

export function LessonDrawer({ trigger }: { trigger?: ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent
        side="left"
        className="absolute top-0 left-0 w-[300px] p-0"
        container={
          typeof window !== 'undefined'
            ? (document.getElementById('lesson-drawer-container') ?? document.body)
            : undefined
        }
        overlayClassName="bg-transparent"
        hasCloseButton={false}
      >
        <SheetHeader>
          <SheetTitle hidden />
          <SheetDescription hidden />
        </SheetHeader>
        <LessonsPanel
          closeButton={
            <SheetClose
              className="-right-4 absolute top-1 flex h-8 w-8 items-center justify-center rounded-full bg-background p-0 hover:bg-background/80 hover:text-primary"
              title="Close Section Drawer"
            >
              <XCircle className="h-4 w-4" />
            </SheetClose>
          }
        />
      </SheetContent>
    </Sheet>
  );
}
