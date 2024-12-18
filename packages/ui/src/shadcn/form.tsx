'use client';

import type { Root } from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type ComponentRef,
  type HTMLAttributes,
  createContext,
  forwardRef,
  useContext,
  useId,
} from 'react';
import {
  Controller,
  type ControllerProps,
  type ControllerRenderProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  type UseFormReturn,
  useFormContext,
} from 'react-hook-form';

import type { TypeOf, z } from '@oe/api/utils/zod';
import { useTranslations } from 'next-intl';
import { useFormStatus } from 'react-dom';
import { Label, LabelWithInfo } from '#shadcn/label';
import { cn } from '#utils/cn';
import { parseFormMessage } from '#utils/form-message';
import { Button, type ButtonProps } from './button';

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue);

const FormItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn('space-y-2', className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = 'FormItem';

const FormLabel = forwardRef<ComponentRef<typeof Root>, ComponentPropsWithoutRef<typeof Root>>(
  ({ className, ...props }, ref) => {
    const { error, formItemId } = useFormField();

    return <Label ref={ref} className={cn(error && 'text-destructive', className)} htmlFor={formItemId} {...props} />;
  }
);
FormLabel.displayName = 'FormLabel';

const FormControl = forwardRef<ComponentRef<typeof Slot>, ComponentPropsWithoutRef<typeof Slot>>(
  ({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

    return (
      <Slot
        ref={ref}
        id={formItemId}
        aria-describedby={error ? `${formDescriptionId} ${formMessageId}` : `${formDescriptionId}`}
        aria-invalid={!!error}
        {...props}
      />
    );
  }
);
FormControl.displayName = 'FormControl';

const FormDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();

    return <p ref={ref} id={formDescriptionId} className={cn('text-muted-foreground text-sm', className)} {...props} />;
  }
);
FormDescription.displayName = 'FormDescription';

const FormMessage = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();

    const t = useTranslations();
    const message = error?.message ? parseFormMessage(error.message) : undefined;
    const body = message ? t(message.key, message) : children;

    if (!body) {
      return null;
    }

    return (
      <p ref={ref} id={formMessageId} className={cn('font-medium text-destructive text-sm', className)} {...props}>
        {body}
      </p>
    );
  }
);
FormMessage.displayName = 'FormMessage';

const FormControlSlot = forwardRef<
  ComponentRef<typeof Slot>,
  ComponentPropsWithoutRef<typeof Slot> & { field: ControllerRenderProps<FieldValues, string> }
>(({ field, ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      {...field}
      ref={ref}
      id={formItemId}
      aria-describedby={error ? `${formDescriptionId} ${formMessageId}` : `${formDescriptionId}`}
      aria-invalid={!!error}
      {...props}
    />
  );
});

FormControlSlot.displayName = 'FormControlSlot';

const FormLabelInfo = ({ className, children, ref, ...props }: ComponentProps<typeof LabelWithInfo>) => {
  const { error, formItemId } = useFormField();

  return (
    <LabelWithInfo ref={ref} className={cn(error && 'text-destructive', className)} htmlFor={formItemId} {...props}>
      {children}
    </LabelWithInfo>
  );
};

export type FormFieldWithLabelProps = ComponentPropsWithoutRef<typeof Slot> &
  FormFieldContextValue & {
    label?: string;
    form?: UseFormReturn<TypeOf<z.ZodAny>, z.ZodAny, undefined>;
    infoText?: string;
    description?: string;
    required?: boolean;
    fieldType?: string;
    labelClassName?: string;
  };

const FormFieldWithLabel = forwardRef<ComponentRef<typeof Slot>, FormFieldWithLabelProps>(
  ({ name, label, form, infoText, description, className, labelClassName, required, fieldType, ...props }, ref) => {
    const formContext = useFormContext();

    return (
      <FormField
        control={form ? form.control : formContext.control}
        name={name}
        render={({ field }) => (
          <FormItem
            className={cn(
              fieldType === 'checkbox' && 'flex flex-row items-start space-x-3 space-y-0 rounded-md',
              className
            )}
          >
            {fieldType === 'checkbox' ? (
              <>
                <FormControlSlot field={field} ref={ref} {...props} />
                <div className="space-y-1 leading-none">
                  {label && (
                    <FormLabelInfo infoText={infoText} className={labelClassName}>
                      {label} {required && <span className="ml-1 text-destructive">*</span>}
                    </FormLabelInfo>
                  )}
                  {description && <FormDescription>{description}</FormDescription>}
                  <FormMessage />
                </div>
              </>
            ) : (
              <>
                {label && (
                  <FormLabelInfo infoText={infoText} className={labelClassName}>
                    {label} {required && <span className="ml-1 text-destructive">*</span>}
                  </FormLabelInfo>
                )}
                <FormControlSlot field={field} ref={ref} {...props} />
                {description && <FormDescription>{description}</FormDescription>}
                <FormMessage />
              </>
            )}
          </FormItem>
        )}
      />
    );
  }
);

const FormSubmitButton = forwardRef<HTMLButtonElement, ButtonProps & { label: string }>(({ label, ...props }, ref) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} loading={pending} ref={ref} {...props}>
      {label}
    </Button>
  );
});

FormSubmitButton.displayName = 'FormSubmitButton';

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormFieldWithLabel,
  FormSubmitButton,
  FormField,
};
