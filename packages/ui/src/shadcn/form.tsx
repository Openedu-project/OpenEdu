'use client';

import type { Root } from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type ReactNode,
  createContext,
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
import { getFormErrorMessage, parseFormMessage } from '#utils/form-message';
import { Button } from './button';

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

function FormItem({ className, ...props }: ComponentProps<'div'>) {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div className={cn('space-y-2', className)} data-slot="form-item" {...props} />
    </FormItemContext.Provider>
  );
}

function FormLabel({ className, ...props }: ComponentProps<typeof Root>) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      className={cn(error && 'text-destructive', className)}
      htmlFor={formItemId}
      data-slot="form-label"
      {...props}
    />
  );
}

function FormControl({ ...props }: ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      id={formItemId}
      aria-describedby={error ? `${formDescriptionId} ${formMessageId}` : `${formDescriptionId}`}
      aria-invalid={!!error}
      data-slot="form-control"
      {...props}
    />
  );
}

function FormDescription({ className, ...props }: ComponentProps<'p'>) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      id={formDescriptionId}
      className={cn('text-muted-foreground text-sm', className)}
      data-slot="form-description"
      {...props}
    />
  );
}

function FormMessage({ className, children, ...props }: ComponentProps<'p'>) {
  const { error, formMessageId } = useFormField();
  const t = useTranslations();
  const messageObject = getFormErrorMessage(error);
  const message = messageObject?.message ? parseFormMessage(messageObject.message) : undefined;
  const body = message
    ? messageObject?.count
      ? `${t(message.key as string, message)} (${messageObject?.count})`
      : t(message.key as string, message)
    : children;

  if (!body) {
    return null;
  }

  return (
    <p
      id={formMessageId}
      className={cn('font-medium text-destructive text-sm', className)}
      data-slot="form-message"
      {...props}
    >
      {body}
    </p>
  );
}

function FormControlSlot({
  field,
  ...props
}: ComponentProps<typeof Slot> & {
  field: ControllerRenderProps<FieldValues, string>;
}) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      {...field}
      id={formItemId}
      aria-describedby={error ? `${formDescriptionId} ${formMessageId}` : `${formDescriptionId}`}
      aria-invalid={!!error}
      data-slot="form-control"
      {...props}
    />
  );
}

const FormLabelInfo = ({ className, children, ...props }: ComponentProps<typeof LabelWithInfo>) => {
  const { error, formItemId } = useFormField();

  return (
    <LabelWithInfo
      className={cn(error && 'text-destructive', className)}
      htmlFor={formItemId}
      data-slot="form-label-info"
      {...props}
    >
      {children}
    </LabelWithInfo>
  );
};

export type FormFieldWithLabelProps = ComponentPropsWithoutRef<typeof Slot> &
  FormFieldContextValue & {
    label?: ReactNode;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    form?: UseFormReturn<any>;
    infoText?: string;
    description?: string;
    required?: boolean;
    isToggleField?: boolean;
    labelClassName?: string;
    formMessageClassName?: string;
    showErrorMessage?: boolean;
    render?: (props: {
      field: ControllerRenderProps<FieldValues, string>;
    }) => ReactNode;
  };

function FormFieldWithLabel({
  name,
  label,
  form,
  infoText,
  description,
  className,
  labelClassName,
  required,
  isToggleField,
  render,
  formMessageClassName,
  showErrorMessage = true,
  ...props
}: FormFieldWithLabelProps) {
  const formContext = useFormContext();

  const renderLabel = () => (
    <FormLabelInfo
      infoText={infoText}
      className={cn(labelClassName, isToggleField && 'cursor-pointer')}
      data-field={name}
    >
      {label}
      {required && <span className="ml-1 text-destructive">*</span>}
    </FormLabelInfo>
  );

  const renderControl = (field: ControllerRenderProps<FieldValues, string>) => (
    <FormControlSlot field={field} {...props} data-slot="form-field-with-label">
      {typeof render === 'function' ? render({ field }) : props.children}
    </FormControlSlot>
  );

  return (
    <FormField
      control={form?.control ?? formContext.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem
            className={cn(isToggleField && 'flex flex-row items-center space-x-3 space-y-0 rounded-md', className)}
          >
            {isToggleField ? (
              <>
                {renderControl(field)}
                <div className="space-y-1 leading-none">
                  {label && renderLabel()}
                  {description && <FormDescription>{description}</FormDescription>}
                </div>
              </>
            ) : (
              <>
                {label && renderLabel()}
                {renderControl(field)}
                {description && <FormDescription>{description}</FormDescription>}
              </>
            )}
            {showErrorMessage && <FormMessage className={formMessageClassName} />}
          </FormItem>
        );
      }}
    />
  );
}

