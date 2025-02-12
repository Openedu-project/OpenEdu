'use client';

import { useGetLevels } from '@oe/api/hooks/useCourse';
import { useGetOrganizationByDomain } from '@oe/api/hooks/useOrganization';
import { Autocomplete } from '@oe/ui/components/autocomplete';
import { useTranslations } from 'next-intl';
import { CourseFormField } from './form-field';

export function LevelField() {
  const tAICourse = useTranslations('courses.aiCourse');
  const { organizationByDomain } = useGetOrganizationByDomain();

  const { levels } = useGetLevels({
    type: 'level',
    org_id: organizationByDomain?.id ?? '',
    active: true,
    sort: `"order" asc`,
  });

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
