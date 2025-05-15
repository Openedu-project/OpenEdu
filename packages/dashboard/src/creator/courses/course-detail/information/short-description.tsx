import { Textarea } from '@oe/ui';
import { FormFieldWithLabel } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { MAX_CHARACTERS } from '../_utils/constants';

export function ShortDescription({ initialValue }: { initialValue?: string }) {
  const tCourse = useTranslations("course");

  const [contentLength, setContentLength] = useState<number>(0);

  useEffect(()=> {
    if (initialValue) {
      setContentLength(initialValue.length);
    }
  }, [initialValue])

  return (
    <FormFieldWithLabel
      name="short_desc"
      label={
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="font-medium text-lg">
              {tCourse("information.sections.short_desc.title")}
              <span className="text-red-500">*</span>
            </span>
            <span className="text-muted-foreground text-xs">
              {tCourse("information.sections.short_desc.subtitle")}
            </span>
          </div>
          <span className='text-muted-foreground text-xs'>
            {contentLength}/{MAX_CHARACTERS} {tCourse("information.sections.short_desc.characters")}
          </span>
        </div>
      }
      className="rounded-lg bg-background p-4 shadow-xs"
      labelClassName="mb-4 text-lg"
    >
      <Textarea
        placeholder={tCourse("information.sections.short_desc.placeholder")}
        onChange={(e) => setContentLength(e.target.value.length)}
      />
    </FormFieldWithLabel>
  );
}
