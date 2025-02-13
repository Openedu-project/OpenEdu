'use client';

import { useCategoriesTree } from '@oe/api/hooks/useCategories';
import { bulkDeleteCategoryService, createUpdateCategoriesTreeService } from '@oe/api/services/categories';
import type { ICategoryBulkUpsert, ICategoryTree } from '@oe/api/types/categories';
import { Tree } from '@oe/ui/components/tree';
import { toast } from '@oe/ui/shadcn/sonner';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export function SetupCategoryTree({ type }: { type: 'blog' | 'course' }) {
  const tCategories = useTranslations('setupCategoryTree');
  const [items, setItems] = useState<ICategoryTree[]>([]);

  const { categoriesTree, categoriesTreeMutate } = useCategoriesTree({
    type,
    active: true,
  });

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
        type,
        order: index + 1,
        child: item.child?.map((child, childIndex) => mapCategoryToTree(child, childIndex)) || [],
      });

      const categories: ICategoryTree[] = items.map((category, index) => mapCategoryToTree(category, index));
      const payload: ICategoryBulkUpsert = { categories };
      await createUpdateCategoriesTreeService(payload);
      await categoriesTreeMutate();
      toast.success(tCategories('saved'));
    } catch (error) {
      console.error(error);
      toast.error(tCategories('saveError'));
    }
  };

  const handleDelete = async (item: ICategoryTree, descendants: ICategoryTree[]) => {
    try {
      if (typeof item.id === 'string') {
        const ids = [item.id, ...(descendants.map(descendant => descendant.id).filter(Boolean) as string[])];
        await bulkDeleteCategoryService(ids);
        await categoriesTreeMutate();
        toast.success(tCategories('deleted'));
      }
    } catch (error) {
      console.error(error);
      toast.error(tCategories('deleteError'));
    }
  };

  return (
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
      deleteTitle={tCategories('deleteModalTitle')}
      deleteDescription={tCategories('deleteModalDescription')}
      labelKey="name"
      defaultItem={
        {
          name: tCategories('newCategory'),
          id: '',
          type,
          order: 0,
          child: [],
        } as ICategoryTree
      }
      addParentButtonLabel={tCategories('addCategory')}
      saveButtonLabel={tCategories('save')}
      onSave={handleSave}
      onDelete={handleDelete}
      className="scrollbar h-full flex-col overflow-auto"
    />
  );
}
