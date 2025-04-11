'use client';
import { useGetOrganizationByDomain } from '@oe/api';
import { useCategoriesTree } from '@oe/api';
import type { ICourseCategory } from '@oe/api';
import { AutocompeteMultiple } from '@oe/ui';
import { FormFieldWithLabel } from '@oe/ui';
import { useTranslations } from 'next-intl';

export function Level() {
  const tCourse = useTranslations('course');
  const { organizationByDomain } = useGetOrganizationByDomain();

  const { categoriesTree: levels } = useCategoriesTree(
    {
      type: 'level',
      org_id: organizationByDomain?.id ?? '',
    },
    undefined,
    !!organizationByDomain?.id
  );

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
      className="rounded-lg bg-background p-4 shadow-xs"
      labelClassName="mb-4 text-lg"
    >
      <AutocompeteMultiple<ICourseCategory>
        options={(levels ?? []) as ICourseCategory[]}
        placeholder={tCourse('information.sections.level.placeholder')}
        getOptionLabel={option => option.name}
        getOptionValue={option => option.id}
      />
    </FormFieldWithLabel>
  );
}
