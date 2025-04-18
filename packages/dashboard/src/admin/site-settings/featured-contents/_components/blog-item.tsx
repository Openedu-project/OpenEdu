import type { IBlog } from '@oe/api';
import { BlogCardServer, cn } from '@oe/ui';
import { DndSortableDragButton } from '@oe/ui';

import { Checkbox } from '@oe/ui';
interface BlogWithOrder extends IBlog {
  order?: number;
}

const BlogItem = ({
  blog,
  isSelected,
  onCheckboxChange,
  isDraggable = false,
  disabled = false,
}: {
  blog: BlogWithOrder;
  isSelected: boolean;
  isDraggable?: boolean;
  disabled?: boolean;
  onCheckboxChange: (checked: boolean, blog: IBlog) => void;
}) => (
  <div
    className={cn(
      'group relative transition-all duration-200',
      isSelected ? 'rounded-lg ring-2 ring-primary' : '',
      isDraggable ? 'cursor-grab active:cursor-grabbing' : ''
    )}
  >
    {/* Selection checkbox */}
    <Checkbox
      checked={isSelected}
      onCheckedChange={checked => onCheckboxChange(!!checked, blog)}
      className={cn(
        'absolute top-4 left-4 z-10 bg-background/80',
        disabled && !isSelected ? 'cursor-not-allowed opacity-50' : '',
        isSelected ? 'border-primary' : ''
      )}
      disabled={disabled && !isSelected}
    />

    {/* Drag handle (only visible when draggable) */}
    {isDraggable && (
      <DndSortableDragButton
        className="absolute top-4 right-4 z-10 rounded-md bg-background/80 p-1 
               opacity-0 transition-opacity group-hover:opacity-100"
      />
    )}

    {/* Position indicator (only shown when selected and draggable) */}
    {isSelected && isDraggable && blog.order !== undefined && (
      <div
        className="absolute left-4 top-4 z-20 -translate-y-8 rounded-full 
                  bg-primary px-2 py-0.5 text-xs font-semibold text-white"
      >
        #{blog.order + 1}
      </div>
    )}
    <BlogCardServer blog={blog} />
  </div>
);

BlogItem.displayName = 'BlogItem';
export { BlogItem };
