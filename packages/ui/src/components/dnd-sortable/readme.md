## Example

```jsx
'use client';

import { DeleteButton } from '@oe/ui/components/delete-button';
import {
  DndSortable,
  DndSortableCollapseButton,
  DndSortableDragButton,
  DndSortableDragButtonChildItem,
  type IDndSortableRef,
  restrictToHorizontalAxis,
  restrictToParentElement,
  restrictToVerticalAxis,
} from '@oe/ui/components/dnd-sortable';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@oe/ui/shadcn/accordion';
import { Badge } from '@oe/ui/shadcn/badge';
import { Button } from '@oe/ui/shadcn/button';
import { cn } from '@oe/ui/utils/cn';
import { PencilIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { useRef, useState } from 'react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

interface TreeItem {
  id: string;
  label: string;
  children?: TreeItem[];
}

const initialData: Column[] = [
  {
    id: 'todo',
    title: 'Todo',
    tasks: [
      { id: 'task-1', title: 'Learn React', completed: false },
      { id: 'task-2', title: 'Learn TypeScript', completed: false },
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    tasks: [{ id: 'task-3', title: 'Make demo project', completed: false }],
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [{ id: 'task-4', title: 'Setup environment', completed: false }],
  },
];

const nestedArrayData: (Task | Task[])[] = [
  { id: '1', title: 'Task 1', completed: false },
  [
    { id: '2', title: 'Subtask 1', completed: false },
    { id: '3', title: 'Subtask 2', completed: true },
  ],
  { id: '4', title: 'Task 2', completed: false },
];

const treeData: TreeItem[] = [
  {
    id: '1',
    label: 'Quản lý dự án',
    children: [
      {
        id: '1.1',
        label: 'Dự án A',
        children: [
          {
            id: '1.1.1',
            label: 'Phân tích yêu cầu',
            children: [
              {
                id: '1.1.1.1',
                label: 'Thu thập thông tin',
              },
              {
                id: '1.1.1.2',
                label: 'Phỏng vấn khách hàng',
              },
            ],
          },
          {
            id: '1.1.2',
            label: 'Thiết kế hệ thống',
            children: [
              {
                id: '1.1.2.1',
                label: 'Thiết kế database',
              },
              {
                id: '1.1.2.2',
                label: 'Thiết kế giao diện',
              },
            ],
          },
        ],
      },
      {
        id: '1.2',
        label: 'Dự án B',
        children: [
          {
            id: '1.2.1',
            label: 'Lập trình',
            children: [
              {
                id: '1.2.1.1',
                label: 'Frontend',
              },
              {
                id: '1.2.1.2',
                label: 'Backend',
              },
            ],
          },
          {
            id: '1.2.2',
            label: 'Kiểm thử',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    label: 'Quản lý nhân sự',
    children: [
      {
        id: '2.1',
        label: 'Tuyển dụng',
        children: [
          {
            id: '2.1.1',
            label: 'Phỏng vấn',
          },
          {
            id: '2.1.2',
            label: 'Đánh giá',
          },
        ],
      },
      {
        id: '2.2',
        label: 'Đào tạo',
        children: [
          {
            id: '2.2.1',
            label: 'Nhân viên mới',
          },
          {
            id: '2.2.2',
            label: 'Phát triển kỹ năng',
          },
        ],
      },
    ],
  },
];

interface SimpleItem {
  id: string;
  label: string;
}

export default function KanbanDemo() {
  const [data, setData] = useState<Column[]>(initialData);
  const [items, setItems] = useState<SimpleItem[]>([
    { id: '1', label: 'Item 1' },
    { id: '2', label: 'Item 2' },
    { id: '3', label: 'Item 3' },
  ]);
  const [treeItems, setTreeItems] = useState<TreeItem[]>(treeData);
  const [nestedArrayItems, setNestedArrayItems] = useState<(Task | Task[])[]>(nestedArrayData);
  const kanbanBoardRef = useRef<IDndSortableRef<Column, Task>>(null);

  const handleSort = (newData: Column[]) => {
    setData(newData);
  };
  const handleTreeSort = (newData: TreeItem[]) => {
    setTreeItems(newData);
  };

  return (
    <>
      <div className="p-8">
        <h1 className="mb-8 font-bold text-2xl">Nested Array Demo</h1>

        <DndSortable<Task | Task[], Task>
          data={nestedArrayItems}
          dataConfig={{
            idItemProp: 'id',
            type: 'nested-array',
            direction: 'vertical',
            itemDirection: 'horizontal',
            childDnDContextProps: {
              modifiers: [restrictToHorizontalAxis, restrictToParentElement],
            },
          }}
          dndContextProps={{
            modifiers: [restrictToVerticalAxis, restrictToParentElement],
          }}
          className="flex flex-col gap-2"
          renderConfig={{
            className: 'flex flex-row gap-2 items-center',
            renderItem: ({ item, onAddChild }) => (
              <>
                <DndSortableDragButton />
                {item?.items ? null : <span className="font-medium">{(item?.original as Task).title}</span>}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    onAddChild?.({
                      id: Math.random().toString(),
                      title: `New item ${Math.random().toString()}`,
                      completed: false,
                    })
                  }
                  className="order-last"
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </>
            ),
            renderChildItem: ({ item }) => (
              <div className="group/field flex items-center justify-between rounded-lg shadow-sm">
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={item.original.completed} readOnly />
                  <span>{item.original.title}</span>
                </div>
                <DndSortableDragButtonChildItem className="opacity-0" />
              </div>
            ),
          }}
          onChange={setNestedArrayItems}
          dragOverlayProps={{
            adjustScale: true,
          }}
        />
      </div>
      <div className="p-8">
        <h1 className="mb-8 font-bold text-2xl">Tree Demo</h1>

        <DndSortable<TreeItem, unknown>
          data={treeItems}
          dataConfig={{
            idProp: 'id',
            childrenProp: 'children',
            type: 'tree',
            indent: 24,
            direction: 'vertical',
          }}
          className="flex flex-col gap-4"
          renderConfig={{
            renderItem: ({ item, descendants, dragOverlay, onAddChild, onRemoveItem, onUpdateItem }) => {
              return (
                <div className={cn('w-full gap-2 bg-background p-2', dragOverlay && 'bg-background shadow')}>
                  <DndSortableDragButton className="group-hover/field:opacity-100" />
                  <DndSortableCollapseButton />
                  <span>{item?.original.label}</span>
                  {(descendants?.length ?? 0) > 0 && item.collapsed ? (
                    <Badge variant="outline">{descendants?.length}</Badge>
                  ) : null}
                  <Button variant="ghost" size="icon" onClick={() => onUpdateItem?.('new label', 'label', item)}>
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <DeleteButton
                    title="Delete item"
                    description="Are you sure you want to delete this item?"
                    onDelete={async onClose => {
                      await onRemoveItem?.();
                      onClose?.();
                    }}
                  >
                    <Trash2Icon className="h-4 w-4" />
                  </DeleteButton>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      onAddChild?.({ id: Math.random().toString(), label: `New item ${Math.random().toString()}` })
                    }
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
              );
            },
          }}
          onChange={handleTreeSort}
        />
      </div>
      <div className="p-8">
        <h1 className="mb-8 font-bold text-2xl">Simple Array Demo</h1>

        <Accordion type="single" collapsible className="w-full">
          <DndSortable<SimpleItem, unknown>
            data={items}
            dataConfig={{
              idProp: 'id',
              type: 'array',
              direction: 'vertical',
            }}
            className="flex flex-col gap-4"
            renderConfig={{
              renderItem: ({ item }) => (
                <AccordionItem value={item?.original.id}>
                  <AccordionTrigger asChild>
                    <div className="flex items-center gap-2 rounded bg-background p-4 shadow">
                      <DndSortableDragButton />
                      <span>{item?.original.label}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
                </AccordionItem>
              ),
            }}
            onChange={setItems}
          />
        </Accordion>
      </div>
      <div className="p-8">
        <h1 className="mb-8 font-bold text-2xl">Kanban Board Demo</h1>
        <Button onClick={() => kanbanBoardRef.current?.addItem({ id: '1', title: 'New item', completed: false })}>
          Add item
        </Button>

        <DndSortable<Column, Task>
          data={data}
          ref={kanbanBoardRef}
          dataConfig={{
            idProp: 'id',
            childrenProp: 'tasks',
            idItemProp: 'id',
            type: 'multiple-container',
            direction: 'horizontal',
            itemDirection: 'vertical',
          }}
          renderConfig={{
            className: 'bg-neutral-100 p-4 rounded-lg min-w-[300px] min-h-[400px]',
            renderItem: ({ item, onAddChild, onRemoveItem }) => (
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold">{item?.original.title}</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    onAddChild?.({
                      id: Math.random().toString(),
                      title: `New item ${Math.random().toString()}`,
                      completed: false,
                    });
                  }}
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
                <DeleteButton
                  title="Delete item"
                  description="Are you sure you want to delete this item?"
                  onDelete={async onClose => {
                    await onRemoveItem?.();
                    onClose?.();
                  }}
                >
                  <Trash2Icon className="h-4 w-4" />
                </DeleteButton>
                <DndSortableDragButton />
              </div>
            ),
            renderChildItem: ({ item, onRemoveItem }) => (
              <div className="group/field mb-2 flex items-center justify-between rounded bg-white p-3 shadow-sm">
                <span>{item.original.title}</span>
                <DndSortableDragButtonChildItem className="opacity-0" />
                <DeleteButton
                  title="Delete item"
                  description="Are you sure you want to delete this item?"
                  onDelete={async onClose => {
                    await onRemoveItem?.();
                    onClose?.();
                  }}
                >
                  <Trash2Icon className="h-4 w-4" />
                </DeleteButton>
              </div>
            ),
          }}
          onChange={handleSort}
        />
      </div>
    </>
  );
}

```
