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

import type { TypeOf } from '@oe/api/utils/zod';
import { useFormStatus } from 'react-dom';
import { Label, LabelWithInfo } from '#shadcn/label';
import { cn } from '#utils/cn';
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
    const body = error ? String(error?.message) : children;

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

const FormFieldWithLabel = forwardRef<
  ComponentRef<typeof Slot>,
  ComponentPropsWithoutRef<typeof Slot> &
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    FormFieldContextValue & { label: string; form?: UseFormReturn<TypeOf<any>, any, undefined>; infoText?: string }
>(({ name, label, form, infoText, ...props }, ref) => {
  const formContext = useFormContext();

  return (
    <FormField
      control={form ? form.control : formContext.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabelInfo infoText={infoText}>{label}</FormLabelInfo>
          <FormControlSlot field={field} ref={ref} {...props} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
});

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
