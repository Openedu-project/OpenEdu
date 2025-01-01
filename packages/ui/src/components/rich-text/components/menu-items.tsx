import type { Editor } from '@tiptap/core';
import { type EditorStateSnapshot, useEditorState } from '@tiptap/react';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  CheckSquare,
  FileCode,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  List,
  ListOrdered,
  Minus,
  PaintBucket,
  Quote,
  Redo,
  Strikethrough,
  Table as TableIcon,
  Underline,
  Undo,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import type React from 'react';
import type { ChangeEvent } from 'react';
import { Button, buttonVariants } from '#shadcn/button';
import { Input } from '#shadcn/input';
import { Label } from '#shadcn/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#shadcn/select';
import { Toggle } from '#shadcn/toggle';
import { cn } from '#utils/cn';
import { AIGeneratePopover } from './ai-generate-popover';
import { AIRewriteModal } from './ai-rewrite-modal';
import { ImagePopover } from './image-popover';
import { LinkPopover } from './link-popover';
import { TextColorMenu } from './text-color-menu';
import { VideoPopover } from './video-popover';

const useEditorStateSelector = (editor: Editor | null) =>
  useEditorState({
    editor,
    selector: (context: EditorStateSnapshot<Editor | null>) => {
      const editorInstance = context.editor;
      return {
        isBold: editorInstance?.isActive('bold') ?? false,
        isItalic: editorInstance?.isActive('italic') ?? false,
        isStrike: editorInstance?.isActive('strike') ?? false,
        isUnderline: editorInstance?.isActive('underline') ?? false,
        isCodeBlock: editorInstance?.isActive('codeBlock') ?? false,
        isBulletList: editorInstance?.isActive('bulletList') ?? false,
        isOrderedList: editorInstance?.isActive('orderedList') ?? false,
        isTaskList: editorInstance?.isActive('taskList') ?? false,
        isBlockquote: editorInstance?.isActive('blockquote') ?? false,
        isTextAlignLeft: editorInstance?.isActive({ textAlign: 'left' }),
        isTextAlignCenter: editorInstance?.isActive({ textAlign: 'center' }),
        isTextAlignRight: editorInstance?.isActive({ textAlign: 'right' }),
        isTextAlignJustify: editorInstance?.isActive({ textAlign: 'justify' }),
      };
    },
  });

export const BoldMenuItem: React.FC<{ editor: Editor }> = ({ editor }) => {
  const t = useTranslations('richText.menuItems');
  const editorState = useEditorStateSelector(editor);
  return (
    <Toggle
      className="h-8 w-8 bg-background p-0 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
      pressed={editorState?.isBold}
      variant="outline"
      onPressedChange={() => editor.chain().focus().toggleBold().run()}
      title={t('bold')}
    >
      <Bold className="h-4 w-4" />
    </Toggle>
  );
};

export const ItalicMenuItem: React.FC<{ editor: Editor }> = ({ editor }) => {
  const t = useTranslations('richText.menuItems');
  const editorState = useEditorStateSelector(editor);
  return (
    <Toggle
      className="h-8 w-8 bg-background p-0 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
      pressed={editorState?.isItalic}
      variant="outline"
      onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      title={t('italic')}
    >
      <Italic className="h-4 w-4" />
    </Toggle>
  );
};

export const StrikethroughMenuItem: React.FC<{ editor: Editor }> = ({ editor }) => {
  const t = useTranslations('richText.menuItems');
  const editorState = useEditorStateSelector(editor);
  return (
    <Toggle
      className="h-8 w-8 bg-background p-0 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
      pressed={editorState?.isStrike}
      variant="outline"
      onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      title={t('strikethrough')}
    >
      <Strikethrough className="h-4 w-4" />
    </Toggle>
  );
};

export const UnderlineMenuItem: React.FC<{ editor: Editor }> = ({ editor }) => {
  const t = useTranslations('richText.menuItems');
  const editorState = useEditorStateSelector(editor);
  return (
    <Toggle
      className="h-8 w-8 bg-background p-0 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
      pressed={editorState?.isUnderline}
      onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
      title={t('underline')}
      variant="outline"
    >
      <Underline className="h-4 w-4" />
    </Toggle>
  );
};

