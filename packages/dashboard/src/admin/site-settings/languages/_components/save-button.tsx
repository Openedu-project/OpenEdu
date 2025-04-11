'use client';
import { toast } from '@oe/ui';
import { Button } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useLanguageStore } from '../_store/useLanguageStore';
import { handleSaveI18nConfig } from '../_utils';

export function SaveButton() {
  const tLanguages = useTranslations('languages');
  const tGeneral = useTranslations('general');
  const { locales, locale, id, files, languageStats, setId } = useLanguageStore();
  const [isLoading, setIsLoading] = useState(false);
  // const { mutate } = useSWRConfig();

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await handleSaveI18nConfig({
        locales,
        locale,
        languageStats,
        id,
        files,
        setId,
      });
      // mutate(createSystemConfigSWRKey({ key: systemConfigKeys.i18nConfig }));
      toast.success(tLanguages('saveSuccess'));
    } catch {
      toast.error(tLanguages('saveError'));
    }
    setIsLoading(false);
  };

  return (
    <Button onClick={handleSave} className="mt-4" loading={isLoading}>
      {tGeneral('save')}
    </Button>
  );
}
