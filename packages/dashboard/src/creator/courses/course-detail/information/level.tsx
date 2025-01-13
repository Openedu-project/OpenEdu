'use client';
import { useGetLevels } from '@oe/api/hooks/useCourse';
import { useGetOrganizationByDomain } from '@oe/api/hooks/useOrganization';
import { AutocompeteMultiple } from '@oe/ui/components/autocomplete';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';

export default function Category() {
  const { organizationByDomain } = useGetOrganizationByDomain();
  const { levels } = useGetLevels({
    type: 'level',
    active: true,
    org_id: organizationByDomain?.id ?? '',
  });
  return (
    <FormFieldWithLabel
      name="level"
      label={
        <div className="flex flex-col gap-1">
          <span className="font-medium text-lg">Level</span>
          <span className="text-muted-foreground text-xs">The level is used to categorize the course.</span>
        </div>
      }
      className="rounded-lg bg-background p-4 shadow-sm"
      labelClassName="mb-4 text-lg"
    >
      <AutocompeteMultiple
        options={(levels ?? []).map(level => ({
          label: level.name,
          value: level.id,
        }))}
        placeholder="Select level"
      />
    </FormFieldWithLabel>
  );
}
