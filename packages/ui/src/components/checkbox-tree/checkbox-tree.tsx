import { ChevronDown, ChevronRight } from 'lucide-react';
import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Button } from '#shadcn/button';
import { Checkbox } from '#shadcn/checkbox';
import { Input } from '#shadcn/input';
import { cn } from '#utils/cn';

export interface ITreeNode {
  id: string;
  name: string;
  child?: ITreeNode[];
  checked?: boolean;
  type?: string;
  order?: number;
  org_id?: string;
  use_count?: number;
  formatted?: string;
}

export interface ITreeCheckedItem {
  id: string;
  name: string;
}

export interface ITreeCheckedData {
  checkedItems: ITreeCheckedItem[];
  halfCheckedItems: ITreeCheckedItem[];
}

export interface ITreeProps {
  treeData: ITreeNode[];
  onCheck: (data: ITreeCheckedData) => void;
  customArrow?: React.ReactNode;
  defaultExpanded?: boolean;
  getItemClassName?: (node: ITreeNode) => string;
  showBorder?: boolean;
  checkedKeys?: string[];
  halfCheckedKeys?: string[];
  showSearch?: boolean;
  searchPlaceholder?: string;
}

export const CheckboxTree: React.FC<ITreeProps> = ({
  treeData,
  onCheck,
  customArrow,
  defaultExpanded = false,
  showBorder = false,
  getItemClassName = () => '',
  checkedKeys: propCheckedKeys,
  halfCheckedKeys: propHalfCheckedKeys,
  showSearch = false,
  searchPlaceholder = 'Search...',
}) => {
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<string[]>(propCheckedKeys || []);
  const [halfCheckedKeys, setHalfCheckedKeys] = useState<string[]>(propHalfCheckedKeys || []);
  const [filteredTreeData, setFilteredTreeData] = useState<ITreeNode[]>(treeData);

  useEffect(() => {
    if (propCheckedKeys) {
      setCheckedKeys(propCheckedKeys);
    }
  }, [propCheckedKeys]);

  useEffect(() => {
    if (propHalfCheckedKeys) {
      setHalfCheckedKeys(propHalfCheckedKeys);
    }
  }, [propHalfCheckedKeys]);

  const getAllKeys = useCallback((nodes: ITreeNode[]): string[] => {
    let keys: string[] = [];

    if (nodes) {
      for (const node of nodes) {
        keys.push(node.id);
        if (node.child) {
          keys = [...keys, ...getAllKeys(node.child)];
        }
      }
    }

    return keys;
  }, []);

  useEffect(() => {
    if (defaultExpanded) {
      const allKeys = getAllKeys(treeData);

      setExpandedKeys(allKeys);
    }
  }, [defaultExpanded, getAllKeys, treeData]);

  useEffect(() => {
    setFilteredTreeData(treeData);
  }, [treeData]);

  const toggleExpand = (key: string) => {
    setExpandedKeys(prev => (prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]));
  };

  const getChildKeys = useCallback((node: ITreeNode): string[] => {
    const keys: string[] = [node.id];

    if (node.child) {
      for (const child of node.child) {
        keys.push(...getChildKeys(child));
      }
    }
    return keys;
  }, []);

  const updateParentState = useCallback((treeData: ITreeNode[], checkedKeys: string[], halfCheckedKeys: string[]) => {
    const newCheckedKeys = new Set(checkedKeys);
    const newHalfCheckedKeys = new Set(halfCheckedKeys);

    const updateNode = (node: ITreeNode): 'checked' | 'unchecked' | 'indeterminate' => {
      if (!node.child || node.child.length === 0) {
        return newCheckedKeys.has(node.id) ? 'checked' : 'unchecked';
      }

      const childStates: ('checked' | 'unchecked' | 'indeterminate')[] = [];

      for (const child of node.child) {
        childStates.push(updateNode(child));
      }

      const allChildrenChecked = childStates.every(state => state === 'checked');
      const someChildrenChecked = childStates.some(state => state === 'checked' || state === 'indeterminate');

      if (allChildrenChecked) {
        newCheckedKeys.add(node.id);
        newHalfCheckedKeys.delete(node.id);
        return 'checked';
      }
      if (someChildrenChecked) {
        newHalfCheckedKeys.add(node.id);
        newCheckedKeys.delete(node.id);
        return 'indeterminate';
      }
      newCheckedKeys.delete(node.id);
      newHalfCheckedKeys.delete(node.id);
      return 'unchecked';
    };

    for (const node of treeData) {
      updateNode(node);
    }

    return {
      checkedKeys: [...newCheckedKeys],
      halfCheckedKeys: [...newHalfCheckedKeys],
    };
  }, []);

  const getNodeById = useCallback((id: string, nodes: ITreeNode[]): ITreeNode | null => {
    for (const node of nodes) {
      if (node.id === id) {
        return node;
      }
      if (node.child) {
        const found = getNodeById(id, node.child);

        if (found) {
          return found;
        }
      }
    }
    return null;
  }, []);

  const handleCheck = useCallback(
    (node: ITreeNode, checked: boolean) => {
      let newCheckedKeys = [...checkedKeys];
      const newHalfCheckedKeys = [...halfCheckedKeys];

      newCheckedKeys = checked
        ? [...new Set([...newCheckedKeys, ...getChildKeys(node)])]
        : newCheckedKeys.filter(key => !getChildKeys(node).includes(key));

      const updatedState = updateParentState(treeData, newCheckedKeys, newHalfCheckedKeys);

      setCheckedKeys(updatedState.checkedKeys);
      setHalfCheckedKeys(updatedState.halfCheckedKeys);

      const checkedItems: ITreeCheckedItem[] = updatedState.checkedKeys.map(id => {
        const node = getNodeById(id, treeData);

        return node ? { id: node.id, name: node.name } : { id, name: '' };
      });

      const halfCheckedItems: ITreeCheckedItem[] = updatedState.halfCheckedKeys.map(id => {
        const node = getNodeById(id, treeData);

        return node ? { id: node.id, name: node.name } : { id, name: '' };
      });

      onCheck({ checkedItems, halfCheckedItems });
    },
    [checkedKeys, halfCheckedKeys, getChildKeys, updateParentState, treeData, onCheck, getNodeById]
  );

  const filterTree = useCallback((node: ITreeNode, term: string): ITreeNode | null => {
    if (node.name.toLowerCase().includes(term.toLowerCase())) {
      return { ...node };
    }

    if (node.child) {
      const filteredChildren = node.child
        .map(child => filterTree(child, term))
        .filter((child): child is ITreeNode => child !== null);

      if (filteredChildren.length > 0) {
        return { ...node, child: filteredChildren };
      }
    }

    return null;
  }, []);

  const debouncedSearch = useDebouncedCallback(
    (term: string) => {
      if (term.trim() === '') {
        setFilteredTreeData(treeData);
      } else {
        const filtered = treeData
          .map(node => filterTree(node, term))
          .filter((node): node is ITreeNode => node !== null);

        setFilteredTreeData(filtered);
      }
    },

    100
  );

  const renderTreeNodes = (nodes: ITreeNode[], level = 0) =>
    nodes?.length > 0 &&
    nodes?.map(node => (
      <div key={node.id} className={cn('flex flex-col', level > 0 && 'ml-4', getItemClassName(node))}>
        <div className="flex items-center py-1">
          <div className="flex w-6 items-center justify-center">
            {node.child && node.child.length > 0 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleExpand(node.id)}
                className="h-4 w-4"
                aria-label={`${expandedKeys.includes(node.id) ? 'Collapse' : 'Expand'} ${node.name}`}
              >
                {customArrow ??
                  (expandedKeys.includes(node.id) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  ))}
              </Button>
            )}
          </div>
          <div className="flex flex-grow items-center gap-3">
            <div className="relative mr-2 flex items-center justify-center">
              <Checkbox
                checked={checkedKeys.includes(node.id)}
                onCheckedChange={checked => {
                  handleCheck(node, checked as boolean);
                }}
                id={`checkbox-${node.id}`}
              />
              {halfCheckedKeys.includes(node.id) && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="h-2 w-2 bg-primary" />
                </div>
              )}
            </div>
            <div className={cn('flex-grow py-1', showBorder && 'rounded-md border border-gray-200 bg-white p-2')}>
              <label htmlFor={`checkbox-${node.id}`} className="cursor-pointer select-none text-gray-700 text-sm">
                {node.name}
              </label>
            </div>
          </div>
        </div>
        {node.child && (
          <div
            className={cn(
              'overflow-hidden transition-all duration-300 ease-in-out',
              expandedKeys.includes(node.id) ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
            )}
          >
            {renderTreeNodes(node.child, level + 1)}
          </div>
        )}
      </div>
    ));

  return (
    <div className="tree-view flex h-full flex-col" role="tree">
      {showSearch && (
        <div className="sticky top-0 z-10 border-b bg-white p-4">
          <Input
            type="text"
            placeholder={searchPlaceholder}
            onChange={e => debouncedSearch(e.target.value)}
            className="w-full"
          />
        </div>
      )}
      <div className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 flex-grow overflow-y-scroll p-4">
        {renderTreeNodes(filteredTreeData)}
      </div>
    </div>
  );
};
