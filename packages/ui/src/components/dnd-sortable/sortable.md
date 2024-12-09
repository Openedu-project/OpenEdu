## Simple Example
```jsx
'use client';

import {
  DndSortable,
  DragHandle,
  type IDndSortableBaseItem,
  type IDndSortableNormalizedItem,
  SortableItem,
} from '@oe/ui/components/dnd-sortable';
import { useState } from 'react';

interface SimpleItem extends IDndSortableBaseItem {
  label: string;
  // các field khác nếu cần
}

export default function DndSortDemo() {
  const [items, setItems] = useState<SimpleItem[]>([
    { id: '1', label: 'Item 1' },
    { id: '2', label: 'Item 2' },
    { id: '3', label: 'Item 3' },
  ]);

  const renderItem = (item: IDndSortableNormalizedItem<SimpleItem>, isClone: boolean) => (
    <SortableItem key={item.id} id={item.id} isClone={isClone} data={item.originalData}>
      <div className="flex items-center gap-2 rounded p-4 shadow">
        <DragHandle />
        <span>{item.originalData.label}</span>
      </div>
    </SortableItem>
  );

  return (
    <DndSortable<SimpleItem>
      items={items}
      onSort={setItems}
      renderItem={renderItem}
      dataConfig={{
        type: 'array',
      }}
    />
  );
}

```

## Tree Example

```jsx
interface TreeItem extends BaseItem {
  label: string;
  children?: TreeItem[];
}

const TreeExample: React.FC = () => {
  const [items, setItems] = useState<TreeItem[]>([
    {
      id: '1',
      label: 'Root 1',
      children: [
        { id: '1.1', label: 'Child 1.1' },
        { 
          id: '1.2', 
          label: 'Child 1.2',
          children: [
            { id: '1.2.1', label: 'Grandchild 1.2.1' }
          ]
        }
      ]
    }
  ]);

  return (
    <DndSortable<TreeItem>
      items={items}
      onSort={setItems}
      dataConfig={{
        type: 'tree',
        childrenPath: 'children'
      }}
      renderItem={/* ... */}
    />
  );
};
```

## Nested Array Example

```jsx
interface TodoItem extends BaseItem {
  label: string;
  completed: boolean;
  subTasks?: TodoItem[];
}

const TodoList: React.FC = () => {
  const [items, setItems] = useState<TodoItem[]>([
    { 
      id: '1', 
      label: 'Task 1',
      completed: false 
    },
    [
      { 
        id: '2', 
        label: 'Subtask 1',
        completed: false 
      },
      { 
        id: '3', 
        label: 'Subtask 2',
        completed: true 
      }
    ],
    { 
      id: '4', 
      label: 'Task 2',
      completed: false 
    }
  ]);

  const renderItem = (
    item: NormalizedItem<TodoItem>, 
    isClone: boolean, 
    depth: number
  ) => (
    <SortableItem<TodoItem>
      key={item.id}
      id={item.id}
      isClone={isClone}
      depth={depth}
      data={item.originalData}
      className={depth === 0 ? 'w-full' : 'w-auto'}
    >
      <div className={`
        flex items-center gap-2 p-4 bg-white shadow rounded
        ${depth === 0 ? 'border-l-4 border-blue-500' : 'border-l-4 border-green-500'}
      `}>
        <DragHandle />
        <span>{item.originalData.label}</span>
        <input 
          type="checkbox"
          checked={item.originalData.completed}
          onChange={(e) => {
            // Handle checkbox change
          }}
        />
      </div>
    </SortableItem>
  );

  return (
    <div className="p-4">
      <DndSortable<TodoItem>
        items={items}
        onSort={setItems}
        renderItem={renderItem}
        className="space-y-4"
        dataConfig={{
          type: 'nested-array',
          idPath: 'id'
        }}
      />
    </div>
  );
};
```

## Custom Example

```jsx
interface CustomItem extends BaseItem {
  name: string;
  data: {
    subItems?: CustomItem[];
  };
}

const CustomExample: React.FC = () => {
  const [items, setItems] = useState<CustomItem[]>([/* ... */]);

  return (
    <DndSortable<CustomItem>
      items={items}
      onSort={setItems}
      dataConfig={{
        type: 'custom',
        normalize: (items, depth = 0) => {
          // Custom normalize logic
          return items.map(item => ({
            ...item,
            depth,
            items: item.data.subItems 
              ? normalizeItems(item.data.subItems, depth + 1)
              : undefined,
            originalData: item
          }));
        },
        denormalize: (items) => {
          // Custom denormalize logic
          return items.map(item => {
            const result = { ...item.originalData };
            if (item.items) {
              result.data.subItems = denormalizeItems(item.items);
            }
            return result;
          });
        },
        updateItems: (items, activeId, overId) => {
          // Custom update logic
          return updateCustomItems(items, activeId, overId);
        }
      }}
      renderItem={/* ... */}
    />
  );
};
```

## Mixed Example

```jsx
interface MixedItem extends BaseItem {
  title: string;
  type: 'group' | 'item';
  items?: (MixedItem | MixedItem[])[];
}

const MixedExample: React.FC = () => {
  const [items, setItems] = useState<MixedItem[]>([
    {
      id: '1',
      title: 'Group 1',
      type: 'group',
      items: [
        { id: '1.1', title: 'Item 1.1', type: 'item' },
        [
          { id: '1.2.1', title: 'Nested 1.2.1', type: 'item' },
          { id: '1.2.2', title: 'Nested 1.2.2', type: 'item' }
        ]
      ]
    }
  ]);

  return (
    <DndSortable<MixedItem>
      items={items}
      onSort={setItems}
      dataConfig={{
        type: 'nested-array',
        getChildren: (item) => item.items || []
      }}
      renderItem={/* ... */}
    />
  );
};
```