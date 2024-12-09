import { horizontalListSortingStrategy } from '@dnd-kit/sortable';

import { SortableContext } from '@dnd-kit/sortable';
import { Fragment } from 'react';

import { verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { IDndSortableBaseItem, IDndSortableContainerProps } from './types';

export function SortableContainer<T extends IDndSortableBaseItem>({
  items,
  direction = 'vertical',
  renderItem,
  className = '',
  adapter,
}: IDndSortableContainerProps<T>) {
  const strategy = direction === 'vertical' ? verticalListSortingStrategy : horizontalListSortingStrategy;

  return (
    <SortableContext items={items.map(item => adapter.getId(item.originalData))} strategy={strategy}>
      <div
        className={`${className} ${
          direction === 'horizontal' ? 'flex flex-row items-start gap-2' : 'flex flex-col gap-2'
        }`}
      >
        {items.map(item => (
          <Fragment key={adapter.getId(item.originalData)}>
            {renderItem({ item, isClone: false, adapter, depth: item.depth })}
          </Fragment>
        ))}
      </div>
    </SortableContext>
  );
}
