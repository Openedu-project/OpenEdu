'use client';
import { useCategoriesTree } from '@oe/api/hooks/useCategories';
import { useGetOrganizationByDomain } from '@oe/api/hooks/useOrganization';
import type { IBlogFormType } from '@oe/api/schemas/blogSchema';
import type { ICategoryTree } from '@oe/api/types/categories';
import { SelectTree } from '@oe/ui/components/select-tree';
import { FormFieldWithLabel } from '@oe/ui/shadcn/form';

export default function Category() {
  const { organizationByDomain } = useGetOrganizationByDomain();
  const { categoriesTree } = useCategoriesTree({
    org_id: organizationByDomain?.id ?? '',
  });
  return (
    <FormFieldWithLabel
      name="categories"
      data-field="categories"
      label={
        <div className="flex flex-col gap-1">
          <span className="font-medium text-lg">
            Category <span className="text-red-500">*</span>
          </span>
          <span className="text-muted-foreground text-xs">The category is used to categorize the course.</span>
        </div>
      }
      className="rounded-lg bg-background p-4 shadow-sm"
      labelClassName="mb-4 text-lg"
    >
      <SelectTree<ICategoryTree, NonNullable<IBlogFormType['category_ids']>[number]>
        data={categoriesTree ?? []}
        placeholder="Select category"
        searchPlaceholder="Search category"
        getLabel={node => node.name}
        getValue={node => ({ id: node.id, name: node.name })}
        checkable
      />
    </FormFieldWithLabel>
  );
}
