import { TONE } from '@oe/core/utils/constants';
import { type LanguageCode, languages } from '@oe/i18n/languages';
import { useTranslations } from 'next-intl';
import type React from 'react';
import { type Dispatch, type SetStateAction, useState } from 'react';
import { Autocomplete } from '#components/autocomplete';
import { InputURL } from '#components/input-url';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#shadcn/select';
import { cn } from '#utils/cn';

export interface IURLGenerator {
  locale: string;
  urls: string;
  tone: (typeof TONE)[number];
}
interface UrlGeneratorProps {
  multiple?: boolean;
  error?: string;
  ref?: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
  value?: IURLGenerator;
  onChange: Dispatch<SetStateAction<IURLGenerator>>;
  locales?: LanguageCode[];
}

export const defaultURLValue = { urls: '', locale: 'en', tone: 'normal' };

export const URLGenerator = ({ multiple = false, onChange, value, locales = ['en'] }: UrlGeneratorProps) => {
  const t = useTranslations('formValidation');
  const tGeneral = useTranslations('general');
  const [isValid, setIsValid] = useState(true);

  return (
    <div className="flex flex-col gap-4">
      <InputURL
        multiple={multiple}
        onValidate={setIsValid}
        value={value?.urls}
        onChange={e => onChange(prev => ({ ...prev, urls: e.target.value }))}
      />

      <div>
        <p className="mcaption-medium14 mb-2">{tGeneral('language')}</p>

        <Autocomplete
          options={locales}
          getOptionLabel={locale => languages[locale as LanguageCode]}
          getOptionValue={locale => locale}
          value={value?.locale}
          onChange={value => onChange(prev => ({ ...prev, locale: value ?? 'en' }))}
        />
      </div>

      <div>
        <p className="mcaption-medium14 mb-2">{tGeneral('tone')}</p>
        <Select onValueChange={tone => onChange(prev => ({ ...prev, tone }))} defaultValue="normal" value={value?.tone}>
          <SelectTrigger>
            <SelectValue placeholder="Select tone" />
          </SelectTrigger>
          <SelectContent>
            {TONE.map(tone => (
              <SelectItem key={tone} value={tone}>
                {tGeneral(`toneValue.${tone}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <p className={cn('mt-1 text-right text-sm', !isValid && 'text-destructive')}>{t('urlNote')}</p>
    </div>
  );
};
