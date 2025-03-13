import { DndContext, type DragEndEvent, useDraggable } from '@dnd-kit/core';
import type { ICertificateElement } from '@oe/api/types/certificate';
import { cn } from '@oe/ui/utils/cn';
import { GripVerticalIcon, TrashIcon } from 'lucide-react';
import { nanoid } from 'nanoid';
import { useTranslations } from 'next-intl';
import { Resizable } from 're-resizable';
import { useRef } from 'react';
import { useGradientColorPicker } from '#components/color-picker';
import { Button } from '#shadcn/button';
import { getElementPosition } from '../../utils';
import { useCertificateBuilder } from '../provider/builder-context';
import { ElementRenderer } from '../renderer';
import { Grid } from './grid';

export const Editor = () => {
  const { template, selectedElementId, snapToGrid, updateElement, selectElement, updateTemplate, deleteElement } =
    useCertificateBuilder();

  const editorRef = useRef<HTMLDivElement>(null);
  const { getGradientObject } = useGradientColorPicker(template.frame?.backgroundColor ?? '#ffffff', value => {
    updateTemplate({
      ...template,
      frame: { ...template.frame, backgroundColor: value },
    });
  });

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

    const element = template.elements?.find(el => el.id === active.id);
    if (element) {
      const editorWidth = editorRef.current?.offsetWidth;
      const editorHeight = editorRef.current?.offsetHeight;
      const position = element.styles?.position || 'top-left';

      // Xử lý dựa trên vị trí của element
      switch (position) {
        case 'top-left':
          {
            const newX = (element.styles?.x || 0) + x;
            const newY = (element.styles?.y || 0) + y;

            const boundedX = Math.max(
              0,
              Math.min(newX, (template.frame?.width ?? editorWidth ?? 0) - (element.styles?.width ?? 0))
            );
            const boundedY = Math.max(
              0,
              Math.min(newY, (template.frame?.height ?? editorHeight ?? 0) - (element.styles?.height ?? 0))
            );

            updateElement(element.id ?? '', {
              ...element,
              styles: {
                ...element.styles,
                x: boundedX,
                y: boundedY,
              },
            });
          }
          break;

        case 'top-right':
          {
            const currentRight = element.styles?.right || 0;
            const newRight = currentRight - x;
            const newY = (element.styles?.y || 0) + y;

            const boundedRight = Math.max(
              0,
              Math.min(newRight, (template.frame?.width ?? editorWidth ?? 0) - (element.styles?.width ?? 0))
            );
            const boundedY = Math.max(
              0,
              Math.min(newY, (template.frame?.height ?? editorHeight ?? 0) - (element.styles?.height ?? 0))
            );

            updateElement(element.id ?? '', {
              ...element,
              styles: {
                ...element.styles,
                right: boundedRight,
                y: boundedY,
              },
            });
          }
          break;

        case 'bottom-left':
          {
            const newX = (element.styles?.x || 0) + x;
            const currentBottom = element.styles?.bottom || 0;
            const newBottom = currentBottom - y;

            const boundedX = Math.max(
              0,
              Math.min(newX, (template.frame?.width ?? editorWidth ?? 0) - (element.styles?.width ?? 0))
            );
            const boundedBottom = Math.max(
              0,
              Math.min(newBottom, (template.frame?.height ?? editorHeight ?? 0) - (element.styles?.height ?? 0))
            );

            updateElement(element.id ?? '', {
              ...element,
              styles: {
                ...element.styles,
                x: boundedX,
                bottom: boundedBottom,
              },
            });
          }
          break;

        case 'bottom-right':
          {
            const currentRight = element.styles?.right || 0;
            const newRight = currentRight - x;
            const currentBottom = element.styles?.bottom || 0;
            const newBottom = currentBottom - y;

            const boundedRight = Math.max(
              0,
              Math.min(newRight, (template.frame?.width ?? editorWidth ?? 0) - (element.styles?.width ?? 0))
            );
            const boundedBottom = Math.max(
              0,
              Math.min(newBottom, (template.frame?.height ?? editorHeight ?? 0) - (element.styles?.height ?? 0))
            );

            updateElement(element.id ?? '', {
              ...element,
              styles: {
                ...element.styles,
                right: boundedRight,
                bottom: boundedBottom,
              },
            });
          }
          break;
        default:
          break;
      }
    }
  };

  const frameBackgroundColor = template.frame?.backgroundColor ?? '#ffffff';
  const gradientBg = getGradientObject(frameBackgroundColor);

  return (
    <div className={cn('relative flex h-full w-full min-w-[800px] items-center justify-center')}>
      <Grid />
      <DndContext onDragEnd={handleDragEnd}>
        <div
          style={{
            width: template.frame?.width ?? '100%',
            height: template.frame?.height ?? '100%',
            maxHeight: '100%',
            backgroundColor: gradientBg?.isGradient ? undefined : template.frame?.backgroundColor,
            backgroundImage: template.frame?.file?.url
              ? `url(${template.frame?.file?.url})${gradientBg?.isGradient ? `, ${frameBackgroundColor}` : ''}`
              : gradientBg?.isGradient
                ? frameBackgroundColor
                : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            aspectRatio: `${template.frame?.width} / ${template.frame?.height}`,
          }}
          className="relative overflow-hidden"
          onClick={e => {
            e.stopPropagation();
            selectElement(null);
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.stopPropagation();
            }
          }}
          ref={editorRef}
        >
          {template.elements?.map(
            element =>
              element.visible !== false && (
                <DraggableElement
                  key={element.id}
                  element={element}
                  isSelected={element.id === selectedElementId}
                  onSelect={() => selectElement(element?.id ?? null)}
                  onDelete={() => deleteElement(element.id ?? '')}
                  onUpdate={updates => {
                    const newWidth = (updates.width as number) ?? element.styles?.width;
                    const newHeight = (updates.height as number) ?? element.styles?.height;
                    const newX = element.styles?.x;
                    const newY = element.styles?.y;

                    if (newX !== undefined && newY !== undefined && newWidth !== undefined && newHeight !== undefined) {
                      const editorWidth = editorRef.current?.offsetWidth;
                      const editorHeight = editorRef.current?.offsetHeight;
                      const boundedX = Math.max(
                        0,
                        Math.min(newX, (template.frame?.width ?? editorWidth ?? 0) - newWidth)
                      );
                      const boundedY = Math.max(
                        0,
                        Math.min(newY, (template.frame?.height ?? editorHeight ?? 0) - newHeight)
                      );

                      updateElement(element.id ?? '', {
                        ...element,
                        styles: {
                          ...element.styles,
                          width: newWidth,
                          height: newHeight,
                          x: boundedX,
                          y: boundedY,
                        },
                        ...(element.type === 'organization' && {
                          logoStyles: {
                            ...(element.orientation === 'horizontal'
                              ? {
                                  height: newHeight,
                                }
                              : {
                                  width: newWidth,
                                }),
                          },
                        }),
                      });
                    } else {
                      updateElement(element.id ?? '', {
                        ...element,
                        styles: {
                          ...element.styles,
                          width: newWidth,
                          height: newHeight,
                        },
                      });
                    }
                  }}
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
  onDelete,
  onUpdate,
}: {
  element: ICertificateElement;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onUpdate: (updates: Record<string, unknown>) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: element.id ?? nanoid(),
  });
  const tCertificate = useTranslations('certificate');

  return (
    <div
      ref={setNodeRef}
      className={cn('group absolute z-10', isSelected ? 'ring-2 ring-primary' : 'hover:ring-2 hover:ring-primary/50')}
      style={{
        ...getElementPosition(element),
        transition: 'width 0.2s ease, height 0.2s ease',
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
      }}
    >
      <div
        className={cn(
          '-top-6 -right-[2px] absolute flex items-center gap-1 bg-primary',
          'opacity-0 transition-opacity group-hover:opacity-100',
          isSelected && 'opacity-100'
        )}
      >
        <Button
          {...attributes}
          {...listeners}
          variant="ghost"
          className="h-6 w-6 cursor-move p-0 text-primary-foreground hover:bg-primary/20 hover:text-primary-foreground/80"
          title={tCertificate('builder.settings.move')}
        >
          <GripVerticalIcon className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          onClick={e => {
            e.stopPropagation();
            onDelete();
          }}
          title={tCertificate('builder.settings.delete')}
          className="h-6 w-6 rounded p-0 text-primary-foreground hover:bg-primary/20 hover:text-primary-foreground/80"
        >
          <TrashIcon className="h-3 w-3" />
        </Button>
      </div>
      <Resizable
        size={{
          width: element.styles?.width,
          height: element.styles?.height,
        }}
        onResizeStop={(_, __, ref) => {
          onUpdate({
            width: ref.offsetWidth,
            height: ref.offsetHeight,
          });
        }}
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
          <ElementRenderer element={element} showPlaceholder />
        </div>
      </Resizable>
    </div>
  );
};
