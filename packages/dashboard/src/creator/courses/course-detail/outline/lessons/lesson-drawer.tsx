'use client';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@oe/ui';
import { XCircle } from 'lucide-react';
import { type ReactNode, useEffect, useState } from 'react';
import { LessonsPanel } from './lessons-panel';

export function LessonDrawer({ trigger }: { trigger?: ReactNode }) {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setContainer(document.getElementById('lesson-drawer-container'));
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent
        side="left"
        container={container}
        className="absolute top-0 left-0 w-[300px] bg-background p-0"
        overlayClassName="bg-transparent"
        hasCloseButton={false}
      >
        <SheetHeader>
          <SheetTitle hidden />
          <SheetDescription hidden />
        </SheetHeader>
        <LessonsPanel
          className="p-4"
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
