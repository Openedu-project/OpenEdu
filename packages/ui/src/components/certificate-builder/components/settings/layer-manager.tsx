import { DndContext, type DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { EyeIcon, EyeOffIcon, GripVertical } from 'lucide-react';
import { useBuilder } from '../../builder-context';
import type { CertificateElement } from '../../types';

export const LayerManager = () => {
  const { template, selectedElement, updateTemplate, selectElement } = useBuilder();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = template.elements.findIndex(el => el.id === active.id);
      const newIndex = template.elements.findIndex(el => el.id === over?.id);
      const newElements = [...template.elements];
      const [removed] = newElements.splice(oldIndex, 1);
      newElements.splice(newIndex, 0, removed as CertificateElement);
      updateTemplate({
        ...template,
        elements: newElements,
      });
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="font-medium">Layers</h3>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={template.elements} strategy={verticalListSortingStrategy}>
          {template.elements.map(element => (
            <SortableLayer
              key={element.id}
              element={element}
              isSelected={element.id === selectedElement}
              onSelect={() => selectElement(element.id)}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

interface SortableLayerProps {
  element: CertificateElement;
  isSelected: boolean;
  onSelect: () => void;
}

const SortableLayer = ({ element, isSelected, onSelect }: SortableLayerProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: element.id });
  const { updateElement } = useBuilder(); // Thêm updateElement

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center p-2 border rounded ${
        isSelected ? 'bg-blue-50 border-blue-500' : 'border-gray-200'
      }`}
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
        <div className="text-sm font-medium">{element.type}</div>
        {element.type === 'text' && <div className="text-xs text-gray-500 truncate">{element.text}</div>}
      </div>

      {/* Visibility toggle */}
      <button
        type="button"
        onClick={e => {
          e.stopPropagation();
          updateElement(element.id, { visible: !element.visible });
        }}
        className="mr-2 text-gray-500 hover:text-gray-700"
      >
        {element.visible ? <EyeIcon className="w-4 h-4" /> : <EyeOffIcon className="w-4 h-4" />}
      </button>
    </div>
  );
};
