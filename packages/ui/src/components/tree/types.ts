import type { BaseAutocompleteProps } from '../autocomplete/types';

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

export interface TreeSelectProps<TreeItem> extends BaseAutocompleteProps<TreeItem> {
  showSearch?: boolean;
  searchPlaceholder?: string;
  value?: TreeItem | null;
  onChange?: (option: TreeItem | null) => void;
}
