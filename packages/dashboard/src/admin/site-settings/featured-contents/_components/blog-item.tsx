import type { IBlog } from '@oe/api';
import { BlogCardServer } from '@oe/ui';
import { DndSortableDragButton } from '@oe/ui';

import { Checkbox } from '@oe/ui';

const BlogItem = ({
  blog,
  isSelected,
  onCheckboxChange,
}: {
  blog: IBlog;
  isSelected: boolean;
  onCheckboxChange: (checked: boolean, blog: IBlog) => void;
}) => (
  <div className="group relative">
    <Checkbox
      checked={isSelected}
      onCheckedChange={checked => onCheckboxChange(!!checked, blog)}
      className="absolute top-4 left-4 z-10 bg-background"
    />
    <DndSortableDragButton className="absolute top-4 right-4 z-10 rounded-md bg-background p-1 opacity-0 transition-opacity group-hover:opacity-100" />
    <BlogCardServer blog={blog} />
  </div>
);

BlogItem.displayName = 'BlogItem';
export { BlogItem };
