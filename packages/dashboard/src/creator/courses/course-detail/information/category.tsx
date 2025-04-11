'use client';
import { useGetOrganizationByDomain } from '@oe/api';
import { useCategoriesTree } from '@oe/api';
import type { IBlogFormType } from '@oe/api';
import type { ICategoryTree } from '@oe/api';
import { SelectTree } from '@oe/ui';
import { FormFieldWithLabel } from '@oe/ui';
import { useTranslations } from 'next-intl';

export function Category() {
  const tCourse = useTranslations('course');
  const { organizationByDomain } = useGetOrganizationByDomain();
  const { categoriesTree } = useCategoriesTree({
    type: 'course',
    org_id: organizationByDomain?.id ?? '',
  });
  return (
    <FormFieldWithLabel
      name="categories"
      data-field="categories"
      label={
        <div className="flex flex-col gap-1">
          <span className="font-medium text-lg">
            {tCourse('information.sections.category.title')}
            {/* <span className="text-red-500">*</span> */}
          </span>
          <span className="text-muted-foreground text-xs">{tCourse('information.sections.category.subtitle')}</span>
        </div>
      }
      className="rounded-lg bg-background p-4 shadow-xs"
      labelClassName="mb-4 text-lg"
    >
      <SelectTree<ICategoryTree, NonNullable<IBlogFormType['category_ids']>[number]>
        data={categoriesTree ?? []}
        placeholder={tCourse('information.sections.category.placeholder')}
        searchPlaceholder={tCourse('information.sections.category.searchPlaceholder')}
        getLabel={node => node.name}
        getValue={node => ({ id: node.id, name: node.name })}
        checkable
      />
    </FormFieldWithLabel>
  );
}
