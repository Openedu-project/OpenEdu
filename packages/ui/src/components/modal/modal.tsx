import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '#shadcn/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '#shadcn/dialog';
import { Form } from '#shadcn/form';

import type { z } from '@oe/api/utils/zod';
import type { DialogProps } from '@radix-ui/react-dialog';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import type { DefaultValues, UseFormReturn } from 'react-hook-form';

type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';

export interface ButtonConfig {
  label: string;
  onClick?: (onClose?: () => void) => void;
  variant?: ButtonVariant;
  type?: 'button' | 'submit' | 'reset';
}

type FormSchema = z.ZodObject<Record<string, z.ZodTypeAny>>;

interface BaseModalProps extends Omit<DialogProps, 'children'> {
  title: string;
  description?: string;
  trigger?: ReactNode;
  buttons?: ButtonConfig[];
  isOpen?: boolean;
  className?: string;
  hasCancelButton?: boolean;
  onClose?: () => void;
}

interface FormModalProps<TSchema extends FormSchema> extends BaseModalProps {
  children: (form: UseFormReturn<z.infer<TSchema>>) => ReactNode;
  onSubmit?: (data: z.infer<TSchema>) => Promise<void>;
  validationSchema?: TSchema;
  defaultValues?: DefaultValues<z.infer<TSchema>>;
}

interface NonFormModalProps extends BaseModalProps {
  children?: ReactNode;
}

type ModalProps<TSchema extends FormSchema> = FormModalProps<TSchema> | NonFormModalProps;

const isFormModal = <TSchema extends FormSchema>(props: ModalProps<TSchema>): props is FormModalProps<TSchema> =>
  'onSubmit' in props && 'validationSchema' in props;

const FormModalContent = <TSchema extends FormSchema>({
  children,
  onSubmit,
  validationSchema,
  defaultValues,
  buttons,
  hasCancelButton = true,
  onClose,
}: FormModalProps<TSchema>) => {
  const form = useForm<z.infer<TSchema>>({
    resolver: validationSchema ? zodResolver(validationSchema as TSchema) : undefined,
    defaultValues: defaultValues || (validationSchema?.partial().parse({}) as DefaultValues<z.infer<TSchema>>),
  });

  const handleSubmit = async (data: z.infer<TSchema>) => {
    try {
      await onSubmit?.(data);
      onClose?.();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit(handleSubmit)(e);
        }}
      >
        {children(form)}
        <div className="mt-4 flex justify-end space-x-2">
          {renderButtons(buttons, form.formState.isSubmitting, true, hasCancelButton, onClose)}
        </div>
      </form>
    </Form>
  );
};

const NonFormModalContent = ({ children, buttons, hasCancelButton = true, onClose }: NonFormModalProps) => (
  <>
    {children}
    <div className="mt-4 flex justify-end space-x-2">
      {renderButtons(buttons, false, false, hasCancelButton, onClose)}
    </div>
  </>
);

const renderButtons = (
  buttons: ButtonConfig[] | undefined,
  isSubmitting: boolean,
  isFormModal: boolean,
  hasCancelButton: boolean,
  onClose?: () => void
) => {
  const tGeneral = useTranslations('general');
  if (buttons && buttons.length > 0) {
    return buttons.map(button => (
      <Button
        key={button.label}
        type={button.type ?? 'button'}
        variant={button.variant ?? 'default'}
        onClick={button.onClick ? () => button.onClick?.(onClose) : button.type === 'button' ? onClose : undefined}
        disabled={isSubmitting && button.type === 'submit'}
      >
        {button.label}
      </Button>
    ));
  }

  return (
    <>
      {onClose && hasCancelButton && (
        <Button type="button" variant="outline" onClick={onClose}>
          {tGeneral('close')}
        </Button>
      )}
      {isFormModal && (
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? tGeneral('submitting') : tGeneral('submit')}
        </Button>
      )}
    </>
  );
};

export const Modal = <TSchema extends FormSchema = never>(props: ModalProps<TSchema>) => {
  const {
    title,
    description,
    trigger,
    isOpen: externalIsOpen,
    className,
    onClose,
    hasCancelButton = true,
    ...rest
  } = props;
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  useEffect(() => {
    if (externalIsOpen !== undefined) {
      setInternalIsOpen(externalIsOpen);
    }
  }, [externalIsOpen]);

  const handleOpenChange = (open: boolean) => {
    setInternalIsOpen(open);
    if (!open) {
      onClose?.();
    }
  };

  const modalContent = (
    <DialogContent onPointerDownOutside={e => e.preventDefault()} className={className}>
      {(title || description) && (
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
      )}
      {isFormModal(props) ? (
        <FormModalContent {...props} onClose={() => handleOpenChange(false)} hasCancelButton={hasCancelButton} />
      ) : (
        <NonFormModalContent {...props} onClose={() => handleOpenChange(false)} hasCancelButton={hasCancelButton} />
      )}
    </DialogContent>
  );

  if (trigger) {
    return (
      <Dialog open={internalIsOpen} onOpenChange={handleOpenChange} {...rest}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        {modalContent}
      </Dialog>
    );
  }

  return (
    <Dialog open={internalIsOpen} onOpenChange={handleOpenChange} {...rest}>
      {modalContent}
    </Dialog>
  );
};
