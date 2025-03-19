'use client';

import { useGetCourseById } from '@oe/api/hooks/useCourse';
import { Button } from '@oe/ui/shadcn/button';
import { Checkbox } from '@oe/ui/shadcn/checkbox';
import { Label } from '@oe/ui/shadcn/label';
import { Textarea } from '@oe/ui/shadcn/textarea';
import { cn } from '@oe/ui/utils/cn';
import { Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { type ChangeEvent, type FormEvent, type KeyboardEvent, type RefObject, useState } from 'react';

const SendReply = ({
  onSubmit,
  textareaRef,
}: {
  onSubmit: (content: string, isIncludedCourse: boolean) => Promise<void>;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
}) => {
  const t = useTranslations('course.history.feedback');
  const { courseId } = useParams();
  const { course } = useGetCourseById(courseId as string);
  const isApproved = course?.org_request?.status === 'approved' || course?.org_request?.status === 'rejected';

  const [content, setContent] = useState('');
  const [isIncludedCourse, setIsIncludedCourse] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    // Clear error when user starts typing
    if (error) {
      setError(null);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (content.length < 2) {
      setError(t('minCharacter'));
      return;
    }

    await onSubmit(content, isIncludedCourse);
    setContent('');
  };

  const handleKeyChange = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className={cn('mt-2 border-t')}>
      <div className="relative space-y-2">
        <div className="my-2 flex flex-row items-start gap-2 rounded-md p-2">
          <Checkbox
            id="includeChanges"
            checked={isIncludedCourse}
            onCheckedChange={checked => setIsIncludedCourse(!!checked)}
            className="mt-1"
            disabled={isApproved}
          />
          <Label htmlFor="includeChanges" className="font-medium text-foreground/80 text-xs">
            {t('includes')}
          </Label>
        </div>
        <Textarea
          id="content"
          value={content}
          onChange={handleContentChange}
          placeholder="Write your response..."
          ref={textareaRef}
          onKeyDown={handleKeyChange}
          disabled={isApproved}
        />
        {error && <p className="font-medium text-destructive text-sm">{error}</p>}
      </div>

      <Button
        size="icon"
        variant="ghost"
        className="absolute right-6 bottom-6 h-8 w-8 text-primary"
        onClick={handleSubmit}
        disabled={isApproved}
      >
        <Send />
      </Button>
    </div>
  );
};

export { SendReply };
