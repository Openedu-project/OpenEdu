'use client';

import {
  type DataAdapter,
  DndSortable,
  DragHandle,
  type IDndSortableBaseItem,
  type IDndSortableNormalizedItem,
  SortableItem,
} from '@oe/ui/components/dnd-sortable';
import { useState } from 'react';

interface TreeItem extends IDndSortableBaseItem {
  label: string;
  children?: TreeItem[];
}

export default function DndSortDemo() {
  const [items, setItems] = useState<TreeItem[]>([
    {
      id: '1',
      label: 'Root 1',
      children: [
        { id: '1.1', label: 'Child 1.1' },
        {
          id: '1.2',
          label: 'Child 1.2',
          children: [{ id: '1.2.1', label: 'Grandchild 1.2.1' }],
        },
      ],
    },
  ]);

  const renderItem = ({
    item,
    isClone,
    adapter,
    depth,
  }: {
    item: IDndSortableNormalizedItem<TreeItem>;
    isClone: boolean;
    adapter: DataAdapter<TreeItem>;
    depth: number;
  }) => {
    console.log(isClone, item.originalData, depth);
    return (
      <SortableItem key={item.id} isClone={isClone} data={item.originalData} adapter={adapter} depth={depth}>
        <div className="flex items-center gap-2 rounded p-4 shadow">
          <DragHandle />
          <span>{item.originalData.label}</span>
        </div>
      </SortableItem>
    );
  };

  return (
    <DndSortable<TreeItem>
      items={items}
      onSort={setItems}
      renderItem={renderItem}
      dataConfig={{
        type: 'tree',
        childrenPath: 'children',
        indent: 20,
      }}
    />
  );
}
