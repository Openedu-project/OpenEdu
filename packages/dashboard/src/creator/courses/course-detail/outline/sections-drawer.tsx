import type { ISection } from '@oe/api/schemas/courseSchema';
import { DndSortable, DndSortableDragButton } from '@oe/ui/components/dnd-sortable';
import { Badge } from '@oe/ui/shadcn/badge';
import { Button } from '@oe/ui/shadcn/button';
import { cn } from '@oe/ui/utils/cn';
import { XCircle } from 'lucide-react';
import { PlusIcon } from 'lucide-react';
import { useOutlineStore } from '../_store/useOutlineStore';

// interface SectionsDrawerProps {
//   open: boolean;
//   setOpen: (open: boolean) => void;
// }

export const SectionsDrawer = () => {
  const { sections, openSectionDrawer, activeSection, setOpenSectionDrawer, setSections } = useOutlineStore();
  return (
    <div
      className={cn(
        'absolute top-0 left-0 z-50 h-full space-y-4 border-r bg-background shadow-lg transition-all duration-300 ease-in-out',
        openSectionDrawer ? 'z-50 w-[300px] p-4 opacity-100' : '-z-10 w-0 p-0 opacity-0'
      )}
    >
      <Button
        variant="outline"
        className="flex w-full items-center justify-center gap-2 text-blue-600 hover:bg-background/80 hover:text-primary/80"
        size="sm"
      >
        <PlusIcon className="h-4 w-4" />
        Add New Section
      </Button>
      <Button
        variant="ghost"
        className="-right-4 absolute top-0 h-8 w-8 rounded-full bg-background p-0 hover:bg-background/80 hover:text-primary"
        onClick={() => setOpenSectionDrawer(false)}
      >
        <XCircle className="h-4 w-4" />
      </Button>
      {/* Section Input Rows */}
      <DndSortable<ISection, unknown>
        data={sections || []}
        dataConfig={{
          idProp: 'id',
          type: 'array',
          direction: 'vertical',
        }}
        className="flex flex-col gap-4"
        renderConfig={{
          renderItem: ({ item }) => (
            <div
              className={cn(
                'flex items-center justify-between gap-2 p-2',
                item?.original.id === activeSection?.id && 'rounded-md border border-primary'
              )}
            >
              <DndSortableDragButton />
              <p className="truncate font-medium text-sm">{item?.original.title}</p>
              <Badge variant="outline_success">{item?.original.status}</Badge>
            </div>
          ),
        }}
        onChange={setSections}
      />
    </div>
  );
};
