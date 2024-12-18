import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CheckboxTree, type ITreeCheckedData, type ITreeNode } from '#components/checkbox-tree';

interface CategorySelectionProps<T> {
  className?: string;
  classNameTitle?: string;
  iconSize?: number;
  title?: string;
  categories: ITreeNode[];
  initialCategories?: T[];
  onCategoriesChange: (categories: ITreeCheckedItem[]) => void;
  searchPlaceholder?: string;
}

interface ITreeCheckedItem {
  id: string;
  name: string;
}

type CategoryStateType = 'checked' | 'indeterminate' | 'unchecked' | undefined;

const CategoryState: Record<string, CategoryStateType> = {
  CHECKED: 'checked',
  INDETERMINATE: 'indeterminate',
  UNCHECKED: 'unchecked',
};

export function CategorySelection<T extends { id: string }>({
  className,
  categories,
  initialCategories,
  onCategoriesChange,
  searchPlaceholder,
}: CategorySelectionProps<T>) {
  const tGeneral = useTranslations('general');
  const [categorySelected, setCategorySelected] = useState<ITreeCheckedData | null>(null);
  const latestCategorySelection = useRef<ITreeCheckedItem[]>([]);

  const processCategories = useCallback((node: ITreeNode, selectedIds: Set<string>): CategoryStateType => {
    if (!node.child || node.child.length === 0) {
      return selectedIds.has(node.id) ? CategoryState.CHECKED : CategoryState.UNCHECKED;
    }

    const childStates: CategoryStateType[] = node.child.map((child: ITreeNode) =>
      processCategories(child, selectedIds)
    );
    const allChecked = childStates.every(state => state === CategoryState.CHECKED);
    const anyCheckedOrIndeterminate = childStates.some(
      state => state === CategoryState.CHECKED || state === CategoryState.INDETERMINATE
    );

    if (allChecked) {
      return CategoryState.CHECKED;
    }
    if (anyCheckedOrIndeterminate) {
      return CategoryState.INDETERMINATE;
    }
    return CategoryState.UNCHECKED;
  }, []);

  const filterLeafCategories = useCallback(
    (data: ITreeCheckedData): ITreeCheckedItem[] => {
      const findNode = (id: string, nodes: ITreeNode[]): ITreeNode | null => {
        for (const node of nodes) {
          if (node.id === id) {
            return node;
          }
          if (node.child) {
            const found = findNode(id, node.child);

            if (found) {
              return found;
            }
          }
        }
        return null;
      };

      const isLeafNode = (node: ITreeNode): boolean => !node.child || node.child.length === 0;

      return data.checkedItems.filter(item => {
        const node = findNode(item.id, categories);

        return node && isLeafNode(node);
      });
    },
    [categories]
  );

  const leafCategories = useMemo(
    () => (categorySelected ? filterLeafCategories(categorySelected) : []),
    [categorySelected, filterLeafCategories]
  );

  useEffect(() => {
    if (initialCategories && categories?.length > 0) {
      const selectedIds = new Set(initialCategories.map(cat => cat.id));
      const checkedItems: ITreeNode[] = [];
      const indeterminateItems: ITreeNode[] = [];

      const traverseTree = (node: ITreeNode) => {
        const state = processCategories(node, selectedIds);

        if (state === CategoryState.CHECKED) {
          checkedItems.push(node);
          if (node.child) {
            for (const child of node.child) {
              traverseTree(child);
            }
          }
        } else if (state === CategoryState.INDETERMINATE) {
          indeterminateItems.push(node);
          if (node.child) {
            for (const child of node.child) {
              traverseTree(child);
            }
          }
        }
      };

      for (const category of categories) {
        traverseTree(category);
      }

      setCategorySelected({
        checkedItems: checkedItems.map(item => {
          return { id: item.id, name: item.name };
        }),
        halfCheckedItems: indeterminateItems.map(item => {
          return { id: item.id, name: item.name };
        }),
      });
    }
  }, [initialCategories, categories, processCategories]);

  useEffect(() => {
    const newSelection = leafCategories;

    if (JSON.stringify(newSelection) !== JSON.stringify(latestCategorySelection.current)) {
      latestCategorySelection.current = newSelection;
      onCategoriesChange(newSelection);
    }
  }, [leafCategories, onCategoriesChange]);

  return (
    <div className={className}>
      <CheckboxTree
        treeData={categories}
        defaultExpanded
        onCheck={setCategorySelected}
        checkedKeys={categorySelected?.checkedItems.map(item => item.id)}
        halfCheckedKeys={categorySelected?.halfCheckedItems.map(item => item.id)}
        showSearch
        searchPlaceholder={searchPlaceholder ?? tGeneral('search')}
      />
    </div>
  );
}
