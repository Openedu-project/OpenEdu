import { Button } from '@oe/ui/shadcn/button';
import { cn } from '@oe/ui/utils/cn';
import { CornerUpLeft, CornerUpRight, Eye, Maximize, Square } from 'lucide-react';
import type React from 'react';
import { useEffect, useState } from 'react';
import { useEditor } from '../grapesjs';

interface CommandButton {
  id: string;
  icon: React.ReactNode;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  options?: Record<string, any>;
  disabled?: () => boolean;
}

export default function TopbarButtons({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const editor = useEditor();
  const [, setUpdateCounter] = useState(0);
  const { UndoManager, Commands } = editor;

  const cmdButtons: CommandButton[] = [
    {
      id: 'core:component-outline',
      icon: <Square className="h-4 w-4" />,
    },
    {
      id: 'core:fullscreen',
      icon: <Maximize className="h-4 w-4" />,
      options: { target: 'main' },
    },
    // {
    //   id: 'core:open-code',
    //   icon: <Code className="h-4 w-4" />,
    // },
    {
      id: 'core:undo',
      icon: <CornerUpLeft className="h-4 w-4" />,
      disabled: () => !UndoManager.hasUndo(),
    },
    {
      id: 'core:redo',
      icon: <CornerUpRight className="h-4 w-4" />,
      disabled: () => !UndoManager.hasRedo(),
    },
    {
      id: 'core:preview',
      icon: <Eye className="h-4 w-4" />,
    },
  ];

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const cmdEvent = 'run stop';
    const updateEvent = 'update';
    const updateCounter = () => setUpdateCounter(value => value + 1);
    const onCommand = (id: string) => {
      cmdButtons.find(btn => btn.id === id) && updateCounter();
    };
    editor.on(cmdEvent, onCommand);
    editor.on(updateEvent, updateCounter);

    return () => {
      editor.off(cmdEvent, onCommand);
      editor.off(updateEvent, updateCounter);
    };
  }, []);

  return (
    <div className={cn('flex gap-3', className)}>
      {cmdButtons.map(({ id, icon, disabled, options = {} }) => (
        <Button
          key={id}
          variant={Commands.isActive(id) ? 'secondary' : 'outline'}
          size="icon"
          onClick={() => (Commands.isActive(id) ? Commands.stop(id) : Commands.run(id, options))}
          disabled={disabled?.()}
        >
          {icon}
        </Button>
      ))}
    </div>
  );
}
