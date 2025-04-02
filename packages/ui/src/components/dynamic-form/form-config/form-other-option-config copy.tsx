import { useTranslations } from "next-intl";
import { Switch } from "#shadcn/switch";
import type { FormFieldType } from "../types";
import { FormFieldWrapper } from "./form-field-wrapper";

export default function FormOtherOptionConfig({
  field,
  handleConfigChange,
}: {
  field: FormFieldType;
  handleConfigChange: (key: keyof FormFieldType, value: boolean) => void;
}) {
  const tDynamicForms = useTranslations("dynamicForms.fieldConfig");
  return (
    <FormFieldWrapper label={tDynamicForms("otherOption")}>
      <Switch
        checked={field?.otherOption ?? false}
        onCheckedChange={(checked) =>
          handleConfigChange("otherOption", checked)
        }
      />
    </FormFieldWrapper>
  );
}
