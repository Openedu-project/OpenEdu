import type { IFormQuestion, IFormResponse } from "@oe/api/types/form";
import type { z } from "@oe/api/utils/zod";
import { useTranslations } from "next-intl";
import { type MouseEvent, Suspense } from "react";
import { type ButtonConfig, Modal, type ModalProps } from "#components/modal";

import type { MultipleChoiceGridOption } from "#components/multiple-choice-grid";
import { FormFieldWithLabel } from "#shadcn/form";
import { Skeleton } from "#shadcn/skeleton";
import { cn } from "#utils/cn";
import { componentWithoutLabel } from "../constants";
import { formComponents } from "../form-components";
import { MultipleChoiceGridFormField } from "../form-components/multiple-choice-grid/multiple-choice-grid-form-field";
import type { FormFieldType } from "../types";
import { convertFormValueToAnswers, generateZodSchema } from "../utils";

export function FormRendererSlideModal({
  formData,
  onSubmit,
  ...props
}: // biome-ignore lint/suspicious/noExplicitAny: <explanation>
Partial<ModalProps<any>> & { formData?: IFormResponse }) {
  const tGeneral = useTranslations("general");

  const fields =
    formData?.questions
      ?.map((question) => {
        return {
          ...question?.settings?.props,
          columns: question?.options,
          rows: question?.sub_questions?.map((row) => ({
            ...row,
            text: row.title,
          })),
        } as FormFieldType;
      })
      .filter(Boolean) ?? [];
  console.log("fields", fields);
  const formSchema = generateZodSchema(fields);

  const fieldsWithoutSubmitButton = fields.filter(
    (field) => field?.fieldType !== "submitButton"
  );
  const submitButton = fields.find(
    (field) => field.fieldType === "submitButton"
  );

  const handleSubmit = (values: z.infer<z.ZodType>) => {
    const answers = convertFormValueToAnswers(
      values,
      formData?.questions as IFormQuestion[]
    );

    // if (isRegisterOrg) {
    //   try {
    //     const res = await triggerValidateForm(
    //       getDomainValidatedKeys(formData, convertValue)
    //     );

    //     if (res?.data) {
    //       onSubmit?.(convertValue);
    //     }
    //   } catch (error) {
    //     console.error("error", error);
    //   }
    // } else {
    onSubmit?.(answers);
    // }
  };

  return (
    <Modal
      {...props}
      title=""
      description=""
      validationSchema={formSchema}
      onSubmit={handleSubmit}
      formClassName="overflow-y-auto"
      buttons={
        [
          props?.hasCancelButton && {
            label: tGeneral("cancel"),
            variant: "outline",
            type: "button",
            onClick: (onClose: (e?: MouseEvent<HTMLButtonElement>) => void) =>
              onClose?.(),
          },
          submitButton && {
            label: submitButton.label,
            type: "submit",
          },
        ].filter(Boolean) as ButtonConfig[]
      }
    >
      {fieldsWithoutSubmitButton.map((field) => {
        const { fieldType, fieldId, ...rest } = field;
        const Component = formComponents[fieldType]?.component;

        if (!Component) {
          return null;
        }

        return (
          <Suspense
            key={fieldId}
            fallback={<Skeleton className="h-10 w-full" />}
          >
            {componentWithoutLabel.includes(fieldType) ? (
              <div className="p-2">
                <Component {...rest} text={rest.label} />
              </div>
            ) : (
              <div className={cn(fieldType === "checkbox" && "p-2")}>
                {fieldType === "multipleChoiceGrid" ? (
                  <MultipleChoiceGridFormField
                    name={rest.name}
                    label={rest.label}
                    required={rest.required}
                    description={rest.description}
                    className={cn("flex-1 p-2", rest.border && "border p-4")}
                    rows={rest?.rows as MultipleChoiceGridOption[]}
                    columns={rest?.columns as MultipleChoiceGridOption[]}
                  />
                ) : (
                  <FormFieldWithLabel
                    name={rest.name}
                    label={rest.label}
                    infoText={rest.infoText}
                    required={rest.required}
                    description={rest.description}
                    className={cn("flex-1 p-2", rest.border && "border p-4")}
                    isToggleField={
                      fieldType === "checkbox" || fieldType === "switch"
                    }
                    render={({ field }) => (
                      <Component
                        {...("min" in rest && { min: rest.min })}
                        {...("max" in rest && { max: rest.max })}
                        {...("placeholder" in rest && {
                          placeholder: rest.placeholder,
                        })}
                        {...("text" in rest && { text: rest.text })}
                        {...(rest.disabled && { disabled: rest.disabled })}
                        {...(fieldType === "selectbox" && {
                          options: rest.options,
                        })}
                        {...(fieldType === "multipleSelection" && {
                          options: rest.options,
                        })}
                        {...((fieldType === "checkbox" ||
                          fieldType === "switch") && {
                          checked: field.value,
                          onCheckedChange: field.onChange,
                        })}
                      />
                    )}
                  />
                )}
              </div>
            )}
          </Suspense>
        );
      })}
    </Modal>
  );
}
