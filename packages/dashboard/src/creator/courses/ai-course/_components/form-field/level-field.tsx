'use client';
import { useCategoriesTree } from '@oe/api/hooks/useCategories';
import { useGetOrganizationByDomain } from '@oe/api/hooks/useOrganization';
import { Autocomplete } from '@oe/ui/components/autocomplete';
import { useTranslations } from 'next-intl';
import { CourseFormField } from './form-field';

export function LevelField() {
  const tAICourse = useTranslations('course.aiCourse');

  const { organizationByDomain } = useGetOrganizationByDomain();

  const { categoriesTree: levels } = useCategoriesTree(
    {
      type: 'level',
      active: true,
      sort: `"order" asc`,
    },
    undefined,
    !!organizationByDomain?.id
  );

  return (
    <CourseFormField name="level_id" label={tAICourse('courseLevel')}>
      <Autocomplete
        options={levels ?? []}
        getOptionLabel={val => (typeof val === 'string' ? levels?.find(level => level.id === val)?.name : val.name)}
        getOptionValue={level => level?.id ?? level}
        isGetCustomValue
      />
    </CourseFormField>
  );
}
