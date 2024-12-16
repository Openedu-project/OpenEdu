import { Check, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useRef, useState } from 'react';
import { Button } from '#shadcn/button';
import { CommandItem } from '#shadcn/command';
import { Input } from '#shadcn/input';
import { Popover, PopoverContent, PopoverTrigger } from '#shadcn/popover';
import { cn } from '#utils/cn';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH, ITEM_HEIGHT } from '../autocomplete/constants';
import { OptionBadge } from '../autocomplete/option-badge';
import { VirtualizedCommandBase } from '../autocomplete/virtualized-command-base';
import type { BaseAutocompleteTreeProps, FlattenedItem, TreeItem } from './types';
import { flattenTree, getDescendantIds } from './utils';
import { getParentIds } from './utils';

export interface AutocompleteTreeMultipleProps extends BaseAutocompleteTreeProps<TreeItem> {
  value?: TreeItem[];
  onChange?: (options: TreeItem[]) => void;
  maxSelected?: number;
}

export function AutocompleteTreeMultiple({
  options,
  placeholder,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  disabled = false,
  value = [],
  maxSelected,
  getOptionLabel = option => option.title,
  getOptionValue = option => option.id,
  filterOption = (option, searchValue) => option.title.toLowerCase().includes(searchValue.toLowerCase()),
  renderOption,
  onChange,
}: AutocompleteTreeMultipleProps) {
  const t = useTranslations('general');
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const flattenedItems = flattenTree(options);
  const filteredOptions = flattenedItems.filter(option => filterOption(option, searchValue));

  const handleSelectOptions = useCallback(
    (currentValue: TreeItem) => {
      if (maxSelected && value?.length >= maxSelected) {
        return;
      }

      const isSelected = value.some(selected => getOptionValue(selected) === getOptionValue(currentValue));

      let newOptions: TreeItem[];
      if (isSelected) {
        // Khi bỏ chọn một item
        const descendantIds = getDescendantIds(flattenedItems, currentValue.id);
        // Bỏ chọn item hiện tại và tất cả con của nó
        newOptions = value.filter(
          selected =>
            !descendantIds.includes(getOptionValue(selected)) &&
            getOptionValue(selected) !== getOptionValue(currentValue)
        );

        // Kiểm tra xem có còn item con nào được chọn không
        // Nếu không còn item con nào được chọn, bỏ chọn parent
        const parentIds = getParentIds(flattenedItems, currentValue.id);
        for (const parentId of parentIds) {
          const parent = flattenedItems.find(item => item.id === parentId);
          if (parent) {
            const parentDescendants = getDescendantIds(flattenedItems, parentId);
            const hasSelectedDescendants = newOptions.some(option =>
              parentDescendants.includes(getOptionValue(option))
            );
            if (!hasSelectedDescendants) {
              newOptions = newOptions.filter(option => getOptionValue(option) !== parentId);
            }
          }
        }
      } else {
        // Khi chọn một item
        if (maxSelected && value?.length >= maxSelected) {
          return;
        }

        // Chọn tất cả item con
        const descendantIds = getDescendantIds(flattenedItems, currentValue.id);
        const descendantsToAdd = flattenedItems
          .filter(item => descendantIds.includes(item.id))
          .filter(item => !value.some(v => getOptionValue(v) === getOptionValue(item)));

        // Chọn tất cả parent
        const parentIds = getParentIds(flattenedItems, currentValue.id);
        const parentsToAdd = flattenedItems
          .filter(item => parentIds.includes(item.id))
          .filter(item => !value.some(v => getOptionValue(v) === getOptionValue(item)));

        newOptions = [...value, currentValue, ...descendantsToAdd, ...parentsToAdd];
      }

      onChange?.(newOptions);
      setSearchValue('');
      inputRef.current?.focus();
    },
    [maxSelected, value, getOptionValue, onChange, flattenedItems]
  );

  const handleClearOption = useCallback(
    (option: TreeItem) => {
      const newSelected = value.filter(item => getOptionValue(item) !== getOptionValue(option));
      onChange?.(newSelected);
      inputRef.current?.focus();
    },
    [onChange, value, getOptionValue]
  );

  const renderCommandItem = useCallback(
    (option: FlattenedItem) => (
      <CommandItem
        key={getOptionValue(option)}
        value={String(getOptionValue(option))}
        onSelect={() => handleSelectOptions(option)}
        disabled={disabled}
        style={{
          height: `${ITEM_HEIGHT}px`,
          paddingLeft: `${(option.depth || 0) * 20 + 12}px`,
        }}
      >
        <Check
          className={cn(
            'mr-2 h-4 w-4',
            value.some(s => getOptionValue(s) === getOptionValue(option)) ? 'opacity-100' : 'opacity-0'
          )}
        />
        {renderOption ? renderOption(option) : getOptionLabel(option)}
      </CommandItem>
    ),
    [value, disabled, getOptionValue, getOptionLabel, handleSelectOptions, renderOption]
  );

  const sortSelectedItems = useCallback(
    (items: TreeItem[]) => {
      const itemMap = new Map(items.map(item => [getOptionValue(item), item]));
      const flattenedItems = flattenTree(options);

      return flattenedItems.filter(item => itemMap.has(item.id)).map(item => itemMap.get(item.id)) as TreeItem[];
    },
    [options, getOptionValue]
  );

  const handleClearAll = useCallback(() => {
    onChange?.([]);
    inputRef.current?.focus();
  }, [onChange]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            'flex min-h-11 items-center rounded-md border border-input text-sm',
            disabled && 'cursor-not-allowed opacity-50'
          )}
          onClick={() => !disabled && inputRef.current?.focus()}
          style={{ width }}
          onKeyDown={() => {
            void 0;
          }}
        >
          <div className="flex flex-grow flex-wrap items-center gap-1 p-2">
            {sortSelectedItems(value).map(option => (
              <OptionBadge
                key={getOptionValue(option)}
                label={getOptionLabel(option)}
                disabled={disabled}
                onRemove={() => handleClearOption(option)}
              />
            ))}
            <Input
              ref={inputRef}
              className="h-auto min-w-20 flex-1 border-none p-0 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder={placeholder ?? `${t('search')}...`}
              onChange={e => setSearchValue(e.target.value)}
              value={searchValue}
              disabled={disabled}
              name="search"
            />
          </div>
          {!disabled && value.length > 0 && (
            <Button
              type="button"
              onClick={e => {
                e.stopPropagation();
                handleClearAll();
              }}
              variant="ghost"
              className="mr-[2px] h-10 w-10 shrink-0 p-0"
            >
              <X size={16} />
            </Button>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] p-0">
        <VirtualizedCommandBase
          height={height}
          options={filteredOptions}
          searchValue={searchValue}
          onSearch={setSearchValue}
          renderItem={renderCommandItem}
        />
      </PopoverContent>
    </Popover>
  );
}
