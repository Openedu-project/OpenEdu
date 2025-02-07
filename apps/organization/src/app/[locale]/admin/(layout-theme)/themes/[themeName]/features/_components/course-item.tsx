import type { ICourse } from '@oe/api/types/course/course';
import { CourseCard } from '@oe/ui/components/course-card';
import { DndSortableDragButton } from '@oe/ui/components/dnd-sortable';

import { Checkbox } from '@oe/ui/shadcn/checkbox';

const CourseItem = ({
  course,
  isSelected,
  onCheckboxChange,
}: {
  course: ICourse;
  isSelected: boolean;
  onCheckboxChange: (checked: boolean, course: ICourse) => void;
}) => (
  <div className="group relative">
    <Checkbox
      checked={isSelected}
      onCheckedChange={checked => onCheckboxChange(!!checked, course)}
      className="absolute top-4 left-4 z-10 bg-background"
    />
    <DndSortableDragButton className="absolute top-4 right-4 z-10 rounded-md bg-background p-1 opacity-0 transition-opacity group-hover:opacity-100" />
    <CourseCard courseData={course} showHover={false} contentClassName="bg-foreground/10" />
  </div>
);

CourseItem.displayName = 'CourseItem';
export { CourseItem };