function FormSubmitButton({ label, ...props }: ComponentProps<typeof Button> & { label: string }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} loading={pending} data-slot="submit" {...props}>
      {label}
    </Button>
  );
}

/** */

// Create a generic version of FormFieldWithLabelProps
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type GenericFormFieldWithLabelProps<TFieldValue = any> = Omit<
  ComponentPropsWithoutRef<typeof Slot>,
  'children'
> &
  FormFieldContextValue & {
    label?: ReactNode;
    form?: UseFormReturn<TypeOf<z.ZodAny>, z.ZodAny, undefined>;
    infoText?: string;
    description?: string;
    required?: boolean;
    isToggleField?: boolean;
    labelClassName?: string;
    formMessageClassName?: string;
    showErrorMessage?: boolean;
    // Make render function generic to handle different field value types
    render?: (props: {
      field: Omit<ControllerRenderProps<FieldValues, string>, 'value' | 'onChange'> & {
        value: TFieldValue;
        onChange: (value: TFieldValue) => void;
      };
    }) => ReactNode;
    children?: ReactNode;
  };

// Create a generic version of FormFieldWithLabel
function GenericFormFieldWithLabel({
  name,
  label,
  form,
  infoText,
  description,
  className,
  labelClassName,
  required,
  isToggleField,
  render,
  formMessageClassName,
  showErrorMessage = true,
  children,
  ...props
}: GenericFormFieldWithLabelProps) {
  const formContext = useFormContext();

  const renderLabel = () => (
    <FormLabelInfo
      infoText={infoText}
      className={cn(labelClassName, isToggleField && 'cursor-pointer')}
      data-field={name}
    >
      {label}
      {required && <span className="ml-1 text-destructive">*</span>}
    </FormLabelInfo>
  );

  const renderControl = (field: ControllerRenderProps<FieldValues, string>) => (
    <Slot
      {...field}
      id={`${name}-form-item`}
      aria-describedby={`${name}-form-item-description ${name}-form-item-message`}
      data-slot="generic-form-field"
      {...props}
    >
      {typeof render === 'function' ? render({ field }) : children}
    </Slot>
  );

  return (
    <FormField
      control={form?.control ?? formContext.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem
            className={cn(isToggleField && 'flex flex-row items-center space-x-3 space-y-0 rounded-md', className)}
          >
            {isToggleField ? (
              <>
                {renderControl(field)}
                <div className="space-y-1 leading-none">
                  {label && renderLabel()}
                  {description && <FormDescription>{description}</FormDescription>}
                </div>
              </>
            ) : (
              <>
                {label && renderLabel()}
                {renderControl(field)}
                {description && <FormDescription>{description}</FormDescription>}
              </>
            )}
            {showErrorMessage && <FormMessage className={formMessageClassName} />}
          </FormItem>
        );
      }}
    />
  );
}

export function createTypedFormField<T>() {
  return function TypedFormField(props: GenericFormFieldWithLabelProps<T>) {
    return <GenericFormFieldWithLabel {...props} />;
  };
}

const RecordStringFormField = createTypedFormField<Record<string, string>>();
function NumberFormField(props: GenericFormFieldWithLabelProps<number>) {
  return <GenericFormFieldWithLabel {...props} />;
}

function BooleanFormField(props: GenericFormFieldWithLabelProps<boolean>) {
  return <GenericFormFieldWithLabel {...props} />;
}

function StringFormField(props: GenericFormFieldWithLabelProps<string>) {
  return <GenericFormFieldWithLabel {...props} />;
}
/** */

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
  FormLabelInfo,
  //New
  RecordStringFormField,
  NumberFormField,
  BooleanFormField,
  StringFormField,
};
