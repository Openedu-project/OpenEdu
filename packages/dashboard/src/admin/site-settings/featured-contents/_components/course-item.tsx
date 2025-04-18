import type { ICourse } from '@oe/api';
import { CourseCard, cn } from '@oe/ui';
import { DndSortableDragButton } from '@oe/ui';
import { Checkbox } from '@oe/ui';

// Extend ICourse to include order property
interface CourseWithOrder extends ICourse {
  order?: number;
}

interface CourseItemProps {
  course: CourseWithOrder;
  isSelected: boolean;
  onCheckboxChange: (checked: boolean, course: CourseWithOrder) => void;
  isDraggable?: boolean;
  disabled?: boolean;
}

const CourseItem = ({
  course,
  isSelected,
  onCheckboxChange,
  isDraggable = false,
  disabled = false,
}: CourseItemProps) => (
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
      onCheckedChange={checked => onCheckboxChange(!!checked, course)}
      className={cn(
        'absolute top-4 left-4 z-10 bg-background/80',
        disabled && !isSelected ? 'cursor-not-allowed opacity-50' : '',
        isSelected ? 'border-primary' : ''
      )}
      disabled={disabled && !isSelected}
    />

    {/* Drag handle (only visible when draggable) */}
    {isDraggable && (
      <DndSortableDragButton className="absolute top-4 right-4 z-10 rounded-md bg-background/80 p-1 opacity-0 transition-opacity group-hover:opacity-100" />
    )}

    {/* Position indicator (only shown when selected and draggable) */}
    {isSelected && isDraggable && course.order !== undefined && (
      <div className="-translate-y-8 absolute top-4 left-4 z-20 rounded-full bg-primary px-2 py-0.5 font-semibold text-white text-xs">
        #{course.order + 1}
      </div>
    )}

    {/* Course card */}
    <CourseCard
      courseData={course}
      showHover={false}
      contentClassName={cn('bg-foreground/10', isSelected ? 'bg-primary/5' : '')}
    />
  </div>
);

CourseItem.displayName = 'CourseItem';
export { CourseItem };
