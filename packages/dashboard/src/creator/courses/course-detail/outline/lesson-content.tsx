import { uniqueID } from '@oe/core/utils/unique';
import { RichTextEditor } from '@oe/ui/components/rich-text';
import { SortableTabs, type TabItem, type TabOption, createTabFromOption } from '@oe/ui/components/sortable-tabs';
import { Uploader } from '@oe/ui/components/uploader';
import { Button } from '@oe/ui/shadcn/button';
import { Input } from '@oe/ui/shadcn/input';
import { Code2Icon, FileIcon, FileTextIcon, FileVideoIcon, Trash2Icon } from 'lucide-react';
import { useOutlineStore } from '../_store/useOutlineStore';
import LessonsPanel from './lessons-panel';

const tabOptions: TabOption[] = [
  {
    value: 'text',
    label: 'Text',
    icon: <FileIcon className="h-4 w-4" />,
    id: `text-${uniqueID()}`,
    content(option) {
      return (
        <RichTextEditor
          key={option.id}
          className="h-full rounded-none border-none"
          menuBarClassName="bg-background"
          maxHeight="100%"
        />
      );
    },
  },
  {
    value: 'pdf',
    label: 'PDF',
    icon: <FileTextIcon className="h-4 w-4" />,
    id: `pdf-${uniqueID()}`,
    content(option) {
      return <Uploader key={option.id} accept=".pdf" listType="picture" fileListVisible={false} />;
    },
  },
  {
    value: 'video',
    label: 'Video',
    icon: <FileVideoIcon className="h-4 w-4" />,
    id: `video-${uniqueID()}`,
    content(option) {
      return <Uploader key={option.id} accept="video/*" listType="picture" fileListVisible={false} />;
    },
  },
  {
    value: 'embedded',
    label: 'Embedded',
    icon: <Code2Icon className="h-4 w-4" />,
    id: `embedded-${uniqueID()}`,
    content(option) {
      return <Input key={option.id} type="text" placeholder="Enter embed URL" />;
    },
  },
];

const defaultTabs: TabItem[] = [createTabFromOption(tabOptions[0], 'tab1')];

export function LessonContent() {
  const { activeLesson } = useOutlineStore();

  if (!activeLesson) {
    return <div>Select a lesson</div>;
  }

  return (
    <div className="flex h-full justify-center overflow-hidden">
      <div className="flex w-full max-w-7xl gap-4">
        <LessonsPanel />
        <div className="flex w-full flex-col overflow-hidden rounded-md bg-background p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium text-lg">Lesson Content</h2>
            <Button variant="outline" size="xs">
              <Trash2Icon className="h-4 w-4" />
            </Button>
          </div>
          <SortableTabs options={tabOptions} defaultTabs={defaultTabs} />
        </div>
      </div>
    </div>
  );
}
