import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from '@oe/api/utils/zod';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { type DefaultValues, FormProvider as RHFFormProvider, useForm } from 'react-hook-form';
import { cn } from '#utils/cn';
import { useFormContext } from './form-nested-provider';
import type { IFormMetadata, IFormWrapperProps } from './types';
import { getDefaultValuesFromSchema, getSchemaShape } from './utils';

export function FormNestedWrapper<TFormSchema extends z.ZodType>({
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
  const context = useFormContext();
  const { control, watch, setValue } = form;

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const isFormNoSubmitButton = useMemo(() => {
    return formRef.current?.querySelector('button[type="submit"]') === null;
  }, [formRef.current]);

  useEffect(() => {
    if (useFormProps?.defaultValues) {
      form.reset(useFormProps.defaultValues);
    }
  }, [form.reset, useFormProps?.defaultValues]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!context) {
      return;
    }

    const metadata: IFormMetadata<TFormSchema> = {
      id,
      tabId,
      dependencies,
      formRef,
      getValues: () => form.getValues(),
      validate: () => form.trigger(),
      getFieldCount: () => {
        const values = form.getValues();
        const completed = Object.keys(values).filter(key => values[key] !== undefined && values[key] !== '').length;
        const schemaShape = schema ? getSchemaShape(schema) : undefined;
        return {
          completed,
          total: schemaShape ? Object.keys(schemaShape).length : 0,
        };
      },
      getValidationErrors: () => {
        return Object.entries(form.formState.errors).map(([field, error]) => ({
          field,
          message: error?.message as string,
        }));
      },
      watch: form.watch,
    };

    context.registerForm(metadata);
    if (tabId) {
      context.registerTab(tabId, metadata);
    }

    return () => {
      context.unregisterForm(id);
      if (tabId) {
        context.unregisterTab(tabId);
      }
    };
  }, [tabId]);

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

  const handleError = useCallback((error: unknown) => {
    console.error('Form validation error', error);
  }, []);

  return (
    <RHFFormProvider {...form}>
      <form
        ref={formRef}
        className={cn('space-y-4', className)}
        onSubmit={form.handleSubmit(handleSubmit, handleError)}
        {...props}
      >
        {typeof children === 'function' ? children({ loading, form, control, watch, setValue }) : children}
        {isFormNoSubmitButton && <button type="submit" className="hidden" />}
      </form>
    </RHFFormProvider>
  );
}
