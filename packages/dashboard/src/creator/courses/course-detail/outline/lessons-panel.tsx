import type { ILesson } from '@oe/api/schemas/courseSchema';
import { DndSortable, DndSortableDragButton } from '@oe/ui/components/dnd-sortable';
import { Badge } from '@oe/ui/shadcn/badge';
import { Button } from '@oe/ui/shadcn/button';
import { cn } from '@oe/ui/utils/cn';
import { PlusIcon } from 'lucide-react';
import { useOutlineStore } from '../_store/useOutlineStore';

export default function LessonsPanel() {
  const { activeLesson, activeLessons, setActiveLessons } = useOutlineStore();
  return (
    <div className="scrollbar flex w-[280px] shrink-0 cursor-pointer flex-col gap-2 overflow-y-auto px-1">
      <Button
        variant="outline"
        className="flex w-full flex-1 items-center justify-center gap-2 text-blue-600 hover:bg-background/80 hover:text-primary/80"
        // size="sm"
      >
        <PlusIcon className="h-4 w-4" />
        Add New Lesson
      </Button>
      <DndSortable<ILesson, unknown>
        data={activeLessons || []}
        dataConfig={{
          idProp: 'id',
          type: 'array',
          direction: 'vertical',
        }}
        className="flex flex-col gap-2"
        renderConfig={{
          renderItem: ({ item }) => (
            <div
              className={cn(
                'flex items-center justify-between gap-2 rounded-md bg-background p-2 ',
                item?.original.id === activeLesson?.id && 'border border-primary'
              )}
            >
              <DndSortableDragButton />
              <p className="truncate font-medium text-sm">{item?.original.title}</p>
              <Badge variant="outline_success">{item?.original.status}</Badge>
            </div>
          ),
        }}
        onChange={setActiveLessons}
      />
    </div>
  );
}
