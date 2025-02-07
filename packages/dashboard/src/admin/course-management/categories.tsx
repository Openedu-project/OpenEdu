'use client';

import { useCategoriesTree } from '@oe/api/hooks/useCategories';
import { bulkDeleteCategoryService, createUpdateCategoriesTreeService } from '@oe/api/services/categories';
import type { ICategoryBulkUpsert, ICategoryTree } from '@oe/api/types/categories';
import { DashboardMainPageLayout } from '@oe/ui/common/layout';
import { Tree } from '@oe/ui/components/tree';
import { toast } from '@oe/ui/shadcn/sonner';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function CourseCategories() {
  const tDashboard = useTranslations('dashboard.courses');
  const tCourses = useTranslations('courses');
  const [items, setItems] = useState<ICategoryTree[]>([]);
  // const [selectedItems, setSelectedItems] = useState<TreeItem[]>([]);

  const { categoriesTree, categoriesTreeMutate } = useCategoriesTree({ type: 'course', active: true });

  useEffect(() => {
    if (categoriesTree) {
      setItems(categoriesTree);
    }
  }, [categoriesTree]);

  const handleSave = async (items: ICategoryTree[]) => {
    try {
      const mapCategoryToTree = (item: ICategoryTree, index: number): ICategoryTree => ({
        id: typeof item.id === 'string' ? item.id : '',
        name: item.name,
        type: 'course',
        order: index + 1,
        child: item.child?.map((child, childIndex) => mapCategoryToTree(child, childIndex)) || [],
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

  const handleDelete = async (item: ICategoryTree, descendants: ICategoryTree[]) => {
    try {
      if (typeof item.id === 'string') {
        const ids = [item.id, ...(descendants.map(descendant => descendant.id).filter(Boolean) as string[])];
        await bulkDeleteCategoryService(ids);
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
      <DashboardMainPageLayout
        breadcrumbs={[
          { label: tDashboard('courseManagement'), disabled: true },
          { label: tDashboard('courseCategories') },
        ]}
        dashboard="admin"
        title={tCourses('categories.title')}
        mainClassName="overflow-hidden"
      >
        <Tree<ICategoryTree>
          data={items}
          dataConfig={{
            idProp: 'id',
            childrenProp: 'child',
            type: 'tree',
          }}
          addable
          editable
          dragable
          deleteable
          searchable
          collapsible
          deleteTitle={tCourses('categories.deleteModalTitle')}
          deleteDescription={tCourses('categories.deleteModalDescription')}
          labelKey="name"
          defaultItem={
            { name: tCourses('categories.newCategory'), id: '', type: 'course', order: 0, child: [] } as ICategoryTree
          }
          addParentButtonLabel={tCourses('categories.addCategory')}
          saveButtonLabel={tCourses('categories.save')}
          onSave={handleSave}
          onDelete={handleDelete}
          className="scrollbar h-full flex-col overflow-auto"
        />
      </DashboardMainPageLayout>
    </>
  );
}
