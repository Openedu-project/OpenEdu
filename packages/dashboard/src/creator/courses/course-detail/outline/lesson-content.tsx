import type { ILessonContent } from '@oe/api/types/course/segment';
import { uniqueID } from '@oe/core/utils/unique';
import { RichTextEditor } from '@oe/ui/components/rich-text';
import { SortableTabs, type TabItem, type TabOption, createTabFromOption } from '@oe/ui/components/sortable-tabs';
import { Uploader } from '@oe/ui/components/uploader';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { Input } from '@oe/ui/shadcn/input';
import { Code2Icon, FileIcon, FileTextIcon, FileVideoIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

export function LessonContent() {
  const { watch, setValue } = useFormContext();
  const contents = (watch('contents') || []) as ILessonContent[];

  console.log(watch()); // Xem toàn bộ form data
  console.log(watch('contents')); // Xem mảng contents

  const tabOptions: TabOption[] = [
    {
      value: 'text',
      label: 'Text',
      icon: <FileIcon className="h-4 w-4" />,
      id: `text-${uniqueID()}`,
      content(option, index) {
        console.log('contents', contents, option, index);
        return (
          <FormFieldWithLabel name={`contents.${index}.content`}>
            <RichTextEditor
              key={option.id}
              className="h-full rounded-none border-none"
              menuBarClassName="bg-background"
              maxHeight="100%"
            />
          </FormFieldWithLabel>
        );
      },
    },
    {
      value: 'pdf',
      label: 'PDF',
      icon: <FileTextIcon className="h-4 w-4" />,
      id: `pdf-${uniqueID()}`,
      content(option, index) {
        return (
          <FormFieldWithLabel name={`contents.${index}.files`}>
            <Uploader key={option.id} accept=".pdf" listType="picture" fileListVisible={false} />
          </FormFieldWithLabel>
        );
      },
    },
    {
      value: 'video',
      label: 'Video',
      icon: <FileVideoIcon className="h-4 w-4" />,
      id: `video-${uniqueID()}`,
      content(option, index) {
        return (
          <FormFieldWithLabel name={`contents.${index}.files`}>
            <Uploader key={option.id} accept="video/*" listType="picture" fileListVisible={false} />
          </FormFieldWithLabel>
        );
      },
    },
    {
      value: 'embedded',
      label: 'Embedded',
      icon: <Code2Icon className="h-4 w-4" />,
      id: `embedded-${uniqueID()}`,
      content(option, index) {
        return (
          <FormFieldWithLabel name={`contents.${index}.content`}>
            <Input key={option.id} type="text" placeholder="Enter embed URL" />
          </FormFieldWithLabel>
        );
      },
    },
  ];

  const defaultTabs: TabItem[] =
    contents.length > 0
      ? contents.map((content, index) =>
          createTabFromOption(
            tabOptions.find(opt => opt.value === content.type) || tabOptions[0],
            `tab${index + 1}`,
            index
          )
        )
      : [createTabFromOption(tabOptions[0], 'tab1', 0)];

  // Xử lý khi thay đổi cấu trúc tabs (thêm/xóa/sắp xếp lại)
  const handleTabsChange = (newTabs: TabItem[]) => {
    const newContents = newTabs.map(tab => ({
      type: tab.value as 'text' | 'pdf' | 'video' | 'embedded',
      content: '',
    }));
    setValue('contents', newContents);
  };

  return (
    <SortableTabs
      options={tabOptions}
      defaultTabs={defaultTabs}
      className="scrollbar overflow-y-auto"
      onTabsChange={handleTabsChange}
    />
  );
}
