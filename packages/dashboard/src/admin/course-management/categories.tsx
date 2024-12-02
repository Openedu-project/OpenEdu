'use client';

import { useCategoriesTree } from '@oe/api/hooks/categories';
import { bulkDeleteCategoryService, createUpdateCategoriesTreeService } from '@oe/api/services/categories';
import type { ICategoryBulkUpsert, ICategoryTree } from '@oe/api/types/categories';
import { DashboardHeaderCard } from '@oe/ui/common/layout/dashboard-layout';
import { Tree, type TreeItems } from '@oe/ui/components/sortable-tree';
import { toast } from '@oe/ui/shadcn/sonner';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function CourseCategories() {
  const tDashboard = useTranslations('dashboard.courses');
  const tCourses = useTranslations('courses');
  const [items, setItems] = useState<TreeItems>([]);
  // const [selectedItems, setSelectedItems] = useState<TreeItem[]>([]);

  const { categoriesTree, categoriesTreeMutate } = useCategoriesTree({ type: 'course', active: true });

  useEffect(() => {
    if (categoriesTree) {
      const mapCategory = (category: ICategoryTree): TreeItems[number] => ({
        ...category,
        id: category.id ?? '',
        title: category.name,
        children: category.child?.map(mapCategory) || [],
      });

      const mappedItems: TreeItems = categoriesTree.map(mapCategory);
      setItems(mappedItems);
    }
  }, [categoriesTree]);

  const handleSave = async () => {
    try {
      const mapCategoryToTree = (item: TreeItems[number], index: number): ICategoryTree => ({
        id: typeof item.id === 'string' ? item.id : '',
        name: item.title,
        type: 'course',
        order: index + 1,
        child: item.children?.map((child, childIndex) => mapCategoryToTree(child, childIndex)) || [],
      });

      const categories: ICategoryTree[] = items.map((category, index) => mapCategoryToTree(category, index));
      const payload: ICategoryBulkUpsert = { categories };
      await createUpdateCategoriesTreeService(payload);
      await categoriesTreeMutate();
      toast.success(tCourses('categories.saved'));
    } catch (error) {
      console.error(error);
      toast.error(tCourses('categories.saveError'));
    }
  };

  const handleDelete = async (id: number | string) => {
    try {
      if (typeof id === 'string') {
        await bulkDeleteCategoryService([id]);
        await categoriesTreeMutate();
        toast.success(tCourses('categories.deleted'));
      }
    } catch (error) {
      console.error(error);
      toast.error(tCourses('categories.deleteError'));
    }
  };

  return (
    <>
      <DashboardHeaderCard
        breadcrumbs={[
          { label: tDashboard('courseManagement'), disabled: true },
          { label: tDashboard('courseCategories') },
        ]}
        dashboard="admin"
      >
        <h1 className="mb-4 text-2xl">{tCourses('categories.title')}</h1>
      </DashboardHeaderCard>
      <div className="rounded bg-background p-4">
        {/* <AutocompleteTree options={items} />
        <AutocompleteTreeMultiple options={items} value={selectedItems} onChange={setSelectedItems} /> */}
        <Tree
          items={items}
          addable
          editable
          dragable
          removable
          searchable
          collapsible
          onChange={setItems}
          deleteModalTitle={tCourses('categories.deleteModalTitle')}
          deleteModalDescription={tCourses('categories.deleteModalDescription')}
          newParentDefaultLabel={tCourses('categories.newCategory')}
          newItemDefaultLabel={tCourses('categories.newCategory')}
          addParentButtonLabel={tCourses('categories.addCategory')}
          saveButtonLabel={tCourses('categories.save')}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      </div>
    </>
  );
}
