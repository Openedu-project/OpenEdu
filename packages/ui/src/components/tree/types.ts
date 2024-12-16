import type { BaseAutocompleteTreeProps } from '../autocomplete-tree/types';

export interface ITreeItem<TreeItem> {
  labelKey: keyof TreeItem;
  deleteTitle: string;
  deleteDescription: string;
  dragable: boolean;
  collapsible: boolean;
  editable: boolean;
  addable: boolean;
  deleteable: boolean;
  searchable?: boolean;
  addParentButtonLabel?: string;
  saveButtonLabel?: string;
  defaultItem?: TreeItem;
  onSave?: (items: TreeItem[]) => Promise<void>;
  onDelete?: (item: TreeItem, descendants: TreeItem[]) => Promise<void>;
}

export interface TreeSelectProps<TreeItem> extends BaseAutocompleteTreeProps<TreeItem> {
  value?: TreeItem | null;
  onChange?: (option: TreeItem | null) => void;
}