export const ListMenuItem: React.FC<{ editor: Editor }> = ({ editor }) => {
  const editorState = useEditorStateSelector(editor);
  const t = useTranslations('richText.menuItems');
  return (
    <Toggle
      className="h-8 w-8 bg-background p-0 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
      pressed={editorState?.isBulletList}
      onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      title={t('list')}
      variant="outline"
    >
      <List className="h-4 w-4" />
    </Toggle>
  );
};

export const ListOrderedMenuItem: React.FC<{ editor: Editor }> = ({ editor }) => {
  const t = useTranslations('richText.menuItems');
  const editorState = useEditorStateSelector(editor);
  return (
    <Toggle
      className="h-8 w-8 bg-background p-0 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
      pressed={editorState?.isOrderedList}
      onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      title={t('listOrdered')}
      variant="outline"
    >
      <ListOrdered className="h-4 w-4" />
    </Toggle>
  );
};

export const QuoteMenuItem: React.FC<{ editor: Editor }> = ({ editor }) => {
  const t = useTranslations('richText.menuItems');
  const editorState = useEditorStateSelector(editor);
  return (
    <Toggle
      className="h-8 w-8 bg-background p-0 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
      pressed={editorState?.isBlockquote}
      onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
      title={t('quote')}
      variant="outline"
    >
      <Quote className="h-4 w-4" />
    </Toggle>
  );
};

export const CodeBlockMenuItem: React.FC<{ editor: Editor }> = ({ editor }) => {
  const t = useTranslations('richText.menuItems');
  const editorState = useEditorStateSelector(editor);
  return (
    <Toggle
      className="h-8 w-8 bg-background p-0 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
      pressed={editorState?.isCodeBlock}
      onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
      title={t('codeBlock')}
      variant="outline"
    >
      <FileCode className="h-4 w-4" />
    </Toggle>
  );
};

export const TableMenuItem: React.FC<{ editor: Editor }> = ({ editor }) => {
  const t = useTranslations('richText.menuItems');
  return (
    <Button
      size="sm"
      variant="outline"
      type="button"
      className="h-8 w-8 p-0"
      title={t('table')}
      onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
    >
      <TableIcon className="h-4 w-4" />
    </Button>
  );
};

export const CheckSquareMenuItem: React.FC<{ editor: Editor }> = ({ editor }) => {
  const t = useTranslations('richText.menuItems');
  const editorState = useEditorStateSelector(editor);
  return (
    <Toggle
      className="h-8 w-8 bg-background p-0 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
      pressed={editorState?.isTaskList}
      onPressedChange={() => editor.chain().focus().toggleTaskList().run()}
      title={t('taskList')}
      variant="outline"
    >
      <CheckSquare className="h-4 w-4" />
    </Toggle>
  );
};

export const AlignLeftMenuItem: React.FC<{ editor: Editor }> = ({ editor }) => {
  const t = useTranslations('richText.menuItems');
  const editorState = useEditorStateSelector(editor);
  return (
    <Toggle
      className="h-8 w-8 bg-background p-0 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
      pressed={editorState?.isTextAlignLeft}
      onPressedChange={() => editor.chain().focus().setTextAlign('left').run()}
      title={t('alignLeft')}
      variant="outline"
    >
      <AlignLeft className="h-4 w-4" />
    </Toggle>
  );
};

export const AlignCenterMenuItem: React.FC<{ editor: Editor }> = ({ editor }) => {
  const t = useTranslations('richText.menuItems');
  const editorState = useEditorStateSelector(editor);
  return (
    <Toggle
      className="h-8 w-8 bg-background p-0 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
      pressed={editorState?.isTextAlignCenter}
      onPressedChange={() => editor.chain().focus().setTextAlign('center').run()}
      title={t('alignCenter')}
      variant="outline"
    >
      <AlignCenter className="h-4 w-4" />
    </Toggle>
  );
};

