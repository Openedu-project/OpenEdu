'use client';

import type { Root } from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type ComponentRef,
  type HTMLAttributes,
  type ReactNode,
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
import { getFormErrorMessage, parseFormMessage } from '#utils/form-message';
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
    const messageObject = getFormErrorMessage(error);
    const message = messageObject?.message ? parseFormMessage(messageObject.message) : undefined;
    const body = message
      ? messageObject?.count
        ? `${t(message.key, message)} (${messageObject?.count})`
        : t(message.key, message)
      : children;

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
  ComponentPropsWithoutRef<typeof Slot> & {
    field: ControllerRenderProps<FieldValues, string>;
  }
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
    label?: ReactNode;
    form?: UseFormReturn<TypeOf<z.ZodAny>, z.ZodAny, undefined>;
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

const FormFieldWithLabel = forwardRef<ComponentRef<typeof Slot>, FormFieldWithLabelProps>(
  (
    {
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
    },
    ref
  ) => {
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
      <FormControlSlot field={field} ref={ref} {...props}>
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
const GenericFormFieldWithLabel = forwardRef<ComponentRef<typeof Slot>, GenericFormFieldWithLabelProps>(
  (
    {
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
    },
    ref
  ) => {
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
        ref={ref}
        id={`${name}-form-item`}
        aria-describedby={`${name}-form-item-description ${name}-form-item-message`}
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
);

GenericFormFieldWithLabel.displayName = 'GenericFormFieldWithLabel';

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
