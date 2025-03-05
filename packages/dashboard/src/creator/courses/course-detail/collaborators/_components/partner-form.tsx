import type { IAddPartnerSchema } from '@oe/api/schemas/courses/partners';
import type { TCourseRoles } from '@oe/api/types/course/basic';
import { Badge } from '@oe/ui/shadcn/badge';
import { Button } from '@oe/ui/shadcn/button';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { Input } from '@oe/ui/shadcn/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@oe/ui/shadcn/select';
import { Trash2, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { type UseFormReturn, useFieldArray } from 'react-hook-form';

export function PartnerForm({
  form,
}: {
  form: UseFormReturn<IAddPartnerSchema>;
}) {
  const t = useTranslations('course');
  const tGeneral = useTranslations('general');

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'partners',
  });

  const ROLE_OPTIONS: { value: TCourseRoles; label: string }[] = useMemo(
    () => [
      { value: 'owner', label: t('partner.owner') },
      { value: 'co-creator', label: t('partner.coCreator') },
      { value: 'mentor', label: t('partner.mentor') },
      { value: 'supervisor', label: t('partner.supervisor') },
      // { value: "sponsor", label: t("partner.sponsor") },
    ],
    [t]
  );

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
            render={({ field }) => <Input {...field} placeholder={t('partner.enterEmail')} />}
          />

          <FormFieldWithLabel
            name={`partners.${index}.roles`}
            label={t('partner.roles')}
            required
            render={({ field }) => (
              <Select
                onValueChange={value => {
                  const currentValues = field.value || [];
                  if (currentValues.includes(value)) {
                    return;
                  }
                  field.onChange([...currentValues, value]);
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

          {/* Hiển thị các roles đã chọn */}
          <div className="flex flex-wrap gap-1">
            {form.watch(`partners.${index}.role`)?.map(role => (
              <Badge key={role} variant="secondary" className="flex items-center gap-1">
                {role}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-4 p-0"
                  onClick={() => {
                    const currentValues = form.getValues(`partners.${index}.role`) || [];
                    form.setValue(
                      `partners.${index}.role`,
                      currentValues.filter(r => r !== role)
                    );
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() => append({ email: '', role: [], enable: true })}
        className="w-full border-primary text-primary hover:border-primary/80 hover:text-primary/80"
      >
        {t('partner.addAnother')}
      </Button>
    </div>
  );
}