export const AlignRightMenuItem: React.FC<{ editor: Editor }> = ({ editor }) => {
  const t = useTranslations('richText.menuItems');
  const editorState = useEditorStateSelector(editor);
  return (
    <Toggle
      className="h-8 w-8 bg-background p-0 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
      pressed={editorState?.isTextAlignRight}
      onPressedChange={() => editor.chain().focus().setTextAlign('right').run()}
      title={t('alignRight')}
      variant="outline"
    >
      <AlignRight className="h-4 w-4" />
    </Toggle>
  );
};

export const AlignJustifyMenuItem: React.FC<{ editor: Editor }> = ({ editor }) => {
  const t = useTranslations('richText.menuItems');
  const editorState = useEditorStateSelector(editor);
  return (
    <Toggle
      className="h-8 w-8 bg-background p-0 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
      pressed={editorState?.isTextAlignJustify}
      onPressedChange={() => editor.chain().focus().setTextAlign('justify').run()}
      title={t('alignJustify')}
      variant="outline"
    >
      <AlignJustify className="h-4 w-4" />
    </Toggle>
  );
};

export const UndoMenuItem: React.FC<{ editor: Editor }> = ({ editor }) => {
  const t = useTranslations('richText.menuItems');
  return (
    <Button
      className="h-8 w-8 p-0"
      variant="outline"
      size="icon"
      onClick={() => editor.chain().focus().undo().run()}
      disabled={!editor.can().undo()}
      title={t('undo')}
    >
      <Undo className="h-4 w-4" />
    </Button>
  );
};

export const RedoMenuItem: React.FC<{ editor: Editor }> = ({ editor }) => {
  const t = useTranslations('richText.menuItems');
  return (
    <Button
      className="h-8 w-8 p-0"
      variant="outline"
      size="icon"
      onClick={() => editor.chain().focus().redo().run()}
      disabled={!editor.can().redo()}
      title={t('redo')}
    >
      <Redo className="h-4 w-4" />
    </Button>
  );
};

