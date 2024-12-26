import { isValidUrl, validateMultipleUrls } from '@oe/core/utils/url';
import { useTranslations } from 'next-intl';
import type React from 'react';
import { Input } from '#shadcn/input';
import { Textarea } from '#shadcn/textarea';

export interface UrlInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  multiple?: boolean;
  error?: string;
  onValidate?: (isValid: boolean) => void;
  ref?: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
}

export const InputURL = ({ multiple = false, error, onValidate, onChange, ref, ...props }: UrlInputProps) => {
  const t = useTranslations('forms');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
    }

    if (onValidate) {
      const isValid = multiple ? validateMultipleUrls(e.target.value) : isValidUrl(e.target.value);
      onValidate(isValid);
    }
  };

  return (
    <div>
      {multiple ? (
        <Textarea
          ref={ref as React.RefObject<HTMLTextAreaElement>}
          placeholder="https://example1.com https://example2.com"
          onChange={handleChange}
          {...props}
        />
      ) : (
        <Input
          ref={ref as React.RefObject<HTMLInputElement>}
          placeholder="https://example.com"
          onChange={handleChange}
          {...props}
        />
      )}
      {error && <p className="mt-1 text-destructive text-sm">{t(error)}</p>}
    </div>
  );
};
