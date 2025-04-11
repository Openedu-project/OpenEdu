'use client';

import { useEffect, useState } from 'react';
import { Checkbox } from '#shadcn/checkbox';

// Define base TreeNode interface for generic tree structure
export interface TreeNode {
  id: string;
  name: string;
  child?: TreeNode[];
}

// Define props for the component
export interface TreeCheckboxProps<T extends TreeNode> {
  data: T[];
  checkedIds?: string[]; // IDs that should be checked initially
  onChange: (checkedIds: string[]) => void; // Callback with all checked IDs
  idPrefix?: string; // Prefix for checkbox IDs
}

// Function to get the full path of IDs for a node
export const getNodePath = <T extends TreeNode>(
  nodes: T[],
  targetId: string,
  currentPath: string[] = []
): string[] | null => {
  for (const node of nodes) {
    // Check current node
    const newPath = [...currentPath, node.id];
    if (node.id === targetId) {
      return newPath;
    }

    // Check children if they exist
    if (node.child && node.child.length > 0) {
      const foundPath = getNodePath(node.child, targetId, newPath);
      if (foundPath) {
        return foundPath;
      }
    }
  }

  return null;
};

// Main TreeCheckbox Component
const TreeCheckbox = <T extends TreeNode>({
  data,
  checkedIds = [],
  onChange,
  idPrefix = 'node',
}: TreeCheckboxProps<T>) => {
  // State for checkboxes
  const [checkboxes, setCheckboxes] = useState<Record<string, boolean>>({});

  // Initialize checkboxes
  useEffect(() => {
    // Helper function to recursively initialize all nodes
    const initializeCheckboxes = (nodes: T[], result: Record<string, boolean> = {}): Record<string, boolean> => {
      for (const node of nodes) {
        result[`${idPrefix}-${node.id}`] = checkedIds.includes(node.id);

        if (node.child && node.child.length > 0) {
          initializeCheckboxes(node.child as T[], result);
        }
      }
      return result;
    };

    // Initialize with all nodes
    const initialCheckboxes = initializeCheckboxes(data);
    setCheckboxes(initialCheckboxes);

    // Update parent states based on initial checked IDs
    if (checkedIds.length > 0) {
      updateAllParentStates(initialCheckboxes);
    }
  }, [data, checkedIds, idPrefix]);

  // Update all parent states
  const updateAllParentStates = (currentCheckboxes: Record<string, boolean>) => {
    const updatedCheckboxes = { ...currentCheckboxes };
    let changed = false;

    // Update all nodes
    const updateNodeParentState = (nodes: T[]) => {
      for (const node of nodes) {
        if (node.child && node.child.length > 0) {
          // First update children's parents
          updateNodeParentState(node.child as T[]);

          // Then update this node based on its children
          const allChildrenChecked = node.child.every(child => updatedCheckboxes[`${idPrefix}-${child.id}`]);

          if (updatedCheckboxes[`${idPrefix}-${node.id}`] !== allChildrenChecked) {
            updatedCheckboxes[`${idPrefix}-${node.id}`] = allChildrenChecked;
            changed = true;
          }
        }
      }
    };

    updateNodeParentState(data);

    if (changed) {
      setCheckboxes(updatedCheckboxes);
    }

    return updatedCheckboxes;
  };

  // Handle checkbox change
  const handleCheckboxChange = (id: string) => {
    const nodeId = id.replace(`${idPrefix}-`, '');
    const isChecked = !checkboxes[id];
    let updatedCheckboxes = { ...checkboxes };

    // Update the clicked checkbox
    updatedCheckboxes[id] = isChecked;

    // Find the node in the tree
    const findNode = (nodes: T[], targetId: string, parentPath: string[] = []): { node: T; path: string[] } | null => {
      for (const node of nodes) {
        const currentPath = [...parentPath, node.id];

        if (node.id === targetId) {
          return { node, path: currentPath };
        }

        if (node.child && node.child.length > 0) {
          const result = findNode(node.child as T[], targetId, currentPath);
          if (result) {
            return result;
          }
        }
      }

      return null;
    };

    const nodeInfo = findNode(data, nodeId);

    if (nodeInfo) {
      const { node, path } = nodeInfo;

      // Update children recursively
      const updateChildren = (childNode: T, checked: boolean) => {
        updatedCheckboxes[`${idPrefix}-${childNode.id}`] = checked;

        if (childNode.child && childNode.child.length > 0) {
          for (const child of childNode.child) {
            updateChildren(child as T, checked);
          }
        }
      };

      // If this node has children, update all of them
      if (node.child && node.child.length > 0) {
        for (const child of node.child) {
          updateChildren(child as T, isChecked);
        }
      }

      // Update all parents in the path
      if (path.length > 1) {
        // Remove the last item (current node)
        path.pop();

        // Helper to get children of a node by path
        const getNodeByPath = (nodes: T[], pathIds: string[]): T | null => {
          if (pathIds.length === 0) {
            return null;
          }

          const targetId = pathIds[0];
          const node = nodes.find(n => n.id === targetId);

          if (!node) {
            return null;
          }

          if (pathIds.length === 1) {
            return node;
          }

          if (node.child && node.child.length > 0) {
            return getNodeByPath(node.child as T[], pathIds.slice(1));
          }

          return null;
        };

        // Update each parent based on its children's state
        for (let i = path.length - 1; i >= 0; i--) {
          const parentPath = path.slice(0, i + 1);
          const parent = getNodeByPath(data, parentPath);

          if (parent?.child && parent.child.length > 0) {
            const allChildrenChecked = parent.child.every(child => updatedCheckboxes[`${idPrefix}-${child.id}`]);

            updatedCheckboxes[`${idPrefix}-${parent.id}`] = allChildrenChecked;
          }
        }
      }
    }

    // Final update of all parent states to ensure consistency
    updatedCheckboxes = updateAllParentStates(updatedCheckboxes);
    setCheckboxes(updatedCheckboxes);

    // Extract all checked node IDs and call onChange
    const allCheckedIds = Object.entries(updatedCheckboxes)
      .filter(([_key, value]) => value)
      .map(([key]) => key.replace(`${idPrefix}-`, ''));

    onChange(allCheckedIds);
  };

  // Recursive component to render tree
  const RenderTreeNode = ({
    node,
    path = [],
  }: {
    node: T;
    path?: string[];
  }) => {
    const currentPath = [...path, node.id];
    const nodeId = `${idPrefix}-${node.id}`;
    const hasChildren = node.child && node.child.length > 0;

    return (
      <div>
        <div className="mb-4 flex items-center">
          <Checkbox
            id={nodeId}
            className="mr-2 rounded"
            checked={checkboxes[nodeId]}
            onCheckedChange={() => handleCheckboxChange(nodeId)}
          />
          <label htmlFor={nodeId} className="mcaption-regular16">
            {node.name}
          </label>
        </div>

        {hasChildren && (
          <div className="mt-1 ml-6 space-y-4">
            {node.child?.map(child => (
              <RenderTreeNode key={child.id} node={child as T} path={currentPath} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mt-3 space-y-3">
      {data.map(node => (
        <RenderTreeNode key={node.id} node={node} />
      ))}
    </div>
  );
};

export { TreeCheckbox };
