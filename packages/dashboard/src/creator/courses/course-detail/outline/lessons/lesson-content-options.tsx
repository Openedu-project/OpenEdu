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
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { Input } from '@oe/ui/shadcn/input';
import { Code2Icon, FileIcon, FileVideoIcon, MessageCircleQuestion, TextIcon } from 'lucide-react';
import type { ReactNode } from 'react';

export interface LessonContentOption extends SelectboxOption {
  id: string;
  value: string;
  label: string;
  icon?: ReactNode;
  schema: z.ZodSchema;
  content: (content: ILessonContent) => ReactNode;
}

export const tabOptions: Record<TLessonContent, LessonContentOption> = {
  text: {
    id: 'text',
    value: 'text',
    label: 'Text',
    icon: <TextIcon className="h-4 w-4" />,
    schema: textContentSchema,
    content: (content: ILessonContent) => (
      <FormFieldWithLabel name="content" showErrorMessage>
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
    content: (content: ILessonContent) => (
      <FormFieldWithLabel name="files" showErrorMessage>
        <Uploader key={content.id} accept="video/*" listType="picture" fileListVisible={false} />
      </FormFieldWithLabel>
    ),
  },
  pdf: {
    id: 'pdf',
    value: 'pdf',
    label: 'PDF',
    icon: <FileIcon className="h-4 w-4" />,
    schema: pdfContentSchema,
    content: (content: ILessonContent) => (
      <FormFieldWithLabel name="files" showErrorMessage>
        <Uploader key={content.id} accept=".pdf" listType="picture" fileListVisible={false} />
      </FormFieldWithLabel>
    ),
  },
  embedded: {
    id: 'embedded',
    value: 'embedded',
    label: 'Embedded',
    icon: <Code2Icon className="h-4 w-4" />,
    schema: embeddedContentSchema,
    content: (content: ILessonContent) => (
      <FormFieldWithLabel name="content" showErrorMessage>
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
    content: (content: ILessonContent) => (
      <FormFieldWithLabel name="quizzes" showErrorMessage>
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