export const HeadingMenuItem: React.FC<{ editor: Editor }> = ({ editor }) => {
  const t = useTranslations('richText.menuItems');
  return (
    <Select
      defaultValue="normal"
      onValueChange={value => {
        if (value === 'normal') {
          editor.chain().focus().setParagraph().run();
        } else {
          editor
            .chain()
            .focus()
            .toggleHeading({ level: Number.parseInt(value, 10) as 1 | 2 | 3 | 4 | 5 | 6 })
            .run();
        }
      }}
    >
      <SelectTrigger className="h-8 w-[120px]" title={t('heading')}>
        <SelectValue placeholder="Paragraph/Heading" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="normal">Normal</SelectItem>
        <SelectItem value="1">
          <Heading1 className="mr-2 h-4 w-4" />
        </SelectItem>
        <SelectItem value="2">
          <Heading2 className="mr-2 h-4 w-4" />
        </SelectItem>
        <SelectItem value="3">
          <Heading3 className="mr-2 h-4 w-4" />
        </SelectItem>
        <SelectItem value="4">
          <Heading4 className="mr-2 h-4 w-4" />
        </SelectItem>
        <SelectItem value="5">
          <Heading5 className="mr-2 h-4 w-4" />
        </SelectItem>
        <SelectItem value="6">
          <Heading6 className="mr-2 h-4 w-4" />
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export const FontFamilyMenuItem: React.FC<{ editor: Editor }> = ({ editor }) => {
  const t = useTranslations('richText.menuItems');
  return (
    <Select defaultValue="Inter" onValueChange={value => editor.chain().focus().setFontFamily(value).run()}>
      <SelectTrigger className="h-8 w-[120px]" title={t('fontFamily')}>
        <SelectValue placeholder="Font" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Inter" style={{ fontFamily: 'Inter' }}>
          Inter
        </SelectItem>
        <SelectItem value="Helvetica, sans-serif" style={{ fontFamily: 'Helvetica, sans-serif' }}>
          Helvetica
        </SelectItem>
        <SelectItem value="Arial, sans-serif" style={{ fontFamily: 'Arial, sans-serif' }}>
          Arial
        </SelectItem>
        <SelectItem value="Arial Black, sans-serif" style={{ fontFamily: 'Arial Black, sans-serif' }}>
          Arial Black
        </SelectItem>
        <SelectItem value="Verdana, sans-serif" style={{ fontFamily: 'Verdana, sans-serif' }}>
          Verdana
        </SelectItem>
        <SelectItem value="Tahoma, sans-serif" style={{ fontFamily: 'Tahoma, sans-serif' }}>
          Tahoma
        </SelectItem>
        <SelectItem value="Trebuchet MS, sans-serif" style={{ fontFamily: 'Trebuchet MS, sans-serif' }}>
          Trebuchet MS
        </SelectItem>
        <SelectItem value="Impact, sans-serif" style={{ fontFamily: 'Impact, sans-serif' }}>
          Impact
        </SelectItem>
        <SelectItem value="Gill Sans, sans-serif" style={{ fontFamily: 'Gill Sans, sans-serif' }}>
          Gill Sans
        </SelectItem>
        <SelectItem value="Times New Roman, serif" style={{ fontFamily: 'Times New Roman, serif' }}>
          Times New Roman
        </SelectItem>
        <SelectItem value="Georgia, serif" style={{ fontFamily: 'Georgia, serif' }}>
          Georgia
        </SelectItem>
        <SelectItem value="Palatino, serif" style={{ fontFamily: 'Palatino, serif' }}>
          Palatino
        </SelectItem>
        <SelectItem value="Baskerville, serif" style={{ fontFamily: 'Baskerville, serif' }}>
          Baskerville
        </SelectItem>
        <SelectItem value="Andalé Mono, monospace" style={{ fontFamily: 'Andalé Mono, monospace' }}>
          Andalé Mono
        </SelectItem>
        <SelectItem value="Courier, monospace" style={{ fontFamily: 'Courier, monospace' }}>
          Courier
        </SelectItem>
        <SelectItem value="Lucida, monospace" style={{ fontFamily: 'Lucida, monospace' }}>
          Lucida
        </SelectItem>
        <SelectItem value="Monaco, monospace" style={{ fontFamily: 'Monaco, monospace' }}>
          Monaco
        </SelectItem>
        <SelectItem value="Bradley Hand, cursive" style={{ fontFamily: 'Bradley Hand, cursive' }}>
          Bradley Hand
        </SelectItem>
        <SelectItem value="Brush Script MT, cursive" style={{ fontFamily: 'Brush Script MT, cursive' }}>
          Brush Script MT
        </SelectItem>
        <SelectItem value="Luminari, fantasy" style={{ fontFamily: 'Luminari, fantasy' }}>
          Luminari
        </SelectItem>
        <SelectItem value="Comic Sans MS, cursive" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          Comic Sans
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export const FontSizeMenuItem: React.FC<{ editor: Editor }> = ({ editor }) => {
  const t = useTranslations('richText.menuItems');
  return (
    <Select defaultValue="14px" onValueChange={value => editor.chain().focus().setFontSize(value).run()}>
      <SelectTrigger className="h-8 w-[120px]" title={t('fontSize')}>
        <SelectValue placeholder="Font size" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="12px">12px</SelectItem>
        <SelectItem value="14px">14px</SelectItem>
        <SelectItem value="16px">16px</SelectItem>
        <SelectItem value="18px">18px</SelectItem>
        <SelectItem value="20px">20px</SelectItem>
        <SelectItem value="24px">24px</SelectItem>
        <SelectItem value="30px">30px</SelectItem>
        <SelectItem value="36px">36px</SelectItem>
      </SelectContent>
    </Select>
  );
};

export const HorizontalRuleMenuItem: React.FC<{ editor: Editor }> = ({ editor }) => {
  const t = useTranslations('richText.menuItems');
  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      className="h-8 w-8 p-0"
      onClick={() => editor.chain().focus().setHorizontalRule().run()}
      title={t('horizontalRule')}
    >
      <Minus className="h-4 w-4" />
    </Button>
  );
};

export const HardBreakMenuItem: React.FC<{ editor: Editor }> = ({ editor }) => {
  const t = useTranslations('richText.menuItems');
  return (
    <Button
      className="h-8 w-8 p-0"
      type="button"
      size="sm"
      variant="outline"
      onClick={() => editor.chain().focus().setHardBreak().run()}
      title={t('hardBreak')}
    >
      BR
    </Button>
  );
};

export const HighlightMenuItem: React.FC<{ editor: Editor }> = ({ editor }) => {
  const t = useTranslations('richText.menuItems');
  return (
    <Label
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'flex h-8 w-8 cursor-pointer flex-col gap-[3px] overflow-hidden border bg-background px-1 py-0'
      )}
      title={t('highlight')}
    >
      <PaintBucket className="h-4 w-4" />
      <div className="relative mt-[1px] h-1 w-full overflow-hidden">
        <Input
          type="color"
          defaultValue="#ffffff"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            editor.chain().focus().setHighlight({ color: e.target.value }).run()
          }
          className="-top-1 absolute right-0 h-3 cursor-pointer border-none p-0"
        />
      </div>
    </Label>
  );
};

