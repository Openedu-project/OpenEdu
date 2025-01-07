import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from '@oe/api/utils/zod';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { type DefaultValues, FormProvider as RHFFormProvider, useForm } from 'react-hook-form';
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
      ...(schema ? getDefaultValuesFromSchema(schema) : {}),
      ...(useFormProps?.defaultValues || {}),
    } as DefaultValues<z.infer<TFormSchema>>;
  }, [schema, useFormProps?.defaultValues]);

  const form = useForm<z.infer<TFormSchema>>({
    ...useFormProps,
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues,
  });
  const [loading, setLoading] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const isFormNoSubmitButton = useMemo(() => {
    return formRef.current?.querySelector('button[type="submit"]') === null;
  }, [formRef.current]);

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [form.reset, defaultValues]);

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
      <form
        {...props}
        ref={formRef}
        className={cn('space-y-4', className)}
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit(handleSubmit)(e);
        }}
        noValidate
      >
        {typeof children === 'function' ? children({ loading, form }) : children}
        {isFormNoSubmitButton && <button type="submit" className="hidden" />}
      </form>
    </RHFFormProvider>
  );
}
