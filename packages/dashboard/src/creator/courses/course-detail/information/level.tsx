'use client';
import { useGetLevels } from '@oe/api/hooks/useCourse';
import { useGetOrganizationByDomain } from '@oe/api/hooks/useOrganization';
import type { ICourseCategory } from '@oe/api/types/course/category';
import { AutocompeteMultiple } from '@oe/ui/components/autocomplete';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { useTranslations } from 'next-intl';

export default function Category() {
  const tCourse = useTranslations('course');
  const { organizationByDomain } = useGetOrganizationByDomain();
  const { levels } = useGetLevels({
    type: 'level',
    active: true,
    org_id: organizationByDomain?.id ?? '',
  });
  return (
    <FormFieldWithLabel
      name="levels"
      data-field="levels"
      label={
        <div className="flex flex-col gap-1">
          <span className="font-medium text-lg">
            {tCourse('information.sections.level.title')}
            {/* <span className="text-red-500">*</span> */}
          </span>
          <span className="text-muted-foreground text-xs">{tCourse('information.sections.level.subtitle')}</span>
        </div>
      }
      className="rounded-lg bg-background p-4 shadow-sm"
      labelClassName="mb-4 text-lg"
    >
      <AutocompeteMultiple<ICourseCategory>
        options={levels ?? []}
        placeholder={tCourse('information.sections.level.placeholder')}
        getOptionLabel={option => option.name}
        getOptionValue={option => option.id}
      />
    </FormFieldWithLabel>
  );
}
