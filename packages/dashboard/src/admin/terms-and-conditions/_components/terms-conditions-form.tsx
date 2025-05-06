'use client';

import {
  type ISystemConfigKey,
  type ISystemConfigPayload,
  type ISystemConfigRes,
  createSystemConfig,
  updateSystemConfig,
  useGetOrganizationByDomain,
  useSystemConfig,
} from '@oe/api';
import { getCookieClient } from '@oe/core';
import { DEFAULT_LOCALES, type LanguageCode, languages } from '@oe/i18n';
import { Button, FormFieldWithLabel, FormWrapper, RichTextEditor, Selectbox } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  locale: z.string(),
  content: z.record(z.string(), z.string().optional()),
});

export type TTermsAndConditions = z.infer<typeof formSchema>;

export function TermsConditionsForm({
  pageKey,
}: {
  pageKey: ISystemConfigKey;
}) {
  const tCommonAction = useTranslations('general');
  const locale = getCookieClient(process.env.NEXT_PUBLIC_COOKIE_LOCALE_KEY) ?? 'en';
  const localesCookie = getCookieClient(process.env.NEXT_PUBLIC_COOKIE_LOCALES_KEY);
  const locales = localesCookie ? JSON.parse(localesCookie as string) : DEFAULT_LOCALES;

  const [res, setRes] = useState<ISystemConfigRes<Record<string, string | undefined>> | null>(null);
  const [defaultValues, setDefaultValues] = useState<TTermsAndConditions>({
    locale,
    content: {},
  });
  const [currentLanguage, setCurrentLanguage] = useState(locale);
  const [editorContent, setEditorContent] = useState('');

  const { organizationByDomain } = useGetOrganizationByDomain();
  const { systemConfig, systemConfigMutate } = useSystemConfig<Record<string, string | undefined>>({
    key: pageKey,
  });

  useEffect(() => {
    if (systemConfig?.[0]) {
      const data = systemConfig?.[0];

      setRes(data);
      const content = data.value ?? {};

      setEditorContent(content[currentLanguage] ?? '');
      setDefaultValues({ content, locale });
    }
  }, [systemConfig, currentLanguage]);

  if (locales?.length === 0) {
    return null;
  }

  const LANGUAGE_OPTIONS = locales.map((locale: LanguageCode) => ({
    id: locale,
    value: locale,
    label: languages[locale],
  }));

  const handleSubmit = async (values: TTermsAndConditions) => {
    try {
      const updatedContent = {
        ...values?.content,
        [currentLanguage]: values.content[currentLanguage] || '',
      };

      const payload: ISystemConfigPayload<Record<string, string | undefined>> = {
        key: pageKey,
        org_id: organizationByDomain?.id ?? '',
        value: updatedContent,
      };

      await (res
        ? updateSystemConfig(undefined, { id: res?.id, payload })
        : createSystemConfig(undefined, { payload }));

      await systemConfigMutate();

      toast.success('Update successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <FormWrapper
      id="terms-conditions-form"
      schema={formSchema}
      onSubmit={handleSubmit}
      useFormProps={{ defaultValues }}
      className="flex flex-col"
    >
      {({ loading, setValue }) => {
        return (
          <>
            <FormFieldWithLabel label="Language" name="locale">
              <Selectbox
                options={LANGUAGE_OPTIONS}
                value={currentLanguage}
                onChange={value => {
                  setCurrentLanguage(value);
                }}
              />
            </FormFieldWithLabel>
            <RichTextEditor
              value={editorContent}
              onChange={value => {
                setEditorContent(value);
                setValue(`content.${currentLanguage}`, value);
              }}
            />
            <Button type="submit" loading={loading} className="ml-auto w-fit">
              {tCommonAction('save')}
            </Button>
          </>
        );
      }}
    </FormWrapper>
  );
}
