import { DndContext, type DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { ICertificateElement } from '@oe/api/types/certificate';
import { EyeIcon, EyeOffIcon, GripVertical } from 'lucide-react';
import { Button } from '#shadcn/button';
import { useCertificateBuilder } from '../../provider';

export const LayerTab = () => {
  const { template, selectedElementId, updateTemplate, selectElement } = useCertificateBuilder();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = template.elements?.findIndex(el => el.id === active.id);
      const newIndex = template.elements?.findIndex(el => el.id === over?.id);
      const newElements = [...(template.elements ?? [])];
      const [removed] = newElements.splice(oldIndex ?? 0, 1);
      newElements.splice(newIndex ?? 0, 0, removed as ICertificateElement);
      updateTemplate({
        ...template,
        elements: newElements,
      });
    }
  };

  return (
    <div className="space-y-2 px-4">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={template.elements ?? []} strategy={verticalListSortingStrategy}>
          {template.elements?.map(element => (
            <SortableLayer
              key={element.id}
              element={element}
              isSelected={element.id === selectedElementId}
              onSelect={() => selectElement(element.id)}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

interface SortableLayerProps {
  element: ICertificateElement;
  isSelected: boolean;
  onSelect: () => void;
}

const SortableLayer = ({ element, isSelected, onSelect }: SortableLayerProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: element.id });
  const { updateElement } = useCertificateBuilder();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center rounded border p-2 ${isSelected ? 'border-primary bg-primary/5' : 'border'}`}
    >
      {/* Drag handle */}
      <div className="mr-2 cursor-move" {...attributes} {...listeners}>
        <GripVertical className="h-4 w-4" />
      </div>

      {/* Clickable content */}
      <div
        className="flex-1 cursor-pointer"
        onClick={e => {
          e.stopPropagation();
          onSelect();
        }}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect();
          }
        }}
      >
        <div className="font-medium text-sm">{element.type}</div>
        {element.type === 'text' && <div className="truncate text-muted-foreground text-xs">{element.content}</div>}
      </div>

      {/* Visibility toggle */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={e => {
          e.stopPropagation();
          updateElement(element.id, { visible: !element.visible });
        }}
        className="h-8 w-8 text-muted-foreground hover:text-muted-foreground/80"
      >
        {element.visible ? <EyeIcon className="h-4 w-4" /> : <EyeOffIcon className="h-4 w-4" />}
      </Button>
    </div>
  );
};
