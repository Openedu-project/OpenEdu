import {
  embeddedContentSchema,
  pdfContentSchema,
  textContentSchema,
  videoContentSchema,
} from '@oe/api/schemas/courses/segmentSchema';
import type { TLessonContent } from '@oe/api/types/course/basic';
import type { ILessonContent } from '@oe/api/types/course/segment';
import { z } from '@oe/api/utils/zod';
import { RichTextEditor } from '@oe/ui/components/rich-text';
import type { SelectboxOption } from '@oe/ui/components/selectbox';
import { Uploader } from '@oe/ui/components/uploader';
import { Button } from '@oe/ui/shadcn/button';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { Input } from '@oe/ui/shadcn/input';
import { Code2Icon, FileIcon, FileVideoIcon, MessageCircleQuestion, ScrollText, Video } from 'lucide-react';
import type { ReactNode } from 'react';

export interface LessonContentOption extends SelectboxOption {
  id: string;
  value: string;
  label: string;
  icon?: ReactNode;
  schema: z.ZodSchema;
  content: (content: ILessonContent, order: number) => ReactNode;
}

export const tabOptions: Record<TLessonContent, LessonContentOption> = {
  text: {
    id: 'text',
    value: 'text',
    label: 'Text',
    icon: <ScrollText className="h-4 w-4" />,
    schema: textContentSchema,
    content: (content: ILessonContent, order: number) => (
      <FormFieldWithLabel key={content.id} name={`contents.${order}.content`} showErrorMessage>
        <RichTextEditor
          key={content.id}
          className="h-full rounded-none border-none"
          menuBarClassName="bg-background"
          maxHeight="100%"
        />
      </FormFieldWithLabel>
    ),
  },
  video: {
    id: 'video',
    value: 'video',
    label: 'Video',
    icon: <FileVideoIcon className="h-4 w-4" />,
    schema: videoContentSchema,
    content: (content: ILessonContent, order: number) => (
      <FormFieldWithLabel key={content.id} name={`contents.${order}.files`} showErrorMessage>
        <Uploader key={content.id} accept="video/*" listType="text" maxSizeBytes={1024 * 1024 * 5120}>
          <Button variant="outline" className="h-full w-full">
            <Video />
          </Button>
        </Uploader>
      </FormFieldWithLabel>
    ),
  },
  pdf: {
    id: 'pdf',
    value: 'pdf',
    label: 'PDF',
    icon: <FileIcon className="h-4 w-4" />,
    schema: pdfContentSchema,
    content: (content: ILessonContent, order: number) => (
      <FormFieldWithLabel key={content.id} name={`contents.${order}.files`} showErrorMessage>
        <Uploader
          key={content.id}
          accept=".pdf"
          listType="text"
          maxSizeBytes={1024 * 1024 * 5120} // 5GB
          className="min-h-auto"
        />
      </FormFieldWithLabel>
    ),
  },
  embedded: {
    id: 'embedded',
    value: 'embedded',
    label: 'Embedded',
    icon: <Code2Icon className="h-4 w-4" />,
    schema: embeddedContentSchema,
    content: (content: ILessonContent, order: number) => (
      <FormFieldWithLabel key={content.id} name={`contents.${order}.content`} showErrorMessage>
        <Input key={content.id} type="text" placeholder="Enter embed URL" />
      </FormFieldWithLabel>
    ),
  },
  quiz: {
    id: 'quiz',
    value: 'quiz',
    label: 'Quiz',
    icon: <MessageCircleQuestion className="h-4 w-4" />,
    schema: z.object({}),
    content: (content: ILessonContent, order: number) => (
      <FormFieldWithLabel key={content.id} name={`contents.${order}.quizzes`} showErrorMessage>
        {/* <QuizEditor /> */}
        {content.quizzes?.map(quiz => (
          <div key={quiz.id}>
            <h3>{quiz.title}</h3>
            <p>{quiz.description}</p>
          </div>
        ))}
      </FormFieldWithLabel>
    ),
  },
};
