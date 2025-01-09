import type { TypeOf, z } from "@oe/api/utils/zod";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { DefaultValues, UseFormReturn } from "react-hook-form";
import {
  FormNestedProvider,
  FormNestedWrapper,
  type INestedFormsValues,
  SubmitFormsButton,
} from "#components/form-wrapper";
import { Button } from "#shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "#shadcn/dialog";
import { cn } from "#utils/cn";

type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

export interface ButtonConfig {
  label: string;
  onClick?: (handleClose?: () => void) => void;
  variant?: ButtonVariant;
  type?: "button" | "submit" | "reset";
}

// type FormSchema = z.ZodObject<Record<string, z.ZodTypeAny>>;

interface ModalProps<TSchema extends z.ZodType> {
  title: string;
  description?: string;
  trigger?: ReactNode;
  children?: ReactNode | ((form: UseFormReturn<z.infer<TSchema>>) => ReactNode);
  className?: string;

  open?: boolean;
  onClose?: () => void;
  hasCancelButton?: boolean;
  buttons?: ButtonConfig[];
  defaultValues?: DefaultValues<TypeOf<TSchema>> | undefined;
  showSubmit?: boolean;
  validationSchema?: TSchema;
  onSubmit?: (data: z.infer<TSchema>) => Promise<void>;
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
  const t = useTranslations("general");

  if (buttons && buttons.length > 0) {
    return (
      <div className="flex justify-end space-x-2">
        {buttons.map((button) =>
          button.type === "submit" ? (
            <SubmitFormsButton key={button.label} />
          ) : (
            <Button
              key={button.label}
              type={button.type ?? "button"}
              variant={button.variant ?? "default"}
              onClick={
                button.onClick
                  ? () => button.onClick?.(handleClose)
                  : button.type === "button"
                  ? handleClose
                  : undefined
              }
            >
              {button.label}
            </Button>
          )
        )}
      </div>
    );
  }

  return (
    <div className="flex justify-end space-x-2">
      {hasCancelButton && handleClose && (
        <Button type="button" variant="outline" onClick={handleClose}>
          {t("close")}
        </Button>
      )}
      {showSubmit && (
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t("submitting") : t("submit")}
        </Button>
      )}
    </div>
  );
};

export const Modal = <TSchema  extends z.ZodType>({
  title,
  description,
  trigger,
  children,
  open: externalIsOpen,
  className,
  hasCancelButton = true,
  buttons,
  validationSchema,
  showSubmit,
  defaultValues,
  onClose,
  onSubmit,
  ...rest
}: ModalProps<TSchema>) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isForm = !!validationSchema && !!onSubmit;

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
    await onSubmit?.(data["modal-form"]);
    handleOpenChange(false);
  };

  const hasTitleOrDescription = !!title || !!description;
  const hasButtons = !!buttons || !!hasCancelButton || !!showSubmit;

  const content = isForm ? (
    <FormNestedWrapper
      id="modal-form"
      schema={validationSchema}
      className={cn(
        "scrollbar px-4",
        hasTitleOrDescription && hasButtons ? "overflow-y-auto" : ""
      )}
      useFormProps={{ defaultValues }}
    >
      {({ form }) =>
        typeof children === "function" ? children(form) : children
      }
    </FormNestedWrapper>
  ) : (
    <div
      className={cn(
        "scrollbar px-4",
        hasTitleOrDescription && hasButtons ? "overflow-y-auto" : ""
      )}
    >
      {children as ReactNode}
    </div>
  );

  const modalContent = (
    <DialogContent
      onPointerDownOutside={(e) => e.preventDefault()}
      className={cn(
        "flex max-w-[90vw] flex-col overflow-hidden p-0 md:max-w-lg",
        className
      )}
    >
      <DialogHeader
        className={cn("p-4 pb-0", hasTitleOrDescription ? "" : "hidden")}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      {content}
      {hasButtons && (
        <DialogFooter className="p-4 pt-0">
          <ModalButtons
            buttons={buttons}
            hasCancelButton={hasCancelButton}
            showSubmit={showSubmit}
            handleClose={() => handleOpenChange(false)}
          />
        </DialogFooter>
      )}
    </DialogContent>
  );

  return (
    <Dialog open={internalIsOpen} onOpenChange={handleOpenChange} {...rest}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <FormNestedProvider onSubmit={handleSubmit}>
        {modalContent}
      </FormNestedProvider>
    </Dialog>
  );
};
