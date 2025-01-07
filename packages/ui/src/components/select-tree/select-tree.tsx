import { Check, ChevronDown, ChevronRight, ChevronsUpDown, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Fragment, useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { Badge } from '#shadcn/badge';
import { Button } from '#shadcn/button';
import { Checkbox } from '#shadcn/checkbox';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '#shadcn/command';
import { Popover, PopoverContent, PopoverTrigger } from '#shadcn/popover';
import { cn } from '#utils/cn';

export type TreeNode<T> = T & {
  id: string;
  child?: TreeNode<T>[];
};

type IStatus = 'checked' | 'indeterminate' | 'unchecked';

interface Props<T, V extends { id: string }> {
  placeholder?: string;
  data: TreeNode<T>[];
  value?: V[];
  onChange?: (value: V[]) => void;
  searchPlaceholder?: string;
  className?: string;
  getLabel: (node: TreeNode<T> | V) => string;
  getValue: (node: TreeNode<T>) => V;
  checkable?: boolean;
  multiple?: boolean;
}

export function SelectTree<T, V extends { id: string }>({
  placeholder,
  data,
  value = [],
  onChange,
  searchPlaceholder,
  className,
  getLabel,
  getValue,
  checkable,
  multiple,
}: Props<T, V>) {
  const tGeneral = useTranslations('general');
  const [open, setOpen] = useState(false);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const nodeRelationMap = useRef(new Map<string, string>());
  const nodeValueMap = useRef(new Map<string, V>());
  const nodeChildMap = useRef(new Map<string, string[]>());
  const parentMap = useRef(new Map<string, string>());

  useEffect(() => {
    const buildMaps = (nodes: TreeNode<T>[], parentNode?: TreeNode<T>) => {
      for (const node of nodes) {
        const nodeId = node.id;
        nodeValueMap.current.set(nodeId, getValue(node));

        if (parentNode?.id) {
          const parentChildren = nodeChildMap.current.get(parentNode?.id) || [];

          parentMap.current.set(nodeId, parentNode.id);
          parentChildren.push(nodeId);
          nodeChildMap.current.set(parentNode?.id, parentChildren);
        }

        if (node.child) {
          buildMaps(node.child, node);
        }
      }
    };

    let currentPath = '';
    const getPath = (nodes: TreeNode<T>[], reset?: boolean) => {
      for (const node of nodes) {
        currentPath += ` /${getLabel(node)}`;
        if (node.child && node.child.length > 0) {
          nodeRelationMap.current.set(node.id, getPath(node.child));
        } else {
          nodeRelationMap.current.set(node.id, currentPath);
        }
        if (reset) {
          currentPath = '';
        }
      }

      return currentPath;
    };

    nodeValueMap.current.clear();
    nodeChildMap.current.clear();
    buildMaps(data);
    getPath(data, true);
  }, [data, getLabel, getValue]);

  const getAllChildren = (nodeId: string): string[] => {
    const children = nodeChildMap.current.get(nodeId) || [];
    let allChildren = [nodeId];

    for (const childId of children) {
      const childNodeIds = getAllChildren(childId);

      if (childNodeIds.length > 0) {
        allChildren = [...allChildren, ...childNodeIds];
      }
    }

    return allChildren;
  };

  const toggleNode = (nodeId: string, e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const handleCheck = (node: TreeNode<T>) => {
    const childrenIds = getAllChildren(node.id);
    const areAllChildrenSelected = childrenIds.every(id => value.some(v => v.id === id));

    let newValue: V[];
    if (areAllChildrenSelected) {
      // If all children are selected, unselect the node and all its children
      newValue = value.filter(v => !childrenIds.includes(v.id));
    } else {
      // Select the node and all its children
      const toAdd = childrenIds.map(id => nodeValueMap.current.get(id)).filter(Boolean) as V[];

      // Start with current selection minus any children we'll be selecting
      newValue = [...value.filter(v => !childrenIds.includes(v.id)), ...toAdd];
    }
    // Check parent nodes
    let parentId = parentMap.current.get(node.id);

    while (parentId) {
      const siblings = nodeChildMap.current.get(parentId) || [];
      const areAllSiblingsSelected = siblings.every(
        siblingId => newValue.some(v => v.id === siblingId) || childrenIds.includes(siblingId)
      );

      if (areAllSiblingsSelected && !newValue.some(v => v.id === parentId)) {
        const parentValue = nodeValueMap.current.get(parentId);
        if (parentValue) {
          newValue.push(parentValue);
        }
      } else {
        newValue = [...newValue.filter(v => v.id !== parentId)];
      }

      parentId = parentMap.current.get(parentId);
    }

    onChange?.(newValue);
  };

  const handleSelect = (node: TreeNode<T>) => {
    if (value.some(v => v.id === node.id)) {
      onChange?.(value.filter(v => v.id !== node.id));
    } else {
      onChange?.(multiple ? [...value, getValue(node)] : [getValue(node)]);
    }
  };

  const handleRemove = (valueToRemove: V, e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const childrenIds = getAllChildren(valueToRemove.id);
    const newValue = value.filter(v => v.id !== valueToRemove.id && !childrenIds.includes(v.id));
    onChange?.(newValue);
  };

  const nodeStatus = (node: TreeNode<T>): IStatus => {
    const children = getAllChildren(node.id);
    const nodeValue = getValue(node);
    if (value.some(v => v.id === nodeValue.id)) {
      return 'checked';
    }
    const selectedId = new Set(value.map(item => item.id));

    if (children.some(v => selectedId.has(v))) {
      return 'indeterminate';
    }
    return 'unchecked';
  };

  const renderNode = (node: TreeNode<T>, level = 0) => {
    const nodeLabel = getLabel(node);
    const nodeId = node.id;

    return (
      <Fragment key={nodeId}>
        <CommandItem
          value={nodeId}
          onSelect={() => (checkable ? handleCheck(node) : handleSelect(node))}
          className={cn('flex items-center gap-2')}
          style={{ marginLeft: level * 16 }}
        >
          {node.child && node.child.length > 0 ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-6 w-6 p-0"
              onClick={e => toggleNode(nodeId, e)}
            >
              {expandedNodes.has(nodeId) || search.length > 0 ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          ) : (
            <div className="h-6 w-6 p-0" />
          )}
          <div className={cn('flex flex-1 cursor-pointer items-center gap-2', !checkable && 'justify-between')}>
            {checkable && (
              <div className="relative mr-2 flex items-center justify-center">
                <Checkbox id={`checkbox-${node.id}`} checked={value.some(v => v.id === node.id)} />
                {nodeStatus(node) === 'indeterminate' && (
                  <div className="pointer-events-none absolute inset-0 flex h-full w-full items-center justify-center">
                    <div className="h-2 w-2 bg-primary" />
                  </div>
                )}
              </div>
            )}
            <span className={cn(search.length > 0 && nodeLabel.includes(search) && 'text-primary')}>{nodeLabel}</span>
            {nodeStatus(node) === 'checked' && !checkable && <Check className="h-4 w-4" />}
          </div>
        </CommandItem>
        {node.child && (expandedNodes.has(nodeId) || search.length > 0) && (
          <div>{node.child.map(child => renderNode(child, level + 1))}</div>
        )}
      </Fragment>
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          aria-expanded={open}
          className={cn(
            '!m-0 w-full justify-between',
            value.length === 0 ? 'text-muted-foreground' : 'h-auto',
            className
          )}
        >
          <div className="flex flex-wrap gap-1 overflow-x-hidden">
            {value.length === 0
              ? placeholder
              : value.map(v => (
                  <Badge key={v.id} variant="default">
                    {getLabel(v)}
                    {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                    <div
                      className="ml-1 flex items-center rounded-full p-0 hover:border"
                      onClick={e => handleRemove(v, e)}
                    >
                      <X className="h-3 w-3" />
                    </div>
                  </Badge>
                ))}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command
          filter={(value, search) => {
            const customValue = nodeRelationMap.current.get(value) ?? value;
            if (customValue?.includes(search)) {
              return 1;
            }
            return 0;
          }}
        >
          <CommandInput placeholder={searchPlaceholder} value={search} onValueChange={setSearch} />
          <CommandEmpty>{tGeneral('noResults')}</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-auto">{data.map(node => renderNode(node))}</CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
