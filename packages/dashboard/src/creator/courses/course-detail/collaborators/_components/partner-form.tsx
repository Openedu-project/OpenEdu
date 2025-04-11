import { useSearchPartnersByEmail } from '@oe/api';
import type { TCourseRoles } from '@oe/api';
import type { IAddPartnerSchema } from '@oe/api';
import { Button } from '@oe/ui';
import { Autocomplete } from '@oe/ui';
import { FormFieldWithLabel } from '@oe/ui';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@oe/ui';
import { Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useRef, useState } from 'react';
import { type UseFormReturn, useFieldArray } from 'react-hook-form';

export function PartnerForm({
  form,
  type,
}: {
  form: UseFormReturn<IAddPartnerSchema>;
  type: 'add' | 'edit' | null;
}) {
  const t = useTranslations('course');
  const tGeneral = useTranslations('general');
  const [searchEmail, setSearchEmail] = useState(type === 'edit' ? form.getValues('partners.0.email') : '');
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Debounce function for search
  const debouncedSearch = (value: string) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      setSearchEmail(value);
    }, 500); // 500ms debounce time
  };

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'partners',
  });

  // TODO: merge the current partners and the "filteredPartnersData by email" => can not choose the email that existed the table
  const { filteredPartnersData } = useSearchPartnersByEmail(!!searchEmail, {
    page: 1,
    per_page: 999,
    role_id: 'partner',
    sort: 'create_at desc',
    search_categories: 'email',
    search_term: searchEmail,
  });

  const ROLE_OPTIONS: { value: TCourseRoles; label: string }[] = useMemo(
    () => [
      // { value: 'owner', label: t('partner.owner') }, // Can not set role owner
      { value: 'co-creator', label: t('partner.coCreator') },
      { value: 'mentor', label: t('partner.mentor') },
      { value: 'supervisor', label: t('partner.supervisor') },
      // { value: "sponsor", label: t("partner.sponsor") },
    ],
    [t]
  );

  const email = useMemo(() => form.watch('partners.0.email'), [form.watch]);
  const id = useMemo(() => filteredPartnersData?.find(v => v.email === email)?.id ?? '', [filteredPartnersData, email]);

  useEffect(() => {
    if (type === 'edit') {
      form.setValue('partners.0.id', id);
    }
  });

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="flex flex-col gap-2 rounded-md border p-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm">{t('partner.partnerInfo', { index: index + 1 })}</h3>
            {fields.length > 1 && (
              <Button type="button" variant="destructive" onClick={() => remove(index)} className="h-8 gap-2">
                <Trash2 className="h-4 w-4" />
                {tGeneral('delete')}
              </Button>
            )}
          </div>

          <FormFieldWithLabel
            name={`partners.${index}.email`}
            label={t('partner.email')}
            required
            render={({ field }) => {
              return (
                <Autocomplete<string>
                  options={filteredPartnersData?.map(v => v.email).filter(email => email != null) ?? []}
                  showSearch={type === 'add'}
                  value={field.value}
                  onChange={email => {
                    if (type === 'edit') {
                      return;
                    }
                    if (email) {
                      field.onChange(email);
                      form.setValue(
                        `partners.${index}.id`,
                        filteredPartnersData?.find(v => v.email === email)?.id ?? ''
                      );
                    }
                  }}
                  onSearch={v => {
                    debouncedSearch(v);
                  }}
                />
              );
            }}
          />

          <FormFieldWithLabel
            name={`partners.${index}.roles`}
            label={t('partner.role')}
            required
            render={({ field }) => (
              <Select
                value={field.value?.[0]}
                onValueChange={value => {
                  field.onChange([value]);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('partner.selectRoles')} />
                </SelectTrigger>
                <SelectContent>
                  {ROLE_OPTIONS.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      ))}
      {type === 'add' && (
        <Button
          type="button"
          variant="outline"
          onClick={() => append({ id: '', roles: [], enable: true })}
          className="w-full border-primary text-primary hover:border-primary/80 hover:text-primary/80"
        >
          {t('partner.addAnother')}
        </Button>
      )}
    </div>
  );
}
