import FontFamily from '@tiptap/extension-font-family';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { type Editor, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { FontSize } from './extensions/font-size';
import { Image } from './extensions/image';
import { TextColor } from './extensions/text-color';
import { Video } from './extensions/video';

interface UseRichTextEditorProps {
  content?: string;
  editable?: boolean;
  onUpdate?: (editor: Editor) => void;
}

export const useRichTextEditor = ({ content, editable = true, onUpdate }: UseRichTextEditorProps) => {
  return useEditor({
    extensions: [
      StarterKit,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      TextStyle,
      FontSize,
      Underline,
      Image,
      Video,
      TextColor,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      FontFamily.configure({ types: ['textStyle'] }),
      Link.configure({
        HTMLAttributes: {
          class: 'text-primary underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer',
        },
      }),
      TaskList,
      TaskItem.configure({ nested: true }),
    ],
    content,
    editable,
    onUpdate: ({ editor }) => {
      onUpdate?.(editor);
    },
    editorProps: {
      attributes: {
        class: `rich-text ${editable ? 'max-h-[50dvh]' : ''}`,
      },
    },
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
  });
};
