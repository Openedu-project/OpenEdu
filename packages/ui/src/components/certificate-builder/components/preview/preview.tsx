import { DndContext, type DragEndEvent, useDraggable } from '@dnd-kit/core';
import { cn } from '@oe/ui/utils/cn';
import { Resizable } from 're-resizable';
import { useBuilder } from '../../builder-context';
import type { CertificateElement } from '../../types';
import { ElementRenderer } from '../renderer';
import { Grid } from './grid';

export const Preview = () => {
  const { template, selectedElement, snapToGrid, updateElement, selectElement } = useBuilder();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    if (!active) {
      return;
    }

    let { x, y } = delta;
    if (snapToGrid) {
      x = Math.round(x / 10) * 10;
      y = Math.round(y / 10) * 10;
    }

    const element = template.elements.find(el => el.id === active.id);
    if (element) {
      // Tính toán vị trí mới
      const newX = (element.x || 0) + x;
      const newY = (element.y || 0) + y;

      // Giới hạn trong phạm vi của background
      const boundedX = Math.max(0, Math.min(newX, template.width - (element.width || 0)));
      const boundedY = Math.max(0, Math.min(newY, template.height - (element.height || 0)));

      updateElement(element.id, {
        x: boundedX,
        y: boundedY,
      });
    }
  };
  return (
    <div
      style={{
        minHeight: template.maxHeight,
        minWidth: template.maxWidth,
      }}
      className={cn('relative flex h-full w-full items-center justify-center')}
    >
      <Grid />
      <DndContext onDragEnd={handleDragEnd}>
        <div
          style={{
            width: template.width,
            height: template.height,
            // maxWidth: template.maxWidth,
            // maxHeight: template.maxHeight,
            backgroundColor: template.backgroundColor,
            backgroundImage: template.backgroundImage ? `url(${template.backgroundImage})` : 'none',
            backgroundSize: template.backgroundSize,
            backgroundPosition: template.backgroundPosition,
            backgroundRepeat: template.backgroundRepeat,
            aspectRatio: `${template.width} / ${template.height}`,
          }}
          className="relative overflow-hidden" // Thêm overflow-hidden
          onClick={e => {
            e.stopPropagation();
            selectElement(null);
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.stopPropagation();
            }
          }}
        >
          {template.elements.map(
            element =>
              element.visible !== false && (
                <DraggableElement
                  key={element.id}
                  element={element}
                  isSelected={element.id === selectedElement}
                  onSelect={() => selectElement(element.id)}
                  onUpdate={updates => {
                    // Kiểm tra giới hạn khi resize
                    const newWidth = updates.width ?? element.width;
                    const newHeight = updates.height ?? element.height;
                    const newX = updates.x ?? element.x;
                    const newY = updates.y ?? element.y;

                    if (newX !== undefined && newY !== undefined && newWidth !== undefined && newHeight !== undefined) {
                      // Đảm bảo element không vượt quá biên
                      const boundedX = Math.max(0, Math.min(newX, template.width - newWidth));
                      const boundedY = Math.max(0, Math.min(newY, template.height - newHeight));

                      updateElement(element.id, {
                        ...updates,
                        x: boundedX,
                        y: boundedY,
                      });
                    } else {
                      updateElement(element.id, updates);
                    }
                  }}
                  // snapToGrid={snapToGrid}
                />
              )
          )}
        </div>
      </DndContext>
    </div>
  );
};

const DraggableElement = ({
  element,
  isSelected,
  onSelect,
  onUpdate,
}: {
  element: CertificateElement;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<CertificateElement>) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: element.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`absolute ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      style={{
        left: element.x,
        top: element.y,
        width: element.width || 100,
        height: element.height || 100,
        zIndex: element.zIndex,
        transition: 'width 0.2s ease, height 0.2s ease',
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
      }}
    >
      <Resizable
        size={{
          width: element.width || 100,
          height: element.height || 100,
        }}
        onResize={(_, __, ref) => {
          onUpdate({
            width: ref.offsetWidth,
            height: ref.offsetHeight,
          });
        }}
        // enable={isSelected ? { topRight: true, bottomRight: true } : false}
        className="h-full w-full"
      >
        <div
          className="h-full w-full"
          onClick={e => {
            e.stopPropagation();
            onSelect();
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              onSelect();
            }
          }}
        >
          {isSelected && <div className="absolute inset-0 cursor-move" {...attributes} {...listeners} />}
          <ElementRenderer element={element} />
        </div>
      </Resizable>
    </div>
  );
};
