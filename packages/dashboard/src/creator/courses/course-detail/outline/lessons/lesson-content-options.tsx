import type { TLessonContent } from '@oe/api';
import type { z } from '@oe/api';
import {
  embeddedContentSchema,
  pdfContentSchema,
  quizContentSchema,
  textContentSchema,
  videoContentSchema,
} from '@oe/api';
import type { SelectboxOption } from '@oe/ui';
import { Code2Icon, FileIcon, FileVideoIcon, MessageCircleQuestion, ScrollText } from 'lucide-react';
import type { ReactNode } from 'react';
import { EmbeddedBlockContent } from './embedded-block-content';
import { PdfBlockContent } from './pdf-block-content';
import { QuizBlockContent } from './quiz-block-content';
import { TextBlockContent } from './text-block-content';
import { VideoBlockContent } from './video-block-content';
export interface LessonContentOption extends SelectboxOption {
  id: string;
  value: string;
  label: string;
  icon?: ReactNode;
  schema: z.ZodSchema;
  content: (order: number) => ReactNode;
}

export const tabOptions: Record<TLessonContent, LessonContentOption> = {
  text: {
    id: 'text',
    value: 'text',
    label: 'contentTypes.text',
    icon: <ScrollText className="h-4 w-4" />,
    schema: textContentSchema,
    content: (order: number) => <TextBlockContent order={order} />,
  },
  video: {
    id: 'video',
    value: 'video',
    label: 'contentTypes.video',
    icon: <FileVideoIcon className="h-4 w-4" />,
    schema: videoContentSchema,
    content: (order: number) => <VideoBlockContent order={order} />,
  },
  pdf: {
    id: 'pdf',
    value: 'pdf',
    label: 'contentTypes.pdf',
    icon: <FileIcon className="h-4 w-4" />,
    schema: pdfContentSchema,
    content: (order: number) => <PdfBlockContent order={order} />,
  },
  embedded: {
    id: 'embedded',
    value: 'embedded',
    label: 'contentTypes.embedded',
    icon: <Code2Icon className="h-4 w-4" />,
    schema: embeddedContentSchema,
    content: (order: number) => <EmbeddedBlockContent order={order} />,
  },
  quiz: {
    id: 'quiz',
    value: 'quiz',
    label: 'contentTypes.quiz',
    icon: <MessageCircleQuestion className="h-4 w-4" />,
    schema: quizContentSchema,
    content: (order: number) => <QuizBlockContent order={order} />,
  },
};
