'use client';
import { useCategoriesTree } from '@oe/api/hooks/useCategories';
import { useGetOrganizationByDomain } from '@oe/api/hooks/useOrganization';
import type { IBlogFormType } from '@oe/api/schemas/blogSchema';
import type { ICategoryTree } from '@oe/api/types/categories';
import { SelectTree } from '@oe/ui/components/select-tree';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';
import { useTranslations } from 'next-intl';

export default function Category() {
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
      className="rounded-lg bg-background p-4 shadow-sm"
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
