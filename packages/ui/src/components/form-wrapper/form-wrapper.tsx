import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from '@oe/api/utils/zod';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FormProvider as RHFFormProvider, useForm } from 'react-hook-form';
import { cn } from '#utils/cn';
import type { IFormWrapperProps } from './types';
import { getDefaultValuesFromSchema } from './utils';

export function FormWrapper<TFormSchema extends z.ZodType>({
  id,
  schema,
  tabId,
  dependencies,
  useFormProps,
  children,
  className,
  resetOnSuccess,
  onSubmit,
  onError,
  ...props
}: IFormWrapperProps<TFormSchema>) {
  const formRef = useRef<HTMLFormElement>(null);
  const defaultValues = useMemo(() => {
    return {
      ...getDefaultValuesFromSchema(schema),
      ...(useFormProps?.defaultValues || {}),
    };
  }, [schema, useFormProps?.defaultValues]);

  const form = useForm<z.infer<TFormSchema>>({
    ...useFormProps,
    resolver: zodResolver(schema),
    defaultValues,
  });
  const [loading, setLoading] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const isFormNoSubmitButton = useMemo(() => {
    return formRef.current?.querySelector('button[type="submit"]') === null;
  }, [formRef.current]);

  useEffect(() => {
    if (useFormProps?.defaultValues) {
      form.reset(useFormProps.defaultValues);
    }
  }, [form.reset, useFormProps?.defaultValues]);

  const handleSubmit = useCallback(
    async (values: z.infer<TFormSchema>) => {
      setLoading(true);
      try {
        await onSubmit?.(values);
        if (resetOnSuccess) {
          form.reset(undefined, useFormProps?.resetOptions);
        }
      } catch (error) {
        if (onError) {
          await onError(error);
        } else {
          console.error('Form submission error:', error);
        }
      } finally {
        setLoading(false);
      }
    },
    [resetOnSuccess, useFormProps?.resetOptions, onError, form.reset, onSubmit]
  );

  return (
    <RHFFormProvider {...form}>
      <form ref={formRef} className={cn('space-y-4', className)} onSubmit={form.handleSubmit(handleSubmit)} {...props}>
        {typeof children === 'function' ? children({ loading, form }) : children}
        {isFormNoSubmitButton && <button type="submit" className="hidden" />}
      </form>
    </RHFFormProvider>
  );
}