export const ImagePopoverMenuItem: React.FC<{ editor: Editor }> = ({ editor }) => <ImagePopover editor={editor} />;

export const LinkPopoverMenuItem: React.FC<{ editor: Editor }> = ({ editor }) => <LinkPopover editor={editor} />;

export const TextColorMenuItem: React.FC<{ editor: Editor }> = ({ editor }) => <TextColorMenu editor={editor} />;

export const VideoPopoverMenuItem: React.FC<{ editor: Editor }> = ({ editor }) => <VideoPopover editor={editor} />;

export interface MenuItemProps {
  editor: Editor;
  aiParams?: Record<string, string>;
  onAIApply?: () => void;
}

export const AIRewriteMenuItem: React.FC<MenuItemProps> = ({ editor, aiParams, onAIApply }) => {
  return <AIRewriteModal editor={editor} aiParams={aiParams} handleAIApply={onAIApply} />;
};

export const AIGenerateMenuItem: React.FC<MenuItemProps> = ({ editor, aiParams }) => {
  return <AIGeneratePopover editor={editor} aiParams={aiParams} />;
};
export const menuItemsMap = {
  bold: BoldMenuItem,
  italic: ItalicMenuItem,
  strikethrough: StrikethroughMenuItem,
  underline: UnderlineMenuItem,
  list: ListMenuItem,
  listOrdered: ListOrderedMenuItem,
  quote: QuoteMenuItem,
  codeBlock: CodeBlockMenuItem,
  table: TableMenuItem,
  taskList: CheckSquareMenuItem,
  alignLeft: AlignLeftMenuItem,
  alignCenter: AlignCenterMenuItem,
  alignRight: AlignRightMenuItem,
  alignJustify: AlignJustifyMenuItem,
  undo: UndoMenuItem,
  redo: RedoMenuItem,
  heading: HeadingMenuItem,
  fontFamily: FontFamilyMenuItem,
  fontSize: FontSizeMenuItem,
  horizontalRule: HorizontalRuleMenuItem,
  hardBreak: HardBreakMenuItem,
  imagePopover: ImagePopoverMenuItem,
  linkPopover: LinkPopoverMenuItem,
  textColor: TextColorMenuItem,
  highlight: HighlightMenuItem,
  videoPopover: VideoPopoverMenuItem,
  aiRewrite: AIRewriteMenuItem,
  aiGenerate: AIGenerateMenuItem,
} as const;

export type MenuItem = keyof typeof menuItemsMap | `-${keyof typeof menuItemsMap}`;
