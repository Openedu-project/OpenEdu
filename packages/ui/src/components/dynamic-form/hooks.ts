import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from '@oe/api/utils/zod';
import { useForm } from 'react-hook-form';
import { useFormEditorStore } from './store';
import { generateDefaultValues, generateZodSchema } from './utils';

export const useCustomForm = () => {
  const { fields } = useFormEditorStore();

  const formSchema = generateZodSchema(fields);
  const defaultValues = generateDefaultValues(fields);

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  return form;
};
