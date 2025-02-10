'use client';
import { FormNestedProvider, type INestedFormsValues } from '@oe/ui/components/form-wrapper';
import { LessonContents } from './lesson-contents';
import { LessonHeader } from './lesson-header';

export default function LessonPage() {
  // biome-ignore lint/suspicious/useAwait: <explanation>
  const handleSubmit = async (values: INestedFormsValues) => {
    console.log(values);
  };
  return (
    <FormNestedProvider onSubmit={handleSubmit}>
      <LessonHeader />
      <LessonContents />
    </FormNestedProvider>
  );
}
