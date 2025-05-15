import { getI18nConfig } from "@oe/api";
import { type LanguageCode, languages } from "@oe/i18n";
import { Autocomplete } from "#components/autocomplete";
import type { ButtonProps } from "#shadcn/button";

interface ISelectLanguageProps {
  value?: LanguageCode;
  onChange?: (opt: LanguageCode | null) => void;
  triggerProps?: ButtonProps;
}
export async function SelectLanguage({
  value,
  onChange,
  triggerProps,
}: ISelectLanguageProps) {
  const i18nConfig = await getI18nConfig();

  return (
    <Autocomplete
      options={i18nConfig?.locales ?? []}
      getOptionLabel={(locale) => languages[locale]}
      getOptionValue={(locale) => locale}
      triggerProps={triggerProps ?? { disabled: true }}
      value={value}
      onChange={onChange}
    />
  );
}
