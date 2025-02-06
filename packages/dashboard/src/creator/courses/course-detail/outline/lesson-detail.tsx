import { type ILessonSchema, lessonSchema } from '@oe/api/schemas/courses/segmentSchema';
import { FormWrapper } from '@oe/ui/components/form-wrapper';
import { Button } from '@oe/ui/shadcn/button';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { Input } from '@oe/ui/shadcn/input';
import { SaveIcon, Trash2Icon } from 'lucide-react';
import { useOutlineStore } from '../_store/useOutlineStore';
import { LessonContent } from './lesson-content';
import LessonsPanel from './lessons-panel';

export function LessonDetail() {
  const { activeLesson } = useOutlineStore();

  const handleSubmit = (data: ILessonSchema) => {
    console.log(data);
  };

  const handleError = (error: unknown) => {
    console.log(error);
  };

  return (
    <div className="flex h-full justify-center overflow-hidden">
      <div className="flex w-full max-w-7xl gap-4">
        <LessonsPanel />
        <FormWrapper
          id="lesson-content"
          className="flex w-full flex-col overflow-hidden rounded-md bg-background p-4"
          schema={lessonSchema}
          useFormProps={{
            defaultValues: activeLesson,
          }}
          onSubmit={handleSubmit}
          onError={handleError}
        >
          <div className="flex items-center justify-between gap-2">
            <FormFieldWithLabel name="title" className="flex-1">
              <Input type="text" placeholder="Enter lesson title" />
            </FormFieldWithLabel>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                type="submit"
                className="gap-2 border-primary text-primary hover:bg-primary/90 hover:text-primary-foreground"
              >
                <SaveIcon className="h-4 w-4" />
                Save
              </Button>
              <Button variant="outline">
                <Trash2Icon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <LessonContent />
        </FormWrapper>
      </div>
    </div>
  );
}
