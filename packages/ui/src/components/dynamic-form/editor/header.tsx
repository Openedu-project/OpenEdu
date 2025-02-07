'use client';
import { z } from '@oe/api/utils/zod';
import { useTranslations } from 'next-intl';
import { FormWrapper } from '#components/form-wrapper';
import { Button } from '#shadcn/button';
import { FormFieldWithLabel } from '#shadcn/form';
import { Input } from '#shadcn/input';
import { useFormEditorStore } from '../store';

const formSchema = z.object({
  name: z
    .string({ required_error: 'formValidation.required' })
    .min(1, { message: 'formValidation.too_small.string.inclusive--type:name--minimum:1' })
    .max(50, { message: 'formValidation.too_big.string.inclusive--type:name--maximum:50' }),
  description: z
    .string({ required_error: 'formValidation.required' })
    .min(1, { message: 'formValidation.too_small.string.inclusive--type:name--minimum:1' })
    .max(255, { message: 'formValidation.too_big.string.inclusive--type:name--maximum:255' }),
});

export function Header() {
  const tGeneral = useTranslations('general');
  const { fields } = useFormEditorStore();

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data, fields);
  };

  return (
    <FormWrapper id="dynamic-form-info" schema={formSchema} onSubmit={onSubmit}>
      <div className="flex flex-1 flex-col gap-2 md:flex-row md:items-start">
        <FormFieldWithLabel name="name">
          <Input placeholder="Form name" className="min-w-60 " autoComplete="off" />
        </FormFieldWithLabel>

        <FormFieldWithLabel name="description">
          <Input placeholder="Form description" className="min-w-80 " autoComplete="off" />
        </FormFieldWithLabel>

        <Button variant="default" type="submit" className="ml-auto">
          {tGeneral('save')}
        </Button>
      </div>
    </FormWrapper>
  );
}
