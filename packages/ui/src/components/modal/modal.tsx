import type { TypeOf, z } from '@oe/api/utils/zod';
import { useTranslations } from 'next-intl';
import { Fragment, useEffect, useState } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import type { DefaultValues, UseFormReturn } from 'react-hook-form';
import {
  type FormErrorHandler,
  FormNestedProvider,
  FormNestedWrapper,
  type INestedFormsValues,
  SubmitFormsButton,
} from '#components/form-wrapper';
import { Button, type ButtonProps } from '#shadcn/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#shadcn/dialog';
import { cn } from '#utils/cn';

type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';

export interface ButtonConfig extends Omit<ButtonProps, 'onClick'> {
  label: string;
  onClick?: (handleClose?: (e?: MouseEvent<HTMLButtonElement>) => void) => void;
  variant?: ButtonVariant;
  type?: 'button' | 'submit' | 'reset';
  component?: (handleClose?: (e?: MouseEvent<HTMLButtonElement>) => void) => ReactNode;
}

// type FormSchema = z.ZodObject<Record<string, z.ZodTypeAny>>;

export interface ModalProps<TSchema extends z.ZodType> {
  title: ReactNode;
  description?: ReactNode;
  trigger?: ReactNode;
  children?: ReactNode | ((form: UseFormReturn<z.infer<TSchema>>) => ReactNode);
  className?: string;
  buttonsClassName?: string;
  contentClassName?: string;
  formClassName?: string;
  open?: boolean;
  hasCancelButton?: boolean;
  hasCloseIcon?: boolean;
  onClose?: () => void;
  buttons?: ButtonConfig[];
  defaultValues?: DefaultValues<TypeOf<TSchema>> | undefined;
  showSubmit?: boolean;
  validationSchema?: TSchema;
  onSubmit?: (data: z.infer<TSchema>) => Promise<void> | void;
  onError?: FormErrorHandler;
  onChange?: (data: z.infer<TSchema>) => Promise<void> | void;
}

const ModalButtons = ({
  buttons,
  isSubmitting,
  showSubmit,
  hasCancelButton = true,
  handleClose,
}: {
  buttons?: ButtonConfig[];
  isSubmitting?: boolean;
  showSubmit?: boolean;
  hasCancelButton?: boolean;
  handleClose?: () => void;
}) => {
  const t = useTranslations('general');

  const onClose = (e?: MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    handleClose?.();
  };

  if (buttons && buttons.length > 0) {
    return (
      <>
        {buttons.map(button =>
          button.component ? (
            <Fragment key={button.label}>{button.component(onClose)}</Fragment>
          ) : button.type === 'submit' ? (
            <SubmitFormsButton
              key={button.label}
              variant={button.variant}
              disabled={isSubmitting}
              loading={isSubmitting}
              formIds={['modal-form']}
            >
              {button.label}
            </SubmitFormsButton>
          ) : (
            <Button
              {...button}
              key={button.label}
              type={button.type ?? 'button'}
              variant={button.variant ?? 'default'}
              onClick={
                button.onClick
                  ? e => {
                      e.stopPropagation();
                      button.onClick?.(onClose);
                    }
                  : button.type === 'button'
                    ? onClose
                    : undefined
              }
            >
              {button.label}
            </Button>
          )
        )}
      </>
    );
  }

  return (
    <>
      {hasCancelButton && onClose && (
        <Button type="button" variant="outline" onClick={onClose}>
          {t('close')}
        </Button>
      )}
      {showSubmit && (
        <SubmitFormsButton
          key="submit"
          variant="default"
          formIds={['modal-form']}
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          {isSubmitting ? t('submitting') : t('submit')}
        </SubmitFormsButton>
      )}
    </>
  );
};

export const Modal = <TSchema extends z.ZodType>({
  title,
  description,
  trigger,
  children,
  open: externalIsOpen,
  className,
  buttonsClassName,
  contentClassName,
  hasCancelButton = true,
  buttons,
  validationSchema,
  showSubmit,
  defaultValues,
  hasCloseIcon,
  formClassName,
  onClose,
  onSubmit,
  onError,
  onChange,
  ...rest
}: ModalProps<TSchema>) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isForm = !!validationSchema && !!onSubmit;
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (data: INestedFormsValues) => {
    setIsSubmitting(true);
    await onSubmit?.(data['modal-form']);
    handleOpenChange(false);
    setIsSubmitting(false);
  };

  const handleError = (error: unknown) => {
    onError?.(error);
    setIsSubmitting(false);
  };

  const hasTitleOrDescription = !!title || !!description;
  const hasButtons = !!buttons || !!hasCancelButton || !!showSubmit;

  const content = isForm ? (
    <FormNestedWrapper
      id="modal-form"
      schema={validationSchema}
      className={cn('scrollbar px-4', hasTitleOrDescription && hasButtons ? 'overflow-y-auto' : '', formClassName)}
      useFormProps={{ defaultValues }}
    >
      {({ form }) => (typeof children === 'function' ? children(form) : children)}
    </FormNestedWrapper>
  ) : (
    <div
      className={cn('scrollbar px-4', hasTitleOrDescription && hasButtons ? 'overflow-y-auto' : '', contentClassName)}
    >
      {children as ReactNode}
    </div>
  );

  const modalContent = (
    <DialogContent
      onPointerDownOutside={e => e.preventDefault()}
      className={`flex max-w-[90vw] flex-col gap-0 overflow-hidden p-0 md:max-w-lg ${
        !hasCloseIcon && '[&>button]:hidden'
      } ${className}`}
    >
      <DialogHeader className={cn('p-4', hasTitleOrDescription ? '' : 'hidden')}>
        <DialogTitle className="mb-0">{title}</DialogTitle>
        <DialogDescription className={description ? '' : 'hidden'}>{description}</DialogDescription>
      </DialogHeader>
      {content}
      {hasButtons && (
        <DialogFooter className={cn('gap-2 p-4 sm:space-x-0', buttonsClassName)}>
          <ModalButtons
            buttons={buttons}
            hasCancelButton={hasCancelButton}
            showSubmit={showSubmit}
            handleClose={() => {
              handleOpenChange(false);
            }}
            isSubmitting={isSubmitting}
          />
        </DialogFooter>
      )}
    </DialogContent>
  );

  return (
    <Dialog open={internalIsOpen} onOpenChange={handleOpenChange} {...rest}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <FormNestedProvider
        onSubmit={handleSubmit}
        onError={handleError}
        onChange={data => {
          onChange?.(data['modal-form']);
        }}
      >
        {modalContent}
      </FormNestedProvider>
    </Dialog>
  );
};
