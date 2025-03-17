'use client';

import { Button } from '@oe/ui/shadcn/button';
import { Checkbox } from '@oe/ui/shadcn/checkbox';
import { Label } from '@oe/ui/shadcn/label';
import { Textarea } from '@oe/ui/shadcn/textarea';
import { useTranslations } from 'next-intl';
import { type ChangeEvent, type FormEvent, type RefObject, useState } from 'react';

const SendReply = ({
  onSubmit,
  isOrgFeedback,
  textareaRef,
}: {
  onSubmit: (content: string, isIncludedCourse: boolean) => Promise<void>;
  isOrgFeedback: boolean;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
}) => {
  const t = useTranslations('course.history.feedback');
  const [content, setContent] = useState('');
  const [isIncludedCourse, setIsIncludedCourse] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isOpenEdu = true;

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

  return (
    <div className="border-border-neutral-50 border-t-[1px] pt-4">
      <div className="relative space-y-2">
        <Label htmlFor="content">
          {t('response', {
            location: isOrgFeedback ? t('org') : isOpenEdu ? t('oe') : t('org'),
          })}
        </Label>
        <Textarea
          id="content"
          value={content}
          onChange={handleContentChange}
          placeholder="Write your response"
          ref={textareaRef}
        />
        {error && <p className="font-medium text-destructive text-sm">{error}</p>}
      </div>

      <div className="my-8 flex flex-row items-start gap-2 rounded-md bg-primary/20 p-4">
        <Checkbox
          id="includeChanges"
          checked={isIncludedCourse}
          onCheckedChange={checked => setIsIncludedCourse(!!checked)}
          className="mt-1"
        />
        <div className="space-y-1">
          <Label htmlFor="includeChanges" className="font-medium text-sm leading-none">
            {t('includes')}
          </Label>
        </div>
      </div>

      <Button onClick={handleSubmit} variant="outline">
        {t('submit')}
      </Button>
    </div>
  );
};

export { SendReply };
