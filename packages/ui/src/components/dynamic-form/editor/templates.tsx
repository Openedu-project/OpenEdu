import { useTranslations } from 'next-intl';
import { Combobox } from '#components/combobox';

export function Templates() {
  const tTemplates = useTranslations('dynamicForms.templates');
  return (
    <div className="flex min-w-40 flex-1 flex-col gap-2 md:mb-4">
      <p className="font-medium text-sm">{tTemplates('title')}</p>
      <Combobox
        placeholder={tTemplates('placeholder')}
        searchPlaceholder={tTemplates('searchPlaceholder')}
        options={[
          { value: '1', label: 'Template 1' },
          { value: '2', label: 'Template 2' },
        ]}
      />
    </div>
  );
}
